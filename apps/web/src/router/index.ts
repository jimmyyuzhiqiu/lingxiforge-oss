// import { createRouter, createWebHashHistory } from "vue-router";
import { createRouter, createWebHistory } from "vue-router";
import { constantRoute } from "./routes";
import { isAuthenticated } from "@/utils/auth";
import { getCaseBySlug, getCaseSeoMeta } from "@/data/casesContent";

const SITE_NAME = "Lingxi Forge";
const ORGANIZATION_NAME = "Lingxi Forge（灵犀造物）";
const DEFAULT_TITLE = "文物复兴 AI + 3D 交付平台";
const DEFAULT_DESCRIPTION =
  "Lingxi Forge（灵犀造物）是面向博物馆文创与品牌合作的 AI + 3D 生成与履约平台：从内容理解、设计生成、可制造优化到打印交付。";
const DEFAULT_KEYWORDS =
  "Lingxi Forge,lingxiforge,灵犀造物,文物复兴,AI 3D,生成式3D,文生3D,图生3D,多视角,网格修复,可制造优化,博物馆文创,3D打印,履约交付,文化IP合规";
const DEFAULT_OG_IMAGE = "/og-cover.svg";
const DEFAULT_OG_IMAGE_WIDTH = "1200";
const DEFAULT_OG_IMAGE_HEIGHT = "630";
const DEFAULT_OG_IMAGE_TYPE = "image/svg+xml";
const OG_LOCALE = "zh_CN";
const SITE_URL_FROM_ENV = (import.meta.env.VITE_SITE_URL || "").trim();
const TWITTER_SITE_FROM_ENV = (import.meta.env.VITE_TWITTER_SITE || "").trim();

let siteContentPromise: Promise<typeof import("@/data/siteContent")> | null = null;
let marketingContentPromise: Promise<typeof import("@/data/marketingContent")> | null = null;
let threeDModelsPromise: Promise<typeof import("@/data/threeDModels")> | null = null;

const loadSiteContent = () => {
  if (!siteContentPromise) {
    siteContentPromise = import("@/data/siteContent");
  }
  return siteContentPromise;
};

const loadMarketingContent = () => {
  if (!marketingContentPromise) {
    marketingContentPromise = import("@/data/marketingContent");
  }
  return marketingContentPromise;
};

const loadThreeDModels = () => {
  if (!threeDModelsPromise) {
    threeDModelsPromise = import("@/data/threeDModels");
  }
  return threeDModelsPromise;
};

const normalizeTwitterHandle = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed) return "";
  return trimmed.startsWith("@") ? trimmed : `@${trimmed}`;
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRoute,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition;
    if (to.hash) {
      return {
        el: to.hash,
        top: 90,
        behavior: "smooth",
      };
    }
    return { left: 0, top: 0 };
  },
});

