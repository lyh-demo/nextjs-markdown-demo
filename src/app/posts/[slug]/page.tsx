import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPostSlugs, getPostBySlug } from "@/lib/posts";

type PostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {};
  }

  return {
    title: `${post.frontmatter.title} | Next.js Markdown Demo`,
    description: post.frontmatter.summary,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="page-shell">
      <article className="content-card">
        <Link className="back-link" href="/">
          Back to posts
        </Link>
        <header className="post-header">
          <p className="eyebrow">Article</p>
          <h1 className="post-title">{post.frontmatter.title}</h1>
          <div className="post-meta">
            <time dateTime={post.frontmatter.date}>{post.frontmatter.date}</time>
            {post.frontmatter.tags?.length ? (
              <div className="tag-row">
                {post.frontmatter.tags.map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
          {post.frontmatter.summary ? (
            <p className="post-summary">{post.frontmatter.summary}</p>
          ) : null}
        </header>
        <section className="post-body">{post.content}</section>
      </article>
    </main>
  );
}
