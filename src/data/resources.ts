// The community library. Add a resource to RESOURCES and it is counted under its
// category; nothing here is listed until it has a real, published link.

export type ResourceCategoryId =
  | "recordings"
  | "articles"
  | "open-source"
  | "tools"
  | "guides"
  | "announcements";

export type ResourceCategory = {
  id: ResourceCategoryId;
  title: string;
  description: string;
};

export type Resource = {
  id: string;
  title: string;
  category: ResourceCategoryId;
  url: string;
  author?: string;
  description?: string;
};

export const RESOURCE_CATEGORIES: ResourceCategory[] = [
  {
    id: "recordings",
    title: "Session recordings",
    description: "Full talks and live demos from community sessions.",
  },
  {
    id: "articles",
    title: "Engineering articles",
    description: "Write-ups from members on problems they actually solved.",
  },
  {
    id: "open-source",
    title: "Open-source projects",
    description: "Libraries, samples and tools built and maintained by members.",
  },
  {
    id: "tools",
    title: "Developer tools",
    description: "The tooling members reach for, and why.",
  },
  {
    id: "guides",
    title: "Tutorials & guides",
    description: "Practical, step-by-step material you can follow along with.",
  },
  {
    id: "announcements",
    title: "Community announcements",
    description: "New sessions, initiatives and things worth knowing about.",
  },
];

export const RESOURCES: Resource[] = [];
