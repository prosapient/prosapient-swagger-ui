import { useState, useCallback } from "react"
import SyntaxHighlighter from "react-syntax-highlighter"
import { gruvboxDark } from "react-syntax-highlighter/dist/esm/styles/hljs"
import copy from "copy-to-clipboard"
import { Box, Text, Button, FIcon } from "prosapient-styleguide"

export const SideCode = ({ title, code }: { title?: string; code: string }) => {
  const [copied, setCopied] = useState<boolean>(false)
  const copy2clip = useCallback(() => {
    copy(code)
    setCopied(copied => !copied)
  }, [code, setCopied])
  return (
    <Box style={{ clear: "none" }}>
      <Box width="50%" style={{ float: "right", clear: "right" }}>
        {title && (
          <Text px={8} py={5} color="beta.300" fontWeight={1}>
            {title}
          </Text>
        )}
        <Box position="relative">
          <Box position="absolute" right={0} top={0}>
            <Button inline ghost onClick={copy2clip}>
              <Box display="flex" alignItems="center" py={4} px={6}>
                {copied ? (
                  <Text color="beta.600" fontSize={4}>
                    Copied!
                  </Text>
                ) : (
                  <>
                    <FIcon icon={["far", "clipboard"]} color="beta.600" sizing="xs" mb={1} mr={3} />
                    <Text color="beta.600" fontSize={4}>
                      Copy
                    </Text>
                  </>
                )}
              </Box>
            </Button>
          </Box>
          <SyntaxHighlighter language="json" style={gruvboxDark}>
            {code}
          </SyntaxHighlighter>
        </Box>
      </Box>
    </Box>
  )
}
