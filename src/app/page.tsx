import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts();

  return (
    <main className="page-shell">
      <section className="hero-card">
        <p className="eyebrow">Markdown Blog</p>
        <h1 className="hero-title">使用 Next.js 构建支持 Frontmatter 的 Markdown 博客</h1>
        <p className="hero-summary">
          首页会自动读取 `src/content/posts` 目录下的 markdown 文件，生成文章列表，并在详情页渲染正文内容。
        </p>
      </section>

      <section className="post-list">
        {posts.map((post) => (
          <article className="post-card" key={post.slug}>
            <p className="card-date">{post.date}</p>
            <h2 className="card-title">
              <Link className="card-link" href={`/posts/${post.slug}`}>
                {post.title}
              </Link>
            </h2>
            <p className="card-summary">{post.summary}</p>
            {post.tags?.length ? (
              <div className="tag-row">
                {post.tags.map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
          </article>
        ))}
      </section>
    </main>
  );
}
