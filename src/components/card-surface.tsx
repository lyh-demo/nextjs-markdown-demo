import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

type CardSurfaceProps<T extends ElementType> = {
  as?: T
  children: ReactNode
  className?: string
  variant?: 'default' | 'soft'
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>

const baseClassName
  = 'rounded-[28px] border border-(--border) shadow-(--shadow) backdrop-blur-[12px]'

const variantClassName = {
  default: 'bg-(--card)',
  soft: 'bg-(--card-soft)',
}

export function CardSurface<T extends ElementType = 'div'>({
  as,
  children,
  className,
  variant = 'default',
  ...props
}: CardSurfaceProps<T>) {
  const Component = as ?? 'div'
  const composedClassName = [baseClassName, variantClassName[variant], className].filter(Boolean).join(' ')

  return (
    <Component className={composedClassName} {...props}>
      {children}
    </Component>
  )
}
