import { useWireframe } from './useWireframe'
import { Box, Checkbox, Group, Stack, Text } from '@mantine/core'

function App() {
  const { isWireframe, onChangeIsWireframe } = useWireframe()

  return (
    <Box p="xs">
      <Text align="center" size="xl" fw="bold" fz={28} mb="xs">
        Aparecium Wireframe
      </Text>
      <Stack p="xs">
        <Group align="center">
          <Checkbox
            checked={isWireframe}
            onChange={onChangeIsWireframe}
            label="Wireframe"
            style={{
              userSelect: 'none',
            }}
          />
        </Group>
      </Stack>
    </Box>
  )
}

export default App
