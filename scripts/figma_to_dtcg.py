"""Convert raw Figma variable export (raw.json) -> DTCG token JSON files in repo/tokens/."""
import json, os, sys

SRC = sys.argv[1] if len(sys.argv) > 1 else 'raw.json'
OUT = sys.argv[2] if len(sys.argv) > 2 else 'repo/tokens'
r = json.load(open(SRC))
os.makedirs(OUT, exist_ok=True)


def hexa(c):
    h = lambda x: format(round(x * 255), '02X')
    s = '#' + h(c['r']) + h(c['g']) + h(c['b'])
    a = round(c.get('a', 1), 2)
    return s if a >= 1 else s + h(a)


def num(x):
    x = round(float(x), 2)
    return int(x) if x == int(x) else x


def put(tree, path, leaf):
    node = tree
    for p in path[:-1]:
        node = node.setdefault(p, {})
    node[path[-1]] = leaf


def dtype(name, t):
    top = name.split('/')[0]
    if t == 'COLOR':
        return 'color'
    if name.startswith('font/family'):
        return 'fontFamily'
    if name.startswith('font/weightValue'):
        return 'fontWeight'
    if name.startswith('font/weight/'):
        return 'string'  # Figma style name ("SemiBold")
    if top == 'duration':
        return 'duration'
    if top == 'easing':
        return 'cubicBezier'
    if t == 'FLOAT':
        return 'number' if top == 'opacity' else 'dimension'
    return 'string'


def value(name, t, v):
    if isinstance(v, dict) and 'alias' in v:
        return '{' + v['alias'].replace('/', '.') + '}'
    ty = dtype(name, t)
    if ty == 'color':
        return hexa(v)
    if ty == 'cubicBezier':
        return [num(x) for x in v.split('(')[1].rstrip(')').split(',')]
    if ty == 'duration':
        return f'{num(v)}ms'
    if ty == 'dimension':
        return f'{num(v)}px'
    if ty in ('number', 'fontWeight'):
        return num(v)
    return v


for coll in r['collections']:
    for mode in coll['modes']:
        tree = {}
        for var in coll['vars']:
            leaf = {'$type': dtype(var['n'], var['t']), '$value': value(var['n'], var['t'], var['v'][mode])}
            if var.get('d'):
                leaf['$description'] = var['d']
            put(tree, var['n'].split('/'), leaf)
        fname = 'primitives.json' if coll['name'] == 'Primitives' else f"semantic.{mode.lower()}.json"
        json.dump(tree, open(os.path.join(OUT, fname), 'w'), ensure_ascii=False, indent=2)

# typography (text styles)
typo = {}
for t in r['texts']:
    bv = t['bv']
    ref = lambda k, fb: '{' + bv[k].replace('/', '.') + '}' if k in bv else fb
    weight_key = bv.get('fontStyle', '').split('/')[-1] or t['f']['style'].lower()
    leaf = {'$type': 'typography', '$value': {
        'fontFamily': ref('fontFamily', t['f']['family']),
        'fontWeight': '{font.weightValue.' + weight_key + '}',
        'fontSize': ref('fontSize', f"{t['size']}px"),
        'lineHeight': ref('lineHeight', f"{t['lh'].get('value')}px"),
        'letterSpacing': ref('letterSpacing', f"{num(t['ls']['value'])}px"),
    }}
    g, n = t['n'].split('/')
    put(typo, [g, n.replace('-strong', 'Strong')], leaf)
json.dump({'typography': typo}, open(os.path.join(OUT, 'typography.json'), 'w'), ensure_ascii=False, indent=2)

# elevation (effect styles) — colors reference semantic shadow tokens
elev = {}
for e in r['effects']:
    if not e['n'].startswith('elevation/'):
        continue
    layers = []
    for x in e['e']:
        if x['type'] != 'DROP_SHADOW':
            continue
        layers.append({
            'color': '{' + x['bv']['color'].replace('/', '.') + '}' if x.get('bv') else hexa(x['color']),
            'offsetX': f"{num(x['offset']['x'])}px", 'offsetY': f"{num(x['offset']['y'])}px",
            'blur': f"{num(x['radius'])}px", 'spread': f"{num(x.get('spread') or 0)}px"})
    elev['level' + e['n'].split('/')[1]] = {'$type': 'shadow', '$value': layers}
json.dump({'elevation': elev}, open(os.path.join(OUT, 'elevation.json'), 'w'), ensure_ascii=False, indent=2)
print('ok', os.listdir(OUT))
