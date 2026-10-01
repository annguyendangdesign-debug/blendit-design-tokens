// Build tokens/*.json (W3C DTCG) -> build/css/tokens.css + build/rn/theme.ts
// Không cần thư viện ngoài: `node scripts/build.mjs`
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (f) => JSON.parse(fs.readFileSync(path.join(ROOT, 'tokens', f), 'utf8'));

const primitives = read('primitives.json');
const modes = { light: read('semantic.light.json'), dark: read('semantic.dark.json') };
const typography = read('typography.json');
const elevation = read('elevation.json');

// ---------- helpers ----------
const isLeaf = (n) => n && typeof n === 'object' && '$value' in n;
function flatten(tree, prefix = [], out = {}) {
  for (const [k, v] of Object.entries(tree)) {
    if (k.startsWith('$')) continue;
    if (isLeaf(v)) out[[...prefix, k].join('.')] = v;
    else flatten(v, [...prefix, k], out);
  }
  return out;
}
const ALIAS = /^\{([^}]+)\}$/;
function resolver(...trees) {
  const flat = Object.assign({}, ...trees.map((t) => flatten(t)));
  const resolve = (val, seen = new Set()) => {
    if (typeof val === 'string' && ALIAS.test(val)) {
      const key = val.match(ALIAS)[1];
      if (seen.has(key)) throw new Error(`Alias vòng lặp: ${key}`);
      if (!flat[key]) throw new Error(`Không tìm thấy token: ${key}`);
      return resolve(flat[key].$value, new Set([...seen, key]));
    }
    if (Array.isArray(val)) return val.map((v) => resolve(v, seen));
    if (val && typeof val === 'object') return Object.fromEntries(Object.entries(val).map(([k, v]) => [k, resolve(v, seen)]));
    return val;
  };
  return { flat, resolve };
}
const px = (v) => (typeof v === 'string' && v.endsWith('px') ? Number(v.slice(0, -2)) : v);
const ms = (v) => (typeof v === 'string' && v.endsWith('ms') ? Number(v.slice(0, -2)) : v);
const cssName = (key) => '--' + key.replace(/\./g, '-').replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
function hexToRgba(hex) {
  const h = hex.replace('#', '');
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
  const a = h.length === 8 ? +(parseInt(h.slice(6, 8), 16) / 255).toFixed(2) : 1;
  return { r, g, b, a, css: a === 1 ? `#${h.slice(0, 6)}` : `rgba(${r}, ${g}, ${b}, ${a})` };
}
function nest(flat, map = (x) => x) {
  const out = {};
  for (const [k, v] of Object.entries(flat)) {
    const parts = k.split('.');
    let n = out;
    parts.slice(0, -1).forEach((p) => (n = n[p] ??= {}));
    n[parts.at(-1)] = map(v, k);
  }
  return out;
}
const fmtColor = (v) => (typeof v === 'string' && v.startsWith('#') ? hexToRgba(v).css : v);

// ---------- CSS ----------
const primFlat = flatten(primitives);
const cssVal = (leaf, resolveRefsTo) => {
  const v = leaf.$value;
  if (typeof v === 'string' && ALIAS.test(v)) return `var(${cssName(v.match(ALIAS)[1])})`;
  if (leaf.$type === 'color') return fmtColor(v);
  if (leaf.$type === 'cubicBezier') return `cubic-bezier(${v.join(', ')})`;
  if (leaf.$type === 'fontFamily') return `"${v}", system-ui, sans-serif`;
  return v;
};
let css = '/* Goodblend · Blend It — design tokens. File sinh tự động, đừng sửa tay. */\n\n:root {\n';
for (const [k, leaf] of Object.entries(primFlat)) {
  if (k.startsWith('font.weight.')) continue; // tên style Figma, CSS dùng weightValue
  css += `  ${cssName(k)}: ${cssVal(leaf)};\n`;
}
const semBlock = (tree) => Object.entries(flatten(tree)).map(([k, l]) => `  ${cssName(k)}: ${cssVal(l)};\n`).join('');
css += semBlock(modes.light) + '}\n\n';
css += `[data-theme="dark"] {\n${semBlock(modes.dark)}}\n\n`;
css += `@media (prefers-color-scheme: dark) {\n  :root:not([data-theme="light"]) {\n${semBlock(modes.dark).replace(/^/gm, '  ')}  }\n}\n\n`;
// elevation as box-shadow
css += ':root {\n';
for (const [lvl, leaf] of Object.entries(elevation.elevation)) {
  const layers = leaf.$value.map((s) => `${s.offsetX} ${s.offsetY} ${s.blur} ${s.spread} var(${cssName(s.color.match(ALIAS)[1])})`);
  css += `  --elevation-${lvl.replace('level', '')}: ${layers.join(', ')};\n`;
}
css += '}\n\n';
for (const [group, sizes] of Object.entries(typography.typography)) {
  for (const [size, leaf] of Object.entries(sizes)) {
    const v = leaf.$value;
    const ref = (x) => `var(${cssName(x.match(ALIAS)[1])})`;
    css += `.text-${group}-${size.replace(/([A-Z])/g, '-$1').toLowerCase()} {\n  font-family: ${ref(v.fontFamily)};\n  font-weight: ${ref(v.fontWeight)};\n  font-size: ${ref(v.fontSize)};\n  line-height: ${ref(v.lineHeight)};\n  letter-spacing: ${ref(v.letterSpacing)};\n}\n`;
  }
}
fs.mkdirSync(path.join(ROOT, 'build/css'), { recursive: true });
fs.writeFileSync(path.join(ROOT, 'build/css/tokens.css'), css);

