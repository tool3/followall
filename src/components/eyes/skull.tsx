import React, { useEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { Object3D, TextureLoader } from 'three'
import { useFrame, useLoader } from '@react-three/fiber'
import { useControls } from 'leva'

const options = Array.from(
  { length: 61 },
  (_, i) => 'matcap_' + (i + 1) + '.png'
).reduce((acc, curr) => {
  acc[curr.replace('.png', '')] = curr
  return acc
}, {})

export default function Skull(props) {
  const { nodes } = useGLTF('/models/skull.glb') as any

  const instancedMeshRef = useRef() as any
  const count = props.count || 30
  const temp = props.temp || new Object3D()

  useFrame(({ mouse, viewport }) => {
    const x = (mouse.x * viewport.width) / 2.5
    const y = (mouse.y * viewport.height) / 2.5
    instancedMeshRef.current.lookAt(x, y, 1)
  })

  useEffect(() => {
    for (let i = 0; i < count; i++) {
      temp.position.set(Math.random(), Math.random(), Math.random())
      temp.updateMatrix()
      instancedMeshRef.current.setMatrixAt(i, temp.matrix)
    }

    instancedMeshRef.current.instanceMatrix.needsUpdate = true
  }, [])

  options['default'] = 'matcap_placeholder.png'

  const matcap = useControls('Skull', {
    matcap: {
      value: 'matcap_placeholder.png',
      options
    }
  })
  const isDefault = matcap.matcap === 'matcap_placeholder.png'
  const [map] = useLoader(TextureLoader, [`/textures/matcaps/${matcap.matcap}`])
  
  return (
    <instancedMesh ref={instancedMeshRef} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.defaultMaterial001.geometry}
          material={nodes.defaultMaterial001.material}
          rotation={[Math.PI / 2, 0, 0]}
        >
          {isDefault ? <meshStandardMaterial />  :<meshMatcapMaterial matcap={map} />}
        </mesh>
      </group>
    </instancedMesh>
  )
}

useGLTF.preload('/models/skull.glb')
