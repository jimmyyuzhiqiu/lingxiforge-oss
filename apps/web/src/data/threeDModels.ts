const publicBase = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");

const nasaModel = (file: string) => `${publicBase}/models/open/nasa/${file}`;

export type Open3DModel = {
  id: string;
  title: string;
  subtitle: string;
  tags: string[];
  format: "GLB";
  size: string;
  thumbnail: string;
  src: string;
  sourcePage: string;
  license: string;
};

export const open3dModels: Open3DModel[] = [
  {
    id: "nasa-hubble-a",
    title: "Hubble Space Telescope",
    subtitle: "经典空间望远镜 · 适合做“科技展陈”的交互演示",
    tags: ["NASA", "望远镜", "空间观测", "PBR", "可交互"],
    format: "GLB",
    size: "~1.6 MB",
    thumbnail: nasaModel("hubble-space-telescope-a.webp"),
    src: nasaModel("hubble-space-telescope-a.glb"),
    sourcePage: "https://science.nasa.gov/3d-resources/hubble-space-telescope-a/",
    license: "Public Domain (NASA)",
  },
  {
    id: "nasa-jwst-a",
    title: "James Webb Space Telescope",
    subtitle: "结构复杂但加载可控 · 适合展示高质量 GLB 工作流",
    tags: ["NASA", "JWST", "结构件", "多材质", "可交互"],
    format: "GLB",
    size: "~4.5 MB",
    thumbnail: nasaModel("james-webb-space-telescope-a.webp"),
    src: nasaModel("james-webb-space-telescope-a.glb"),
    sourcePage: "https://science.nasa.gov/3d-resources/james-webb-space-telescope-a/",
    license: "Public Domain (NASA)",
  },
  {
    id: "nasa-iss-a",
    title: "International Space Station (ISS)",
    subtitle: "轻量模型 · 适合移动端快速加载与交互浏览",
    tags: ["NASA", "ISS", "轻量", "移动端友好"],
    format: "GLB",
    size: "~0.04 MB",
    thumbnail: nasaModel("international-space-station-a.webp"),
    src: nasaModel("international-space-station-a.glb"),
    sourcePage: "https://science.nasa.gov/3d-resources/international-space-station-iss-a/",
    license: "Public Domain (NASA)",
  },
  {
    id: "nasa-mars2020-perseverance",
    title: "Mars 2020 Perseverance Rover",
    subtitle: "高识别度展品 · 适合做互动讲解与 AR 导览入口",
    tags: ["NASA", "火星车", "工程结构", "可交互"],
    format: "GLB",
    size: "~4.8 MB",
    thumbnail: nasaModel("mars-2020-perseverance-rover.webp"),
    src: nasaModel("mars-2020-perseverance-rover.glb"),
    sourcePage: "https://science.nasa.gov/3d-resources/mars-2020-perseverance-rover/",
    license: "Public Domain (NASA)",
  },
  {
    id: "nasa-apollo-lunar-module",
    title: "Apollo Lunar Module",
    subtitle: "任务与历史叙事强 · 适合做沉浸式时间线展示",
    tags: ["NASA", "Apollo", "登月", "历史", "可交互"],
    format: "GLB",
    size: "~0.7 MB",
    thumbnail: nasaModel("apollo-lunar-module.webp"),
    src: nasaModel("apollo-lunar-module.glb"),
    sourcePage: "https://science.nasa.gov/3d-resources/apollo-lunar-module/",
    license: "Public Domain (NASA)",
  },
  {
    id: "nasa-ace",
    title: "Advanced Composition Explorer (ACE)",
    subtitle: "科学任务模型 · 适合做“从数据到资产”的展示模板",
    tags: ["NASA", "卫星", "科学任务", "可交互"],
    format: "GLB",
    size: "~1.9 MB",
    thumbnail: nasaModel("advanced-composition-explorer.webp"),
    src: nasaModel("advanced-composition-explorer.glb"),
    sourcePage: "https://science.nasa.gov/3d-resources/advanced-composition-explorer/",
    license: "Public Domain (NASA)",
  },
];

const normalizeModel = (raw: any, index: number): Open3DModel | null => {
  if (!raw || !raw.src || !raw.title) return null;
  const id =
    typeof raw.id === "string" && raw.id.trim().length
      ? raw.id
      : `model-${index + 1}`;
  const tags = Array.isArray(raw.tags) ? raw.tags.filter(Boolean) : [];
  return {
    id,
    title: String(raw.title),
    subtitle: raw.subtitle ? String(raw.subtitle) : "",
    tags,
    format: "GLB",
    size: raw.size ? String(raw.size) : "—",
    thumbnail: raw.thumbnail ? String(raw.thumbnail) : "/og-cover.svg",
    src: String(raw.src),
    sourcePage: raw.sourcePage ? String(raw.sourcePage) : "",
    license: raw.license ? String(raw.license) : "",
  };
};

export const fetch3dCatalog = async (
  url = "/models/catalog.json"
): Promise<Open3DModel[] | null> => {
  if (typeof fetch === "undefined") return null;
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    const list = Array.isArray(data) ? data : data?.models;
    if (!Array.isArray(list)) return null;
    const models = list
      .map((item, idx) => normalizeModel(item, idx))
      .filter((item): item is Open3DModel => Boolean(item));
    return models.length ? models : null;
  } catch {
    return null;
  }
};
