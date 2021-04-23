import SyntaxHighlighter from "react-syntax-highlighter"
import { gruvboxDark } from "react-syntax-highlighter/dist/esm/styles/hljs"
import { Box, Text } from "prosapient-styleguide"

export const SideCode = ({ title, code }: { title: string; code: string }) => (
  <Box style={{ clear: "none" }}>
    <Box width="50%" style={{ float: "right", clear: "right" }}>
      <Text p={8} color="beta.300" fontWeight={1}>
        {title}
      </Text>
      <SyntaxHighlighter language="json" style={gruvboxDark}>
        {code}
      </SyntaxHighlighter>
    </Box>
  </Box>
)
