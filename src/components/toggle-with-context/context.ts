import { createContext } from "react"

type ToggleContext = {
  on: boolean
  onToggle: () => void
}

export const ToggleContext = createContext<ToggleContext>({
  on: false,
  onToggle: () => {},
})
