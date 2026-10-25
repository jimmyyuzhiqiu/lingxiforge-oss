import brand1 from "@/assets/images/brand1.png";
import brand2 from "@/assets/images/brand2.png";
import brand3 from "@/assets/images/brand3.png";
import brand4 from "@/assets/images/brand4.png";
import brand5 from "@/assets/images/brand5.png";
import brand6 from "@/assets/images/brand6.png";
import brand7 from "@/assets/images/brand7.png";
import brand8 from "@/assets/images/brand8.png";
import brand9 from "@/assets/images/brand9.png";
import brand10 from "@/assets/images/brand10.png";
import brand11 from "@/assets/images/brand11.png";
import brand12 from "@/assets/images/brand12.png";
import img1 from "@/assets/images/img1.png";
import img2 from "@/assets/images/img2.png";
import img3 from "@/assets/images/img3.png";
import img4 from "@/assets/images/img4.svg";
import img5 from "@/assets/images/img5.svg";
import img6 from "@/assets/images/img6.svg";
import homeTest from "@/assets/images/homeTest.png";
import toStartBackground from "@/assets/images/toStartBackground.png";
import toStartBackground2 from "@/assets/images/toStartBackground2.png";
import toThreeBackground from "@/assets/images/toThreeBackground.png";
import avatarPng from "@/assets/images/avatar.png";
import avatarSvg from "@/assets/images/avatar.svg";

const publicBase = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");
const showcaseAsset = (file: string) =>
  `${publicBase}/showcase/lingxi-museum/assets/${file}`;
const stockAsset = (file: string) => `${publicBase}/stock/photos/${file}`;

export const homeCarouselImages = [
  { src: stockAsset("nasa-additive-lab.webp"), alt: "增材制造实验室 · 3D 打印落地场景" },
  { src: stockAsset("met-porcelain-vase.webp"), alt: "馆藏灵感 · 瓷器器型与釉色" },
  { src: showcaseAsset("s06-2.png"), alt: "三大痛点与解决路径 · 可制造落地" },
  { src: stockAsset("met-bronze-mirror.webp"), alt: "馆藏纹样灵感 · 青铜镜图案" },
  { src: showcaseAsset("s11-1.png"), alt: "核心技术 · 生成与优化链路" },
  { src: stockAsset("nasa-metal-3d-printer.webp"), alt: "金属 3D 打印 · 工艺验证" },
  { src: stockAsset("met-jade-pendant.webp"), alt: "馆藏灵感 · 玉佩纹样与结构" },
  { src: stockAsset("nasa-3d-habitat.webp"), alt: "规模化打印挑战 · 可靠交付与工程验证" },
];

export const homeSections = [
  {
    id: "overview",
    title: "项目概览｜AI + 3D 文创赋能平台",
    subTitle:
      "从灵感输入到可打印交付，打通“设计—生成—制造—履约”全链路。",
    images: [
      { src: showcaseAsset("s02-1.png"), alt: "全链路赋能平台 · 概览" },
      { src: showcaseAsset("s09-1.png"), alt: "产品模块 · 在线设计与云端智造" },
      { src: stockAsset("nasa-additive-lab.webp"), alt: "增材制造实验室 · 从概念到制造" },
    ],
    path: "/showcase#overview",
  },
  {
    id: "tech",
    title: "核心技术｜多模态生成与工艺数据化",
    subTitle:
      "文生图/图生多视角/图生模协同，结合局部优化与材质建议。",
    images: [
      { src: showcaseAsset("s10-1.png"), alt: "核心技术 · 生成链路" },
      { src: showcaseAsset("s11-1.png"), alt: "核心技术 · 细节增强" },
      { src: stockAsset("nasa-metal-3d-printer.webp"), alt: "金属 3D 打印 · 可制造优化验证" },
    ],
    path: "/showcase#solution",
  },
  {
    id: "cases",
    title: "案例应用｜博物馆文创与品牌合作",
    subTitle:
      "围绕文物元素做“结构复刻 + 纹样提取 + 材质映射”的产品创新。",
    images: [
      { src: showcaseAsset("s14-2.png"), alt: "案例应用 · 文创产品" },
      { src: stockAsset("met-bronze-mirror.webp"), alt: "馆藏纹样灵感 · 纹样提取与转译" },
      { src: showcaseAsset("s24-2.png"), alt: "社会价值 · 教育与传播" },
    ],
    path: "/showcase#cases",
  },
  {
    id: "business",
    title: "商业模式｜订阅 + 打印履约",
    subTitle:
      "提供基础/中精度/高精度套餐，并对接打印工坊完成交付。",
    images: [
      { src: showcaseAsset("s17-1.png"), alt: "盈利模式 · 订阅套餐" },
      { src: showcaseAsset("s17-2.png"), alt: "盈利模式 · 套餐与履约" },
      { src: stockAsset("nasa-3d-habitat.webp"), alt: "规模化制造 · 交付可控" },
    ],
    path: "/showcase#pricing",
  },
];

