import { FC } from "react"
import { H2, Box } from "prosapient-styleguide"

export const Chapter: FC<{ link: string; title: string }> = ({ link, title, children }) => (
  <section id={link} className="doc-header">
    <Box mr="50%" p={8} pt={11} style={{ clear: "both" }}>
      <Box borderBottom="2px solid" borderColor="beta.600" pb={6}>
        <H2 my={0} fontWeight={2}>
          <a href={`#${link}`}>{title}</a>
        </H2>
      </Box>
    </Box>
    {children}
  </section>
)
