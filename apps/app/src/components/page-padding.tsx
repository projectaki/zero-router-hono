import type { ComponentProps } from 'react'

export function PagePadding({ children, ...props }: ComponentProps<'div'>) {
  return (
    <div {...props} className={`flex justify-center w-full ${props.className ?? ''}`}>
      <div className="w-full px-4 xl:px-0 xl:w-[1240px]">{children}</div>
    </div>
  )
}