export const homeHighlights = [
  {
    title: "AI 辅助设计",
    desc: "文生图、图生多视角、图生模一体化。",
    image: stockAsset("met-dragon-pendant.webp"),
    alt: "馆藏灵感 · 纹样与造型参考图",
  },
  {
    title: "可制造优化",
    desc: "自动网格修复、加厚建议与结构优化。",
    image: stockAsset("nasa-metal-3d-printer.webp"),
    alt: "制造验证 · 3D 打印工艺场景",
  },
  {
    title: "多材质工艺",
    desc: "支持树脂/PLA/尼龙等多材质路径。",
    image: stockAsset("met-porcelain-vase.webp"),
    alt: "材质与质感 · 器物参考图",
  },
  {
    title: "文博联动",
    desc: "博物馆文物元素深度转译与IP合规管理。",
    image: stockAsset("met-bronze-mirror.webp"),
    alt: "文化 IP · 馆藏纹样参考图",
  },
];

export const industryStats = [
  {
    label: "全国博物馆接待观众（2023）",
    value: "12.9 亿人次",
    note: "国家文物局",
  },
  {
    label: "全国备案博物馆数量（2023）",
    value: "6833 家",
    note: "国家文物局",
  },
  {
    label: "AI 图像转 3D 市场（2024-2029）",
    value: "CAGR 约 34.5%",
    note: "Technavio",
  },
];

export type IdeaType = "trend" | "hot" | "news" | "likes" | "star";

export type IdeaItem = {
  id: string;
  type: IdeaType;
  cover: string;
  avatar: string;
  username: string;
  shelfDate: string;
  views: number;
  favorites: number;
  title: string;
  tags: string[];
  summary: string;
};

const creatorAvatars = [avatarPng, avatarSvg, brand6, brand7, brand8, brand9];

