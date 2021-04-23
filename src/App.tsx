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

const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

export default function App() {
  return (
    <ThemeProvider theme={prosapientTheme}>
      <Normalize />
      <GlobalStyles />
      <Router>
        <ScrollToTop />
        <Sidebar title="ENS Navigator API"></Sidebar>
        <Content>
          <Spacer />
          <Chapter>Introduction</Chapter>
          <Paragraph>
            So perhaps, you've generated some fancy text, and you're content that you can now copy and paste your fancy
            text in the comments section of funny cat videos, but perhaps you're wondering how it's even possible to
            change the font of your text? Is it some sort of hack? Are you copying and pasting an actual font?
          </Paragraph>

          <Spacer />
          <Chapter>Interacting with the API</Chapter>
          <Section>Making request</Section>
          <Paragraph>
            So perhaps, you've generated some fancy text, and you're content that you can now copy and paste your fancy
            text in the comments section of funny cat videos, but perhaps you're wondering how it's even possible to
            change the font of your text? Is it some sort of hack? Are you copying and pasting an actual font?
          </Paragraph>
          <SideCode title="Example JSON" code={JSON.stringify({ testing: "module" }, null, 2)} />
          <Section>Making request</Section>
          <Paragraph>
            So perhaps, you've generated some fancy text, and you're content that you can now copy and paste your fancy
            text in the comments section of funny cat videos, but perhaps you're wondering how it's even possible to
            change the font of your text? Is it some sort of hack? Are you <code>copying and pasting</code> an actual
            font?
          </Paragraph>
          <Table header={["Success Code", "Meaning"]} rows={[["200", "Ok - Request proceeded successfully"]]} />
          <Spacer />
          <Section>Making request</Section>
          <Paragraph>
            So perhaps, you've generated some fancy text, and you're content that you can now copy and paste your fancy
            text in the comments section of funny cat videos, but perhaps you're wondering how it's even possible to
            change the font of your text? Is it some sort of hack? Are you <code>copying and pasting</code> an actual
            font?
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
        </Content>
      </Router>
    </ThemeProvider>
  )
}

//useEffect(() => {
//;(async function () {
//console.log("test")
//const api = await swagger(
//"https://gist.githubusercontent.com/gorkunov/0762ecf6d43ea0aabe5ef48fd36886e6/raw/8ad3f707e24fc1497c202b944fe53def7ee0670f/spec.json"
//)
//console.log(api)
//})()
//})
