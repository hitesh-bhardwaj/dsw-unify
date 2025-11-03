import React from 'react'
import { LeftArrow } from '../Icons'
import Link from 'next/link'
import { Button } from '../ui/button'

const LeftArrowAnim = ({link}) => {
  return (
   <>
   <Link href={link} className="group inline-flex">
  <Button variant="ghost" size="icon" className="shrink-0 w-fit -mt-0.5">
    <div className="relative w-4 h-4 overflow-hidden">
      <span
        className="
          absolute inset-0 flex items-center justify-center
          transform translate-x-0
          duration-0
          group-hover:-translate-x-full group-hover:duration-300 group-hover:ease-out
        "
      >
        <LeftArrow />
      </span>
      <span
        className="
          absolute inset-0 flex items-center justify-center
          transform translate-x-full
          duration-0
          group-hover:translate-x-0 group-hover:duration-300 group-hover:ease-out group-hover:delay-75
        "
      >
        <LeftArrow />
      </span>
    </div>
  </Button>
</Link></>
  )
}

export default LeftArrowAnim