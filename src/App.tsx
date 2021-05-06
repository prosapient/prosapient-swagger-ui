import { useEffect } from "react"
import { ThemeProvider } from "styled-components"
import { prosapientTheme } from "prosapient-styleguide"
import { Normalize } from "styled-normalize"
import { GlobalStyles } from "./GlobalStyles"
import { Sidebar } from "./ui/Sidebar"
import { Content } from "./ui/Content"
import { Chapter } from "./ui/Chapter"
import { Markdown } from "./ui/Markdown"
import { Section } from "./ui/Section"
import { Spacer } from "./ui/Spacer"
import { SideCode } from "./ui/SideCode"
import { Loader } from "./ui/Loader"
import { Navigator } from "./ui/Navigator"
import { useApiDocs } from "./parser/useApiDocs"

const theme = { ...prosapientTheme, breakpoints: ["90em"] }

const SPEC_URL = document.querySelector('meta[name="api-spec-url"]')?.getAttribute("content")

export default function App() {
  const docs = useApiDocs(SPEC_URL)

  useEffect(() => {
    document.title = docs ? docs.title : "Api"
    const anchor = window.location.hash.replace(/#/, "")
    document.getElementById(anchor)?.scrollIntoView()
  }, [docs])

  return (
    <ThemeProvider theme={theme}>
      <Normalize />
      <GlobalStyles />
      {!docs && <Loader />}
      {docs && (
        <Navigator>
          <Sidebar docs={docs}></Sidebar>
          <Content>
            {docs.chapters.map(chapter => (
              <Chapter key={chapter.id} link={chapter.id} title={chapter.title}>
                {chapter.content.map((content, i) =>
                  content.code ? (
                    <SideCode key={i} title={content.title} code={content.code} />
                  ) : (
                    <Markdown key={i} html={content.markdown!} />
                  )
                )}
                {chapter.sections.map(section => (
                  <Section key={section.id} link={section.id} title={section.title}>
                    {section.content.map((content, i) =>
                      content.code ? (
                        <SideCode key={i} title={content.title} code={content.code} />
                      ) : (
                        <Markdown key={i} html={content.markdown!} />
                      )
                    )}
                  </Section>
                ))}
              </Chapter>
            ))}
            <Spacer />
          </Content>
        </Navigator>
      )}
    </ThemeProvider>
  )
}
