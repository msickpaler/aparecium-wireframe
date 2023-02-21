import { CSSProperties, useId } from 'react'
import { useWireframe } from './useWireframe'

const styles: Record<string, CSSProperties> = {
  rootContainer: { margin: '1rem' },
  title: { textAlign: 'center' },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    gridTemplateRows: 'repeat(auto-fill, minmax(0,1fr))',
    gap: '1rem',
    alignItems: 'center',
  },
}

function App() {
  const checkboxId = useId()

  const { isWireframe, onChangeIsWireframe } = useWireframe()

  return (
    <main style={styles.rootContainer}>
      <h1 style={styles.title}>Aparecium Wireframe</h1>
      <div style={styles.grid}>
        <span>onoff</span>
        <div>
          <input
            id={checkboxId}
            type="checkbox"
            style={{ marginRight: 4 }}
            checked={isWireframe}
            onChange={onChangeIsWireframe}
          />
          <label htmlFor={checkboxId}>Toggle Switch</label>
        </div>
      </div>
    </main>
  )
}

export default App
