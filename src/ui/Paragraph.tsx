import { FC, useCallback } from "react"
import { P } from "prosapient-styleguide"

export const Paragraph: FC<{ html?: string }> = ({ children, html }) => {
  const createMarkup = useCallback(() => ({ __html: html || "" }), [html])
  return (
    <P m={0} mr="50%" pl={8} pr={9} pb={8}>
      {html ? <div dangerouslySetInnerHTML={createMarkup()} /> : children}
    </P>
  )
}
