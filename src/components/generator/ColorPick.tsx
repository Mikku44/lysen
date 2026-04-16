import { ColorPicker, useColor } from 'react-color-palette'
import 'react-color-palette/css'
import * as Popover from '@radix-ui/react-popover' // Standard way to import Radix
import React from 'react'

interface IColorPickProps {
  onPick?: (value: string) => void
  color: string
}

export default function ColorPick({ onPick, color }: Readonly<IColorPickProps>) {
  // Ensure we have a fallback for the hook
  const [currentColor, setColor] = useColor(color ?? "#121212");

  return (
    <div>
      <Popover.Root>
        <Popover.Trigger
          className="flex h-9 items-center justify-center rounded-md border border-gray-200/50 bg-primary px-4 py-2 text-sm font-medium shadow-xs transition-all hover:bg-primary/90 hover:brightness-110"
        >
          {/* Adding a visual element so the trigger has a non-zero height/width */}
          {/* <div 
            className="mr-2 size-4 rounded-sm border border-gray-400" 
            style={{ backgroundColor: currentColor.hex }} 
          /> */}
          {/* {currentColor.hex} */}
        </Popover.Trigger>

        <Popover.Portal>
          <Popover.Content 
            sideOffset={5} 
            className="z-50 rounded-md shadow-lg outline-none"
          >
            <div className="w-[300px] gap-1 rounded-md bg-white p-1">
              <ColorPicker
                color={currentColor}
                onChange={setColor}
                onChangeComplete={(color) => onPick?.(color.hex)}
              />
            </div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  )
}