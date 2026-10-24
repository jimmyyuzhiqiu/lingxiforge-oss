# Lingxi Forge（前端 + FastAPI 后端）

Lingxi Forge 是一个面向 **博物馆文创与品牌合作** 的 AI + 3D 生成与打印履约展示项目，包含公开官网、演示控制台与 FastAPI API 原型。仓库不包含 Hunyuan3D 模型权重或 GPU 推理服务；如需启用模型生成，请自行部署兼容服务并配置 `HY3D_BASE_URL`。

## 项目作者与维护者

- **项目作者 / 主要维护者：** [@jimmyyuzhiqiu](https://github.com/jimmyyuzhiqiu)

## 技术栈

- Vue 3 + Vite + TypeScript
- Pinia
- Element Plus
- Axios
- Sass
- FastAPI（后端）

## 站点信息架构（网页构成总览）

### 1) 全站通用模块

- 顶部导航：公开页与登录后区域的导航组件（玻璃质感、响应式）
- 主题切换：浅色/深色玻璃质感主题（Pinia `theme`）
- 全站 Footer：产品/资源/信任/联系分组 + 联系邮箱

### 1.1 全站 UI 层级约定（层次/容器）

- 页面层级：`page` → `header` → `main` → `section` → `card`
- 视觉层级（建议）：`glass-card`（一级容器） > `glass-surface`（二级容器） > `chips/tag`（微元素）
- 内容层级：`H1`（页面主标题）→ `H2`（区块标题）→ `H3`（卡片标题）→ `正文/说明`
- 入口 CTA 优先级：`Primary`（申请/提交/关键行为）→ `Plain`（次要入口）→ `Text`（补充入口）

### 2) 首页结构（`/`，公开）

首页为 **Landing 单页**（全中文官网），入口文件：`src/views/landing/index.vue`。

页面组件拆分（对应 `src/views/landing/components/*`）：

- `TopNav`：顶部导航（CTA：申请演示 / 获取合作方案；含主题切换与移动端抽屉菜单）
- `HeroSection`：首屏（主标题：让深藏的文明，在指尖重现；副标题：AI设计×超高速3D打印×柔性供应链）
- `PainPointsSection`：痛点区（视域受限 / 成本高昂 / 建模门槛）
- `SolutionsSection`：方案区（IP 挖掘 / AI 驱动设计 / 智能产品创新 / 全域营销）
- `ProcessSection`：技术流程（timeline + “交付包”结构说明）
- `MetricsSection`：成果数据（关键指标 + 三大能力支柱）
- `CooperationSection`：合作模式（按角色分工：馆方/品牌/制造/教育）
- `FaqSection`：FAQ（折叠面板）
- `LandingFooter`：页脚（产品/内容/合规/联系 + 法务链接）

说明：
- 首页图片均使用本地素材（`public/stock/photos/*`），并在 `public/stock/CREDITS.md` 记录来源与许可（不使用外链图片）。
- 导航高亮通过 Pinia `nav` + IntersectionObserver 自动跟随当前区块。
- 首页区块间距由 `src/views/landing/index.vue` 统一控制，避免各组件自带 margin 导致层级混乱。

#### 2.1 首页详细层级说明（每个区块结构）

- `TopNav`
  - 品牌标识 + 快速导航
  - CTA：`申请演示` / `获取合作方案` / `3D 展品库`
- `HeroSection`
  - H1 主标题
  - 副标题与能力摘要
  - CTA 按钮组
  - 右侧主视觉 + 交付说明
- `PainPointsSection`
  - H2 区块标题 + 描述
  - 3 卡痛点（每卡：图 / 标题 / 描述 / 列表）
- `SolutionsSection`
  - H2 区块标题 + 描述
  - 4 卡解决方案（图 / 标题 / 描述 / 要点）
- `ProcessSection`
  - H2 区块标题 + 描述
  - 左侧流程（timeline）
  - 右侧交付包说明 + 图
- `ThreeDShowcaseSection`
  - H2 区块标题 + 描述 + CTA
  - 3×2 模型卡（缩略图 / 标签 / 简述 / 预览入口）
- `MetricsSection`
  - H2 区块标题 + 描述
  - 关键指标卡（4 组）
  - 三大能力卡（3 组）
- `CooperationSection`
  - H2 区块标题 + 描述
  - 角色切换（左侧 tab）
  - 右侧详情：主图 / 目标 / 适用对象 / 关键交付 / 下一步
- `FaqSection`
  - H2 区块标题 + 描述
  - 折叠问答（accordion）
- `LandingFooter`
  - 产品/内容/合规/联系分组
  - 法务入口（cookie/可访问性）

### 3) 公开营销页（无需登录）

- `/product`：产品页（能力栈 + 核心流程 + Print-ready 清单 + CTA）
- `/workflow`：工作流（从生成到可交付的分步说明）
- `/showcase`：方案展示（精选关键图示 + 产品化叙事卡片）
- `/cases`：案例列表（可筛选：主题/材质/工艺/授权状态）
- `/cases/:slug`：案例详情页（每个案例独立 SEO）
- `/gallery`：3D 展品库（GLB 在线预览与交互展示）
- `/materials`：材料与质量（树脂/PLA/尼龙路线 + 质量检查清单）
- `/partners`：合作伙伴入口（按角色分流）
- `/resources`：资源中心（模板/指南/合规/更新订阅）
- `/newsroom`：新闻中心（公告/新闻稿/媒体资料）
- `/trust`：信任与安全（安全/合规/隐私/责任披露）
- `/ip`：IP 合规与授权
- `/about`：关于我们（使命、优势、能力与关键数据）
- `/apply`：合作申请（多步骤表单：角色分流、参考图上传、授权确认、规模/周期）
- `/contact`：联系我们（按任务分流）
- `/Pricing`：订阅方案
- `/FAQs`：常见问题
- `/search`：站内搜索（前端静态索引）
- `/details`：更完整的产品/市场/路线图详情页
- 法务页：`/privacy`、`/terms`、`/cookies`、`/accessibility`

#### 3.1 公开营销页详细层级（按页面）

- `/product`（`src/views/marketing/product.vue`）
  - Hero：产品主张 + CTA
  - 核心能力：生成 / 可制造 / 履约
  - Print-ready 清单（复用 `printReadyChecklist`）
  - 材质建议（复用 `materials`）
- `/workflow`（`src/views/marketing/workflow.vue`）
  - Hero：流程概览 + CTA
  - 六阶段流程卡（输入 → 生成 → 优化 → 打样 → 交付 → 复用）
  - 交付视角（四卡）
  - Bottom CTA
- `/showcase`（`src/views/marketing/showcase.vue`）
  - 方案总览
  - 内容叙事卡片（来自 `public/showcase/lingxi-museum/story.json`）
  - 关键图示与要点
- `/cases`（`src/views/marketing/cases/index.vue`）
  - Hero（案例价值说明）
  - 筛选区（主题/材质/工艺/授权状态）
  - 案例列表（卡片）
- `/cases/:slug`（`src/views/marketing/cases/detail.vue`）
  - Hero（案例简介 + 标签）
  - 方案要点
  - 案例拆解（分段卡片）
  - 图示精选
  - 相关 3D 展品（可选）
  - Bottom CTA
- `/gallery`（`src/views/marketing/gallery.vue`）
  - GLB 预览区
  - 模型列表（含标签/来源/许可）
  - 支持 `?id=` 预选模型
- `/materials`（`src/views/marketing/materials.vue`）
  - 材质路线
  - Print-ready 检查清单
  - 注意事项与工艺建议
- `/partners`（`src/views/marketing/partners.vue`）
  - 角色分流入口
  - 合作路径说明
- `/resources`（`src/views/marketing/resources.vue`）
  - 资源卡片列表
  - 更新订阅入口
- `/newsroom`（`src/views/marketing/newsroom.vue`）
  - 新闻/公告列表
  - 媒体资料包
- `/trust`（`src/views/marketing/trust.vue`）
  - 安全与合规说明
  - Print-ready 标准
  - 负责披露入口
- `/ip`（`src/views/marketing/ip.vue`）
  - IP 授权边界
  - 溯源留档
  - 下架/投诉流程
- `/about`（`src/views/marketing/about.vue`）
  - 使命/差异化
  - 模块化能力
  - 资质与合规
  - 交付标准
  - 时间线
- `/apply`（`src/views/marketing/apply.vue`）
  - 角色分流
  - 参考图上传
  - 授权/合规确认
  - 需求规模与交付周期
  - 联系方式
- `/contact`（`src/views/marketing/contact.vue`）
  - 渠道分流入口
  - 联系方式汇总
- `/Pricing`（`src/views/marketing/pricing.vue`）
  - 订阅方案对比
  - 适用人群与 CTA
- `/FAQs`（`src/views/marketing/faqs.vue`）
  - 常见问题列表（折叠）
- `/search`（`src/views/marketing/search.vue`）
  - 站内搜索输入
  - 静态索引结果
- `/details`（`src/views/details/details.vue`）
  - 核心技术、市场、商业模式、团队与路线图
- 法务页（`src/views/marketing/legal/*`）
  - 可访问性 / 隐私 / 服务条款 / Cookie 说明

### 4) 登录/注册与控制台（登录后）

- `/login`、`/register`：账号入口（前端 Demo 逻辑）
- `/home/home`：控制台首页（工作台概览）
- `/home/ideas/*`：创意灵感分区（趋势/热门/新闻/收藏/创作者）
- `/home/activity`：活动与动态
- `/home/usercenter`：用户中心
- `/home/docs`：文档中心
- `/home/settings`：设置
- `/workbench/Text-To-Img`：文生图
- `/workbench/Text-To-3D`：文生 3D
- `/workbench/3D-Printing`：3D 打印

#### 4.1 控制台层级说明（简要）

- `/home/home`：概览 + 快速入口 + 最近生成/打印
- `/home/ideas/*`：灵感分区（趋势/热门/最新/喜欢/创作者）
- `/workbench/*`：生成/打印核心流程（文生图/文生 3D/打印履约）

## 内容与数据组织（页面内容从哪里来）

- `src/data/siteContent.ts`：首页与核心页面的指标、亮点、流程、FAQ、行业数据等
- `src/data/marketingContent.ts`：材料路线、资源中心、新闻中心、联系方式等内容块
- `src/data/casesContent.ts`：案例列表与案例详情内容（筛选维度 + SEO 关键词）
- `public/showcase/lingxi-museum/story.json`：方案展示结构化内容
- `public/showcase/lingxi-museum/assets/*`：方案展示图片资源
- `public/stock/photos/*`：公开站点图片素材（需遵守 `public/stock/CREDITS.md` 许可与来源）
- `src/assets/images/*`：打包进前端的 UI 图片资源
- `src/views/landing/*`：Landing 单页内容与组件（全中文官网）

> 说明：`素材内容/` 仅用于内部内容整理参考，站点只使用结构化内容与导出的图片资源，不提供源文件下载或直出。

## SEO 与站内搜索

- SEO 元信息：`src/router/routes.ts` 为各路由配置 `title/description/keywords/ogImage`
- 案例详情动态 SEO：`src/router/index.ts` 根据 `:slug` 覆写 `title/description/keywords/og:image`
- 站内搜索：`/search` 使用前端静态索引（可扩展后端搜索）
- 静态 SEO 文件：`public/sitemap.xml`、`public/robots.txt`、`public/og-cover.svg`

## 账号与登录（当前为前端 Demo）

当前登录/注册逻辑仍是 **仅用于演示的前端本地逻辑**。演示账号仅保存在当前浏览器，密码使用 PBKDF2 派生值保存，不再写入明文，也不再创建硬编码管理员账号。但这不是真实身份认证：浏览器端逻辑可以被绕过，不能用于保护真实数据或生产权限。

- 账号逻辑：`apps/web/src/utils/auth.ts`
- 安全限制与发布前注意事项：[`SECURITY.md`](./SECURITY.md)
- 后端密码哈希已使用带独立随机盐的 PBKDF2；启动 API 必须配置唯一的 `LINGXIFORGE_AUTH_SALT`，用于兼容升级旧数据库中的密码记录。

## 本地开发

先启动后端（macOS/Linux 示例；保留本地数据库时，请在后续启动中继续使用同一个 AUTH_SALT）：

```bash
cd apps/api
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
# 先执行 openssl rand -hex 32 生成值，再将结果粘贴到下一行，并在该开发环境中保持不变
export LINGXIFORGE_AUTH_SALT="paste-your-generated-random-value-here"
export LINGXIFORGE_DB_PATH="$PWD/lingxiforge.db"
export LINGXIFORGE_UPLOAD_DIR="$PWD/uploads"
uvicorn main:app --reload --port 8000
```

另开终端启动前端：

```bash
cd apps/web
npm ci
npm run dev
```

前端默认请求 `/lingxiforge/*`；本地 `vite` 已配置将 `/lingxiforge` 代理到 `http://localhost:8000`。本地 API 使用的 AUTH_SALT 应作为该开发环境的固定配置保存，不要提交到仓库。

构建与本地预览（在 apps/web 目录中执行）：

```bash
npm run build
npm run preview
```

## 内容素材提炼（结构化展示）

将参考资料中的 **图片素材 + 关键文案要点** 提炼为前端可用的结构化数据：

```bash
python3 scripts/export_ppt_story.py /path/to/source.pptx --out public/showcase --slug your-project
```

输出目录：

- `public/showcase/lingxi-museum/story.json`
- `public/showcase/lingxi-museum/assets/*`

默认行为：

- 会清理旧的导出物（避免残留/误暴露）
- 默认排除敏感/团队/结尾页（可通过脚本参数调整）

## Docker 一键部署

### Mac 本地（前端 + 后端，不跑 GPU 模型）

```bash
cp .env.example .env
# 编辑 .env，将 LINGXIFORGE_AUTH_SALT 设置为唯一随机值；可用 openssl rand -hex 32 生成
# 再执行：
docker compose up -d --build
```

访问：

```
http://localhost:8080
```

### 外部 3D 模型服务

本仓库不打包 GPU 模型服务或模型权重。需要生成模型时，请单独部署兼容的推理 API，并在 `.env` 中设置 `HY3D_BASE_URL`。部署前请阅读 [`DEPLOYMENT.md`](./DEPLOYMENT.md) 与 [`SECURITY.md`](./SECURITY.md)。

停止：

```bash
docker compose down
```

## 项目结构

```
src/
  api/            # 接口封装
  assets/         # 静态资源
  components/     # 通用组件
  layout/         # 旧首页/布局组件（保留）
  router/         # 路由 + SEO 元信息
  stores/         # 状态管理
  styles/         # 样式
  utils/          # 工具方法（主题/鉴权/动画等）
  views/          # 页面
    landing/      # 官网 Landing 单页（/）
public/           # 公共静态资源与展示素材
scripts/          # 内容提炼脚本
apps/api/         # FastAPI API 原型（/lingxiforge/*，兼容 /tifa/*）
```

## API 地址

当前接口地址配置在 `src/services/http.ts` 中：
- 默认：`/lingxiforge`（同域，由 Nginx 反向代理到 `lingxiforge-api`）
- 可通过构建时环境变量 `VITE_API_BASE_URL` 覆盖（例如本地直连后端）
- 兼容策略：目前同时挂载 `/tifa/*`；仓库没有自动下线机制，正式部署者需自行规划兼容路径的下线时间。

## 合作申请接口（FastAPI 占位）

- `POST /lingxiforge/leads/upload`：上传参考图（返回 `fileId`，不提供下载直链）
- `POST /lingxiforge/leads`：提交合作申请（返回 `leadId`）

## 设计系统与样式入口（Design Tokens）

- `src/styles/tokens.scss`：设计系统 Token（颜色/字体/间距/圆角/动效等，含主题变量生成 mixin）
- `src/styles/global.scss`：全局样式（CSS reset、背景氛围、focus ring、通用工具类）
- `src/styles/element-overrides.scss`：Element Plus 覆写（按钮/卡片/输入框/折叠面板/弹层等）
- Pinia：`src/stores/modules/theme.ts`（浅/深主题）、`src/stores/modules/nav.ts`（Landing 导航状态）
- 设计系统文档：`DESIGN_SYSTEM.md`（UI/UX Pro Max：Token + 反模式 + 无障碍清单）


## License

The original project source code is licensed under the [MIT License](./LICENSE), copyright © 2026 jimmyyuzhiqiu.

Third-party dependencies and assets are **not automatically relicensed** under MIT. Review their own license terms and the source/credit records in `apps/web/public/stock/CREDITS.md` and `apps/web/public/models/open/CREDITS.md` before reuse. NASA materials must not be presented as NASA endorsement; the Met assets are documented as Open Access/CC0, but each source page should be checked before redistributing a specific asset.
