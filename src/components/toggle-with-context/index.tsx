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

function Switch({ children }: React.PropsWithChildren) {
  const { on, onToggle } = React.useContext(ToggleContext)
  return (
    <Button data-some={on} onClick={onToggle}>
      {children}
    </Button>
  )
}

function ToggledOn({ children }: React.PropsWithChildren) {
  const { on } = React.useContext(ToggleContext)
  return on ? <>{children}</> : <></>
}

function ToggledOff({ children }: React.PropsWithChildren) {
  const { on } = React.useContext(ToggleContext)
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

Toggle.On = ToggledOn
Toggle.Off = ToggledOff
Toggle.Button = Switch

export function ToggleWithContext() {
  return (
    <Toggle>
      <Toggle.On>On</Toggle.On>
      <Toggle.Off>Off</Toggle.Off>
      <Toggle.Button>Some Button</Toggle.Button>
    </Toggle>
  )
}
