# Goodblend · Blend It — Design Tokens

Nguồn duy nhất cho màu, khoảng cách, bo góc, chữ, bóng và chuyển động của app **Blend It** (React Native). Mọi giá trị lấy từ Figma Variables của file thiết kế Blend It.

```
tokens/                ← NGUỒN (W3C DTCG JSON) — chỉ sửa ở đây (hoặc xuất lại từ Figma)
  primitives.json      bảng màu gốc, spacing, radius, font, motion, opacity
  semantic.light.json  token theo vai trò — Light
  semantic.dark.json   token theo vai trò — Dark (cùng khoá với Light)
  typography.json      16 kiểu chữ (text styles)
  elevation.json       4 mức bóng
build/                 ← SINH TỰ ĐỘNG — không sửa tay
  rn/theme.ts          dùng trong app React Native
  css/tokens.css       CSS variables (web / CMS)
scripts/
  build.mjs            tokens/*.json → build/*  (`npm run build`, không cần thư viện)
  figma_to_dtcg.py     chuyển bản xuất thô từ Figma → tokens/*.json
```

---

## 1. Ba tầng token

| Tầng | Ví dụ | Ai dùng |
|---|---|---|
| **Primitive** — giá trị thô | `color.brand.500`, `spacing.16`, `radius.lg` | Chỉ semantic tham chiếu tới. **Không dùng màu primitive trực tiếp trong component.** Spacing / radius / font thì dùng trực tiếp được. |
| **Semantic** — theo vai trò, có Light/Dark | `fill.primary`, `text.muted`, `stroke.focus` | Component dùng tầng này cho mọi màu. |
| **Component** — riêng 1 component | `component.membershipCard.grad1`, `component.goal.skin.container` | Chỉ component đó dùng. |

Trong Figma, các primitive màu bị ẩn khỏi bảng chọn (scope = rỗng) để designer không chọn nhầm.

## 2. Quy tắc đặt tên

- Dạng `nhóm/vai trò`, viết **camelCase**, phân cấp bằng `/` (Figma) = `.` (code): `fill/primaryPressed` → `theme.fill.primaryPressed`.
- Mọi đoạn tên phải là định danh JS hợp lệ — không gạch ngang, không bắt đầu bằng số. Số chỉ dùng cho **thang** (`color.brand.500`, `spacing.16`) hoặc mức (`shadow.level2`).
- Không nhét giá trị vào tên (`overlayWhite10` ✗) — độ mờ đặt tiền tố `a`: `fill.onDark.a10`.
- Nhóm semantic:
  - `fill.*` — nền (frame, shape). Hậu tố trạng thái: `Pressed`, `Disabled`, `Subtle`, `Solid`, `Container`.
  - `text.*` — màu chữ. `on<X>` = chữ đặt trên nền `fill.<x>` (vd `text.onPrimary` trên `fill.primary`).
  - `icon.*` — màu icon, cùng quy ước `on<X>`.
  - `stroke.*` — viền, divider, focus ring.
  - `shadow.levelN.ambient|key` — màu 2 lớp bóng của mức N.
- Cặp `text.onXxx` và `icon.onXxx` luôn dùng cùng 1 màu.

## 3. Dark mode

Collection Semantic có 2 mode → xuất **2 object cùng khoá**: `lightTheme`, `darkTheme`. Component chỉ gọi `theme.fill.surface`; đổi mode là đổi object, không sửa component.

```tsx
import { useColorScheme } from 'react-native';
import { themes, spacing, radius, typography } from '@/tokens/theme';

export function useTheme() {
  return themes[useColorScheme() === 'dark' ? 'dark' : 'light'];
}

const t = useTheme();
<View style={{ backgroundColor: t.fill.surface, padding: spacing[16], borderRadius: radius.lg, ...t.shadow.level2 }}>
  <Text style={{ ...typography.body.lg, color: t.text.primary }}>Xin chào</Text>
</View>
```

Primitives (palette, spacing, radius, typography, motion) chỉ có 1 bản, dùng chung cho cả 2 theme. Build sẽ báo lỗi nếu Light và Dark lệch khoá.

## 4. Thang giá trị

- **Spacing** (dp): 0 · 2 · 4 · 6 · 8 · 10 · 12 · 16 · 20 · 24 · 32 · 40 · 48. Không dùng số ngoài thang.
- **Radius**: none 0 · sm 4 · md 8 · lg 12 · xl 16 · xxl 24 · xxxl 32 · pill 999.
- **Touch target**: tối thiểu 48 (`touchTarget.min`), 44 cho vùng chật (`touchTarget.compact`).
- **Opacity**: disabled 0.38 · overlay 0.55 · pressed 0.12.
- **Motion**: fast 120ms · base 200ms · slow 320ms; easing `standard` / `decelerate` / `accelerate` dạng 4 số → `Easing.bezier(...motion.easing.standard)`.

## 5. Chữ

- Font **Be Vietnam Pro**. React Native cần 1 file font cho mỗi weight: `BeVietnamPro-Regular|Medium|SemiBold|Bold` (400/500/600/700) — `typography.*` đã điền sẵn `fontFamily` đúng file.
- Nhóm: `display` (lg/md/sm) · `heading` (lg/md/sm) · `body` (lg/md/sm) · `label` (xl…sm, có biến thể `Strong`).
- `lineHeight`, `letterSpacing` là giá trị tuyệt đối (dp), không phải hệ số.
- Cỡ 11 (`body.sm`), 13 / 15 (button) nằm ngoài thang chẵn — cố ý.

## 6. Bóng (elevation)

4 mức, mỗi mức 2 lớp (ambient + key) theo Figma effect style `elevation/1–4`.
- iOS: dùng lớp key → `shadowColor/Opacity/Radius/Offset`.
- Android: `elevation` = mức × 2.
- Web: `box-shadow` đủ 2 lớp.
Dùng `...theme.shadow.level2` (đã `Platform.select`).

## 7. Scrim & overlay

- `fill.scrim.default` — nền sau overlay / popup (80%). Độ mờ **nằm trong token**; không chỉnh thêm opacity ở layer.
- `fill.scrim.light` — scrim nhẹ 35%.
- `fill.onDark.a10…a90` — lớp trắng mờ đặt trên nền tối/ảnh (nút đóng, badge số dư…).

## 8. Quy trình cập nhật

1. Sửa Variables trong Figma.
2. Xuất lại → `tokens/*.json` (Claude làm qua plugin, hoặc `python3 scripts/figma_to_dtcg.py raw.json tokens`).
3. `npm run build` → sinh lại `build/`.
4. Commit cả `tokens/` và `build/`, ghi rõ token nào đổi trong commit message.

**Không** sửa tay `build/`. **Không** thêm màu hex trực tiếp trong code app — thiếu token thì thêm vào Figma trước.
