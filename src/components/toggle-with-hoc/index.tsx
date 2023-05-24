import * as React from "react"
import { styled } from "@stitches/react"
import { ToggleContext } from "./context"

const Button = styled("button", {
  display: "block",
  backgroundColor: "gainsboro",
  borderRadius: "9999px",
  fontSize: "13px",
  padding: "10px 15px",
  "&:hover": {
    backgroundColor: "lightgray",
  },
  "&[data-some=true]": { backgroundColor: "Coral" },
})

function Switch({ children, on, onToggle }: React.PropsWithChildren & On & OnToggle) {
  return (
    <Button data-some={on} onClick={onToggle}>
      {children}
    </Button>
  )
}

function ToggledOn({ on, children }: React.PropsWithChildren & On) {
  return on ? <>{children}</> : <></>
}

function ToggledOff({ on, children }: React.PropsWithChildren & On) {
  return !on ? <>{children}</> : <></>
}

function Toggle({ children }: React.PropsWithChildren) {
  const [on, setOn] = React.useState(false)

  return (
    <ToggleContext.Provider
      value={{
        on,
        onToggle: () => setOn(!on),
      }}>
      {children}
    </ToggleContext.Provider>
  )
}

function withToggle(Component: React.FC<On & OnToggle>) {
  const ToggleWrapper: React.FC<React.HTMLAttributes<HTMLElement>> = props => {
    const { on, onToggle } = React.useContext(ToggleContext)
    return <Component on={on} onToggle={onToggle} {...props} />
  }

  ToggleWrapper.displayName = `withToggle(${Component.displayName || Component.name})`
  return ToggleWrapper
}

function CustomToggle({ on, onToggle }: On & OnToggle) {
  return <button onClick={onToggle}>Custom Toggle - {on ? "On" : "Off"}</button>
}

const MyToggle = withToggle(CustomToggle)
MyToggle.displayName = "MyToggle"

Toggle.On = withToggle(ToggledOn)
Toggle.Off = withToggle(ToggledOff)
Toggle.Button = withToggle(Switch)

export function ToggleWithHOC() {
  return (
    <Toggle>
      <MyToggle />
      <Toggle.On>On</Toggle.On>
      <Toggle.Off>Off</Toggle.Off>
      <Toggle.Button>Some Button</Toggle.Button>
    </Toggle>
  )
}

type On = { on?: boolean }
type OnToggle = { onToggle?: () => void }
