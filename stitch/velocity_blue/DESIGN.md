# Design System Specification: Social Media Media Fetcher (SMMF)

## 1. Overview & Creative North Star
**The Creative North Star: "The Hyper-Fluid Curator"**

This design system rejects the clunky, ad-laden aesthetics of traditional media downloaders in favor of a high-end, editorial experience. We aim to position SMMF not as a "utility tool," but as a premium "digital concierge." 

The visual language moves beyond standard grids. We utilize **intentional asymmetry**, where the main action (link input) dominates the visual field with massive typography, while secondary meta-data floats in a layered, multi-dimensional space. We break the "template" look by using exaggerated white space (Spacing 16-24) and overlapping "glass" containers that create a sense of high-performance depth.

---

## 2. Colors & Tonal Depth

Our palette is anchored in a sophisticated deep navy (`surface: #06092f`), using vibrant purples and blues to signify technological speed.

### The "No-Line" Rule
**Explicit Instruction:** Traditional 1px solid borders are strictly prohibited for sectioning. Separation must be achieved through:
1.  **Background Shifts:** Place a `surface-container-highest` card directly onto a `surface` background.
2.  **Tonal Transitions:** Use the `surface-container` tiers (Lowest to Highest) to define boundaries. 

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. 
- **Base Layer:** `surface` (#06092f)
- **Sectioning:** `surface-container-low` (#0a0e38)
- **Primary Content Cards:** `surface-container-high` (#161a4b)
- **Active/Hover States:** `surface-container-highest` (#1b2055)

### The "Glass & Gradient" Rule
To elevate the brand above "utility" status, all primary CTAs and floating modals should utilize **Glassmorphism**:
- **Background:** `primary-container` at 80% opacity.
- **Backdrop-blur:** `12px` to `20px`.
- **Signature Gradient:** For the "Download" action, use a linear gradient from `primary` (#90abff) to `secondary` (#af88ff) at a 135° angle to provide a "visual soul."

---

## 3. Typography: Editorial Authority

We pair the precision of **Inter** for functional data with the high-end character of **Plus Jakarta Sans** for brand moments.

| Role | Token | Font | Size | Intent |
| :--- | :--- | :--- | :--- | :--- |
| **Hero Title** | `display-lg` | Plus Jakarta Sans | 3.5rem | High-impact headlines for link entry. |
| **Section Head** | `headline-md` | Plus Jakarta Sans | 1.75rem | Defining content categories (e.g., "Your Downloads"). |
| **Primary UI** | `title-md` | Inter | 1.125rem | Button labels and input text. |
| **Metadata** | `body-sm` | Inter | 0.75rem | File sizes, formats, and timestamps. |
| **Micro-copy** | `label-sm` | Inter | 0.6875rem | Terms and legal footers. |

---

## 4. Elevation & Depth: The Layering Principle

### Tonal Layering
Depth is achieved by "stacking" surface tokens. Instead of a shadow, place a `surface-container-lowest` (#000000) element inside a `surface-container-high` container to create an "inset" or "carved" look for input fields.

### Ambient Shadows
Shadows are reserved for floating elements (Tooltips/Modals). They must be "Ambient":
- **Color:** `on-surface` (#e3e3ff) at 6% opacity.
- **Blur:** 40px to 60px.
- **Spread:** -5px.
- *Result:* A soft glow that feels like natural light refraction rather than a "drop shadow."

### The "Ghost Border" Fallback
If accessibility requires a container boundary, use a **Ghost Border**: `outline-variant` (#41456c) at **15% opacity**. Never use 100% opacity.

---

## 5. Components

### Input Fields (The "Fetch" Bar)
- **Base:** `surface-container-lowest` (#000000).
- **Radius:** `xl` (1.5rem).
- **Interaction:** On focus, the container transitions to `outline` (#6f729d) at 20% opacity with a subtle `primary` outer glow.
- **Labeling:** Use `label-md` floating above the container, never inside.

### Buttons
- **Primary (Download):** Use the Signature Gradient (`primary` to `secondary`). Radius: `full`. Use `title-md` for text. High contrast is mandatory (`on-primary-fixed`: #000000).
- **Secondary:** Transparent background with a `Ghost Border`. Text color: `primary`.
- **Tertiary:** No background. Text color: `on-surface-variant`.

### Media Cards
- **Constraint:** **Strictly no dividers.** 
- **Structure:** Use `Spacing 6` (1.5rem) to separate the thumbnail from metadata. 
- **Hover:** Shift background from `surface-container-high` to `surface-container-highest`.
- **Radius:** `lg` (1rem).

### Platform Chips
- **Style:** Small, `surface-bright` (#212660) pill-shaped containers.
- **Icon:** Monochromatic `on-surface-variant` icons. Colors only appear on hover/selection to maintain a clean editorial look.

---

## 6. Do’s and Don'ts

### Do:
- Use **Plus Jakarta Sans** for numbers (file sizes/counts) to give them a high-end, tabular feel.
- Utilize **Asymmetry**: Offset the main search bar slightly to the left or right to break the "Bootstrap" feel.
- Use **Backdrop Blur** on the navigation header to let content scroll elegantly underneath.

### Don't:
- **No 1px Lines:** Do not use borders to separate list items. Use background shifts or white space.
- **No Pure Black Shadows:** Shadows must always be tinted with the `on-surface` blue/purple hue.
- **No Standard "Success" Green:** Use `tertiary` (#ffb4f4) for a sophisticated "Success" state that aligns with the purple brand palette while remaining distinct from errors.
- **No Crowding:** If in doubt, add `Spacing 8` (2rem). This system breathes.