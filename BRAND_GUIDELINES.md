# Kibra Brand Identity & Visual Guidelines
Version 1.0.0 • Clean & Modern Tech

Welcome to the official brand guidelines for **Kibra**. This document provides a complete blueprint for Kibra's visual design, typography, brand assets, and content voice.

Kibra is a next-generation, cross-platform component framework engineered for speed, modularity, and pixel-perfect responsiveness across mobile and web platforms. Our brand system reflects this core identity: **clean, precise, structurally sound, and premium.**

---

## Table of Contents
1. [Core Brand Identity](#1-core-brand-identity)
2. [Logo & Mark Assets](#2-logo--mark-assets)
3. [The Color System](#3-the-color-system)
4. [Typography & Hierarchy](#4-typography--hierarchy)
5. [Interface Design & Accessibility Guidelines](#5-interface-design--accessibility-guidelines)
6. [Image & Illustration Prompting Cookbook](#6-image--illustration-prompting-cookbook)
7. [Technical Implementation & Tailwind Tokens](#7-technical-implementation--tailwind-tokens)

---

## 1. Core Brand Identity

Kibra's design language resides at the intersection of developer utility and elegant consumer product aesthetics. 

### Brand Personality Attributes
* **Precise & Solid:** Built with robust structural mathematics. Pixel alignment and clean spacing are absolute rules.
* **Responsive & Fluid:** Seamlessly adapting across all touchpoints, from native iOS/Android to high-performance web applications.
* **Sophisticated:** Relying on whitespace, deep slate neutrals, and vibrant cyber accents instead of visual noise.

---

## 2. Logo & Mark Assets

The Kibra logo represents the letter **K** reimagined as fluid, overlapping ribbons and dynamic data connections. It symbolizes seamless integration, fast compilation, cloud synchronization, and modular data flows.

### Logo Variations
All logo files are located in `/public/brand/` as optimized, responsive SVGs that support automatic light/dark-mode theme swapping.

1. **Standalone Icon (`kibra-logo-icon.svg`):**
   * Standalone badge designed on a symmetrical 512x512 canvas.
   * **Usage:** App icons, browser favicons, social media profiles, and watermarks.

2. **Horizontal Wordmark (`kibra-logo-horizontal.svg`):**
   * Symmetrical horizontal layout featuring the brand icon, primary wordmark, and secondary subtitle.
   * **Usage:** Website headers, navigation bars, and marketing banners.

3. **Vertical Lockup (`kibra-logo-vertical.svg`):**
   * Centered, stacked design with the icon elevated above the wordmark.
   * **Usage:** Splashes, hero sections, and signage.

### Clear Space Guidelines
Always maintain a minimum buffer around the logo to preserve its impact.
* **Minimum Clear Space:** Equals half the height of the main icon symbol ($0.5H$) on all sides.
* Do not place other text, graphics, or high-contrast background lines inside this clear space zone.

```
      ┌──────────────────────────────────────────────┐
      │                                              │
      │    [ 0.5H Margin ]                           │
      │    ┌───┐                                     │
      │    │ █ │  Kibra                              │
      │    └───┘                                     │
      │                                              │
      └──────────────────────────────────────────────┘
```

---

## 3. The Color System (Atomic Documentation System)

The palette is engineered for technical clarity and developer experience. The brand personality is **precise, systematic, and high-performance**, reflecting the structural integrity of a well-architected component library.

*   **Primary Base:** `#00687b` (Surface Tint / Primary)
*   **Primary Highlights (Cyan):** `#00d8ff` (Primary Container), `#14d8ff` (Inverse Primary)
*   **Secondary (Blue/Teal):** `#006591`, `#39b8fd` (Secondary Container)
*   **Tertiary (Indigo):** `#494bd6`, `#c0c1ff` (Tertiary Container)
*   **Error/Destructive:** `#ba1a1a` (Error), `#ffdad6` (Error Container)

### Surface & Background Neutrals
*   **Background Base:** `#faf8ff` (Warm/Cool neutral light gray that reduces eye strain)
*   **Surfaces:** `#ffffff` (Container Lowest), `#eaedff` (Container), `#e2e7ff` (Container High)
*   **Inverse/Dark Surfaces:** `#283044` (Inverse Surface), `#131b2e` (On-Surface/Text)
*   **Borders/Outlines:** `#6c797e` (Outline), `#bbc9ce` (Outline Variant)

### Dual-Gradient Application
When rendering visual gradients (such as borders, banners, or card glow effects), transition from **Primary Base** to **Primary Highlights**:
* **Gradient Direction:** `linear-gradient(135deg, #00687b 0%, #00d8ff 100%)`

---

## 4. Typography & Hierarchy

The typography system relies on **Inter** for all UI and prose elements to maintain a modern, neutral, and highly readable tech aesthetic. For technical content, **JetBrains Mono** is utilized to provide a clear distinction between descriptive text and code snippets.

Hierarchy is established through weight and scale rather than color. Use `h1` for page titles, `h2` for section breaks, and `body-md` for the majority of the documentation. `label-md` is intended for small metadata, table headers, and navigation links.

### Scale & Hierarchy

* **Heading 1:** `40px` (Bold / 700) • `letter-spacing: -0.02em` • Line Height: `48px` (Mobile: `32px` / `40px`)
* **Heading 2:** `30px` (Semibold / 600) • `letter-spacing: -0.01em` • Line Height: `36px`
* **Heading 3:** `24px` (Semibold / 600) • Line Height: `32px`
* **Body Large (`body-lg`):** `18px` (Regular / 400) • Line Height: `28px`
* **Body Main (`body-md`):** `16px` (Regular / 400) • Line Height: `24px`
* **Body Small (`body-sm`):** `14px` (Regular / 400) • Line Height: `20px`
* **Label Medium (`label-md`):** `14px` (Medium / 500) • `letter-spacing: 0.01em` • Line Height: `20px`
* **Code Block:** `14px` (JetBrains Mono / 400) • Line Height: `22px`

---

## 5. Interface Design & Accessibility Guidelines

Kibra follows strict industry standards for accessibility, focus states, and high performance, utilizing a **Fixed-Fluid hybrid grid**.

### Layout & Spacing
- **Desktop:** A fixed-width sidebar (`280px`) sits to the left, with the main content area constrained to a maximum of `1280px`, centered on the screen.
- **Mobile/Tablet:** The sidebar collapses into a hamburger menu. Margins scale down from `32px` (Desktop) to `16px` (Mobile).
- **Rhythm:** Spacing follows a strict 8px base unit. Use `section-gap` (`4rem`) between major topics and `stack-md` (`1rem`) for spacing between paragraphs and code blocks.

### Elevation & Depth
This design system uses a **Tonal Layering** approach combined with **Ambient Shadows** to define hierarchy.

- **Level 0 (Background):** The `#faf8ff` base layer.
- **Level 1 (Surface):** White surfaces (`#ffffff`) with a 1px border (`#eaedff`). Used for the main documentation container.
- **Level 2 (Interactive):** Elements like search bars or dropdowns use a soft, diffused shadow (`0px 4px 12px rgba(19, 27, 46, 0.05)`) to appear slightly elevated.
- **Level 3 (Overlay):** Modals and floating menus use a more pronounced shadow (`0px 12px 24px rgba(19, 27, 46, 0.1)`) and a backdrop blur of 8px.

### Shapes
The shape language is **Soft and Professional**.
- Standard radius: `0.25rem` (4px) applied to small interactive elements like inputs and buttons.
- Large containers: Code blocks and cards use `0.5rem` (8px).

### Components

#### Buttons
- **Primary:** Background `#00d8ff`, text `#005a6c`, bold weight. No shadow on rest; subtle lift on hover.
- **Secondary:** Transparent background, 1px border `#6c797e`, text `#131b2e`.

#### Code Blocks
- **Container:** Background `#131b2e`, text `#faf8ff`, rounded-lg.
- **Header:** A subtle top bar containing the file name and a "Copy" button in body-sm.

#### Inputs & Search
- Use a `1px` border of `#bbc9ce`. On focus, the border transitions to `#00d8ff` with a 2px outer glow of the same color at 20% opacity.

#### Sidebar Navigation
- **Active State:** A vertical 2px line of `#00d8ff` on the left edge of the navigation item, with the text color switching to `#00d8ff` or a bold neutral.
- **Hover State:** A very subtle light gray background (`#f2f3ff`).

#### Cards
- White background, 1px border, and a Level 2 shadow. Used primarily for "Feature" highlights or "Next Steps" at the bottom of pages.

### Accessibility Rules
* **Interactive Elements:**
  * Always use a `<button>` tag for actions, and `<a>` or `<Link>` for navigation. Never place click handlers directly on raw `<div>` or `<span>` containers.
  * Icon-only buttons must include a descriptive `aria-label` (e.g., `<button aria-label="Close menu">`).
  * Always hide decorative icons from screen readers using `aria-hidden="true"`.
* **Focus States:**
  * Interactive components must provide clear, high-contrast focus rings using `:focus-visible` (e.g., `focus-visible:ring-2 focus-visible:ring-primary`).
  * Never use `outline-none` or `outline: none` without providing an accessible alternative.

---

## 6. Image & Illustration Prompting Cookbook

Use this cookbook to generate visual assets that perfectly match the clean Kibra tech aesthetic.

### Theme 1: High-Tech UI & Code Flow Abstract (For Landing Page Hero Graphics)
* **Goal:** High-end, premium 3D graphics representing modular blocks, pipelines, and layered user interfaces.
* **Midjourney Prompt:**
  > `Clean futuristic 3D render of floating semi-transparent glass cards with glowing cyan and deep teal circuit paths, deep dark-slate background, minimal tech aesthetic, isometric projection, soft volumetric neon lighting, photorealistic, octane render, 8k, ultra-detailed, aspect ratio --ar 16:9`
* **DALL-E 3 Prompt:**
  > `A professional, clean, minimalist 3D rendering of floating translucent glass UI panels with sleek neon lines. The style is modern tech, with soft gradients of primary deep teal (#00687b) and vivid cyan (#00d8ff) illuminating the edges. The background is a very dark, premium matte dark slate (#131b2e). Generous empty space, soft shadows, sharp focus, isometric technical design, highly sophisticated.`

### Theme 2: Device Mockups & Studio Photography (For Product Showcase)
* **Goal:** Placing digital screens inside clean, realistic, upscale physical environments.
* **Midjourney Prompt:**
  > `High-end studio product photograph of a borderless aluminum tablet showing a clean mobile dashboard. Floating glassmorphism design, vivid cyan accent lighting, soft morning daylight, concrete and light oak table background, premium minimal tech setup, photorealistic, 8k --ar 4:3`
* **DALL-E 3 Prompt:**
  > `High-end studio product photography of a modern, sleek borderless tablet displaying a clean, futuristic application dashboard. The screen glows with soft deep teal and vivid cyan UI components. The device is resting on a minimal textured light grey concrete surface. Soft, natural morning side-light with gentle shadows. Minimalist, premium, and sophisticated.`

### Theme 3: Minimal Isometric Icons (For Feature Highlights)
* **Goal:** Simple, clean, vector-like 3D assets on solid backgrounds.
* **Midjourney Prompt:**
  > `Flat vector tech icon of a 3D isometric glowing data cube, clean minimal design, cyan and violet gradients, solid dark slate-grey background --no shadows, no noise --ar 1:1`
* **DALL-E 3 Prompt:**
  > `A flat vector tech illustration of an isometric glowing connection cube. It has clean minimal geometric shapes with smooth cyan and indigo gradients, on a solid dark slate grey (#0F172A) background. Clean vector style, sharp lines, modern aesthetic.`

---

## 7. Technical Implementation & Tailwind Tokens

To implement this design system in your codebase, integrate the following design tokens into your Tailwind configuration (`tailwind.config.js` or CSS theme variables):

### Tailwind Configuration Integration
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        kibra: {
          primary: '#00d8ff',
          primaryDark: '#00687b',
          secondary: '#39b8fd',
          secondaryDark: '#006591',
          tertiary: '#c0c1ff',
          tertiaryDark: '#494bd6',
          error: '#ba1a1a',
          errorContainer: '#ffdad6',
          neutral: {
            dark: '#131b2e',
            muted: '#283044',
            border: '#bbc9ce',
            text: '#6c797e',
            bg: '#faf8ff',
            surface: '#ffffff',
            surfaceHover: '#eaedff'
          }
        }
      },
      fontFamily: {
        sans: ['"Inter Variable"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'kibra-gradient': 'linear-gradient(135deg, #00687b 0%, #00d8ff 100%)',
      },
      spacing: {
        'container-max': '1280px',
        'sidebar': '280px',
        'gutter': '1.5rem',
        'stack-sm': '0.5rem',
        'stack-md': '1rem',
        'stack-lg': '2rem',
        'section-gap': '4rem',
      },
      borderRadius: {
        'sm': '0.125rem',
        DEFAULT: '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
      }
    },
  },
}
```

### Ready-To-Use CSS Classes
* **Primary Brand Gradient:** `bg-gradient-to-br from-kibra-primaryDark to-kibra-primary`
* **Interactive Button Focus:** `focus-visible:ring-2 focus-visible:ring-kibra-primary focus-visible:outline-none`
* **Muted Heading Caption:** `font-sans text-sm font-medium tracking-wider uppercase text-kibra-neutral-text`

---

*For branding inquiries or logo modifications, please consult the core design team or refer to the repository source graphics.*
