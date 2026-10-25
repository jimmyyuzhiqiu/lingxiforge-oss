export type ContactChannelKey =
  | "sales"
  | "partners"
  | "support"
  | "media"
  | "security";

export type ContactChannel = {
  key: ContactChannelKey;
  title: string;
  email: string;
  desc: string;
  expectedReply: string;
  topics: string[];
};

export const contactChannels: ContactChannel[] = [
  {
    key: "sales",
    title: "销售咨询",
    email: "sales@lingxiforge.com",
    desc: "适合馆方、品牌方、工作室与团队：咨询方案、价格、试用与落地路径。",
    expectedReply: "建议 1 个工作日内回复（上线后可配置 SLA）。",
    topics: ["产品试用与开通", "订阅与计费", "项目交付与里程碑", "报价与采购流程"],
  },
  {
    key: "partners",
    title: "合作伙伴",
    email: "partners@lingxiforge.com",
    desc: "面向博物馆/IP 方、品牌联名、制造商网络与渠道合作。",
    expectedReply: "建议 2 个工作日内回复（涉及法务/合规可能更久）。",
    topics: ["IP 授权与联名", "共创策展与上新", "工厂/工坊接入", "渠道与履约合作"],
  },
  {
    key: "support",
    title: "技术支持",
    email: "support@lingxiforge.com",
    desc: "模型质量、打印失败排查、文件格式、生成次数与账号问题。",
    expectedReply: "建议 1–2 个工作日内回复（复杂问题需要复现材料）。",
    topics: ["网格修复/非流形", "壁厚/支撑/朝向", "GLB/STL 导出", "账号与订阅问题"],
  },
  {
    key: "media",
    title: "媒体与公关",
    email: "media@lingxiforge.com",
    desc: "媒体采访、资料包、案例授权与对外合作沟通。",
    expectedReply: "建议 2 个工作日内回复。",
    topics: ["媒体采访", "资料包与品牌素材", "案例授权", "活动与发布合作"],
  },
  {
    key: "security",
    title: "安全与负责披露",
    email: "security@lingxiforge.com",
    desc: "漏洞报告、数据安全问题、内容合规风险与紧急响应。",
    expectedReply: "建议 24–72 小时内确认收到（上线后可提供跟踪编号）。",
    topics: ["漏洞报告", "账号与权限风险", "数据安全问题", "内容/IP 合规风险"],
  },
];

export type MaterialCard = {
  name: string;
  tagline: string;
  bestFor: string;
  highlights: string[];
  cautions: string[];
};

export const materials: MaterialCard[] = [
  {
    name: "高精度树脂（SLA/DLP）",
    tagline: "细节与纹样优先",
    bestFor: "纹样浮雕、小体量摆件、纪念章、首饰与高还原度展示件",
    highlights: ["细节表现强", "表面更平整", "适合精细纹样与小字"],
    cautions: ["韧性一般，注意结构加厚", "需考虑后固化与脆性风险"],
  },
  {
    name: "PLA（FDM）",
    tagline: "快速验证与教学套件",
    bestFor: "结构验证、教学积木、快速打样与低成本试作",
    highlights: ["成本友好", "设备普及", "迭代速度快"],
    cautions: ["细节有限，纹样需放大", "悬垂结构依赖支撑"],
  },
  {
    name: "尼龙（SLS/MJF）",
    tagline: "强度与量产路径",
    bestFor: "功能件、卡扣结构、可拆装模块、耐用文创产品",
    highlights: ["强度与韧性更好", "适合复杂结构", "更接近量产质感"],
    cautions: ["表面有颗粒感，需要后处理", "成本与交期更高"],
  },
  {
    name: "金属（可选）",
    tagline: "高端纪念与收藏",
    bestFor: "高端纪念品、徽章、金属质感系列（需工艺与供应链配合）",
    highlights: ["质感强", "收藏属性高", "可做电镀/抛光等工艺"],
    cautions: ["工艺复杂，需提前设计约束", "成本更高，交期更长"],
  },
];