export const ideaItems: IdeaItem[] = [
  {
    id: "idea-1",
    type: "trend",
    cover: img1,
    avatar: creatorAvatars[0],
    username: "灵犀造物",
    shelfDate: "凤冠系列 · 2026-01-18",
    views: 12840,
    favorites: 2390,
    title: "凤冠纹样冰箱贴",
    tags: ["国博", "纹样", "爆款"],
    summary: "以凤冠纹样为主视觉，强化金属质感与浮雕层次。",
  },
  {
    id: "idea-2",
    type: "trend",
    cover: img2,
    avatar: creatorAvatars[1],
    username: "云栖造物",
    shelfDate: "青花瓷 · 2026-01-12",
    views: 9530,
    favorites: 1840,
    title: "青花祥云茶具套件",
    tags: ["青花", "器型", "生活方式"],
    summary: "将传统青花纹样做轻量化结构优化，便于打印量产。",
  },
  {
    id: "idea-3",
    type: "hot",
    cover: img3,
    avatar: creatorAvatars[2],
    username: "博物馆设计室",
    shelfDate: "鎏金铜兽面 · 2026-01-10",
    views: 20450,
    favorites: 4120,
    title: "铜兽面香薰扩香器",
    tags: ["金属质感", "家居", "香薰"],
    summary: "在器型结构上增加通风与散香孔位，保证功能性。",
  },
  {
    id: "idea-4",
    type: "hot",
    cover: brand1,
    avatar: creatorAvatars[3],
    username: "非遗共创",
    shelfDate: "龙纹系列 · 2026-01-08",
    views: 17620,
    favorites: 3675,
    title: "龙纹浮雕灯罩",
    tags: ["浮雕", "灯光", "国潮"],
    summary: "结合3D打印柔性线条灯，呈现层次光影。",
  },
  {
    id: "idea-5",
    type: "news",
    cover: brand2,
    avatar: creatorAvatars[4],
    username: "文创实验室",
    shelfDate: "文物再设计 · 2026-01-26",
    views: 4820,
    favorites: 690,
    title: "古建斗拱积木",
    tags: ["结构拆解", "教育", "亲子"],
    summary: "模块化拆装，增强教育与互动体验。",
  },
  {
    id: "idea-6",
    type: "news",
    cover: brand3,
    avatar: creatorAvatars[5],
    username: "造物工坊",
    shelfDate: "漆器工艺 · 2026-01-24",
    views: 5360,
    favorites: 780,
    title: "朱漆纹样首饰盒",
    tags: ["漆器", "质感", "小体量"],
    summary: "以高精度树脂打印呈现细腻漆纹。",
  },
  {
    id: "idea-7",
    type: "likes",
    cover: brand4,
    avatar: creatorAvatars[0],
    username: "灵犀造物",
    shelfDate: "藻井穹顶 · 2026-01-02",
    views: 11200,
    favorites: 5280,
    title: "藻井穹顶氛围灯",
    tags: ["穹顶", "灯饰", "装饰"],
    summary: "基于藻井结构的层级建模，提供可拆装结构。",
  },
  {
    id: "idea-8",
    type: "likes",
    cover: brand5,
    avatar: creatorAvatars[1],
    username: "云栖造物",
    shelfDate: "碑帖再生 · 2025-12-22",
    views: 8420,
    favorites: 3650,
    title: "碑帖纹样便签座",
    tags: ["纹样", "办公", "收藏"],
    summary: "将碑帖纹样做局部超分，增强文字识别度。",
  },
  {
    id: "idea-9",
    type: "trend",
    cover: brand6,
    avatar: creatorAvatars[2],
    username: "文创实验室",
    shelfDate: "汉代纹样 · 2026-01-16",
    views: 7210,
    favorites: 1290,
    title: "汉纹笔筒",
    tags: ["汉代", "办公", "纹样"],
    summary: "结构加厚优化，适配FDM打印。",
  },
  {
    id: "idea-10",
    type: "hot",
    cover: brand7,
    avatar: creatorAvatars[3],
    username: "非遗共创",
    shelfDate: "敦煌壁画 · 2026-01-05",
    views: 16300,
    favorites: 3010,
    title: "飞天主题立体画",
    tags: ["敦煌", "壁画", "立体化"],
    summary: "多层打印叠加，形成浮雕式画面。",
  },
  {
    id: "idea-11",
    type: "news",
    cover: brand8,
    avatar: creatorAvatars[4],
    username: "博物馆设计室",
    shelfDate: "石窟造像 · 2025-12-30",
    views: 4120,
    favorites: 610,
    title: "石窟微缩雕塑",
    tags: ["雕塑", "微缩", "收藏"],
    summary: "针对细节局部做高精度再构。",
  },
  {
    id: "idea-12",
    type: "likes",
    cover: brand9,
    avatar: creatorAvatars[5],
    username: "造物工坊",
    shelfDate: "宋代器物 · 2025-12-18",
    views: 7850,
    favorites: 2670,
    title: "影青釉香插",
    tags: ["器物", "香插", "小体量"],
    summary: "结构轻量化，减少支撑并提升成品率。",
  },
  {
    id: "idea-13",
    type: "trend",
    cover: brand10,
    avatar: creatorAvatars[0],
    username: "灵犀造物",
    shelfDate: "宫廷纹样 · 2026-01-20",
    views: 10440,
    favorites: 1980,
    title: "宫廷纹样收纳盘",
    tags: ["宫廷", "收纳", "生活方式"],
    summary: "纹样与功能结构融合，提升实用度。",
  },
  {
    id: "idea-14",
    type: "hot",
    cover: brand11,
    avatar: creatorAvatars[1],
    username: "云栖造物",
    shelfDate: "瑞兽系列 · 2026-01-14",
    views: 14200,
    favorites: 2890,
    title: "瑞兽夜灯",
    tags: ["瑞兽", "夜灯", "场景化"],
    summary: "可选多材质输出，增强触感层次。",
  },
  {
    id: "idea-15",
    type: "news",
    cover: brand12,
    avatar: creatorAvatars[2],
    username: "文创实验室",
    shelfDate: "甲骨文 · 2026-01-27",
    views: 3860,
    favorites: 540,
    title: "甲骨文印章",
    tags: ["文字", "印章", "文化传播"],
    summary: "局部细节增强，提升文字清晰度。",
  },
  {
    id: "idea-16",
    type: "likes",
    cover: toStartBackground,
    avatar: creatorAvatars[3],
    username: "非遗共创",
    shelfDate: "灯彩系列 · 2026-01-03",
    views: 9100,
    favorites: 3520,
    title: "灯彩拼装摆件",
    tags: ["灯彩", "拼装", "亲子"],
    summary: "结构模块化，适合互动体验。",
  },
  {
    id: "idea-17",
    type: "trend",
    cover: toStartBackground2,
    avatar: creatorAvatars[4],
    username: "博物馆设计室",
    shelfDate: "青铜器 · 2026-01-19",
    views: 6780,
    favorites: 1120,
    title: "青铜器纹样杯垫",
    tags: ["青铜", "杯垫", "纹样"],
    summary: "适配树脂与金属工艺输出。",
  },
  {
    id: "idea-18",
    type: "hot",
    cover: toThreeBackground,
    avatar: creatorAvatars[5],
    username: "造物工坊",
    shelfDate: "宫灯系列 · 2026-01-06",
    views: 15880,
    favorites: 2760,
    title: "宫灯桌面摆件",
    tags: ["宫灯", "摆件", "场景化"],
    summary: "可选多尺寸版本，适合馆店陈列。",
  },
  {
    id: "idea-19",
    type: "star",
    cover: img4,
    avatar: creatorAvatars[0],
    username: "灵犀造物",
    shelfDate: "作品 128 · 合作馆 30+",
    views: 128,
    favorites: 30200,
    title: "平台官方",
    tags: ["官方", "馆校合作", "全链路"],
    summary: "AI+3D文创赋能平台。",
  },
  {
    id: "idea-20",
    type: "star",
    cover: img5,
    avatar: creatorAvatars[2],
    username: "云栖造物",
    shelfDate: "作品 86 · 联名 12",
    views: 86,
    favorites: 18500,
    title: "馆藏联名",
    tags: ["联名", "器物", "细节优化"],
    summary: "擅长器物与纹样的细节增强。",
  },
  {
    id: "idea-21",
    type: "star",
    cover: img6,
    avatar: creatorAvatars[4],
    username: "文创实验室",
    shelfDate: "作品 64 · 教育 9",
    views: 64,
    favorites: 9600,
    title: "教育向内容",
    tags: ["教育", "互动", "亲子"],
    summary: "专注教育与互动型文创。",
  },
];

