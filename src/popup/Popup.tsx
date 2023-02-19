import { useCallback, useEffect, useId, useState } from 'react'
import './Popup.css'

function App() {
  const [crx, setCrx] = useState('create-chrome-ext')

  const checkboxId = useId()
  const [isWireframe, setIsWireframe] = useState(false)

  const createStyleSheet = useCallback(() => {
    const styleTag = document.createElement('style')
    styleTag.className = 'aparecium-wireframe'
    styleTag.appendChild(
      // cssファイルの読み込みでできないかな？
      document.createTextNode(
        'span { background: red !important; } article {background: blue !important} .ExploreNav_navLink__O0Z_T {background-color: blue;}',
      ),
    )
    return styleTag
  }, [])

  // function injectedFunction() {
  //   console.log("injectedFunction");
  //   document.body.style.backgroundColor = "orange";
  // }

  useEffect(() => {
    if (isWireframe) {
      // // ページ全体をワイヤーフレームにする
      const styleTag = createStyleSheet()
      const { head } = document
      console.log('head', head)
      head.appendChild(styleTag)
      // chrome.action.onClicked.addListener((tab) => {
      //   if (tab.id) {
      //     chrome.scripting.executeScript({
      //       target: { tabId: tab.id },
      //       func: injectedFunction,
      //     });
      //   }
      // });
    } else {
      // ページ全体のワイヤーフレームを解除する
      const styleTag = document.querySelector('.aparecium-wireframe')
      console.log('styleTag', styleTag)
      if (styleTag) {
        styleTag.remove()
      }
    }
  }, [createStyleSheet, isWireframe])

  console.log(`render`)
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
