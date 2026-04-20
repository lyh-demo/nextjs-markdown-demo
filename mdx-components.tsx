import type { MDXComponents } from 'mdx/types'
import type { ComponentProps, ReactNode } from 'react'
import { isValidElement } from 'react'

import { MdxImage } from '@/components/mdx-image'

type MarkdownImageProps = ComponentProps<'img'>

function getMeaningfulChildren(children: ReactNode) {
  const childNodes = Array.isArray(children) ? children : [children]

  return childNodes.filter((child) => {
    return !(typeof child === 'string' && child.trim() === '')
  })
}

function isImageParagraphChild(child: ReactNode) {
  if (!isValidElement(child)) {
    return false
  }

  if (child.type === 'img') {
    return true
  }

  const props = child.props as { src?: unknown }
  return typeof props.src === 'string'
}

export function getMDXComponents(components: MDXComponents = {}): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="mb-4 text-[clamp(1.85rem,3.2vw,2.5rem)] leading-none font-semibold tracking-[-0.04em]">
        {children}
      </h1>
    ),
    h2: ({ children }) => <h2 className="mt-8 mb-4 text-[1.35rem] leading-tight font-semibold">{children}</h2>,
    p: ({ children }) => {
      const childNodes = getMeaningfulChildren(children)
      const isImageOnlyParagraph
        = childNodes.length === 1
          && isImageParagraphChild(childNodes[0])

      if (isImageOnlyParagraph) {
        return <>{children}</>
      }

      return <p className="mb-4 text-[1.02rem] leading-8 text-[rgba(30,27,24,0.9)]">{children}</p>
    },
    ul: ({ children }) => <ul className="mb-4 list-disc pl-6 text-[1.02rem] leading-8">{children}</ul>,
    ol: ({ children }) => <ol className="mb-4 list-decimal pl-6 text-[1.02rem] leading-8">{children}</ol>,
    li: ({ children }) => <li className="text-[1.02rem] leading-8 text-[rgba(30,27,24,0.9)]">{children}</li>,
    code: ({ children }) => (
      <code className="rounded-lg bg-(--accent-soft) px-1.5 py-0.5 font-mono text-[0.95em]">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="mb-4 overflow-x-auto rounded-[18px] bg-[#201a16] p-4.5 text-[#fff7ed]">
        {children}
      </pre>
    ),
    a: ({ children, href }) => (
      <a className="text-(--accent) underline decoration-1 underline-offset-4" href={href}>
        {children}
      </a>
    ),
    img: ({ src, alt }: MarkdownImageProps) => {
      if (!src || typeof src !== 'string') {
        return null
      }

      return <MdxImage src={src} alt={alt} />
    },
    ...components,
  }
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return getMDXComponents(components)
}
