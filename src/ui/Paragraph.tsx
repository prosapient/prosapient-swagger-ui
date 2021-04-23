import { FC } from "react"
import { P } from "prosapient-styleguide"

export const Paragraph: FC = ({ children }) => (
  <P m={0} mr="50%" pl={8} pr={9} pb={8}>
    {children}
  </P>
)
