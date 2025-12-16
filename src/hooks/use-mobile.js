import * as React from "react"

// Treat tablet like mobile for layout (<= 1023px).
const MOBILE_BREAKPOINT = 1024

/**
 * Hook to determine if the viewport is within the mobile breakpoint.
 *
 * @returns {boolean} True if the viewport width is less than the mobile breakpoint (768px), false otherwise.
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange);
  }, [])

  return !!isMobile
}
