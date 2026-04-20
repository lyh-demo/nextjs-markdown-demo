import type { ComponentPropsWithoutRef } from 'react'

type SocialLinkProps = ComponentPropsWithoutRef<'a'>

export function SocialLink({ children, className, rel, target, ...props }: SocialLinkProps) {
  const composedClassName = [
    'inline-flex items-center rounded-full border border-[rgba(154,52,18,0.16)] bg-[rgba(154,52,18,0.08)] px-4 py-2 text-sm text-(--accent) transition hover:-translate-y-0.5 hover:border-[rgba(154,52,18,0.28)] hover:bg-[rgba(154,52,18,0.14)]',
    className,
  ].filter(Boolean).join(' ')

  return (
    <a className={composedClassName} rel={rel ?? 'noreferrer'} target={target ?? '_blank'} {...props}>
      {children}
    </a>
  )
}