export const printReadyChecklist = [
  "模型闭合（watertight），无自交与非流形面",
  "最小壁厚符合材料工艺要求（根据尺寸与受力留安全裕度）",
  "关键细节（纹样/文字）满足最小特征尺寸，避免“糊掉”",
  "拆件与装配结构合理（卡扣、公差、方向），便于后处理与运输",
  "支撑与悬垂策略明确，易断点/薄片位置已加强",
  "导出文件与单位一致（GLB 用于评审，STL 用于打印/切片）",
] as const;

export type ResourceItem = {
  title: string;
  desc: string;
  tag: string;
};

export const resourceItems: ResourceItem[] = [
  {
    title: "提示词模板库",
    desc: "覆盖“器型 + 纹样 + 材质 + 工艺”的可复用模版，快速产出稳定风格。",
    tag: "Prompt",
  },
  {
    title: "可制造速查表",
    desc: "壁厚、悬垂、拆件、公差与支撑的实用阈值建议（按材料分类）。",
    tag: "Print-ready",
  },
  {
    title: "3D 展品库模板",
    desc: "GLB（glTF）在线预览组件、内容结构与对外讲述模板（支持扩展 AR）。",
    tag: "3D",
  },
  {
    title: "IP 合规流程",
    desc: "授权、溯源、版本留档与下架处理流程，降低文化 IP 风险。",
    tag: "Compliance",
  },
  {
    title: "案例拆解",
    desc: "从“好看”到“能卖”：拆解爆款文创的结构、工艺与履约策略。",
    tag: "Case study",
  },
  {
    title: "上线更新说明",
    desc: "发布节奏、功能迭代、模型质量改进与体验优化的变更记录。",
    tag: "Changelog",
  },
];

export const newsroomUpdates = [
  {
    date: "2026-01-28",
    title: "新增“可打印”质量提醒：壁厚/支撑/易断点提示",
    desc: "将常见失败原因结构化为提示卡，减少试错与返工。",
  },
  {
    date: "2026-01-22",
    title: "方案展示升级：内容精选与产品化叙事上线",
    desc: "让对外沟通从“堆文件”变成“在线可讲述的内容体系”。",
  },
  {
    date: "2026-01-15",
    title: "首页信息架构升级：公开站与控制台分层",
    desc: "把“介绍产品”放到首页，登录后聚焦工作台与资产管理。",
  },
] as const;

export type PressRelease = {
  date: string;
  title: string;
  desc: string;
  category: "产品更新" | "合作动态" | "安全公告" | "媒体发布";
};

export const pressReleases: PressRelease[] = [
  {
    date: "2026-01-29",
    category: "媒体发布",
    title: "Lingxi Forge（灵犀造物）发布：面向博物馆文创的 AI + 3D 打印一体化平台",
    desc: "聚焦“生成—可制造—履约”闭环，降低建模门槛并提升交付确定性。",
  },
  {
    date: "2026-01-24",
    category: "合作动态",
    title: "开放合作伙伴通道：博物馆/IP 方、品牌联名与打印工坊网络",
    desc: "按角色分流合作路径，支持共创策展、系列化上新与履约标准化。",
  },
  {
    date: "2026-01-18",
    category: "产品更新",
    title: "新增材料与质量标准页：树脂/PLA/尼龙路线与 print-ready 清单",
    desc: "将可制造约束前置，减少试打样失败与返工成本。",
  },
  {
    date: "2026-01-12",
    category: "安全公告",
    title: "上线“负责披露”通道：安全问题与合规风险可快速报告",
    desc: "提供专用邮箱与响应承诺，后续可扩展为漏洞赏金与追踪编号机制。",
  },
];

export type PressAsset = {
  title: string;
  desc: string;
  file: string;
  preview?: string;
};

export const pressAssets: PressAsset[] = [
  {
    title: "品牌封面图（OG）",
    desc: "用于新闻稿、媒体文章与社交分享的默认封面。",
    file: "/og-cover.svg",
    preview: "/og-cover.svg",
  },
  {
    title: "品牌示例图（PNG）",
    desc: "用于媒体资料包的示例图片（可替换为正式 Logo/VI）。",
    file: "/brand2.png",
    preview: "/brand2.png",
  },
];
