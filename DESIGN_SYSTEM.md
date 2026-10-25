# Lingxi Forge（灵犀造物）官网设计系统（UI/UX Pro Max）

> 目标：做“更像大厂”的中文官网 Landing，不走 Element Plus 默认后台风格。  
> 关键词：低饱和、玻璃质感、层级清晰、可读性优先、暗黑模式同样精致、无障碍可达。

## 1) 颜色体系（Light / Dark）

### 1.1 语义色（必须固定语义，避免随意换色）

| Token | Light | Dark | 用途 |
|---|---|---|---|
| Primary / CTA | `#4F8CFF` | `#7CB5FF` | 主按钮、重点链接、关键高亮 |
| Secondary | `#2563EB` | `#7CB5FF` | 次级强调、激活态文字 |
| Success | `#10B981` | `#34D399` | 成功状态、正向提示 |
| Text-1 | `#0F172A` | `#E2E8F0` | 标题、正文主文案 |
| Text-2 | `#334155` | `#A1A1AA` | 正文/说明、辅助信息 |
| Text-3 | `#2563EB` | `#7CB5FF` | 链接、可交互强调 |
| Text-4 | `#64748B` | `#94A3B8` | 备注、弱化信息 |
| Border (base) | `#94A3B8`（透明度使用） | `#94A3B8`（透明度使用） | 玻璃边框、分割线基色 |

### 1.2 背景与玻璃（决定“高级感”的关键）

| Token | Light | Dark | 用途 |
|---|---|---|---|
| Page Background | `#F6F9FF → #EEF2FF → #F8FAFF` | `#1E293B → #0B1020 → #060914` | 页面整体氛围渐变 |
| Glass Surface | `rgba(255,255,255,0.55)` | `rgba(15,23,42,0.55)` | 卡片、导航、轻容器 |
| Glass Strong | `rgba(255,255,255,0.85)` | `rgba(15,23,42,0.75)` | 关键卡片、抽屉/弹层 |
| Glass Border | `rgba(255,255,255,0.6)` | `rgba(148,163,184,0.22)` | 玻璃边界 |
| Accent Soft BG | `rgba(79,140,255,0.14)` | `rgba(124,181,255,0.18)` | hover/active 软高亮 |
| Accent Glow | `rgba(79,140,255,0.35)` | `rgba(124,181,255,0.35)` | CTA 光晕（谨慎使用） |
| Focus Ring | `rgba(79,140,255,0.45)` | `rgba(124,181,255,0.55)` | 键盘焦点可见 |

实现位置：
- `src/styles/tokens.scss`（主题 token + CSS variables 生成）
- `src/styles/global.scss`（背景氛围 + focus ring）

## 2) 字体与排版（中文优先）

### 2.1 字体栈

- Display / Body：`PingFang SC` / `Microsoft YaHei` / `Noto Sans CJK SC` / `system-ui`

> 不强制依赖外链字体；优先使用系统中文字体保证加载与清晰度。

### 2.2 字重

- H1/H2：`800–900`（强调可信与高级感）
- H3：`700–800`
- 正文：`400–600`

### 2.3 字号尺度（建议）

- H1：`32–44`（`clamp` 响应式）
- H2：`20–24`
- H3：`16–18`
- 正文：`14–15`
- 备注/标签：`12–13`

## 3) 栅格与间距

### 3.1 容器与断点

- 内容容器：`min(1180px, 92%)`
- 断点：`<= 980px`（平板/手机合并为单列，减少横向噪音）

### 3.2 间距尺度（8pt 思路）

- `4/8/12/16/24/32/40/56/72`

### 3.3 圆角

- `10/14/18/24`
- Tag/按钮：`999px`（胶囊形）

## 4) 组件规范（基于 Element Plus，但不“后台味”）

> 原则：Element Plus 只提供交互与可用性，视觉风格由 token + overrides 控制。

### 4.1 Button（按钮）

- 形状：胶囊
- Hover：轻上浮 `-1px` + 软高亮环
- Primary：额外 soft glow（避免重阴影）

实现位置：`src/styles/element-overrides.scss`

### 4.2 Card（卡片）

- 默认：Glass Strong（主信息容器）
- 次级：Glass Surface（列表/提示/辅助块）
- 禁止：厚重多层阴影、硬边框

### 4.3 Navigation（导航）

- 顶部导航：玻璃胶囊容器，激活态用 `accent-soft-bg`
- 移动端：抽屉（ttb）+ 快速导航按钮

### 4.4 Tag（标签）

- 胶囊 + 玻璃底 + 轻边框

### 4.5 Input / Select（输入）

- 玻璃底 + focus ring
- 禁止：默认浅灰输入框（“后台味”）

### 4.6 Collapse（折叠面板）

- Header：Glass Surface
- Content：Glass Strong

### 4.7 Dialog / Drawer（弹窗/抽屉）

- 面板：Glass Strong
- 遮罩：暗色半透明（暗黑模式要更深，避免“雾蒙蒙”）

## 5) 动效（克制但高级）

- 时长：`120ms / 180ms / 260ms`
- 缓动：
  - `ease-out`: `cubic-bezier(0.16, 1, 0.3, 1)`（hover/弹性）
  - `ease-in-out`: `cubic-bezier(0.65, 0, 0.35, 1)`（状态切换）
- 支持：`prefers-reduced-motion`

## 6) Anti-patterns（明确禁止）

- 高饱和霓虹 + 强对比赛博朋克（不适合文博可信感）
- AI 紫粉渐变作为品牌底色（廉价“AI感”）
- 过度阴影（厚重、脏、信息层级混乱）
- 对比不足（玻璃+灰字导致不可读）
- 无 focus ring（键盘用户不可用）
- 默认后台灰蓝（Element Plus 原生面板风格直接套用）

## 7) 无障碍（可达性清单）

- 键盘可达：含 “跳到正文” Skip Link
- `:focus-visible` 统一 focus ring
- 语义化结构：`header/nav/main/section/footer`
- ARIA：导航、区块标题绑定（`aria-label` / `aria-labelledby`）
- 动效可降级：`prefers-reduced-motion`
- 对比度：暗黑模式优先保证正文可读

## 8) 与代码的映射（你要改哪里）

- Tokens：`src/styles/tokens.scss`
- 全局样式（focus ring、背景氛围、占位容器）：`src/styles/global.scss`
- Element Plus 覆写：`src/styles/element-overrides.scss`
- 主题状态：`src/stores/modules/theme.ts`
- Landing 导航状态：`src/stores/modules/nav.ts`
- Landing 单页：`src/views/landing/index.vue` + `src/views/landing/components/*`
