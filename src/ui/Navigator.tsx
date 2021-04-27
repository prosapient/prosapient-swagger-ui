import { useEffect, useState, useContext, createContext, FC } from "react"

type CurrentSection = string | null

const THRESHOLD = 20

function getCurrentFocusedSection() {
  const headers = document.querySelectorAll(".doc-header")
  const maxTop = null
  let result = null

  for (const header in headers) {
    const item = headers[header]
    const rect = item.getBoundingClientRect && item.getBoundingClientRect()
    if (rect && rect.top < THRESHOLD && rect.bottom > THRESHOLD && (!maxTop || rect.top > maxTop)) {
      result = item.id
    }
  }
  return result
}

const NavigatorContext = createContext<CurrentSection>(null)

export const useCurrentSection = () => useContext(NavigatorContext)

export const Navigator: FC = ({ children }) => {
  const [currentSection, setCurrentSection] = useState<CurrentSection>(null)
  useEffect(() => {
    const callback = () => {
      const section = getCurrentFocusedSection()
      setCurrentSection(section)
      if (section && section !== currentSection) window.history.replaceState(undefined, "", `#${section}`)
    }
    window.addEventListener("scroll", callback)
    return () => window.removeEventListener("scroll", callback)
  }, [currentSection, setCurrentSection])

  return <NavigatorContext.Provider value={currentSection}>{children}</NavigatorContext.Provider>
}
