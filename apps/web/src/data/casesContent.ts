const publicBase = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");

const showcaseAsset = (file: string) =>
  `${publicBase}/showcase/lingxi-museum/assets/${file}`;

export type CaseTheme =
  | "馆藏纹样衍生"
  | "器型复刻"
  | "品牌联名"
  | "研学教育"
  | "展陈互动"
  | "科技馆/航天";

export type CaseMaterial =
  | "树脂"
  | "PLA（FDM）"
  | "尼龙（SLS/MJF）"
  | "金属（可选）"
  | "数字资产（GLB/USDZ）";

export type CaseProcess =
  | "SLA/DLP（高细节）"
  | "FDM（快速打样）"
  | "SLS/MJF（强度与复杂结构）"
  | "后处理/电镀（质感提升）"
  | "GLB/AR 展示（展品化叙事）";

export type CaseLicenseStatus = "已授权" | "授权中" | "需确权" | "公共领域/CC0";

export type CaseSection = {
  title: string;
  desc?: string;
  bullets?: string[];
  image?: { src: string; alt: string };
};

export type CaseContent = {
  slug: string;
  title: string;
  summary: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  theme: CaseTheme;
  material: CaseMaterial;
  process: CaseProcess;
  licenseStatus: CaseLicenseStatus;
  coverImage: { src: string; alt: string };
  ogImage?: string;
  keywords: string[];
  highlights: string[];
  deliverables: string[];
  sections: CaseSection[];
  gallery?: { src: string; alt: string }[];
  related3dModelIds?: string[];
};