export const activityHot = [
  {
    id: "act-hot-1",
    title: "2026 文创 AI 设计挑战赛",
    date: "2026-02-15 - 2026-03-20",
    location: "线上 + 上海",
    tags: ["赛事", "AI设计", "开放报名"],
    cover: brand10,
    status: "报名中",
    summary: "面向高校与设计师的文创 AI 设计竞赛，优秀作品进入量产孵化。",
  },
  {
    id: "act-hot-2",
    title: "博物馆文创共创营（第 3 期）",
    date: "2026-02-01 - 2026-02-28",
    location: "杭州 · 线下工作坊",
    tags: ["共创", "工坊", "非遗"],
    cover: brand7,
    status: "进行中",
    summary: "与馆校团队共同完成“文物元素—产品设计—打印交付”。",
  },
  {
    id: "act-hot-3",
    title: "AI+3D 打印开放日",
    date: "2026-02-08",
    location: "杭州 · 打印工坊",
    tags: ["开放日", "打印", "体验"],
    cover: brand12,
    status: "预约中",
    summary: "现场体验生成、切片、打印全流程，开放工艺咨询。",
  },
];

export const activityPast = [
  {
    id: "act-past-1",
    title: "勇电照明：AI+3D 打印灯光面板",
    date: "2025-11",
    location: "上海",
    tags: ["案例", "照明", "量产"],
    cover: brand4,
    status: "已完成",
    summary: "完成“AI 设计-打印-落地”流程，成品率 70%+。",
  },
  {
    id: "act-past-2",
    title: "馆藏纹样衍生品专题展",
    date: "2025-09",
    location: "杭州",
    tags: ["展览", "博物馆", "纹样"],
    cover: brand2,
    status: "已完成",
    summary: "围绕纹样与器型重设计，展出 40+ 作品。",
  },
  {
    id: "act-past-3",
    title: "馆校联动：数字文创课程",
    date: "2025-07",
    location: "浙江传媒学院",
    tags: ["课程", "教育", "实训"],
    cover: brand8,
    status: "已完成",
    summary: "为学生提供 3D 生成与局部优化实操项目。",
  },
];

export const userStats = {
  fans: 128,
  follow: 36,
  likes: 5421,
  used: 129,
};

