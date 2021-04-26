import { useEffect } from "react"
import { BrowserRouter as Router, useLocation } from "react-router-dom"
import { ThemeProvider } from "styled-components"
import { prosapientTheme } from "prosapient-styleguide"
import { Normalize } from "styled-normalize"
import { GlobalStyles } from "./GlobalStyles"
import { Sidebar } from "./ui/Sidebar"
import { Content } from "./ui/Content"
import { Chapter } from "./ui/Chapter"
import { Paragraph } from "./ui/Paragraph"
import { Section } from "./ui/Section"
import { Spacer } from "./ui/Spacer"
import { Table } from "./ui/Table"
import { SideCode } from "./ui/SideCode"
import { Loader } from "./ui/Loader"
import { useApiDocs } from "./parser/useApiDocs"

const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

export default function App() {
  const docs = useApiDocs(
    "https://gist.githubusercontent.com/gorkunov/0762ecf6d43ea0aabe5ef48fd36886e6/raw/8ad3f707e24fc1497c202b944fe53def7ee0670f/spec.json"
  )

  useEffect(() => {
    document.title = docs ? docs.title : "Api"
  }, [docs])

  return (
    <ThemeProvider theme={prosapientTheme}>
      <Normalize />
      <GlobalStyles />
      <Router>
        <ScrollToTop />
        {!docs && <Loader />}
        {docs && (
          <>
            <Sidebar title={docs.title} version={docs.version}></Sidebar>
            <Content>
              <Spacer />
              {docs.chapters.map(chapter => (
                <div key={chapter.id}>
                  <Chapter link={chapter.id}>{chapter.title}</Chapter>
                  {chapter.content.map((content, i) =>
                    content.code ? (
                      <SideCode key={i} title="Example JSON" code={content.code} />
                    ) : (
                      <Paragraph key={i} html={content.markdown} />
                    )
                  )}
                  {chapter.sections.map(section => (
                    <div key={section.id}>
                      <Section>{section.title}</Section>
                      {section.content.map((content, i) =>
                        content.code ? (
                          <SideCode key={i} title="Example JSON" code={content.code} />
                        ) : (
                          <Paragraph key={i} html={content.markdown} />
                        )
                      )}
                    </div>
                  ))}
                </div>
              ))}

              <Paragraph>
                So perhaps, you've generated some fancy text, and you're content that you can now copy and paste your
                fancy text in the comments section of funny cat videos, but perhaps you're wondering how it's even
                possible to change the font of your text? Is it some sort of hack? Are you{" "}
                <code>copying and pasting</code> an actual font?
              </Paragraph>
              <Table header={["Success Code", "Meaning"]} rows={[["200", "Ok - Request proceeded successfully"]]} />
              <Spacer />
              <Section>Making request</Section>
              <Paragraph>
                So perhaps, you've generated some fancy text, and you're content that you can now copy and paste your
                fancy text in the comments section of funny cat videos, but perhaps you're wondering how it's even
                possible to change the font of your text? Is it some sort of hack? Are you{" "}
                <code>copying and pasting</code> an actual font?
              </Paragraph>
              <SideCode title="Example JSON" code={JSON.stringify({ testing: "module" }, null, 2)} />
              <Spacer />
              <Table
                header={["Field", "Type", "Description"]}
                rows={[
                  ["start_date", "datetime", "A system generated ID number assigned to the recepient"],
                  ["start_date", "datetime", "A system generated ID number assigned to the recepient"],
                  ["start_date", "datetime", "A system generated ID number assigned to the recepient"],
                  ["start_date", "datetime", "A system generated ID number assigned to the recepient"],
                  ["start_date", "datetime", "A system generated ID number assigned to the recepient"],
                ]}
              />
              <Spacer />
            </Content>
          </>
        )}
      </Router>
    </ThemeProvider>
  )
}
