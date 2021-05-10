import { useState, useEffect } from "react"
import SwaggerParser from "@apidevtools/swagger-parser"
import MarkdownIt from "markdown-it"

const links = [] as string[]

interface Content {
  title?: string
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

export interface ApiDocs {
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
  links.push(link)

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

  function finishCode(title: string) {
    if (!code) return
    code = code.trim()
    if (section) {
      section.content.splice(section.content.length - 1, 0, { code, title })
    } else if (chapter) {
      chapter.content.splice(chapter.content.length - 1, 0, { code, title })
    }
    code = null
  }

  let codeTitle = ""

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
      section = null
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
      if (code) finishCode(codeTitle)
      else {
        finishMardown()
        codeTitle = line.replace(/```\w*\s*/, "")
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

  finishMardown()

  return chapters
}

function findSchema(path: string, spec: any): object {
  const name = path.split("/").pop()
  return name && spec.components.schemas[name]
}

function fieldsTable(fields: any, required: string[]): string {
  const rows = []
  for (const field in fields) {
    const config = fields[field]
    const req = required.indexOf(field) > -1 ? ", required" : ""
    rows.push(`| ${field} | ${config.type}${req} | ${config.description} |`)
  }

  return ["| Field | Type | Description |", "| --- | --- | --- |", ...rows].join("\n")
}

function parseSimpleMarkdown(text: string): Content[] {
  const md = new MarkdownIt({ breaks: true })
  const lines = text.split(/\n/)
  const content = [] as Content[]
  let markdown = null as string | null
  let code = null as string | null

  function finishMardown() {
    if (!markdown) return
    markdown = md.render(markdown as string, {})
    content.push({ markdown })
    markdown = null
  }

  function finishCode(title: string) {
    if (!code) return
    content.splice(content.length - 1, 0, { code, title })
    code = null
  }

  let codeTitle = ""

  while (lines.length) {
    const line = lines.shift() || ""

    if (line.match(/^```/)) {
      if (code) finishCode(codeTitle)
      else {
        finishMardown()
        codeTitle = line.replace(/```\w*\s*/, "").trim()
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

  finishMardown()
  return content
}

function processEndpoints(spec: any): ApiChapter[] {
  const md = new MarkdownIt({ breaks: true })

  const chapters = [] as ApiChapter[]
  function getChapter(index: number, title: string, spec: any): ApiChapter {
    if (!chapters[index]) {
      const tag = spec.tags.find((t: any) => t.name === title)
      const markdown = tag?.description || ""
      chapters[index] = {
        id: generateLinkId(title),
        title,
        content: parseSimpleMarkdown(markdown),
        sections: [],
      }
    }
    return chapters[index] as ApiChapter
  }

  const methods = ["get", "put", "post", "delete", "options", "head", "path", "trace"]
  for (const path in spec.paths) {
    const config = spec.paths[path]
    for (const method of methods) {
      const operation = config[method]
      if (!operation) continue
      const tag = operation.tags[0] || ("Rest API" as string)
      const index = operation.tags[1] || spec.tags.map((t: any) => t.name).indexOf(tag)
      const chapter = getChapter(index > -1 ? index : 0, tag, spec)
      const title = operation.summary
      const requestBodyContent = operation.requestBody?.content || {}
      const requestType = Object.keys(requestBodyContent as object)[0]
      const requestBody = Object.values(requestBodyContent as object)[0]?.schema
      const requestSchema = requestBody?.$ref ? findSchema(requestBody.$ref, spec) : requestBody

      const content = [
        {
          markdown: md.render(
            [
              operation.description,
              `**HTTP Request (${requestType || "application/json"})**`,
              `\`${method.toUpperCase()} ${path}\``,
            ].join("\n"),
            {}
          ),
        },
        requestSchema &&
          requestSchema.example && {
            title: "Request example",
            code: JSON.stringify(requestSchema.example, null, 2),
          },
        requestSchema && {
          markdown: md.render(
            [
              `**${operation.requestBody.description}**`,
              fieldsTable(requestSchema.properties, requestSchema.required),
            ].join("\n"),
            {}
          ),
        },
      ].filter(c => !!c)

      for (const status in operation.responses) {
        const response = operation.responses[status]
        const responseContent = response.content || {}
        const responseBody = Object.values(responseContent as object)[0]?.schema
        const responseSchema = responseBody?.$ref ? findSchema(responseBody.$ref, spec) : responseBody

        if (responseSchema?.example) {
          content.push({
            title: `Response example (${status})`,
            code: JSON.stringify(responseSchema.example, null, 2),
          })
        }

        content.push({
          markdown: md.render(
            [
              `**Response (${status}: ${response.description})**`,
              responseSchema?.properties
                ? fieldsTable(responseSchema.properties, responseSchema.required || [])
                : "Response without content",
            ].join("\n"),
            {}
          ),
        })
      }

      chapter.sections.push({
        id: generateLinkId(title),
        title,
        content,
      })
    }
  }

  return chapters
}

function parseApiSpec(spec: any): ApiDocs {
  const chapters = processMainDescription(spec.info.description)
  const endpoints = processEndpoints(spec)
  const docs = {
    title: spec.info.title,
    version: spec.info.version,
    chapters: chapters.concat(endpoints),
  }
  return docs
}

export const useApiDocs = (url: string | null | undefined) => {
  const [docs, setDocs] = useState<ApiDocs | null>(null)

  useEffect(() => {
    if (!url) return
    ;(async function () {
      const api = await parseSwaggerApi(url)
      setDocs(parseApiSpec(api))
    })()
  }, [url])

  return docs
}
