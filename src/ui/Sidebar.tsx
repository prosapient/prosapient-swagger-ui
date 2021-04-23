import { FC } from "react"
import { Box, Text } from "prosapient-styleguide"

export const Sidebar: FC<{ title: string }> = ({ children, title }) => (
  <Box
    position="fixed"
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
    <Text fontSize={7} mb={11}>
      {title}
    </Text>
    <Text fontSize={5}>API Documentation</Text>
    <Text fontSize={7} mb={11}>
      Table of Contents
    </Text>

    <Text fontSize={6} py={1}>
      Introduction
    </Text>
    <Text fontSize={6} py={1}>
      Interacting with the API
    </Text>
    <Text fontSize={6} py={1}>
      Authentication
    </Text>
    <Text fontSize={6} py={1}>
      Rest API
    </Text>
    <Text fontSize={6} py={1}>
      Webhooks
    </Text>
    {children}
  </Box>
)
