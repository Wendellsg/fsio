export function resolvePath(key: string) {
  const CDN_URL = process.env.NEXT_PUBLIC_CDN_URL;
  return `${CDN_URL}/${
    key || "f187756e-261c-4689-9b34-27f980edc9c6/1711423375365.png"
  }`;
}
