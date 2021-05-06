import { useCallback } from "react"
import { Box } from "prosapient-styleguide"
import styled from "styled-components"

const StyledMardown = styled(Box)`
  color: ${props => props.theme.colors.beta[800]};
  line-height: 1.5;

  p {
    margin-top: 0;
    margin-bottom: ${props => props.theme.newSpace[6]};
  }

  a {
    border-bottom: 2px solid ${props => props.theme.colors.beta[500]};
  }

  table {
    width: 100%;
    text-align: left;
    border-collapse: collapse;
    font-size: ${props => props.theme.newFontSizes[6]};
    color: ${props => props.theme.colors.beta[800]};
    margin-bottom: ${props => props.theme.newSpace[6]};

    th {
      border-bottom: 1px solid;
      border-color: ${props => props.theme.colors.beta[400]};
    }

    tbody {
      border-bottom: 1px solid;
      border-color: ${props => props.theme.colors.beta[400]};
    }

    th:first-child,
    td:first-child {
      width: 22%;
    }

    th:last-child,
    td:last-child {
      width: 60%;
    }

    th:nth-child(4),
    td:nth-child(4) {
      width: 30%;
    }

    th,
    td {
      padding: ${props => props.theme.newSpace[5]};
    }
    tr:nth-child(even) {
      background-color: ${props => props.theme.colors.beta[50]};
    }
  }
`

export const Markdown = ({ html }: { html: string }) => {
  const createMarkup = useCallback(() => ({ __html: html || "" }), [html])
  return <StyledMardown m={0} mr="50%" pl={8} pr={9} pb={8} dangerouslySetInnerHTML={createMarkup()} />
}
