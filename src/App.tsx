import "./App.css"

// import { ToggleSimple } from "./components/toggle-simle"
// import { ToggleWithContext } from "./components/toggle-with-context"
// import { ToggleWithHOC } from "./components/toggle-with-hoc"
import { ToggleWithRenderProps } from "./components/toggle-with-render-props"

export default function App() {
  return (
    <>
      {/* <ToggleSimple /> */}
      {/* <ToggleWithContext /> */}
      {/* <ToggleWithHOC /> */}
      <ToggleWithRenderProps />
    </>
  )
}
