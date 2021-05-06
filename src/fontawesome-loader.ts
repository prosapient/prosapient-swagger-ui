import { library } from "@fortawesome/fontawesome-svg-core"
import { faArrowDown as farArrowDown } from "@fortawesome/free-solid-svg-icons"
import { faClipboard } from "@fortawesome/free-regular-svg-icons"

export const load = () => {
  library.add(farArrowDown)
  library.add(faClipboard)
}
