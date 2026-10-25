const publicBase = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");
const landingAssetVersion = "20260213-2";

export const publicAsset = (path: string) => {
  const normalized = path.replace(/^\/+/, "");
  const url = `${publicBase}/${normalized}`;

  if (!normalized.startsWith("ai/landing/")) {
    return url;
  }

  const separator = normalized.includes("?") ? "&" : "?";
  return `${url}${separator}v=${landingAssetVersion}`;
};