const escapeForSelector = (value: string) => {
  if (typeof CSS !== "undefined" && typeof CSS.escape === "function") {
    return CSS.escape(value);
  }
  return value.replace(/([\\"\]])/g, "\\$1");
};

const upsertMeta = (attr: "name" | "property", key: string, content: string) => {
  if (typeof document === "undefined") return;
  const selector = `meta[${attr}="${escapeForSelector(key)}"]`;
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const upsertLink = (rel: string, href: string) => {
  if (typeof document === "undefined") return;
  const selector = `link[rel="${escapeForSelector(rel)}"]`;
  let el = document.head.querySelector<HTMLLinkElement>(selector);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
};

const upsertAlternateLinks = (canonical: string) => {
  if (typeof document === "undefined") return;
  const links = [
    { lang: "zh-CN", href: canonical },
    { lang: "x-default", href: canonical },
  ];

  links.forEach(({ lang, href }) => {
    const selector = `link[rel="alternate"][hreflang="${escapeForSelector(lang)}"]`;
    let el = document.head.querySelector<HTMLLinkElement>(selector);
    if (!el) {
      el = document.createElement("link");
      el.setAttribute("rel", "alternate");
      el.setAttribute("hreflang", lang);
      document.head.appendChild(el);
    }
    el.setAttribute("href", href);
  });
};

const upsertJsonLd = (graph: Record<string, unknown>[]) => {
  if (typeof document === "undefined") return;
  const id = "ld-json";
  const existing = document.head.querySelector<HTMLScriptElement>(`script#${id}`);
  if (!graph.length) {
    existing?.remove();
    return;
  }
  const script =
    existing ||
    (() => {
      const el = document.createElement("script");
      el.id = id;
      el.type = "application/ld+json";
      document.head.appendChild(el);
      return el;
    })();
  script.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": graph,
  });
};

const normalizePath = (path: string) => path.replace(/\/$/, "") || "/";
const resolveSiteOrigin = () => {
  try {
    if (SITE_URL_FROM_ENV) {
      return new URL(SITE_URL_FROM_ENV).origin;
    }
  } catch {
    // Fall back to runtime origin when env is invalid.
  }
  return window.location.origin;
};

const joinBasePath = (base: string, pathname: string) => {
  const normalizedBase =
    base && base !== "/"
      ? `/${base.replace(/^\/+/, "").replace(/\/+$/, "")}`
      : "";
  const normalizedPath = normalizePath(pathname);
  if (normalizedPath === "/") return normalizedBase || "/";
  return `${normalizedBase}${normalizedPath}`.replace(/\/{2,}/g, "/");
};

const breadcrumbLabels: Record<string, string> = {
  "/": "首页",
  "/product": "产品",
  "/workflow": "工作流",
  "/showcase": "方案展示",
  "/cases": "案例",
  "/gallery": "3D 展品库",
  "/materials": "材料与质量",
  "/partners": "合作伙伴",
  "/resources": "资源中心",
  "/newsroom": "新闻中心",
  "/about": "关于我们",
  "/trust": "信任与安全",
  "/ip": "IP 合规",
  "/contact": "联系我们",
  "/apply": "合作申请",
  "/pricing": "订阅方案",
  "/faqs": "常见问题",
  "/privacy": "隐私政策",
  "/terms": "服务条款",
  "/cookies": "Cookie 政策",
  "/accessibility": "可访问性声明",
};

const trustPillarItems = [
  {
    name: "安全基线",
    description:
      "公开站与控制台分层，登录区域采用更严格的会话与权限策略，并提供负责披露通道。",
  },
  {
    name: "数据与隐私",
    description:
      "围绕文化 IP 与用户资产建立处理边界，覆盖留存周期、访问控制与删除请求机制。",
  },
  {
    name: "IP 与合规",
    description:
      "以授权范围、溯源留档、版本管理与下架流程构建可验证执行路径。",
  },
  {
    name: "可交付标准",
    description:
      "将网格质量、壁厚、支撑和验收口径结构化，保障 print-ready 交付稳定性。",
  },
  {
    name: "负责披露",
    description:
      "鼓励以负责方式报告漏洞与风险，提供受理确认与修复跟踪机制。",
  },
] as const;

const ipComplianceTerms = [
  "授权范围可验证",
  "溯源与留档",
  "可交付与一致性",
  "争议处理与下架",
] as const;

const ipTakedownSteps = [
  "提交权利证明、侵权链接截图、联系方式与处理诉求。",
  "24–72 小时内完成受理确认与初步核验。",
  "必要时先行下架或限制，再进入事实核验与沟通。",
  "输出处理结果并完成留档，用于后续流程复盘。",
] as const;

const applyHowToSteps = [
  "角色分流：确定诉求与合作角色。",
  "参考图上传：补充风格、结构与尺寸素材。",
  "授权与合规确认：明确素材边界与处理授权。",
  "需求规模确认：对齐 SKU 数量、批量与交付周期。",
  "联系方式提交：进入分流对接与落地建议阶段。",
] as const;

const contactTypeByKey: Record<string, string> = {
  sales: "sales",
  partners: "partner support",
  support: "customer support",
  media: "media",
  security: "security",
};

const buildBreadcrumbs = (
  path: string,
  canonical: string,
  title: string,
  origin: string,
  caseTitle?: string
) => {
  if (path === "/") return null;
  const items = [
    {
      "@type": "ListItem",
      position: 1,
      name: "首页",
      item: `${origin}/`,
    },
  ];

  if (path.startsWith("/cases/")) {
    items.push({
      "@type": "ListItem",
      position: 2,
      name: "案例",
      item: `${origin}/cases`,
    });
    items.push({
      "@type": "ListItem",
      position: 3,
      name: caseTitle || title,
      item: canonical,
    });
  } else {
    items.push({
      "@type": "ListItem",
      position: 2,
      name: breadcrumbLabels[path] || title,
      item: canonical,
    });
  }

  return {
    "@type": "BreadcrumbList",
    itemListElement: items,
  };
};

const publicPaths = new Set([
  "/",
  "/about",
  "/showcase",
  "/pricing",
  "/faqs",
  "/login",
  "/register",
  "/details",
  "/404",
  "/test",
]);
const PRIVATE_PATH_PREFIXES = ["/home", "/workbench", "/usercenter"] as const;
const isPrivatePath = (path: string) =>
  PRIVATE_PATH_PREFIXES.some((prefix) => path.startsWith(prefix));

router.beforeEach((to) => {
  if (isAuthenticated() && (to.path === "/login" || to.path === "/register")) {
    return { path: "/home" };
  }
  if (publicPaths.has(to.path)) return true;
  if (isPrivatePath(to.path)) {
    if (!isAuthenticated()) {
      return {
        path: "/login",
        query: { redirect: to.fullPath },
      };
    }
  }
  return true;
});

let seoRenderVersion = 0;

router.afterEach((to) => {
  const currentRenderVersion = ++seoRenderVersion;
  void (async () => {
    if (typeof document === "undefined") return;

  const slugParam = typeof to.params?.slug === "string" ? to.params.slug : "";
  const dynamic =
    to.name === "case-detail" && slugParam ? getCaseSeoMeta(slugParam) : null;
  const caseItem =
    to.name === "case-detail" && slugParam ? getCaseBySlug(slugParam) : null;

  const rawTitle =
    (dynamic?.title as string | undefined) ||
    (to.meta?.title as string | undefined) ||
    DEFAULT_TITLE;
  const title = rawTitle.includes(SITE_NAME)
    ? rawTitle
    : `${rawTitle}｜${SITE_NAME}`;
  const description =
    (dynamic?.description as string | undefined) ||
    (to.meta?.description as string | undefined) ||
    DEFAULT_DESCRIPTION;
  const keywords =
    (dynamic?.keywords as string | undefined) ||
    (to.meta?.keywords as string | undefined) ||
    DEFAULT_KEYWORDS;
  const normalizedPath = normalizePath(to.path);
  const isInternalPath = isPrivatePath(normalizedPath);
  const noindexByDefault =
    isInternalPath ||
    ["/login", "/register", "/404", "/test", "/details", "/search"].includes(normalizedPath);
  const robots =
    (to.meta?.robots as string | undefined) ||
    (noindexByDefault ? "noindex,nofollow" : "index,follow");
  const ogImage =
    (dynamic?.ogImage as string | undefined) ||
    (to.meta?.ogImage as string | undefined) ||
    DEFAULT_OG_IMAGE;
  const ogType = to.name === "case-detail" ? "article" : "website";
  const seoAlt = rawTitle.trim() || DEFAULT_TITLE;

  document.title = title;

  upsertMeta("name", "description", description);
  upsertMeta("name", "keywords", keywords);
  upsertMeta("name", "robots", robots);
  upsertMeta("name", "referrer", "strict-origin-when-cross-origin");
  upsertMeta("name", "author", ORGANIZATION_NAME);

  const siteOrigin = resolveSiteOrigin();
  const base = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");
  const canonicalPath = joinBasePath(base, normalizedPath);
  const canonical = new URL(canonicalPath, `${siteOrigin}/`).toString();
  upsertLink("canonical", canonical);
  upsertAlternateLinks(canonical);

  const ogImageUrl = new URL(ogImage, `${siteOrigin}/`).toString();
  const ogImageSecureUrl = ogImageUrl.startsWith("http://")
    ? ogImageUrl.replace(/^http:\/\//, "https://")
    : ogImageUrl;
  const twitterSite = normalizeTwitterHandle(TWITTER_SITE_FROM_ENV);

  upsertMeta("property", "og:site_name", SITE_NAME);
  upsertMeta("property", "og:locale", OG_LOCALE);
  upsertMeta("property", "og:type", ogType);
  upsertMeta("property", "og:title", title);
  upsertMeta("property", "og:description", description);
  upsertMeta("property", "og:url", canonical);
  upsertMeta("property", "og:image", ogImageUrl);
  upsertMeta("property", "og:image:secure_url", ogImageSecureUrl);
  upsertMeta("property", "og:image:type", DEFAULT_OG_IMAGE_TYPE);
  upsertMeta("property", "og:image:width", DEFAULT_OG_IMAGE_WIDTH);
  upsertMeta("property", "og:image:height", DEFAULT_OG_IMAGE_HEIGHT);
  upsertMeta("property", "og:image:alt", seoAlt);

  upsertMeta("name", "application-name", SITE_NAME);
  upsertMeta("name", "apple-mobile-web-app-title", SITE_NAME);
  upsertMeta("name", "twitter:card", "summary_large_image");
  upsertMeta("name", "twitter:title", title);
  upsertMeta("name", "twitter:description", description);
  upsertMeta("name", "twitter:url", canonical);
  upsertMeta("name", "twitter:image", ogImageUrl);
  upsertMeta("name", "twitter:image:alt", seoAlt);
  if (twitterSite) {
    upsertMeta("name", "twitter:site", twitterSite);
  }

  const origin = siteOrigin;
  const isMarketing =
    !isPrivatePath(normalizedPath) &&
    !["/login", "/register"].includes(normalizedPath);

  if (!isMarketing || robots.includes("noindex")) {
    upsertJsonLd([]);
    return;
  }

  const organization = {
    "@type": "Organization",
    "@id": `${origin}/#organization`,
    name: ORGANIZATION_NAME,
    alternateName: "灵犀造物",
    url: origin,
    logo: new URL(DEFAULT_OG_IMAGE, origin).toString(),
    description: DEFAULT_DESCRIPTION,
    areaServed: "CN",
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: "sales@lingxiforge.com",
        availableLanguage: ["zh-CN"],
      },
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "support@lingxiforge.com",
        availableLanguage: ["zh-CN"],
      },
      {
        "@type": "ContactPoint",
        contactType: "security",
        email: "security@lingxiforge.com",
        availableLanguage: ["zh-CN"],
      },
    ],
    knowsAbout: [
      "AI 3D generation",
      "博物馆文创",
      "3D 打印履约",
      "文化 IP 合规",
    ],
  };

  const website = {
    "@type": "WebSite",
    "@id": `${origin}/#website`,
    name: `${SITE_NAME}｜文物复兴 AI + 3D 交付平台`,
    url: origin,
    inLanguage: "zh-CN",
    publisher: { "@id": `${origin}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: `${origin}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const graph: Record<string, unknown>[] = [organization, website];
  const breadcrumb = buildBreadcrumbs(
    normalizedPath,
    canonical,
    rawTitle,
    origin,
    caseItem?.title
  );
  if (breadcrumb) graph.push(breadcrumb as Record<string, unknown>);

  if (to.name === "case-detail" && caseItem) {
    graph.push({
      "@type": "Article",
      "@id": canonical,
      headline: caseItem.title,
      description: caseItem.summary || description,
      image: [new URL(caseItem.coverImage.src, origin).toString()],
      author: { "@id": `${origin}/#organization` },
      publisher: { "@id": `${origin}/#organization` },
      mainEntityOfPage: canonical,
      keywords: caseItem.keywords?.join(","),
      inLanguage: "zh-CN",
    });
  } else {
    graph.push({
      "@type": "WebPage",
      "@id": canonical,
      url: canonical,
      name: rawTitle,
      description,
      inLanguage: "zh-CN",
      isPartOf: { "@id": `${origin}/#website` },
    });

    if (normalizedPath === "/") {
      graph.push({
        "@type": "Service",
        "@id": `${canonical}#service`,
        name: "Lingxi Forge 文物复兴数字化交付服务",
        serviceType: "AI + 3D museum cultural product workflow and delivery",
        provider: { "@id": `${origin}/#organization` },
        areaServed: "CN",
        url: canonical,
        description,
      });
    }

    if (normalizedPath === "/faqs") {
      const { faqs } = await loadSiteContent();
      if (currentRenderVersion !== seoRenderVersion) return;
      graph.push({
        "@type": "FAQPage",
        "@id": `${canonical}#faq`,
        url: canonical,
        name: rawTitle,
        description,
        mainEntity: faqs.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.a,
          },
        })),
      });
    } else if (normalizedPath === "/cases") {
      graph.push({
        "@type": "CollectionPage",
        "@id": `${canonical}#collection`,
        url: canonical,
        name: rawTitle,
        description,
        inLanguage: "zh-CN",
        isPartOf: { "@id": `${origin}/#website` },
      });
    } else if (normalizedPath === "/gallery") {
      const { open3dModels } = await loadThreeDModels();
      if (currentRenderVersion !== seoRenderVersion) return;
      graph.push({
        "@type": "CollectionPage",
        "@id": `${canonical}#collection`,
        url: canonical,
        name: rawTitle,
        description,
        inLanguage: "zh-CN",
        isPartOf: { "@id": `${origin}/#website` },
      });
      graph.push({
        "@type": "ItemList",
        "@id": `${canonical}#items`,
        itemListElement: open3dModels.map((model, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          name: model.title,
          description: model.subtitle,
        })),
      });
    } else if (normalizedPath === "/showcase") {
      graph.push({
        "@type": "CollectionPage",
        "@id": `${canonical}#collection`,
        url: canonical,
        name: rawTitle,
        description,
        inLanguage: "zh-CN",
        isPartOf: { "@id": `${origin}/#website` },
      });
    } else if (normalizedPath === "/product") {
      graph.push({
        "@type": "Service",
        "@id": `${canonical}#service`,
        name: "Lingxi Forge 生成式 3D 与可制造履约服务",
        serviceType: "AI 3D generation and print-ready delivery",
        description,
        provider: { "@id": `${origin}/#organization` },
        areaServed: "CN",
        url: canonical,
      });
    } else if (normalizedPath === "/workflow") {
      const { detailsContent } = await loadSiteContent();
      if (currentRenderVersion !== seoRenderVersion) return;
      graph.push({
        "@type": "HowTo",
        "@id": `${canonical}#howto`,
        name: rawTitle,
        description,
        step: detailsContent.techPipeline.map((item, idx) => ({
          "@type": "HowToStep",
          position: idx + 1,
          name: item,
          text: item,
        })),
      });
    } else if (normalizedPath === "/materials") {
      const { materials } = await loadMarketingContent();
      if (currentRenderVersion !== seoRenderVersion) return;
      graph.push({
        "@type": "TechArticle",
        "@id": `${canonical}#techarticle`,
        headline: rawTitle,
        description,
        author: { "@id": `${origin}/#organization` },
        publisher: { "@id": `${origin}/#organization` },
        about: materials.map((m) => m.name),
        mainEntityOfPage: canonical,
        inLanguage: "zh-CN",
      });
    } else if (normalizedPath === "/about") {
      const { aboutContent } = await loadSiteContent();
      if (currentRenderVersion !== seoRenderVersion) return;
      graph.push({
        "@type": "AboutPage",
        "@id": `${canonical}#about`,
        url: canonical,
        name: rawTitle,
        description,
        inLanguage: "zh-CN",
        isPartOf: { "@id": `${origin}/#website` },
        mainEntity: { "@id": `${origin}/#organization` },
        significantLink: [
          `${origin}/product`,
          `${origin}/workflow`,
          `${origin}/cases`,
          `${origin}/trust`,
          `${origin}/apply`,
        ],
      });
      graph.push({
        "@type": "ItemList",
        "@id": `${canonical}#capabilities`,
        name: "Lingxi Forge 能力模块",
        itemListElement: aboutContent.whatWeDo.map((item, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          item: {
            "@type": "Thing",
            name: item.title,
            description: item.desc,
          },
        })),
      });
    } else if (normalizedPath === "/trust") {
      graph.push({
        "@type": "CollectionPage",
        "@id": `${canonical}#trust`,
        url: canonical,
        name: rawTitle,
        description,
        inLanguage: "zh-CN",
        isPartOf: { "@id": `${origin}/#website` },
      });
      graph.push({
        "@type": "ItemList",
        "@id": `${canonical}#pillars`,
        name: "信任与安全支柱",
        itemListElement: trustPillarItems.map((item, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          item: {
            "@type": "DefinedTerm",
            name: item.name,
            description: item.description,
          },
        })),
      });
      graph.push({
        "@type": "ContactPage",
        "@id": `${canonical}#disclosure`,
        name: "安全与负责披露",
        url: `${origin}/contact?type=security`,
        inLanguage: "zh-CN",
      });
    } else if (normalizedPath === "/ip") {
      graph.push({
        "@type": "DefinedTermSet",
        "@id": `${canonical}#framework`,
        name: "文化 IP 合规执行框架",
        hasDefinedTerm: ipComplianceTerms.map((term) => ({
          "@type": "DefinedTerm",
          name: term,
        })),
      });
      graph.push({
        "@type": "HowTo",
        "@id": `${canonical}#takedown`,
        name: "侵权投诉与下架流程",
        description: "用于文化内容合作场景的投诉受理、核验、处置与留档流程。",
        step: ipTakedownSteps.map((item, idx) => ({
          "@type": "HowToStep",
          position: idx + 1,
          name: `步骤 ${idx + 1}`,
          text: item,
        })),
      });
    } else if (normalizedPath === "/contact") {
      const { contactChannels } = await loadMarketingContent();
      if (currentRenderVersion !== seoRenderVersion) return;
      graph.push({
        "@type": "ContactPage",
        "@id": `${canonical}#contact`,
        url: canonical,
        name: rawTitle,
        description,
        inLanguage: "zh-CN",
        isPartOf: { "@id": `${origin}/#website` },
      });
      graph.push({
        "@type": "ItemList",
        "@id": `${canonical}#channels`,
        name: "联系通道",
        itemListElement: contactChannels.map((channel, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          item: {
            "@type": "ContactPoint",
            contactType: contactTypeByKey[channel.key] || channel.key,
            email: channel.email,
            description: channel.desc,
            availableLanguage: ["zh-CN"],
            areaServed: "CN",
          },
        })),
      });
    } else if (normalizedPath === "/apply") {
      graph.push({
        "@type": "HowTo",
        "@id": `${canonical}#apply-flow`,
        name: "合作申请流程",
        description,
        step: applyHowToSteps.map((item, idx) => ({
          "@type": "HowToStep",
          position: idx + 1,
          name: `阶段 ${idx + 1}`,
          text: item,
        })),
      });
    } else if (normalizedPath === "/pricing") {
      const { pricingContent } = await loadSiteContent();
      if (currentRenderVersion !== seoRenderVersion) return;
      const offers = [
        ...pricingContent.designerPlans.map((plan) => ({
          "@type": "Offer",
          name: plan.plan,
          description: plan.desc,
          priceCurrency: "CNY",
          lowPrice: plan.monthly.toString(),
          highPrice: plan.yearly.toString(),
          availability: "https://schema.org/InStock",
          url: canonical,
        })),
        ...pricingContent.hobbyBundles.map((bundle) => ({
          "@type": "Offer",
          name: bundle.plan,
          description: bundle.desc,
          priceCurrency: "CNY",
          price: bundle.price.toString(),
          availability: "https://schema.org/InStock",
          url: canonical,
        })),
      ];
      graph.push({
        "@type": "OfferCatalog",
        "@id": `${canonical}#offers`,
        name: rawTitle,
        url: canonical,
        itemListElement: offers,
      });
      graph.push({
        "@type": "Service",
        "@id": `${canonical}#pricing-service`,
        name: "Lingxi Forge 订阅与履约计费服务",
        description,
        provider: { "@id": `${origin}/#organization` },
        areaServed: "CN",
        url: canonical,
        offers: { "@id": `${canonical}#offers` },
      });
    } else if (normalizedPath === "/resources") {
      const { resourceItems } = await loadMarketingContent();
      if (currentRenderVersion !== seoRenderVersion) return;
      graph.push({
        "@type": "CollectionPage",
        "@id": `${canonical}#collection`,
        url: canonical,
        name: rawTitle,
        description,
        isPartOf: { "@id": `${origin}/#website` },
      });
      graph.push({
        "@type": "ItemList",
        "@id": `${canonical}#items`,
        itemListElement: resourceItems.map((item, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          name: item.title,
          description: item.desc,
        })),
      });
    } else if (normalizedPath === "/partners") {
      graph.push({
        "@type": "CollectionPage",
        "@id": `${canonical}#collection`,
        url: canonical,
        name: rawTitle,
        description,
        isPartOf: { "@id": `${origin}/#website` },
      });
      graph.push({
        "@type": "ItemList",
        "@id": `${canonical}#roles`,
        itemListElement: [
          "馆方/机构",
          "品牌联名",
          "制造/工坊",
          "教育/研究",
        ].map((role, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          name: role,
        })),
      });
    } else if (normalizedPath === "/newsroom") {
      const { pressReleases } = await loadMarketingContent();
      if (currentRenderVersion !== seoRenderVersion) return;
      graph.push({
        "@type": "CollectionPage",
        "@id": `${canonical}#collection`,
        url: canonical,
        name: rawTitle,
        description,
        isPartOf: { "@id": `${origin}/#website` },
      });
      graph.push({
        "@type": "ItemList",
        "@id": `${canonical}#news`,
        itemListElement: pressReleases.map((item, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          item: {
            "@type": "NewsArticle",
            headline: item.title,
            datePublished: item.date,
            description: item.desc,
            author: { "@id": `${origin}/#organization` },
            publisher: { "@id": `${origin}/#organization` },
            inLanguage: "zh-CN",
          },
        })),
      });
    }
  }

  if (currentRenderVersion !== seoRenderVersion) return;
  upsertJsonLd(graph);
  })().catch((error) => {
    console.error("[router:seo] failed to update route metadata", error);
  });
});

export default router;