export const userModels = {
  generated: [
    {
      id: "gen-1",
      title: "凤冠纹样冰箱贴",
      cover: toStartBackground2,
      prompt: "凤冠纹样，金属质感，浮雕层次，适合3D打印的小体量设计",
      negativePrompt: "模糊、低质量、结构断裂、非流形网格",
      model: "Lingxi Forge 3D Pro",
      style: "写实",
      seed: "5135448553131654",
      status: "已完成",
    },
    {
      id: "gen-2",
      title: "青花祥云杯垫",
      cover: toStartBackground,
      prompt: "青花瓷祥云纹样，简洁优雅，杯垫结构",
      negativePrompt: "粗糙、过度装饰、边缘破损",
      model: "Lingxi Forge 3D Pro",
      style: "智能",
      seed: "923164112",
      status: "已完成",
    },
    {
      id: "gen-3",
      title: "瑞兽桌面夜灯",
      cover: toThreeBackground,
      prompt: "瑞兽造型，镂空灯光结构，适配LED内置",
      negativePrompt: "细节缺失、结构不闭合",
      model: "Lingxi Forge 3D Studio",
      style: "雕塑",
      seed: "7712451",
      status: "待优化",
    },
    {
      id: "gen-4",
      title: "藻井穹顶小夜灯",
      cover: homeTest,
      prompt: "藻井层级结构，适合分件打印组装",
      negativePrompt: "过薄、易断裂",
      model: "Lingxi Forge 3D Studio",
      style: "PBR",
      seed: "28851233",
      status: "已完成",
    },
  ],
  published: [
    {
      id: "pub-1",
      title: "龙纹浮雕灯罩",
      cover: brand1,
      prompt: "龙纹浮雕，光影层次，家居灯罩",
      negativePrompt: "平面、无层次",
      model: "Lingxi Forge 3D Studio",
      style: "写实",
      seed: "33214312",
      status: "已上架",
    },
    {
      id: "pub-2",
      title: "石窟微缩雕塑",
      cover: brand3,
      prompt: "石窟造像，微缩比例，细节增强",
      negativePrompt: "脸部模糊",
      model: "Lingxi Forge 3D Pro",
      style: "雕塑",
      seed: "8451931",
      status: "已上架",
    },
  ],
  collected: [
    {
      id: "col-1",
      title: "宫廷纹样收纳盘",
      cover: brand10,
      prompt: "宫廷纹样，收纳功能，边缘圆润",
      negativePrompt: "锐利边缘",
      model: "Lingxi Forge 3D Pro",
      style: "智能",
      seed: "3122221",
      status: "已收藏",
    },
    {
      id: "col-2",
      title: "飞天主题立体画",
      cover: brand7,
      prompt: "敦煌飞天，多层浮雕效果",
      negativePrompt: "颜色失真",
      model: "Lingxi Forge 3D Studio",
      style: "写实",
      seed: "992331",
      status: "已收藏",
    },
  ],
  assets: [
    {
      id: "asset-1",
      title: "凤冠纹样模型",
      cover: img1,
      prompt: "凤冠纹样，浮雕纹路",
      negativePrompt: "非流形网格",
      model: "Lingxi Forge 3D Pro",
      style: "PBR",
      seed: "888111",
      status: "可打印",
    },
    {
      id: "asset-2",
      title: "青铜纹样模型",
      cover: img2,
      prompt: "青铜器纹样，金属质感",
      negativePrompt: "网格破洞",
      model: "Lingxi Forge 3D Studio",
      style: "写实",
      seed: "233442",
      status: "待检查",
    },
    {
      id: "asset-3",
      title: "藻井结构模型",
      cover: img3,
      prompt: "藻井穹顶层级结构，分件可组装",
      negativePrompt: "结构过薄",
      model: "Lingxi Forge 3D Studio",
      style: "雕塑",
      seed: "771219",
      status: "可打印",
    },
  ],
};

export const fansList = [
  { id: "fan-1", name: "南山风", tag: "非遗爱好者", works: 12, time: "2 小时前" },
  { id: "fan-2", name: "霓裳", tag: "文博设计", works: 8, time: "昨天" },
  { id: "fan-3", name: "墨客", tag: "传统纹样", works: 15, time: "3 天前" },
  { id: "fan-4", name: "木白", tag: "3D 打印", works: 5, time: "上周" },
];

export const followList = [
  { id: "fol-1", name: "文创实验室", field: "器物与纹样", update: "上新 2 个模型" },
  { id: "fol-2", name: "云栖造物", field: "馆藏联名", update: "发布 1 个系列" },
  { id: "fol-3", name: "非遗共创", field: "灯彩/织造", update: "新增 3 个案例" },
];

