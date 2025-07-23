import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from '@radix-ui/react-popover'
import { Download } from 'lucide-react'
import React from 'react'

interface IExportProps {
  onExport?: () => void;
  
}

export default function Export ({ onExport }: Readonly<IExportProps>) {
  async function exportPDF () {
    window.print()
    
  }


  return (
    <div>
      <Popover>
        <PopoverTrigger
        onClick={onExport}
          className='flex items-center gap-2  hover:brightness-110
justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all 
disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none 
[&_svg:not([class*="size-"])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none
 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]
  aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive 
  bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 h-9 px-4 py-2 
  has-[>svg]:px-3
        '
        >
          <Download className='w-4 h-4' />
          Export File
        </PopoverTrigger>
        <PopoverContent>
          <div className='rounded-md border bg-white p-1 shadow grid my-1 gap-1 max-w-[180px]'>
            <Button
              onClick={exportPDF}
              className='flex bg-white rounded-none text-black hover:bg-gray-300/20 shadow-none items-center gap-2 w-full hover:brightness-110'
            >
              <Download className='w-4 h-4' />
              <div className='w-[120px]'>.PDF (PDF File)</div>
            </Button>
            <hr />
            <Button className='flex bg-white rounded-none text-black hover:bg-gray-300/20 shadow-none items-center gap-2 w-full hover:brightness-110'>
              <Download className='w-4 h-4' />
              <div className='w-[120px]'>.Docx (Word File)</div>
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
