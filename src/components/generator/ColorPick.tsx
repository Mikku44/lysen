import { ColorPicker, useColor } from 'react-color-palette'
import 'react-color-palette/css'
import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from '@radix-ui/react-popover'
import React from 'react'

interface IColorPickProps {
  onPick?: (value:string) => void
  color: string
}

export default function ColorPick ({
  onPick,
  color
}: Readonly<IColorPickProps>) {
  const [currentColor, setColor] = useColor(color)



  return (
    <div>
      <Popover>
        <PopoverTrigger
          className='flex border border-gray-200/50 items-center gap-2  hover:brightness-110
justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all 
disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none 
[&_svg:not([class*="size-"])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none
 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]
  aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive 
  bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 h-9 px-4 py-2 
  has-[>svg]:px-3
        '
        >
          {/* <div className="size-10"
          style={{
            background:color
          }}
          ></div> */}
        </PopoverTrigger>
        <PopoverContent>
          <div className='rounded-md   shadow grid my-1 gap-1 w-[300px]'>
            <ColorPicker color={currentColor}
            onChange={setColor}
            onChangeComplete={(currentColor) => onPick?.(currentColor.hex)} />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