export const likedWorks = [
  { id: "like-1", title: "飞天主题立体画", creator: "造物工坊", date: "2026-01-06" },
  { id: "like-2", title: "藻井穹顶氛围灯", creator: "灵犀造物", date: "2026-01-02" },
  { id: "like-3", title: "青花祥云杯垫", creator: "云栖造物", date: "2026-01-12" },
];

export const usedWorks = [
  { id: "used-1", title: "凤冠纹样冰箱贴", usage: "打印 2 次", date: "2026-01-20" },
  { id: "used-2", title: "龙纹浮雕灯罩", usage: "打印 1 次", date: "2026-01-15" },
  { id: "used-3", title: "藻井穹顶小夜灯", usage: "打印 3 次", date: "2026-01-10" },
];

export const textToImgPresets = [
  {
    title: "凤冠纹样 · 冰箱贴",
    prompt:
      "精致的凤冠纹样，金属质感，浮雕层次，适合3D打印的小体量设计，柔和光线，干净背景",
    tags: ["金属质感", "浮雕", "爆款潜力"],
  },
  {
    title: "青花瓷 · 祥云纹样",
    prompt:
      "青花瓷风格祥云纹样，简洁器型，釉面质感，现代家居感，留白适度",
    tags: ["青花", "器型", "生活方式"],
  },
  {
    title: "敦煌飞天 · 立体画",
    prompt:
      "敦煌飞天主题，多层浮雕效果，暖色调，艺术陈列风格",
    tags: ["敦煌", "浮雕", "展陈"],
  },
];

export const textToImgGallery = [
  { id: "t2i-1", cover: brand1, title: "龙纹浮雕灯罩" },
  { id: "t2i-2", cover: brand2, title: "青花祥云杯垫" },
  { id: "t2i-3", cover: brand3, title: "石窟微缩雕塑" },
  { id: "t2i-4", cover: brand4, title: "纹样香薰扩香器" },
  { id: "t2i-5", cover: brand5, title: "宫廷纹样收纳盘" },
  { id: "t2i-6", cover: brand6, title: "瑞兽桌面夜灯" },
];

export const printAssets = [
  {
    id: "print-1",
    title: "凤冠纹样冰箱贴",
    cover: toStartBackground2,
    material: "树脂",
    size: "小",
    quality: "高",
  },
  {
    id: "print-2",
    title: "青花祥云杯垫",
    cover: toStartBackground,
    material: "PLA",
    size: "中",
    quality: "中",
  },
  {
    id: "print-3",
    title: "龙纹浮雕灯罩",
    cover: toThreeBackground,
    material: "PETG",
    size: "大",
    quality: "高",
  },
  {
    id: "print-4",
    title: "藻井穹顶小夜灯",
    cover: homeTest,
    material: "树脂",
    size: "中",
    quality: "高",
  },
];

export const detailsContent = {
  title: "灵犀造物｜文物复兴 AI + 3D 交付平台",
  subtitle:
    "面向博物馆文创与品牌联名场景的生成式 3D 与履约协同平台，打通“内容理解—设计生成—可制造优化—交付上新”全链路。",
  metrics: [
    { label: "合作博物馆", value: "30+ 家" },
    { label: "专利与软著", value: "20+ 项" },
    { label: "赋能 GMV 目标", value: "1.5 亿+" },
    { label: "案例成品率", value: "70%+" },
  ],
  techPipeline: [
    "文生图 / 图生多视角",
    "图生模 + 点云网格化",
    "自动网格修复与加厚",
    "纹样/浮雕局部增强",
    "材质建议与打印参数输出",
  ],
  businessModel: [
    {
      plan: "基础生成",
      price: "¥300/月 · ¥3300/年",
      desc: "每月 30 次基础生成，适合快速概念验证。",
    },
    {
      plan: "中精度生成",
      price: "¥550/月 · ¥6000/年",
      desc: "每月 14 次中精度生成 + 局部优化。",
    },
    {
      plan: "高精度生成",
      price: "¥1000/月 · ¥10900/年",
      desc: "每月 30 次高精度生成，支持结构分件展示。",
    },
  ],
  financialHighlights: [
    "毛利率目标 50% → 60%，高毛利数字业务占比提升。",
    "2027 年现金流转正，2029 年净利率目标 23.3%。",
    "ROE 目标 10%–15%，轻资产高周转模型。",
  ],
  roadmap: [
    { year: "2026", desc: "天使轮与产品化验证，完成文创闭环试点。" },
    { year: "2028", desc: "A 轮扩张，渠道与订阅化规模增长。" },
    { year: "2030", desc: "B 轮与全国性馆校联动，布局海外渠道。" },
  ],
  advisors: [
    "杭州勇电照明董事长兼总经理（IES 金奖）",
    "浙江大学求是特聘教授（国家杰青）",
    "IAPR/IET/AAIA Fellow 李玺",
  ],
  teamHighlights: [
    "设计与技术双栈团队，覆盖 AI 生成、3D 打印与文创产品。",
    "多项省部级与国家级项目经验。",
    "高校与行业专家顾问支持。",
  ],
  marketNotes: [
    "博物馆文创市场高景气增长，用户对文化 IP 与情绪价值需求提升。",
    "生成式 3D 与 3D 打印结合，显著缩短从设计到生产周期。",
    "局部优化与可打印性是商业化落地关键。",
  ],
};

