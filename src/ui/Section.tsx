import { FC } from "react"
import { H3, Box } from "prosapient-styleguide"

export const Section: FC<{ link: string; title: string }> = ({ link, title, children }) => (
  <section id={link} className="doc-header">
    <Box mr="50%" px={8} pb={8} pt={11} style={{ clear: "both" }}>
      <H3 my={0} fontWeight={2}>
        <a href={`#${link}`}>{title}</a>
      </H3>
    </Box>
    {children}
  </section>
)
