export function setDomHiddenUntilFound(dom: HTMLElement): void {
  // @ts-expect-error unknown
  dom.hidden = "until-found"
}

export function domOnBeforeMatch(dom: HTMLElement, callback: () => void): void {
  // @ts-expect-error unknown
  dom.onbeforematch = callback
}
