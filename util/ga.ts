/**
 * GA4 custom event helper. Pushes to dataLayer (used by gtag).
 * Only sends when NEXT_PUBLIC_GA_MEASUREMENT_ID is set.
 */
declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean | undefined>,
): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  const payload: Record<string, unknown> = { event: eventName };
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      if (v !== undefined) payload[k] = v;
    }
  }
  window.dataLayer.push(payload);
}

export const GA_EVENTS = {
  share: (method: string, contentType: string, itemId?: string) =>
    trackEvent("share", {
      method,
      content_type: contentType,
      item_id: itemId,
    }),
  copyLink: (contentType: string, itemId?: string) =>
    trackEvent("copy_link", { content_type: contentType, item_id: itemId }),
  navClick: (destination: string, linkText: string) =>
    trackEvent("nav_click", { destination, link_text: linkText }),
  readingProgress: (percent: number, postSlug?: string) =>
    trackEvent("reading_progress", { percent, post_slug: postSlug }),
} as const;