export const aboutContent = {
  title: "关于 Lingxi Forge｜文物复兴数字化交付团队",
  subtitle:
    "我们专注文创产业的“生成—可制造—履约”闭环，让文化灵感稳定转化为可展示、可生产、可复用的实体产品。",
  highlights: [
    { label: "合作博物馆", value: "30+ 家" },
    { label: "专利与软著", value: "20+ 项" },
    { label: "赋能 GMV 目标", value: "1.5 亿+" },
    { label: "案例成品率", value: "70%+" },
  ],
  mission: [
    "让文博 IP 与当代生活场景建立可持续连接。",
    "降低 3D 资产生产门槛，缩短从创意到商品上新的周期。",
    "用 AI 与柔性制造提升爆款命中率，减少库存与试错损耗。",
  ],
  whatWeDo: [
    {
      title: "AI 驱动设计",
      desc: "文生图 / 图生多视角 / 图生模协同，快速形成可编辑资产。",
    },
    {
      title: "可制造优化",
      desc: "自动网格修复、加厚与结构优化，提升切片与打印成功率。",
    },
    {
      title: "材质与工艺建议",
      desc: "按树脂 / PLA / 尼龙等工艺输出建议参数，面向量产落地。",
    },
    {
      title: "履约闭环",
      desc: "对接渠道与工坊，支持小批量迭代、补货与跨渠道上新。",
    },
  ],
  differentiation: [
    "聚焦“可打印”网格质量与局部细节增强，而非仅输出可看的 3D。",
    "围绕文物元素与文化表达建立模板与工作流，降低馆方沟通成本。",
    "提供从资产到生产到履约的全链路能力，形成可规模化交付。",
  ],
};

export const pricingContent = {
  designerPlans: [
    {
      plan: "基础生成",
      monthly: 300,
      yearly: 3300,
      quota: "每月 30 次基础生成",
      desc: "适合快速概念验证与上新测试。",
    },
    {
      plan: "中精度生成",
      monthly: 550,
      yearly: 6000,
      quota: "每月 14 次中精度生成",
      desc: "适合馆藏联名与小批量试产，并支持局部优化。",
    },
    {
      plan: "高精度生成",
      monthly: 1000,
      yearly: 10900,
      quota: "每月 30 次高精度生成",
      desc: "适合结构分件展示与更高要求的可制造优化。",
    },
  ],
  hobbyBundles: [
    {
      plan: "基础套餐",
      price: 100,
      desc: "两次基础生成 + 一次后期调优。",
    },
    {
      plan: "中精度套餐",
      price: 200,
      desc: "三次基础生成 + 两次中级生成 + 两次局部优化。",
    },
    {
      plan: "高精度套餐",
      price: 350,
      desc: "三次基础生成 + 两次高级生成 + 两次结构优化。",
    },
  ],
  printMarkupNotes: [
    "PLA（FDM）：在厂家基础上上调约 15%。",
    "树脂（高精度）：在厂家基础上上调约 10%。",
    "尼龙（SLS）：在厂家基础上上调约 20%。",
  ],
};

export type FaqItem = {
  q: string;
  a: string;
  category: "产品" | "生成" | "打印" | "合规" | "部署" | "交付";
};

