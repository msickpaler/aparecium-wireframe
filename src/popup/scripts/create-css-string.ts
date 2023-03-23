import * as CSS from 'csstype'

const DEFAULT_CONTENT_COLOR = 'rgba(255,255,255, 1)'
const DEFAULT_PADDING_COLOR = 'rgba(150,150,190, 1)'
const DEFAULT_BORDER_COLOR = 'rgb(0 165 31)'

const toKebab = (str: string) => str.replace(/[A-Z]/g, (v) => `-${v.toLowerCase()}`)

const fillPaddingAndContent = (useSolidColor: boolean): CSS.Properties => {
  return {
    ...(useSolidColor
      ? {
          backgroundImage: `linear-gradient(to bottom, ${DEFAULT_CONTENT_COLOR} 0%, ${DEFAULT_CONTENT_COLOR} 100%), linear-gradient(to bottom, ${DEFAULT_PADDING_COLOR} 0%, ${DEFAULT_PADDING_COLOR} 100%) !important`,
          backgroundClip: 'content-box, padding-box !important',
          color: 'black !important',
        }
      : {}),
    outline: `solid 1px ${DEFAULT_BORDER_COLOR} !important`,
    outlineOffset: '-1px',
  }
}

export const createCssString = (useSolidColor: boolean) => {
  const cssProperties: Record<string, CSS.Properties> = {
    '*:not(svg *,code *)': fillPaddingAndContent(useSolidColor),
  }
  const cssString = Object.entries(cssProperties)
    .map(([key, value]) => {
      const singleCss = Object.entries(value)
        .map(([key, value]) => `${toKebab(key)}: ${value}`)
        .join(';')
      return `${key} { ${singleCss} }`
    })
    .join('')

  return cssString
}
