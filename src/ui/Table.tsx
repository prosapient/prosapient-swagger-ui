import styled from "styled-components"
import { Box } from "prosapient-styleguide"

const StyledTable = styled.table`
  width: 100%;
  text-align: left;
  border-collapse: collapse;
  font-size: ${props => props.theme.newFontSizes[6]};
  color: ${props => props.theme.colors.beta[800]};

  th {
    border-bottom: 1px solid;
    border-color: ${props => props.theme.colors.beta[400]};
  }

  tbody {
    border-bottom: 1px solid;
    border-color: ${props => props.theme.colors.beta[400]};
  }

  th,
  td {
    padding: ${props => props.theme.newSpace[5]};
  }
  tr:nth-child(even) {
    background-color: ${props => props.theme.colors.beta[50]};
  }
`

interface TableProps {
  header: string[]
  rows: string[][]
}

export const Table = ({ header, rows }: TableProps) => (
  <Box mr="50%" p={4} px={8}>
    <StyledTable>
      <thead>
        <tr>
          {header.map((title, i) => (
            <th key={i}>{title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            {row.map((val, j) => (
              <td key={j}>{val}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </StyledTable>
  </Box>
)
