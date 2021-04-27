import { FC, useCallback } from "react"
import { P } from "prosapient-styleguide"
import styled from "styled-components"
import { tableStyles } from "./Table"

const StyledParagraph = styled(P)`
  table {
    ${tableStyles}
  }
`

export const Paragraph: FC<{ html?: string }> = ({ children, html }) => {
  const createMarkup = useCallback(() => ({ __html: html || "" }), [html])
  return html ? (
    <StyledParagraph m={0} mr="50%" pl={8} pr={9} pb={8} dangerouslySetInnerHTML={createMarkup()} />
  ) : (
    <StyledParagraph m={0} mr="50%" pl={8} pr={9} pb={8}>
      {children}
    </StyledParagraph>
  )
}
