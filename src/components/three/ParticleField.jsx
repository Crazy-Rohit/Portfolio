import { useMemo, useRef, useState, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

function randomInSphere(count, radius) {
  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    // rejection sampling keeps points evenly distributed inside the sphere
    let x, y, z
    do {
      x = Math.random() * 2 - 1
      y = Math.random() * 2 - 1
      z = Math.random() * 2 - 1
    } while (x * x + y * y + z * z > 1)
    positions[i * 3] = x * radius
    positions[i * 3 + 1] = y * radius
    positions[i * 3 + 2] = z * radius
  }
  return positions
}

export default function ParticleField({ color = '#6ee7f9', theme = 'dark' }) {
  const groupRef = useRef(null)
  const { size } = useThree()
  const target = useRef({ x: 0, y: 0 })

  // fewer particles on small screens — keeps the hero canvas cheap on mobile
  const count = size.width < 640 ? 350 : size.width < 1024 ? 600 : 900
  const positions = useMemo(() => randomInSphere(count, 2.6), [count])

  useEffect(() => {
    function handlePointerMove(e) {
      target.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      target.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('pointermove', handlePointerMove)
    return () => window.removeEventListener('pointermove', handlePointerMove)
  }, [])

  useFrame((_, delta) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y += delta * 0.05
    // small, subtle tilt toward the cursor — a few degrees only
    groupRef.current.rotation.x += (target.current.y * 0.15 - groupRef.current.rotation.x) * 0.03
    groupRef.current.rotation.z += (-target.current.x * 0.1 - groupRef.current.rotation.z) * 0.03
  })

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={size.width < 640 ? 0.028 : 0.02}
          color={color}
          transparent
          // Additive blending glows nicely on a dark background but washes
          // out to near-invisible on a light one — use normal blending with
          // fuller opacity there so particles read as visible dots instead.
          opacity={theme === 'dark' ? 0.75 : 0.9}
          sizeAttenuation
          depthWrite={false}
          blending={theme === 'dark' ? THREE.AdditiveBlending : THREE.NormalBlending}
        />
      </points>
    </group>
  )
}
