import Image from 'next/image'
import Link from 'next/link'

import { CardSurface } from '@/components/card-surface'
import { PillTag } from '@/components/pill-tag'
import { SocialLink } from '@/components/social-link'
import { getAllPosts } from '@/lib/posts'

export default function Home() {
  const posts = getAllPosts()

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-18">
      <CardSurface
        as="section"
        className="mb-6 flex flex-wrap items-center justify-between gap-6 p-6 sm:p-8"
      >
        <div className="flex items-start gap-5 max-sm:flex-col sm:items-center">
          <Image
            className="size-28 rounded-full border border-[rgba(154,52,18,0.14)] bg-orange-50 object-cover shadow-[0_14px_30px_rgba(55,37,24,0.12)]"
            src="https://avatars.githubusercontent.com/u/171144077?v=4"
            alt="avatar"
            width={112}
            height={112}
            loading="eager"
            unoptimized
          />
          <div className="min-w-[min(100%,280px)]">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-(--accent)">LiuYuhe Blog</p>
            <h1 className="text-[clamp(2rem,4vw,3.6rem)] leading-none font-semibold tracking-[-0.04em]">Tenifs</h1>
            <p className="mt-4 max-w-[62ch] text-[1.02rem] leading-8 text-[rgba(30,27,24,0.82)]">
              微信公众号：爱编程的阿彬
            </p>
          </div>
        </div>
        <div className="flex flex-wrap justify-start gap-2.5 sm:justify-end">
          <SocialLink href="https://github.com/liuyuhe666">GitHub</SocialLink>
          <SocialLink href="https://x.com/cnliuyuhe">X</SocialLink>
          <SocialLink href="https://t.me/liuyuhe666">Telegram</SocialLink>
        </div>
      </CardSurface>

      <section className="grid gap-4.5">
        {posts.map(post => (
          <CardSurface
            as="article"
            className="rounded-3xl p-5 transition hover:-translate-y-0.5 hover:border-[rgba(154,52,18,0.28)] hover:shadow-[0_18px_40px_rgba(55,37,24,0.08)] sm:p-6"
            key={post.slug}
            variant="soft"
          >
            <p className="text-[0.92rem] text-[rgba(30,27,24,0.72)]">{post.date}</p>
            <h2 className="my-2.5 text-2xl leading-tight font-semibold">
              <Link className="transition hover:text-(--accent)" href={`/posts/${post.slug}`}>
                {post.title}
              </Link>
            </h2>
            <p className="mb-3.5 text-base leading-7 text-[rgba(30,27,24,0.84)]">{post.summary}</p>
            {post.tags?.length
              ? (
                  <div className="flex flex-wrap gap-2.5">
                    {post.tags.map(tag => (
                      <PillTag key={tag}>{tag}</PillTag>
                    ))}
                  </div>
                )
              : null}
          </CardSurface>
        ))}
      </section>
    </main>
  )
}
