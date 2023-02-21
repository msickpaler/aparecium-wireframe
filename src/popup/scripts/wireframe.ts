/**
 * ページ全体をワイヤーフレームにする
 */
export const toWireframe = (cssString: string) => {
  const createStyleSheet = () => {
    const styleTag = document.createElement('style')
    styleTag.className = 'aparecium-wireframe'
    styleTag.appendChild(
      // cssファイルの読み込みでできないかな？
      document.createTextNode(cssString),
    )
    return styleTag
  }

  const styleTag = createStyleSheet()
  const { head } = document
  head.appendChild(styleTag)
}

/**
 * ページ全体のワイヤーフレームを解除する
 */
export const removeWireframe = () => {
  const styleTag = document.querySelector('.aparecium-wireframe')
  if (styleTag) {
    styleTag.remove()
  }
}
