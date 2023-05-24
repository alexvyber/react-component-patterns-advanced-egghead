import * as React from "react"
import { styled } from "@stitches/react"

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

type On = { on?: boolean }
type SwitchProps = React.ComponentProps<"button"> & On

function Switch({ on, onClick }: SwitchProps) {
  return (
    <Button data-some={on} onClick={onClick}>
      Some
    </Button>
  )
}

function ToggledOn({ on, children }: React.PropsWithChildren & On) {
  return on ? <>{children}</> : <></>
}

interface ToggleChildren extends React.HTMLAttributes<HTMLElement> {
  on?: boolean
}

function Toggle({ children }: React.PropsWithChildren) {
  const [on, setOn] = React.useState(false)

  const updatedChildren = React.Children.map(children, child => {
    if (!React.isValidElement<ToggleChildren>(child)) {
      return child
    }

    return React.cloneElement(child, {
      on,
      onClick: () => setOn(!on),
    })
  })

  return <>{updatedChildren}</>
}

Toggle.On = ToggledOn
Toggle.Off = ({ on, ...props }: Parameters<typeof ToggledOn>[0]) => (
  <ToggledOn on={!on} {...props} />
)

Toggle.Button = Switch

export function ToggleSimple() {
  return (
    <Toggle>
      <Toggle.On>On</Toggle.On>
      <Toggle.Off>Off</Toggle.Off>
      <Toggle.Button>Some</Toggle.Button>
    </Toggle>
  )
}
