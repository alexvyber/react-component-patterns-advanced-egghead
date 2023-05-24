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

function Switch({ children, on, onToggle, ...props }: React.PropsWithChildren & On & OnToggle) {
  return (
    <Button data-some={on} onClick={onToggle} {...props}>
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

type Render = {
  render?: (
    props: SomeProp & { getTogglerProps: (props?: TogglerProps) => TogglerProps },
  ) => JSX.Element
}

function Toggle({ children }: React.PropsWithChildren): JSX.Element
function Toggle({ render }: Render & SomeProp): JSX.Element
function Toggle({ children, render, some }: React.PropsWithChildren & Render & SomeProp) {
  const [on, setOn] = React.useState(false)

  if (!render)
    return (
      <ToggleContext.Provider
        value={{
          on,
          onToggle: () => setOn(!on),
        }}>
        {children}
      </ToggleContext.Provider>
    )

  return render({
    some,
    getTogglerProps: ({ onToggle, ...rest } = {}) => ({
      on,
      onToggle: () => {
        setOn(!on)
        onToggle?.()
      },
      "aria-expanded": on,
      ...rest,
    }),
  })
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

export function ToggleWithRenderProps() {
  return Math.random() > 0.01 ? (
    <Toggle
      some={"Some Prop"}
      render={({ some, getTogglerProps }) => (
        <>
          {getTogglerProps().on ? some : "off"} - render
          <Switch
            {...getTogglerProps({
              onToggle: () => alert("asdfasdf"),
              style: { fontSize: "40px", padding: "20px" },
            })}>
            Toggle
          </Switch>
        </>
      )}
    />
  ) : (
    <Toggle>
      <MyToggle />
      <Toggle.On>On</Toggle.On>
      <Toggle.Off>Off</Toggle.Off>
      <Toggle.Button>Some Button</Toggle.Button>
    </Toggle>
  )
}

type TogglerProps = On & OnToggle & React.HTMLAttributes<HTMLElement>
type SomeProp = { some?: string }
type On = { on?: boolean }
type OnToggle = { onToggle?: () => void }
