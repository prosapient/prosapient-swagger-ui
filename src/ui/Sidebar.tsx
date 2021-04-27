import { Fragment } from "react"
import { Box, Text } from "prosapient-styleguide"
import { ApiDocs } from "../parser/useApiDocs"
import { useCurrentSection } from "./Navigator"

export const Sidebar = ({ docs }: { docs: ApiDocs }) => {
  const currentSection = useCurrentSection()

  return (
    <Box
      position="fixed"
      overflowY="auto"
      overflowX="hidden"
      top={0}
      left={0}
      bottom={0}
      width={230}
      bg="white"
      borderRight="1px solid"
      borderColor="beta.200"
      py={7}
      px={8}
    >
      <Box display="flex" justifyContent="space-between">
        <Text fontSize={7} mb={11}>
          {docs.title}
        </Text>
        <Text fontSize={7} mb={11} color="beta.400">
          v{docs.version}
        </Text>
      </Box>
      <Text fontSize={5}>API Documentation</Text>
      <Text fontSize={7} mb={11}>
        Table of Contents
      </Text>

      {docs.chapters.map(chapter => (
        <Fragment key={chapter.id}>
          <Text
            truncated
            fontSize={6}
            py={1}
            color={currentSection === chapter.id ? "beta.800" : "beta.600"}
            fontWeight={currentSection === chapter.id ? 2 : 1}
          >
            <a href={`#${chapter.id}`}>{chapter.title}</a>
          </Text>
          {chapter.sections.map(section => (
            <Text
              truncated
              fontSize={6}
              py={1}
              pl={7}
              key={section.id}
              color={currentSection === section.id ? "beta.800" : "beta.600"}
              fontWeight={currentSection === section.id ? 2 : 1}
            >
              <a href={`#${section.id}`}>{section.title}</a>
            </Text>
          ))}
        </Fragment>
      ))}
    </Box>
  )
}
