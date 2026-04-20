import type { ComponentPropsWithoutRef } from 'react'

type SocialLinkProps = ComponentPropsWithoutRef<'a'>

export function SocialLink({ children, className, rel, target, ...props }: SocialLinkProps) {
  const composedClassName = [
    'inline-flex items-center rounded-full border border-(--accent-border) bg-(--accent-surface) px-4 py-2 text-sm text-(--accent) transition hover:-translate-y-0.5 hover:border-(--accent-border-strong) hover:bg-(--accent-surface-strong)',
    className,
  ].filter(Boolean).join(' ')

  return (
    <a className={composedClassName} rel={rel ?? 'noreferrer'} target={target ?? '_blank'} {...props}>
      {children}
    </a>
  )
}
