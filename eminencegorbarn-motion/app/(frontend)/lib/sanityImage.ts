export function sanityImage(url: string | null | undefined, width = 1200, height?: number) {
  if (!url) return url as string;
  if (url.toLowerCase().includes('.gif')) return url;
  if (height) {
    return `${url}?auto=format&fit=crop&w=${width}&h=${height}&q=90`;
  }
  return `${url}?auto=format&fit=max&w=${width}&q=100`;
}
