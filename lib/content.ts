import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content");

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date?: string;
  category?: string;
  published?: boolean;
};

export type Post = PostMeta & {
  content: string;
  body: { raw: string };
};

export type ProjectMeta = {
  slug: string;
  title: string;
  description: string;
  date?: string;
  url?: string;
  repository?: string;
  published?: boolean;
};

export type Project = ProjectMeta & {
  content: string;
  body: { raw: string };
};

function getSlug(filename: string): string {
  return filename.replace(/\.mdx?$/, "");
}

export function getPosts(): PostMeta[] {
  const dir = path.join(contentDir, "blog");
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));
  const posts: PostMeta[] = [];
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const raw = fs.readFileSync(fullPath, "utf-8");
    const { data } = matter(raw);
    const slug = getSlug(file);
    if (data.published === false) continue;
    posts.push({
      slug,
      title: data.title ?? slug,
      description: data.description ?? "",
      date: data.date,
      category: data.category,
      published: data.published !== false,
    });
  }
  posts.sort(
    (a, b) =>
      new Date(b.date ?? 0).getTime() - new Date(a.date ?? 0).getTime(),
  );
  return posts;
}

export function getPost(slug: string): Post | null {
  const dir = path.join(contentDir, "blog");
  const possible = [path.join(dir, `${slug}.mdx`), path.join(dir, `${slug}.md`)];
  for (const fullPath of possible) {
    if (!fs.existsSync(fullPath)) continue;
    const raw = fs.readFileSync(fullPath, "utf-8");
    const { data, content } = matter(raw);
    return {
      slug,
      title: data.title ?? slug,
      description: data.description ?? "",
      date: data.date,
      category: data.category,
      published: data.published !== false,
      content,
      body: { raw: content },
    };
  }
  return null;
}

export function getProjects(): ProjectMeta[] {
  const dir = path.join(contentDir, "projects");
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));
  const projects: ProjectMeta[] = [];
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const raw = fs.readFileSync(fullPath, "utf-8");
    const { data } = matter(raw);
    const slug = getSlug(file);
    if (data.published === false) continue;
    projects.push({
      slug,
      title: data.title ?? slug,
      description: data.description ?? "",
      date: data.date,
      url: data.url,
      repository: data.repository,
      published: data.published !== false,
    });
  }
  projects.sort(
    (a, b) =>
      new Date(b.date ?? 0).getTime() - new Date(a.date ?? 0).getTime(),
  );
  return projects;
}

export function getProject(slug: string): Project | null {
  const dir = path.join(contentDir, "projects");
  const possible = [path.join(dir, `${slug}.mdx`), path.join(dir, `${slug}.md`)];
  for (const fullPath of possible) {
    if (!fs.existsSync(fullPath)) continue;
    const raw = fs.readFileSync(fullPath, "utf-8");
    const { data, content } = matter(raw);
    return {
      slug,
      title: data.title ?? slug,
      description: data.description ?? "",
      date: data.date,
      url: data.url,
      repository: data.repository,
      published: data.published !== false,
      content,
      body: { raw: content },
    };
  }
  return null;
}