// ---------- React Native ----------
const { resolve: resolvePrim } = resolver(primitives);
const primResolved = nest(primFlat, (leaf) => {
  const v = resolvePrim(leaf.$value);
  if (leaf.$type === 'color') return fmtColor(v);
  if (leaf.$type === 'dimension') return px(v);
  if (leaf.$type === 'duration') return ms(v);
  return v;
});

function themeFor(mode) {
  const { resolve } = resolver(primitives, modes[mode]);
  const sem = nest(flatten(modes[mode]), (leaf) => fmtColor(resolve(leaf.$value)));
  const elev = {};
  for (const [lvl, leaf] of Object.entries(elevation.elevation)) {
    const layers = leaf.$value.map((s) => ({ ...s, color: resolve(s.color) }));
    const key = layers.at(-1); // lớp "key" quyết định bóng chính trên iOS
    const c = hexToRgba(key.color);
    elev[lvl] = {
      ios: { shadowColor: `rgb(${c.r}, ${c.g}, ${c.b})`, shadowOpacity: c.a, shadowRadius: px(key.blur) / 2, shadowOffset: { width: px(key.offsetX), height: px(key.offsetY) } },
      android: { elevation: Number(lvl.replace('level', '')) * 2, shadowColor: `rgb(${c.r}, ${c.g}, ${c.b})` },
      web: layers.map((s) => `${s.offsetX} ${s.offsetY} ${s.blur} ${s.spread} ${fmtColor(s.color)}`).join(', '),
    };
  }
  return { ...sem, elevation: elev };
}

// Font file names for React Native (mỗi weight 1 file font)
const RN_FONT = { 400: 'BeVietnamPro-Regular', 500: 'BeVietnamPro-Medium', 600: 'BeVietnamPro-SemiBold', 700: 'BeVietnamPro-Bold' };
const typo = {};
for (const [group, sizes] of Object.entries(typography.typography)) {
  typo[group] = {};
  for (const [size, leaf] of Object.entries(sizes)) {
    const v = resolvePrim(leaf.$value);
    const w = v.fontWeight;
    typo[group][size] = { fontFamily: RN_FONT[w], fontWeight: String(w), fontSize: px(v.fontSize), lineHeight: px(v.lineHeight), letterSpacing: px(v.letterSpacing) };
  }
}

const json = (o) => JSON.stringify(o, null, 2);
const ts = `/* Goodblend · Blend It — design tokens cho React Native.
 * File sinh tự động từ tokens/*.json bằng \`node scripts/build.mjs\`. Đừng sửa tay.
 */
import { Platform } from 'react-native';

export const palette = ${json(primResolved.color)} as const;

export const spacing = ${json(primResolved.spacing)} as const;
export const radius = ${json(primResolved.radius)} as const;
export const touchTarget = ${json(primResolved.touchTarget)} as const;
export const opacity = ${json(primResolved.opacity)} as const;
export const motion = {
  duration: ${json(primResolved.duration).replace(/\n/g, '\n  ')},
  easing: ${json(primResolved.easing).replace(/\n/g, '\n  ')}, // dùng: Easing.bezier(...motion.easing.standard)
} as const;

export const typography = ${json(typo)} as const;

const lightRaw = ${json(themeFor('light'))};

const darkRaw = ${json(themeFor('dark'))};

type Elev = { ios: object; android: object; web: string };
const withShadows = <T extends { elevation: Record<string, Elev> }>(t: T) => ({
  ...t,
  shadow: Object.fromEntries(
    Object.entries(t.elevation).map(([k, v]) => [k, Platform.select({ ios: v.ios, android: v.android, default: { boxShadow: v.web } })]),
  ) as Record<keyof T['elevation'], object>,
});

export const lightTheme = withShadows(lightRaw);
export const darkTheme = withShadows(darkRaw);
export type Theme = typeof lightTheme;
export const themes = { light: lightTheme, dark: darkTheme } as const;
`;
fs.mkdirSync(path.join(ROOT, 'build/rn'), { recursive: true });
fs.writeFileSync(path.join(ROOT, 'build/rn/theme.ts'), ts);

// sanity: light & dark có cùng bộ khoá
const kl = Object.keys(flatten(modes.light)).sort().join();
const kd = Object.keys(flatten(modes.dark)).sort().join();
if (kl !== kd) throw new Error('Light và Dark lệch khoá token');
console.log('✓ build/css/tokens.css\n✓ build/rn/theme.ts');