export const faqs: FaqItem[] = [
  {
    category: "产品",
    q: "Lingxi Forge 适合哪些人使用？",
    a: "面向博物馆/文创机构的设计师与运营团队，也支持文创爱好者进行个性化创作。核心目标是降低建模门槛，并提升从设计到生产的效率。",
  },
  {
    category: "生成",
    q: "为什么“生成出来能看”不等于“能打印”？",
    a: "打印对网格有硬约束：水密/封闭、非流形边、最小壁厚、支撑与悬垂等。Lingxi Forge 强调自动网格修复、加厚与结构优化，减少切片失败与打样损耗。",
  },
  {
    category: "产品",
    q: "你们和通用 3D 生成工具有什么差异？",
    a: "Lingxi Forge 聚焦文化内容产品化，核心不是只做“可看模型”，而是把可制造优化、材料工艺建议、合规留档与履约对接放进同一流程，降低团队跨部门协作成本。",
  },
  {
    category: "生成",
    q: "我该怎么写提示词才能更像文创产品？",
    a: "建议包含：文物元素（纹样/器型/主题）+ 功能形态（冰箱贴/灯罩/香插/收纳）+ 材质方向（金属/釉面/漆器/PBR）+ 工艺约束（可打印、小体量、结构加厚）。",
  },
  {
    category: "生成",
    q: "如果生成结果风格不稳定，应该怎么迭代？",
    a: "建议固定三件事：主题词库（器型/纹样/材质）、参考图集和负面提示词，再按小步快跑迭代；每次只改 1-2 个变量，并保留版本记录，便于团队复盘与复用。",
  },
  {
    category: "打印",
    q: "常用打印材质怎么选？",
    a: "小体量高细节更适合树脂；耐用与成本优先可选 PLA/PETG；需要强度与复杂结构可考虑尼龙（SLS）。具体以尺寸、细节与使用场景为准。",
  },
  {
    category: "打印",
    q: "如何降低试打样失败率？",
    a: "把风险前置到设计阶段：先做壁厚与悬垂检查，再做关键结构加固、拆件和装配公差验证；首轮试样优先验证易失败区域，避免一次性大批量开打。",
  },
  {
    category: "合规",
    q: "文博 IP 与版权如何处理？",
    a: "建议在输出前确认素材来源与授权范围；对馆藏元素的复刻、改编与衍生需要遵守相关授权与合作协议。平台侧可提供资产归档与来源记录建议。",
  },
  {
    category: "合规",
    q: "出现侵权投诉时你们怎么处理？",
    a: "默认流程为“受理确认-临时处置-事实核验-结果通知-留档复盘”。高风险投诉优先处理，建议 24-72 小时内完成受理确认并推进处置。",
  },
  {
    category: "部署",
    q: "本地开发和服务器部署有什么区别？",
    a: "Mac 本地可跑前端+后端用于演示与联调；模型服务建议部署到带 NVIDIA GPU 的服务器（如 4090），以获得稳定推理与较快速度。",
  },
  {
    category: "部署",
    q: "生产环境最小部署建议是什么？",
    a: "建议至少拆分为：前端静态站点、API 服务、对象存储和日志监控。对外域名、SSL、鉴权、限流与备份策略应在上线前完成基线检查。",
  },
  {
    category: "交付",
    q: "交付包通常包含什么？",
    a: "标准交付包建议包含：GLB 评审文件、STL 制造文件、材料与工艺建议、验收口径、包装与运输注意事项，以及版本与授权记录。",
  },
  {
    category: "交付",
    q: "可以做多 SKU、小批量的持续上新吗？",
    a: "可以。建议先跑通 1-2 个 SKU 的闭环，再把提示词、结构策略和工艺参数模板化。这样能在保证质量的前提下稳定扩大 SKU 数量与上新节奏。",
  },
];

export const docsContent = {
  quickStart: [
    "进入【三维生成】选择提示词/风格，并准备参考图片。",
    "在预览区选择图片后进入【图生 3D】流程。",
    "生成完成后下载模型，并在【打印工坊】选择材质与尺寸。",
  ],
  workflow: [
    { title: "输入", desc: "提示词 / 参考图 / 风格与参数。" },
    { title: "生成", desc: "生成初始 3D 资产，并进行可制造优化。" },
    { title: "检查", desc: "查看细节、厚度与结构；必要时做局部增强。" },
    { title: "打印", desc: "选择材质与尺寸，生成切片建议并提交履约。" },
  ],
  tips: [
    "小体量+高细节优先使用树脂工艺。",
    "结构件建议做分件设计，便于打印与后处理。",
    "避免过薄结构与大悬垂，必要时增加支撑或加厚。",
  ],
};
