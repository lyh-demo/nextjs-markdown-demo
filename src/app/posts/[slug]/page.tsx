import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { CardSurface } from '@/components/card-surface'
import { PillTag } from '@/components/pill-tag'
import { getAllPostSlugs, getPostBySlug } from '@/lib/posts'

type PostPageProps = {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  return getAllPostSlugs().map(slug => ({ slug }))
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {}
  }

  return {
    title: `${post.frontmatter.title} | LiuYuhe`,
    description: post.frontmatter.summary,
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-18">
      <CardSurface as="article" className="p-4.5 sm:p-8">
        <div className="mb-4.5 flex justify-end">
          <Link className="inline-flex text-(--accent) underline decoration-1 underline-offset-4" href="/">
            返回
          </Link>
        </div>
        <header className="mb-7">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-(--accent)">Article</p>
          <h1 className="text-[clamp(2rem,4vw,3.6rem)] leading-none font-semibold tracking-[-0.04em]">
            {post.frontmatter.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-x-3.5 gap-y-2.5 text-[0.92rem] text-[rgba(30,27,24,0.72)]">
            <time dateTime={post.frontmatter.date}>{post.frontmatter.date}</time>
            {post.frontmatter.tags?.length
              ? (
                  <div className="flex flex-wrap gap-2.5">
                    {post.frontmatter.tags.map(tag => (
                      <PillTag key={tag}>{tag}</PillTag>
                    ))}
                  </div>
                )
              : null}
          </div>
          {post.frontmatter.summary
            ? (
                <p className="mt-4.5 max-w-[62ch] text-[1.02rem] leading-8 text-[rgba(30,27,24,0.82)]">
                  {post.frontmatter.summary}
                </p>
              )
            : null}
        </header>
        <section className="pt-2">{post.content}</section>
      </CardSurface>
    </main>
  )
}
