import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://afronova.org";
  const lastModified = new Date("2026-07-10T00:00:00.000Z");

  return [
    { url: base, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/about`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/services`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/africa-celebrates-2026`, lastModified, changeFrequency: "weekly", priority: 0.95 },
    { url: `${base}/portfolio`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/news`, lastModified, changeFrequency: "weekly", priority: 0.75 },
    { url: `${base}/contact`, lastModified, changeFrequency: "yearly", priority: 0.6 },
  ];
}
