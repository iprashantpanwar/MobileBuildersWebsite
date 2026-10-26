/** Anchor props for a destination: external URLs open in a new tab with safe rel attributes. */
export function linkProps(href: string) {
  const external = /^https?:\/\//.test(href);
  return external ? { href, target: "_blank", rel: "noopener noreferrer" } : { href };
}

export function isExternal(href: string) {
  return /^https?:\/\//.test(href);
}
