import { useId, useState, useEffect } from 'react'
import { createCssString } from './scripts/create-css-string'
import { toWireframe, removeWireframe } from './scripts/wireframe'

export const useWireframe = () => {
  const [isWireframe, setIsWireframe] = useState(false)

  const onChangeIsWireframe = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsWireframe(e.target.checked)
  }

  useEffect(() => {
    if (isWireframe) {
      // devではundefinedになる
      chrome?.tabs?.query({ active: true, currentWindow: true }).then(([tab]) => {
        if (tab.id) {
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: toWireframe,
            args: [createCssString(false)],
          })
        }
      })
    } else {
      // FIXME 拡張機能をオンにして拡張機能のポップアップを閉じ、もう一度拡張機能を開くとワイヤーフレームが解除される。閉じたときにunmountされ状態が破棄されるから。
      // devではundefinedになる
      chrome?.tabs?.query({ active: true, currentWindow: true }).then(([tab]) => {
        if (tab.id) {
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: removeWireframe,
          })
        }
      })
    }
  }, [isWireframe])

  return {
    isWireframe,
    onChangeIsWireframe,
  }
}
