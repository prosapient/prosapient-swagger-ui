import { useState, useEffect } from "react"
import SwaggerParser from "@apidevtools/swagger-parser"
import MarkdownIt from "markdown-it"

const links = [] as string[]

interface Content {
  code?: string
  markdown?: string
}
interface ApiSection {
  id: string
  title: string
  content: Content[]
}
interface ApiChapter {
  id: string
  title: string
  content: Content[]
  sections: ApiSection[]
}
interface ApiDocs {
  title: string
  version: string
  chapters: ApiChapter[]
}

async function parseSwaggerApi(url: string) {
  const api = await SwaggerParser.parse(url)
  return api
}

function generateLinkId(title: string) {
  const base = title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9-]+/g, "")
  let inc = 0
  let link = base

  while (true) {
    link = inc > 0 ? `${base}-${inc}` : base
    if (links.indexOf(link) === -1) break
    inc += 1
  }

  return link
}

function processMainDescription(description: string): ApiChapter[] {
  const md = new MarkdownIt({ breaks: true })
  const lines = description.split(/\n/)
  const chapters = [] as ApiChapter[]
  let chapter = null as ApiChapter | null
  let section = null as ApiSection | null
  let markdown = null as string | null
  let code = null as string | null

  function finishMardown() {
    if (!markdown) return
    markdown = md.render(markdown as string, {})
    if (section) {
      section.content.push({ markdown })
    } else if (chapter) {
      chapter.content.push({ markdown })
    }
    markdown = null
  }

  function finishCode() {
    if (!code) return
    code = code.trim()
    if (section) {
      section.content.push({ code })
    } else if (chapter) {
      chapter.content.push({ code })
    }
    code = null
  }

  while (lines.length) {
    const line = lines.shift() || ""

    if (line.match(/^# /)) {
      finishMardown()
      const title = line.replace(/^#\s+/, "")
      chapter = {
        id: generateLinkId(title),
        title,
        content: [],
        sections: [] as ApiSection[],
      }
      markdown = ""
      chapters.push(chapter)
      continue
    }
    if (chapter && line.match(/^## /)) {
      finishMardown()
      const title = line.replace(/^##\s+/, "")
      section = {
        id: generateLinkId(title),
        title,
        content: [],
      }
      chapter.sections.push(section)
      continue
    }

    if (line.match(/^```/)) {
      if (code) finishCode()
      else {
        finishMardown()
        code = (lines.shift() || "") + "\n"
      }
    } else if (code) {
      code = `${code}${line}\n`
    } else if (markdown) {
      markdown = `${markdown}${line}\n`
    } else {
      markdown = `${line}\n`
    }
  }
  return chapters
}

function parseApiSpec(spec: any): ApiDocs {
  const docs = {
    title: spec.info.title,
    version: spec.info.version,
    chapters: processMainDescription(spec.info.description),
  }
  return docs
}

export const useApiDocs = (url: string) => {
  const [docs, setDocs] = useState<ApiDocs | null>(null)

  useEffect(() => {
    ;(async function () {
      const api = await parseSwaggerApi(url)
      setDocs(parseApiSpec(api))
    })()
  }, [url])

  return docs
}