export const cases: CaseContent[] = [
  {
    slug: "pattern-magnet-series",
    title: "馆藏纹样冰箱贴系列：从纹样提取到可打印量产",
    summary:
      "以馆藏纹样为核心，快速产出一组风格统一、尺寸可控、可复用模板驱动的冰箱贴/徽章 SKU，并把“可制造约束”前置到生成链路。",
    seoTitle: "案例｜馆藏纹样冰箱贴系列可打印量产方案",
    seoDescription:
      "从纹样提取到可制造优化的完整路径：输出 GLB 评审资产与 STL 制造文件，降低试打失败率并支持系列化上新。",
    seoKeywords: ["纹样提取", "冰箱贴量产", "徽章", "print-ready"],
    theme: "馆藏纹样衍生",
    material: "树脂",
    process: "SLA/DLP（高细节）",
    licenseStatus: "已授权",
    coverImage: {
      src: showcaseAsset("s14-2.png"),
      alt: "馆藏纹样衍生案例 · 冰箱贴系列",
    },
    keywords: [
      "馆藏纹样",
      "冰箱贴",
      "徽章",
      "树脂打印",
      "SLA",
      "可制造优化",
      "网格修复",
      "IP 合规",
    ],
    highlights: [
      "将纹样抽象为“可复用纹样组件”，统一风格与比例",
      "小体量 SKU 优先，降低试打样失败率与返工成本",
      "交付包同时覆盖展示（GLB）与制造（STL/切片建议）",
    ],
    deliverables: ["GLB 展示页（封面/标签/讲述要点）", "STL（制造）+ 壁厚/支撑建议", "SKU 模板与参数记录（便于规模化上新）"],
    sections: [
      {
        title: "背景与目标",
        desc:
          "纹样类产品容易“好看但难卖”：尺寸不可控、细节易糊、背面结构不稳、批量生产返工高。目标是把纹样做成可复制的 SKU 模板，稳定出品并支持系列化上新。",
        image: { src: showcaseAsset("s06-2.png"), alt: "三大痛点与解决路径示意" },
      },
      {
        title: "解决方案（生成—可制造—履约）",
        bullets: [
          "纹样组件化：提取“主纹/边框/底纹/留白”四层结构，确保缩放后仍清晰",
          "可制造前置：最小厚度、倒角、背面加强筋与磁吸位结构在生成阶段就对齐",
          "版本留档：每个 SKU 固定提示词与参数，减少“同款不一致”",
        ],
        image: { src: showcaseAsset("s11-1.png"), alt: "生成与细节增强链路示意" },
      },
      {
        title: "质量标准与验收口径",
        bullets: [
          "细节特征尺寸达标（纹样不粘连、不糊边）",
          "背面结构稳定、磁吸位/胶位不干涉",
          "打样一次通过率优先，失败原因可追溯",
        ],
        image: { src: showcaseAsset("s12-2.png"), alt: "质量与可制造约束提示" },
      },
    ],
    gallery: [
      { src: showcaseAsset("s02-2.png"), alt: "平台概览图示" },
      { src: showcaseAsset("s09-2.png"), alt: "产品模块示意" },
    ],
  },
  {
    slug: "vessel-aroma-lamp",
    title: "器型复刻香薰灯：器型复刻 × 柔性灯光模块",
    summary:
      "以经典器型为原型，提炼比例与轮廓，结合柔性灯光与可拆装结构，让“文物元素”变成可日用、可批量的灯具/摆件方案。",
    seoTitle: "案例｜器型复刻香薰灯与可拆装结构方案",
    seoDescription:
      "围绕器型识别度、透光结构与装配公差构建可制造流程，完成 FDM 打样验证与可复用器型库沉淀。",
    seoKeywords: ["器型复刻", "香薰灯", "拆件装配", "FDM 打样"],
    theme: "器型复刻",
    material: "PLA（FDM）",
    process: "FDM（快速打样）",
    licenseStatus: "授权中",
    coverImage: {
      src: showcaseAsset("s03-1.png"),
      alt: "器型复刻案例 · 香薰灯方案",
    },
    keywords: ["器型复刻", "香薰灯", "灯具结构", "FDM", "PLA", "拆件", "装配公差", "履约交付"],
    highlights: [
      "先“轮廓”后“细节”：保证器型识别度的同时控制打印难度",
      "结构模块化：灯罩/底座/灯光组件分件，便于维护与补货",
      "工艺友好：面向 FDM 的悬垂控制与支撑策略在设计阶段完成",
    ],
    deliverables: ["结构拆件图与装配说明", "STL（制造）+ 方向/支撑建议", "可替换灯光模组规格建议"],
    sections: [
      {
        title: "用户场景",
        desc:
          "面向馆店与品牌渠道的“日用型文创”：既要有文化识别度，又要满足安全、装配与售后维护的要求。",
        image: { src: showcaseAsset("s05-1.jpeg"), alt: "文创场景示意" },
      },
      {
        title: "结构策略",
        bullets: [
          "灯罩薄壁与透光区域：控制壁厚梯度，避免热变形与透光不均",
          "装配公差与卡扣：在参数中固化，保证批次一致",
          "外观后处理：喷涂/砂纹/金属漆等路线与成本预估",
        ],
        image: { src: showcaseAsset("s10-2.png"), alt: "工艺数据化与结构策略" },
      },
      {
        title: "交付与复用",
        bullets: ["同器型可快速衍生不同纹样与配色", "灯光模组标准化，减少售后复杂度", "形成“器型库”，支撑系列化上新"],
        image: { src: showcaseAsset("s25-1.png"), alt: "规模化与未来规划示意" },
      },
    ],
    gallery: [
      { src: showcaseAsset("s02-1.png"), alt: "全链路赋能平台示意" },
      { src: showcaseAsset("s09-1.png"), alt: "产品介绍示意" },
    ],
  },
  {
    slug: "seal-jewelry-badge",
    title: "印章纹样饰品/徽章：小体量高细节的“可卖”方案",
    summary:
      "将印章/铭文类纹样做成可佩戴、可收藏的饰品与徽章，把高细节与质感作为卖点，并通过后处理路线控制成本与交期。",
    seoTitle: "案例｜印章纹样饰品与徽章的高细节交付方案",
    seoDescription:
      "以树脂原型验证细节后进入电镀/后处理路线，建立质感验收标准与包装讲述模板，支持品牌联名上新。",
    seoKeywords: ["印章纹样", "饰品徽章", "后处理", "电镀质感"],
    theme: "品牌联名",
    material: "金属（可选）",
    process: "后处理/电镀（质感提升）",
    licenseStatus: "已授权",
    coverImage: {
      src: showcaseAsset("s15-2.png"),
      alt: "品牌联名案例 · 饰品与徽章方案",
    },
    keywords: ["印章纹样", "饰品", "徽章", "电镀", "金属质感", "树脂原型", "批量交付", "品牌联名"],
    highlights: [
      "以“质感”为核心指标：边缘清晰、反光层次、手感重量",
      "先树脂原型验证，再走电镀/金属路线降低风险",
      "包装与讲述要点一并交付，适配线上传播与线下陈列",
    ],
    deliverables: ["树脂原型（打样）与外观验收标准", "后处理路线与成本梯度（电镀/喷涂/做旧）", "包装与讲述文案（上架可用）"],
    sections: [
      {
        title: "为什么选这个品类",
        desc:
          "小体量、高客单、可讲故事，是文博与品牌联名常见的“高转化品类”。关键是把细节、边缘与表面质感做稳定。",
        image: { src: showcaseAsset("s04-1.png"), alt: "市场规模与用户结构示意" },
      },
      {
        title: "质感路线（从低风险到高溢价）",
        bullets: [
          "树脂高细节：适合小批量与快速试错",
          "喷涂/金属漆：成本可控，外观接近金属",
          "电镀/金属工艺（可选）：收藏级质感，但需要更严的结构与公差控制",
        ],
        image: { src: showcaseAsset("s12-1.png"), alt: "智能产品创新与工艺结合示意" },
      },
      {
        title: "合规与授权",
        bullets: ["授权范围明确到“图样/衍生形态/销售渠道”", "版本留档与下架机制完善", "对外页面标注授权信息与合作口径"],
        image: { src: showcaseAsset("s13-1.png"), alt: "合作与合规流程示意" },
      },
    ],
    gallery: [
      { src: showcaseAsset("s01-2.png"), alt: "项目封面元素示意" },
      { src: showcaseAsset("s17-2.png"), alt: "订阅与履约模式示意" },
    ],
  },
  {
    slug: "education-assembly-kit",
    title: "研学套件：可拆装结构模型与课堂讲述模板",
    summary:
      "把“隔窗观物”变成“动手理解”：提供可拆装结构模型、讲述脚本与课堂活动卡，支持馆校合作与普惠教育项目。",
    seoTitle: "案例｜研学可拆装结构模型与课堂讲述套件",
    seoDescription:
      "围绕高频教学场景完成结构强度与安全边界设计，配套讲述脚本与活动卡，支持馆校合作与课程复用。",
    seoKeywords: ["研学套件", "结构模型", "课堂讲述", "馆校合作"],
    theme: "研学教育",
    material: "尼龙（SLS/MJF）",
    process: "SLS/MJF（强度与复杂结构）",
    licenseStatus: "需确权",
    coverImage: {
      src: showcaseAsset("s24-2.png"),
      alt: "研学教育案例 · 结构模型与讲述模板",
    },
    keywords: ["研学套件", "可拆装模型", "教育普惠", "SLS", "尼龙", "讲述脚本", "展教融合"],
    highlights: [
      "把知识点拆成“结构模块”，孩子看得见也摸得着",
      "强度与耐用优先：面向高频使用的教育场景",
      "内容与模型同步交付：讲述脚本、活动卡与安全提示可复用",
    ],
    deliverables: ["可拆装结构模型（多件）", "课堂讲述脚本与活动卡（可打印）", "耐用性与安全边界说明"],
    sections: [
      {
        title: "教育目标",
        bullets: [
          "把文物结构与工艺做成可理解的“模块化课程”",
          "支持馆校合作：校内课程/寒暑假研学/馆内活动",
          "兼顾成本与耐用：高频使用不易损",
        ],
        image: { src: showcaseAsset("s03-2.png"), alt: "触觉体验与文化共鸣示意" },
      },
      {
        title: "套件结构",
        bullets: ["可拆装结构（卡扣/定位销）", "关键纹样与结构点加粗/放大，避免磨损", "配套“讲述顺序”与互动问题设计"],
        image: { src: showcaseAsset("s08-1.png"), alt: "项目历程与教育场景示意" },
      },
      {
        title: "交付标准",
        bullets: ["边缘倒角与安全处理", "材料路线与强度验证", "可替换易损件与补货策略"],
        image: { src: showcaseAsset("s11-2.png"), alt: "细节增强与质量提示示意" },
      },
    ],
    gallery: [
      { src: showcaseAsset("s24-1.png"), alt: "社会价值与公共教育示意" },
      { src: showcaseAsset("s25-2.png"), alt: "商业闭环与全链提效示意" },
    ],
  },
  {
    slug: "interactive-exhibit-page-ar",
    title: "展陈互动：3D 展品页 + AR 导览入口（GLB/USDZ）",
    summary:
      "把 3D 资产从“文件”升级为“展品页”：可交互预览、可讲述要点、可传播分享，并可扩展 AR 导览入口，适配馆内屏幕与移动端。",
    seoTitle: "案例｜GLB 展品页与 AR 导览入口建设",
    seoDescription:
      "通过展品化叙事模板将 3D 模型转化为可讲述内容，统一评审与传播口径，并预留 USDZ/AR 扩展能力。",
    seoKeywords: ["GLB 展品页", "AR 导览", "展陈互动", "内容结构化"],
    theme: "展陈互动",
    material: "数字资产（GLB/USDZ）",
    process: "GLB/AR 展示（展品化叙事）",
    licenseStatus: "需确权",
    coverImage: {
      src: showcaseAsset("s09-1.png"),
      alt: "展陈互动案例 · 展品化叙事与 3D 展品页",
    },
    keywords: ["3D 展品页", "GLB", "glTF", "USDZ", "AR 导览", "展陈互动", "内容结构化", "SEO"],
    highlights: [
      "统一评审口径：GLB 在线预览减少沟通偏差",
      "对外可讲述：每件展品都有结构化要点与注意事项",
      "可扩展：移动端 AR、展厅大屏与社交分享模板",
    ],
    deliverables: ["展品页模板（封面/标签/讲述要点）", "GLB（展示）+ 版本留档", "可扩展 AR（USDZ）接口位"],
    sections: [
      {
        title: "为什么需要“展品化叙事”",
        desc:
          "很多项目卡在“有模型但讲不清”：缺少结构化信息、缺少可复用的讲述模板，也缺少对外传播的落点。展品页把内容与资产绑定，既服务馆内，也服务营销。",
        image: { src: showcaseAsset("s06-1.png"), alt: "痛点解析与解决路径示意" },
      },
      {
        title: "展品页内容结构（建议）",
        bullets: [
          "一句话概览（是什么/为什么重要）",
          "三条讲述要点（结构/纹样/工艺）",
          "交互提示（可旋转/可拆件/注意事项）",
          "授权与来源（可公开范围）",
        ],
        image: { src: showcaseAsset("s15-1.png"), alt: "差异化定位与对外表达示意" },
      },
      {
        title: "落地路径",
        bullets: ["先上线展品库（GLB）做评审与传播", "再补齐制造交付（STL/质检）形成闭环", "积累模板库，持续更新内容体系"],
        image: { src: showcaseAsset("s25-1.png"), alt: "迭代与规模化路径示意" },
      },
    ],
    related3dModelIds: ["nasa-apollo-lunar-module", "nasa-iss-a"],
  },
  {
    slug: "space-museum-pop-up",
    title: "科技馆航天主题快闪：互动 3D + 打印纪念品联动",
    summary:
      "以公共领域航天资产做“互动展示 + 快速打样 + 纪念品联动”，把展陈热度转化为可交付的产品与内容，适配快闪、研学与科普活动。",
    seoTitle: "案例｜科技馆航天快闪的互动展陈与纪念品联动",
    seoDescription:
      "基于公共领域资产快速搭建展品页与纪念品 SKU，打通线上讲述、线下互动与小批量履约补货流程。",
    seoKeywords: ["航天快闪", "互动展陈", "纪念品联动", "公共领域资产"],
    theme: "科技馆/航天",
    material: "树脂",
    process: "SLA/DLP（高细节）",
    licenseStatus: "公共领域/CC0",
    coverImage: {
      src: showcaseAsset("s10-1.png"),
      alt: "科技馆航天主题案例 · 互动 3D 与打印纪念品",
    },
    keywords: ["科技馆", "航天主题", "快闪活动", "互动 3D", "树脂打印", "公共领域", "展陈转化", "周边产品"],
    highlights: [
      "用 Public Domain 资产快速验证“展陈互动”与“产品化”流程",
      "把模型输出成展品页与讲述脚本，适配活动现场讲解",
      "纪念品选择小体量 SKU，快节奏补货更可控",
    ],
    deliverables: ["活动展品页与讲述脚本", "纪念品 SKU（STL + 切片建议）", "现场物料（海报/说明卡）结构化模板"],
    sections: [
      {
        title: "活动目标",
        bullets: ["吸引停留：互动 3D 展示提升参与度", "快速转化：纪念品小批量试产", "可复用：活动结束后沉淀为长期展品与线上内容"],
        image: { src: showcaseAsset("s24-1.png"), alt: "技术示范与社会引领示意" },
      },
      {
        title: "联动设计",
        bullets: ["同一主题模型复用到“展品页/海报/纪念品”", "线上引流到 3D 展品库，线下扫码即看", "纪念品按工艺分级：树脂高细节/PLA 低成本"],
        image: { src: showcaseAsset("s17-1.png"), alt: "商业模式与履约链路示意" },
      },
    ],
    related3dModelIds: ["nasa-mars2020-perseverance", "nasa-jwst-a"],
  },
];

export const getCaseBySlug = (slug: string) =>
  cases.find((item) => item.slug === slug);

export const getCaseSeoMeta = (slug: string) => {
  const item = getCaseBySlug(slug);
  if (!item) return null;

  const title = item.seoTitle || `案例｜${item.title}`;
  const description = item.seoDescription || item.summary;
  const keywords = [
    "Lingxi Forge",
    "灵犀造物",
    "博物馆文创",
    "AI 3D",
    "3D 打印",
    item.theme,
    item.material,
    item.process,
    item.licenseStatus,
    ...(item.seoKeywords || []),
    ...item.keywords,
  ]
    .filter(Boolean)
    .join(",");

  return {
    title,
    description,
    keywords,
    ogImage: item.ogImage || item.coverImage.src,
  };
};
