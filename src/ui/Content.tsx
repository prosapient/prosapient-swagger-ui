import { FC } from "react"
import styled from "styled-components"
import { Box } from "prosapient-styleguide"

const StyledContent = styled(Box)`
  code:not(.language-json) {
    color: ${props => props.theme.colors.beta[700]};
    background: ${props => props.theme.colors.beta[200]};
    padding: ${props => props.theme.newSpace[2]} ${props => props.theme.newSpace[3]};
    border-radius: 2px;
  }
  pre {
    margin: 0;
    padding: ${props => props.theme.newSpace[8]} !important;
    background: ${props => props.theme.colors.beta[800]} !important;
  }
`

export const Content: FC = ({ children }) => (
  <Box ml={230} position="relative" zIndex={10} minHeight="100%">
    <StyledContent position="relative" zIndex={30} width="100%">
      {children}
    </StyledContent>
    <Box position="absolute" top={0} bottom={0} right={0} width="50%" bg="beta.700" />
  </Box>
)
