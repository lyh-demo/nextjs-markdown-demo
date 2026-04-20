import type { ComponentPropsWithoutRef } from 'react'

type PillTagProps = ComponentPropsWithoutRef<'span'>

export function PillTag({ children, className, ...props }: PillTagProps) {
  const composedClassName = [
    'inline-flex items-center rounded-full border border-(--accent-border) bg-(--accent-surface) px-3 py-1 text-[0.84rem] text-(--accent)',
    className,
  ].filter(Boolean).join(' ')

  return (
    <span className={composedClassName} {...props}>
      {children}
    </span>
  )
}
