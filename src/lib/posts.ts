import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getMDXComponents } from "../../mdx-components";

export type PostFrontmatter = {
  coverImage?: string;
  date: string;
  summary: string;
  tags?: string[];
  title: string;
};

export type PostSummary = PostFrontmatter & {
  slug: string;
};

const postsDirectory = path.join(process.cwd(), "src", "content", "posts");

function getPostFileNames() {
  return fs
    .readdirSync(postsDirectory)
    .filter((fileName) => /\.(md|mdx)$/.test(fileName));
}

function getSlugFromFileName(fileName: string) {
  return fileName.replace(/\.(md|mdx)$/, "");
}

function readPostFileBySlug(slug: string) {
  const fullPath = getPostFileNames()
    .map((fileName) => path.join(postsDirectory, fileName))
    .find((filePath) => getSlugFromFileName(path.basename(filePath)) === slug);

  if (!fullPath) {
    return null;
  }

  return fs.readFileSync(fullPath, "utf8");
}

function normalizeFrontmatter(frontmatter: Record<string, unknown>): PostFrontmatter {
  return {
    coverImage:
      typeof frontmatter.coverImage === "string" ? frontmatter.coverImage : undefined,
    date: typeof frontmatter.date === "string" ? frontmatter.date : "",
    summary: typeof frontmatter.summary === "string" ? frontmatter.summary : "",
    tags: Array.isArray(frontmatter.tags)
      ? frontmatter.tags.filter((tag): tag is string => typeof tag === "string")
      : undefined,
    title: typeof frontmatter.title === "string" ? frontmatter.title : "Untitled Post",
  };
}

export function getAllPosts(): PostSummary[] {
  return getPostFileNames()
    .map((fileName) => {
      const slug = getSlugFromFileName(fileName);
      const source = fs.readFileSync(path.join(postsDirectory, fileName), "utf8");
      const { data } = matter(source);

      return {
        slug,
        ...normalizeFrontmatter(data),
      };
    })
    .sort((left, right) => right.date.localeCompare(left.date));
}

export function getAllPostSlugs() {
  return getAllPosts().map((post) => post.slug);
}

export async function getPostBySlug(slug: string) {
  const source = readPostFileBySlug(slug);

  if (!source) {
    return null;
  }

  const { content, data } = matter(source);
  const frontmatter = normalizeFrontmatter(data);
  const compiled = await compileMDX({
    source: content,
    components: getMDXComponents(),
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
  });

  return {
    content: compiled.content,
    frontmatter,
    slug,
  };
}
