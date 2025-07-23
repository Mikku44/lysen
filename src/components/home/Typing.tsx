'use client'

import { TypeAnimation } from "react-type-animation"

export default function Typing () {
  return (
    <TypeAnimation
      sequence={['(Lāy sĕn)', 500, '(ลายเซ็น)', 500, '(Signature)', 500,'(サイン)',500,'(签名)',500,'(서명)',500]}
      repeat={Infinity}
    />
  )
}
