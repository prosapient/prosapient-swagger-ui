import { FC } from "react"
import { H2, Box } from "prosapient-styleguide"

export const Chapter: FC<{ link: string }> = ({ link, children }) => (
  <Box mr="50%" px={8} pb={8}>
    <Box borderBottom="2px solid" borderColor="beta.600" pb={6}>
      <H2 my={0} fontWeight={2}>
        <a href={`#${link}`}>{children}</a>
      </H2>
    </Box>
  </Box>
)