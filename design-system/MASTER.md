# Design System — Mini Program Framework

> Global source of truth for UI/UX design decisions in this project.

---

## Product Identity

| Attribute | Value |
|-----------|-------|
| **Product Type** | Developer Tool / Framework Template |
| **Platform** | WeChat Mini Program |
| **Tech Stack** | Native Mini Program + TailwindCSS |
| **Target Audience** | Frontend developers building mini-programs |
| **Design Philosophy** | Clean, modern, minimal, professional |

---

## Design Tokens

### Colors

| Token | Hex | Usage |
|-------|-----|-------|
| Primary | `#4670E7` | Buttons, links, active states |
| Primary Dark | `#3A5DD0` | Pressed states |
| Primary Light | `#E8EEFD` | Light backgrounds, tags |
| Text Primary | `#1A1A1A` | Headings, body text |
| Text Secondary | `#666666` | Captions, descriptions |
| Text Tertiary | `#999999` | Placeholders, disabled |
| Border | `#E5E5E5` | Dividers, card borders |
| Surface | `#FFFFFF` | Cards, overlays |
| Background | `#F1F6FF` | Page background |
| Success | `#34C759` | Success states |
| Warning | `#FF9500` | Warning states |
| Error | `#FF3B30` | Error states |
| Info | `#5AC8FA` | Info states |

### Typography

| Level | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| Display | 48rpx | 700 | 1.2 | Empty state titles |
| H1 | 36rpx | 700 | 1.3 | Page titles |
| H2 | 32rpx | 600 | 1.4 | Section titles |
| H3 | 28rpx | 600 | 1.4 | Card titles |
| Body | 28rpx | 400 | 1.6 | Body text |
| Caption | 24rpx | 400 | 1.5 | Helper text, timestamps |
| Small | 20rpx | 400 | 1.4 | Tags, badges |

Font stack: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`

### Spacing

| Token | Value | Usage |
|-------|-------|-------|
| space-1 | 8rpx | Tight gaps |
| space-2 | 16rpx | Small padding |
| space-3 | 24rpx | Standard padding |
| space-4 | 32rpx | Section gaps |
| space-5 | 48rpx | Large gaps |
| space-6 | 64rpx | Page margins |

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| radius-sm | 8rpx | Small buttons, inputs |
| radius-md | 12rpx | Buttons, cards |
| radius-lg | 16rpx | Cards, dialogs |
| radius-xl | 24rpx | Bottom sheets |
| radius-full | 9999rpx | Pills, avatars |

### Shadows

| Level | Value | Usage |
|-------|-------|-------|
| Elevation-1 | `0 2rpx 8rpx rgba(0,0,0,0.06)` | Subtle lift |
| Elevation-2 | `0 4rpx 16rpx rgba(0,0,0,0.08)` | Cards |
| Elevation-3 | `0 8rpx 24rpx rgba(0,0,0,0.10)` | Dialogs |

---

## Animation Tokens

| Type | Duration | Easing |
|------|----------|--------|
| Micro | 150ms | ease-out |
| Transition | 250ms | ease-in-out |
| Dialog In | 200ms | ease-out |
| Dialog Out | 150ms | ease-in |

---

## Component Patterns

### Button
- Primary: bg `#4670E7`, text white, h 88rpx, radius 12rpx
- Secondary: transparent, border 1rpx `#4670E7`, text `#4670E7`
- Text: transparent, text `#4670E7`
- Disabled: opacity 0.5 or bg `#B8C8F5`

### Card
- bg white, radius 16rpx, padding 24-32rpx
- Shadow Elevation-2
- Use consistent internal spacing (multiples of 8rpx)

### Input
- h 88rpx, bg `#F5F7FA`, radius 12rpx
- Focus: border 2rpx `#4670E7`
- Placeholder: `#999999`

### NavBar
- bg `#4670E7`, dynamic height
- Title: white, 28rpx, centered
- Back icon: white

---

## Platform Rules

- Base unit: rpx (responsive pixel)
- Design width: 750rpx
- Min touch target: 44rpx × 44rpx
- Min body text: 24rpx
- Safe area top: `app.globalData.navHeight`
- Safe area bottom: 34rpx for notch devices
- No horizontal scroll (except tables)
- Respect system gestures

---

## Anti-Patterns

- No emojis as icons (use iconfont/SVG)
- No hardcoded colors (use tokens)
- No px unit (use rpx)
- No text smaller than 20rpx
- No button shorter than 72rpx
- No animation longer than 500ms
- No blocking system back gesture
