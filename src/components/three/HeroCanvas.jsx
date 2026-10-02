import { Component, Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import ParticleField from './ParticleField.jsx'
import { useTheme } from '../../hooks/useTheme.js'

// Some browsers/machines have WebGL disabled (hardware acceleration off,
// blocklisted GPU, sandboxed VMs). Probe once up front so we never ask
// three.js for a context that can't be created.
let webglSupport = null
function isWebGLAvailable() {
  if (webglSupport !== null) return webglSupport
  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')
    webglSupport = !!gl
    gl?.getExtension('WEBGL_lose_context')?.loseContext()
  } catch {
    webglSupport = false
  }
  return webglSupport
}

// The probe can pass and context creation can still fail (e.g. GPU process
// crash), so the canvas is also fenced off — the particle field is pure
// decoration and must never take the rest of the page down with it.
class CanvasErrorBoundary extends Component {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error) {
    console.warn('HeroCanvas disabled:', error.message)
  }

  render() {
    return this.state.failed ? null : this.props.children
  }
}

export default function HeroCanvas() {
  const { theme } = useTheme()
  const [glowColor, setGlowColor] = useState('#6ee7f9')
  const [supported] = useState(isWebGLAvailable)

  useEffect(() => {
    const value = getComputedStyle(document.documentElement).getPropertyValue('--accent-glow').trim()
    if (value) setGlowColor(value)
  }, [theme])

  if (!supported) return null

  return (
    <CanvasErrorBoundary>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
        className="!absolute inset-0"
      >
        <Suspense fallback={null}>
          <ParticleField color={glowColor} theme={theme} />
        </Suspense>
      </Canvas>
    </CanvasErrorBoundary>
  )
}
