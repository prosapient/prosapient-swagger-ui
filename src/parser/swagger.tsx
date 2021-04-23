import SwaggerParser from "@apidevtools/swagger-parser"

export default async function parseApi(url: string) {
  const api = await SwaggerParser.parse(url)
  return api
}
