/* eslint-disable react/no-unknown-property */
import { useGLTF } from '@react-three/drei'
import { useRef } from 'react'

import useLookAt from '~/hooks/use-look-at'
import useMatcaps from '~/hooks/use-matcaps'

import SuspenseLoader from './suspense-loader'

export default function Suzanne(props) {
  const { nodes } = useGLTF('/models/suzanne.glb') as any
  const instancedMeshRef = useRef() as any

  useLookAt(instancedMeshRef)
  const material = useMatcaps({
    name: 'Suzzane',
    defaultMatcap: 'matcap_61.png'
  })

  return (
    <SuspenseLoader text={'Loading Textures'}>
      <instancedMesh ref={instancedMeshRef} {...props} count={30}>
        <mesh geometry={nodes.Suzanne.geometry} material={material} />
      </instancedMesh>
    </SuspenseLoader>
  )
}
