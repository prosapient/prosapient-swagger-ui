import { FC } from "react"
import { H3, Box } from "prosapient-styleguide"

export const Section: FC = ({ children }) => (
  <Box mr="50%" px={8} pb={8}>
    <H3 my={0} fontWeight={2}>
      {children}
    </H3>
  </Box>
)
