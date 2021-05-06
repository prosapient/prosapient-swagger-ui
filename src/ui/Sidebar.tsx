import { Fragment, useState } from "react"
import { Box, Text, FIcon } from "prosapient-styleguide"
import { ApiDocs } from "../parser/useApiDocs"
import { useCurrentSection } from "./Navigator"

export const Sidebar = ({ docs }: { docs: ApiDocs }) => {
  const currentSection = useCurrentSection()
  const [expanded, setExpanded] = useState<boolean>(false)

  return (
    <Box position="fixed" top={0} left={[expanded ? 0 : -230, 0]} bottom={0} zIndex={11}>
      <Box display="flex" justifyContent="flex-start" alignItems="flex-start" flexDirection="row">
        <Box
          py={7}
          px={8}
          width={230}
          height="100vh"
          bg="white"
          overflowY="auto"
          overflowX="hidden"
          borderRight="1px solid"
          borderColor="beta.200"
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
        <Box
          position="relative"
          bg="white"
          width={["30px", "0px"]}
          height="70px"
          borderRight="1px solid"
          borderBottom="1px solid"
          borderColor="beta.200"
          cursor="pointer"
          overflow="hidden"
          onClick={() => setExpanded(!expanded)}
        >
          <Box position="absolute" bottom={-20} left={0}>
            <Text color="beta.600" fontWeight={2} style={{ transform: "rotate(-90deg)", transformOrigin: "top left" }}>
              <Box display="flex" alignItems="center">
                <FIcon icon="arrow-down" sizing="xs" color="beta.600" mr={3} />
                NAV
              </Box>
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
