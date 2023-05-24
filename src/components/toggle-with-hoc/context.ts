import { createContext } from "react"

export type ToggleContext = {
  on: boolean
  onToggle: () => void
}

export const ToggleContext = createContext<ToggleContext>({
  on: false,
  onToggle: () => {},
})
