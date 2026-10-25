export const constantRoute = [
  {
    path: "/",
    name: "landing",
    component: () => import("@/views/landing/index.vue"),
    meta: {
      title: "文物复兴首页｜让深藏的文明在指尖重现",
      description:
        "Lingxi Forge（灵犀造物）面向博物馆与文创机构，提供文物复兴导向的 AI 叙事提炼、3D 设计生成、可制造优化与打印履约服务，帮助文化要素从灵感到上新形成闭环。",
      keywords:
        "Lingxi Forge,lingxiforge,灵犀造物,文物复兴,博物馆文创,AI设计,生成式3D,GLB,glTF,STL,3D打印履约,可制造优化,网格修复,壁厚,支撑,文化IP合规,系列化上新",
      ogImage: "/og-cover.svg",
    },
  },
  {
    path: "/about",
    name: "about",
    component: () => import("@/views/marketing/about.vue"),
    meta: {
      title: "关于 Lingxi Forge｜文物复兴数字化交付团队",
      description:
        "了解 Lingxi Forge（灵犀造物）的使命、方法论与执行标准：从文化内容理解到可制造交付，服务博物馆文创与品牌联名项目。",
      keywords:
        "Lingxi Forge,lingxiforge,灵犀造物,关于我们,团队介绍,文物复兴,博物馆文创,生成式3D,可制造优化,履约交付",
      ogImage: "/og-cover.svg",
    },
  },
  {
    path: "/showcase",
    name: "showcase",
    component: () => import("@/views/marketing/showcase.vue"),
    meta: {
      title: "方案展示｜文物复兴项目产品化叙事",
      description:
        "精选项目关键图示与执行要点，系统呈现“生成—可制造—履约”全链路，适合对外介绍、合作评审与销售沟通（不提供源文件下载）。",
      keywords:
        "灵犀造物,Lingxi Forge,lingxiforge,方案展示,文物复兴,博物馆文创,AI 3D,3D打印,可制造,履约交付,产品化叙事",
      ogImage: "/og-cover.svg",
    },
  },
  {
    path: "/cases",
    name: "cases",
    component: () => import("@/views/marketing/cases/index.vue"),
    meta: {
      title: "案例中心｜可交付的文创产品化模板",
      description:
        "按主题、材质、工艺与授权状态筛选案例，查看每个案例的落地路径、质量口径、交付清单与复用模板，并支持独立 SEO 页面。",
      keywords:
        "Lingxi Forge,lingxiforge,灵犀造物,案例中心,案例列表,博物馆文创,AI 3D,3D打印,可制造,交付标准,IP合规,展品化叙事,SEO",
      ogImage: "/og-cover.svg",
    },
  },
  {
    path: "/cases/:slug",
    name: "case-detail",
    component: () => import("@/views/marketing/cases/detail.vue"),
    meta: {
      title: "案例详情",
      description:
        "案例详情页：聚焦落地路径、质量与合规口径、交付清单与可复用模板。",
      keywords:
        "Lingxi Forge,lingxiforge,灵犀造物,案例详情,博物馆文创,AI 3D,3D打印,可制造,交付,IP合规",
      ogImage: "/og-cover.svg",
    },
  },
  {
    path: "/gallery",
    name: "gallery",
    component: () => import("@/views/marketing/gallery.vue"),
    meta: {
      title: "3D 展品库｜GLB 在线预览与讲述协同",
      description:
        "3D 展品库提供 GLB（glTF）在线预览、交互浏览与展品化讲述模板，适用于博物馆展陈、品牌联名与文创履约场景。",
      keywords:
        "Lingxi Forge,lingxiforge,3D展品库,GLB,glTF,3D模型,在线预览,交互展示,展品化叙事,博物馆展陈,AR导览,3D打印,文创",
      ogImage: "/og-cover.svg",
    },
  },
  {
    path: "/product",
    name: "product",
    component: () => import("@/views/marketing/product.vue"),
    meta: {
      title: "产品能力｜AI 生成设计与可制造交付",
      description:
        "Lingxi Forge 产品能力覆盖 AI 叙事提炼、生成式 3D、可制造优化与履约交付，面向博物馆文创与品牌合作场景。",
      keywords:
        "Lingxi Forge,lingxiforge,灵犀造物,产品能力,生成式3D,可制造优化,网格修复,壁厚,支撑,GLB,STL,3D打印,文创",
      ogImage: "/og-cover.svg",
    },
  },
  {
    path: "/workflow",
    name: "workflow",
    component: () => import("@/views/marketing/workflow.vue"),
    meta: {
      title: "工作流｜从灵感输入到可交付上新",
      description:
        "从提示词与参考图到 GLB 评审、STL 打样、质量检查与履约交付，构建一套可复用的“生成—可制造—履约”工作流。",
      keywords:
        "Lingxi Forge,lingxiforge,工作流,How it works,生成式3D,可制造,打印就绪,履约,交付包,质量标准,上新流程",
      ogImage: "/og-cover.svg",
    },
  },
  {
    path: "/materials",
    name: "materials",
    component: () => import("@/views/marketing/materials.vue"),
    meta: {
      title: "材料与质量｜Print-ready 交付标准",
      description:
        "材料路线与质量标准：覆盖树脂/PLA/尼龙等工艺建议、print-ready 检查清单与 QA 流程，降低打样失败率。",
      keywords:
        "Lingxi Forge,lingxiforge,材料与质量,树脂,PLA,尼龙,SLS,打印就绪,壁厚,支撑,拆件,公差,QA,3D打印",
      ogImage: "/og-cover.svg",
    },
  },
  {
    path: "/partners",
    name: "partners",
    component: () => import("@/views/marketing/partners.vue"),
    meta: {
      title: "合作伙伴｜文化 IP 与制造履约生态",
      description:
        "合作伙伴入口覆盖博物馆/IP 方、品牌联名、打印工坊与教育合作，按任务分流对接，提升项目落地效率。",
      keywords:
        "Lingxi Forge,lingxiforge,合作伙伴,博物馆IP,品牌联名,制造商,打印工坊,渠道合作,履约,合规,授权,生态协作",
      ogImage: "/og-cover.svg",
    },
  },
  {
    path: "/resources",
    name: "resources",
    component: () => import("@/views/marketing/resources.vue"),
    meta: {
      title: "资源中心｜模板、指南、案例拆解与更新",
      description:
        "沉淀提示词模板、可制造速查表、IP 合规流程、案例拆解与更新订阅入口，支持团队协作与持续上新。",
      keywords:
        "Lingxi Forge,lingxiforge,资源中心,提示词模板,可制造,打印就绪,IP合规,案例拆解,更新订阅,方法论",
      ogImage: "/og-cover.svg",
    },
  },
  {
    path: "/newsroom",
    name: "newsroom",
    component: () => import("@/views/marketing/newsroom.vue"),
    meta: {
      title: "新闻中心｜公告、新闻稿与媒体资料包",
      description:
        "Lingxi Forge 新闻中心提供公告、新闻稿、产品更新与媒体资料包，面向媒体、合作伙伴与企业客户提供一站式对外信息入口。",
      keywords:
        "Lingxi Forge,lingxiforge,灵犀造物,新闻中心,媒体资料包,press kit,新闻稿,公告,产品更新,合作动态,对外沟通",
      ogImage: "/og-cover.svg",
    },
  },
  {
    path: "/trust",
    name: "trust",
    component: () => import("@/views/marketing/trust.vue"),
    meta: {
      title: "信任与安全｜合规、隐私与交付标准中心",
      description:
        "Lingxi Forge 信任中心：安全基线、隐私与数据边界、文化 IP 合规与 print-ready 交付标准，并提供负责披露入口。",
      keywords:
        "Lingxi Forge,lingxiforge,信任中心,安全,隐私,合规,文化IP,负责披露,print-ready,交付标准",
      ogImage: "/og-cover.svg",
    },
  },
  {
    path: "/ip",
    name: "ip",
    component: () => import("@/views/marketing/ip.vue"),
    meta: {
      title: "IP 合规与授权｜文化内容执行规范",
      description:
        "面向文化 IP 场景的授权范围、溯源留档与投诉下架流程说明，帮助合作伙伴快速审核与对接，降低合规风险。",
      keywords:
        "Lingxi Forge,lingxiforge,灵犀造物,IP合规,授权,溯源,留档,下架,侵权投诉,文化IP,博物馆文创",
      ogImage: "/og-cover.svg",
    },
  },
  {
    path: "/contact",
    name: "contact",
    component: () => import("@/views/marketing/contact.vue"),
    meta: {
      title: "联系我们｜销售咨询、合作对接、技术支持与安全披露",
      description:
        "联系 Lingxi Forge 团队：销售咨询、合作伙伴对接、技术支持、媒体公关与安全披露。按任务分流提交信息，获取更快响应与后续流程建议。",
      keywords:
        "Lingxi Forge,lingxiforge,联系我们,销售咨询,技术支持,合作伙伴,媒体,安全披露,工单,CRM",
      ogImage: "/og-cover.svg",
    },
  },
  {
    path: "/apply",
    name: "apply",
    component: () => import("@/views/marketing/apply.vue"),
    meta: {
      title: "合作申请｜需求收集、授权确认与交付目标对齐",
      description:
        "合作申请入口：按角色分流提交需求、参考图与授权确认，明确 SKU 规模、材料工艺与交付周期，获取“生成—可制造—履约”的落地建议。",
      keywords:
        "Lingxi Forge,lingxiforge,灵犀造物,合作申请,申请演示,合作方案,需求提交,参考图上传,授权确认,交付周期,可制造,3D打印,博物馆文创",
      ogImage: "/og-cover.svg",
    },
  },
  {
    path: "/accessibility",
    name: "accessibility",
    component: () => import("@/views/marketing/legal/accessibility.vue"),
    meta: {
      title: "可访问性声明｜无障碍改进与反馈通道",
      description:
        "了解 Lingxi Forge（灵犀造物）网站与控制台的可访问性目标、已知限制与反馈渠道，我们会持续改进体验。",
      keywords: "Lingxi Forge,lingxiforge,可访问性,无障碍,Accessibility,键盘操作,对比度,可用性",
      ogImage: "/og-cover.svg",
    },
  },
  {
    path: "/privacy",
    name: "privacy",
    component: () => import("@/views/marketing/legal/privacy.vue"),
    meta: {
      title: "隐私政策｜信息收集、使用与保护说明",
      description:
        "了解 Lingxi Forge（灵犀造物）在网站与控制台服务中如何收集、使用、共享、保存与保护信息，以及你可行使的相关权利。",
      keywords: "Lingxi Forge,lingxiforge,隐私政策,隐私,数据保护,信息收集,数据安全",
      ogImage: "/og-cover.svg",
    },
  },
  {
    path: "/terms",
    name: "terms",
    component: () => import("@/views/marketing/legal/terms.vue"),
    meta: {
      title: "服务条款｜使用规则、权责与合规边界",
      description:
        "查看 Lingxi Forge（灵犀造物）服务条款：服务范围、账号使用、知识产权、费用规则、责任限制与联系方式。",
      keywords: "Lingxi Forge,lingxiforge,服务条款,使用规则,知识产权,责任限制,账号规范",
      ogImage: "/og-cover.svg",
    },
  },
  {
    path: "/cookies",
    name: "cookies",
    component: () => import("@/views/marketing/legal/cookies.vue"),
    meta: {
      title: "Cookie 政策｜存储类型与管理方式说明",
      description:
        "了解 Lingxi Forge 如何使用 Cookie 与本地存储以提供基础功能、偏好记忆与体验优化，并了解你的管理方式。",
      keywords: "Lingxi Forge,lingxiforge,Cookies,本地存储,隐私,偏好,数据管理",
      ogImage: "/og-cover.svg",
    },
  },
  {
    path: "/pricing",
    name: "pricing",
    component: () => import("@/views/marketing/pricing.vue"),
    meta: {
      title: "订阅与计费方案｜文创团队与馆方成本路径",
      description:
        "面向设计师、馆方与品牌团队的订阅与项目计费方案：覆盖月付/年付、按次套餐与履约加价口径，帮助建立可预测的上新成本结构。",
      keywords: "Lingxi Forge,lingxiforge,订阅方案,价格,生成式3D,文创设计,3D打印,套餐",
      ogImage: "/og-cover.svg",
    },
  },
  {
    path: "/faqs",
    name: "faqs",
    component: () => import("@/views/marketing/faqs.vue"),
    meta: {
      title: "常见问题（FAQ）｜生成、打印、合规与交付解答",
      description:
        "集中解答生成、打印、合规与部署问题：从提示词与模型质量，到壁厚/支撑/材料、IP 授权与履约交付，帮助团队快速定位执行答案。",
      keywords: "Lingxi Forge,lingxiforge,FAQ,常见问题,生成式3D,网格修复,3D打印,IP合规",
      ogImage: "/og-cover.svg",
    },
  },
  {
    path: "/search",
    name: "search",
    component: () => import("@/views/marketing/search.vue"),
    meta: {
      title: "站内搜索｜产品、流程、案例与合规导航",
      description:
        "搜索站点内容：产品能力、工作流、案例、材料与质量、IP 合规、资源中心与常见问题。",
      keywords: "Lingxi Forge,lingxiforge,站内搜索,搜索,FAQ,资源中心,IP合规,材料,工作流",
      robots: "noindex,nofollow",
      ogImage: "/og-cover.svg",
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login_register.vue"),
    meta: {
      title: "登录",
      description: "登录 Lingxi Forge 账号，进入工作台与个人中心。",
      robots: "noindex,nofollow",
    },
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/login_register.vue"),
    meta: {
      title: "注册",
      description: "创建 Lingxi Forge 账号，开始生成与管理你的 3D 资产。",
      robots: "noindex,nofollow",
    },
  },
  {
    path: "/Pricing",
    redirect: "/pricing",
    name: "pricing-redirect",
  },
  {
    path: "/FAQs",
    redirect: "/faqs",
    name: "faqs-redirect",
  },
  {
    path: "/home",
    redirect: "/home/home",
    component: () => import("@/views/home/index.vue"),
    meta: {
      title: "控制台",
      robots: "noindex,nofollow",
    },
    children: [
      {
        path: "/home/home",
        name: "home",
        component: () => import("@/views/home/home.vue"),
        meta: {
          title: "控制台 · 首页",
          robots: "noindex,nofollow",
        },
      },
      {
        path: "/home/ideas",
        name: "ideas",
        component: () => import("@/views/home/ideas.vue"),
        redirect: "/home/ideas/trend",
        meta: {
          title: "控制台 · 发现灵感",
          robots: "noindex,nofollow",
        },
        children: [
          {
            path: "/home/ideas/trend",
            name: "trend",
            component: () => import("@/views/home/components/ideas/trend.vue"),
            meta: {
              title: "灵感 · 趋势",
              robots: "noindex,nofollow",
            },
          },
          {
            path: "/home/ideas/hot",
            name: "hot",
            component: () => import("@/views/home/components/ideas/hot.vue"),
            meta: {
              title: "灵感 · 热门",
              robots: "noindex,nofollow",
            },
          },
          {
            path: "/home/ideas/news",
            name: "news",
            component: () => import("@/views/home/components/ideas/news.vue"),
            meta: {
              title: "灵感 · 最新",
              robots: "noindex,nofollow",
            },
          },
          {
            path: "/home/ideas/likes",
            name: "likes",
            component: () => import("@/views/home/components/ideas/likes.vue"),
            meta: {
              title: "灵感 · 最受欢迎",
              robots: "noindex,nofollow",
            },
          },
          {
            path: "/home/ideas/star-creator",
            name: "star-creator",
            component: () =>
              import("@/views/home/components/ideas/starCreator.vue"),
            meta: {
              title: "灵感 · 明星创作者",
              robots: "noindex,nofollow",
            },
          },
        ],
      },
      {
        path: "/home/activity",
        name: "activity",
        component: () => import("@/views/home/activity.vue"),
        meta: {
          title: "控制台 · 活动",
          robots: "noindex,nofollow",
        },
      },
      {
        path: "/home/usercenter",
        name: "usercenter",
        component: () => import("@/views/home/usercenter.vue"),
        meta: {
          title: "控制台 · 个人中心",
          robots: "noindex,nofollow",
        },
      },
      {
        path: "/home/docs",
        name: "docs",
        component: () => import("@/views/home/docs.vue"),
        meta: {
          title: "控制台 · 使用文档",
          robots: "noindex,nofollow",
        },
      },
      {
        path: "/home/settings",
        name: "settings",
        component: () => import("@/views/home/settings.vue"),
        meta: {
          title: "控制台 · 设置",
          robots: "noindex,nofollow",
        },
      },
    ],
  },
  {
    path: "/workbench",
    name: "workbench",
    redirect: "/workbench/Text-To-3D",
    component: () => import("@/views/workbench/index.vue"),
    meta: {
      title: "工作台",
      robots: "noindex,nofollow",
    },
    children: [
      {
        path: "/workbench/Text-To-3D",
        name: "textTo3D",
        component: () => import("@/views/workbench/textTo3D.vue"),
        meta: {
          title: "工作台 · 文生 3D",
          robots: "noindex,nofollow",
        },
      },
      {
        path: "/workbench/Image-To-3D",
        name: "imageTo3D",
        component: () => import("@/views/workbench/imgTo3D.vue"),
        meta: {
          title: "工作台 · 图生 3D",
          robots: "noindex,nofollow",
        },
      },
      {
        path: "/workbench/Text-To-Img",
        name: "3DToText",
        component: () => import("@/views/workbench/textToImg.vue"),
        meta: {
          title: "工作台 · 文生图",
          robots: "noindex,nofollow",
        },
      },
      {
        path: "/workbench/3D-Printing",
        name: "textToVideo",
        component: () => import("@/views/workbench/3DPrinting.vue"),
        meta: {
          title: "工作台 · 3D 打印",
          robots: "noindex,nofollow",
        },
      },
    ],
  },
  {
    path: "/usercenter/fans",
    name: "fans",
    component: () => import("@/views/usercenter/fans.vue"),
    meta: {
      title: "个人中心 · 粉丝",
      robots: "noindex,nofollow",
    },
  },
  {
    path: "/usercenter/follow",
    name: "follow",
    component: () => import("@/views/usercenter/follow.vue"),
    meta: {
      title: "个人中心 · 关注",
      robots: "noindex,nofollow",
    },
  },
  {
    path: "/usercenter/like",
    name: "like",
    component: () => import("@/views/usercenter/like.vue"),
    meta: {
      title: "个人中心 · 获赞",
      robots: "noindex,nofollow",
    },
  },
  {
    path: "/usercenter/used",
    name: "used",
    component: () => import("@/views/usercenter/used.vue"),
    meta: {
      title: "个人中心 · 使用次数",
      robots: "noindex,nofollow",
    },
  },
  {
    path: "/details",
    name: "details",
    redirect: "/about#project-details",
  },
  {
    path: "/test",
    name: "test",
    component: () => import("@/views/test.vue"),
    meta: {
      title: "测试页",
      robots: "noindex,nofollow",
    },
  },
  {
    path: "/404",
    component: () => import("@/views/404/index.vue"),
    name: "404",
    meta: {
      title: "404",
    },
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
    name: "Any",
    meta: {
      title: "Any",
    },
  },
];
