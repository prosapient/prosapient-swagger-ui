import { createGlobalStyle, ThemeProps } from "styled-components"
import { ThemeInterface, globalCSS, scrollbarCSS } from "prosapient-styleguide"

export const GlobalStyles = createGlobalStyle<ThemeProps<ThemeInterface>>`
  ${globalCSS}
  ${scrollbarCSS}

	body, #root {
	 height: 100vh;
	}
`
