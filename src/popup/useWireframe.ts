import { useId, useState, useEffect } from 'react'
import { createCssString } from './scripts/create-css-string'
import { toWireframe, removeWireframe, checkWireframeExists } from './scripts/wireframe'

// dark readerはbackendで動いているので、そっちにしたほうがいいかも？
export const useWireframe = () => {
  const [isWireframe, setIsWireframe] = useState(false)

  useEffect(() => {
    chrome?.tabs?.query({ active: true, currentWindow: true }).then(([tab]) => {
      if (tab.id) {
        chrome.scripting.executeScript(
          {
            target: { tabId: tab.id },
            func: checkWireframeExists,
          },
          (result) => {
            setIsWireframe(result[0].result)
          },
        )
      }
    })
  }, [])

  const onChangeIsWireframe = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsWireframe(e.target.checked)

    if (e.target.checked) {
      console.log(`check`)
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
      return
    }
    console.log(`uncheck`)
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

  return {
    isWireframe,
    onChangeIsWireframe,
  }
}
