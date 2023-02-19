import { useCallback, useEffect, useId, useState } from 'react'
import './Popup.css'

function App() {
  const [crx, setCrx] = useState('create-chrome-ext')

  const checkboxId = useId()
  const [isWireframe, setIsWireframe] = useState(false)

  function injectedFunction() {
    const createStyleSheet = () => {
      const styleTag = document.createElement('style')
      styleTag.className = 'aparecium-wireframe'
      styleTag.appendChild(
        // cssファイルの読み込みでできないかな？
        document.createTextNode(
          'span { background: red !important; } article {background: blue !important} .ExploreNav_navLink__O0Z_T {background-color: blue;}',
        ),
      )
      return styleTag
    }

    // ページ全体をワイヤーフレームにする
    const styleTag = createStyleSheet()
    const { head } = document
    head.appendChild(styleTag)
  }

  useEffect(() => {
    if (isWireframe) {
      chrome.tabs.query({ active: true, currentWindow: true }).then(([tab]) => {
        if (tab.id) {
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: injectedFunction,
          })
        }
      })
    } else {
      chrome.tabs.query({ active: true, currentWindow: true }).then(([tab]) => {
        if (tab.id) {
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: () => {
              // ページ全体のワイヤーフレームを解除する
              const styleTag = document.querySelector('.aparecium-wireframe')
              if (styleTag) {
                styleTag.remove()
              }
            },
          })
        }
      })
    }
  }, [isWireframe])

  return (
    <main>
      <h3>Popup Page!</h3>

      <h6>v 0.0.0</h6>

      <a href="https://www.npmjs.com/package/create-chrome-ext" target="_blank">
        Power by {crx}
      </a>
      <h1 className="">Aparecium Wireframe</h1>
      <label htmlFor={checkboxId} className="flex items-center m-2 p-16 select-none">
        <input
          id={checkboxId}
          type="checkbox"
          className="mr-2"
          checked={isWireframe}
          onChange={(e) => setIsWireframe(e.target.checked)}
        />
        <span className="text-sm">Toggle Switch</span>
      </label>
      <span>{isWireframe ? 'wireframe' : 'normal'}</span>
      <article>this is article</article>
    </main>
  )
}

export default App
