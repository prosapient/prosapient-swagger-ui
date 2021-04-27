import { createGlobalStyle, ThemeProps } from "styled-components"
import { ThemeInterface, globalCSS, scrollbarCSS } from "prosapient-styleguide"

export const GlobalStyles = createGlobalStyle<ThemeProps<ThemeInterface>>`
  ${globalCSS}
  ${scrollbarCSS}

	body, #root {
	 height: 100vh;
	}

	html {
		scroll-behavior: smooth;
	}

	a {
		transition: all 150ms ease;
		border-bottom: 2px solid transparent;
	}

	a:hover {
		border-bottom: 2px solid ${props => props.theme.colors.beta[500]};
	}
`
