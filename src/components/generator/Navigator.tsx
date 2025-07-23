'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'

import InvoiceListPage from './Overview'
import Template from '../Template'

export default function Navigator() {
  const [open, setOpen] = useState(false)

  return (
    <div className="max-w-7xl mx-auto print:hidden p-6 flex justify-between">
      
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button variant="outline">See all invoice</Button>
        </DrawerTrigger>
        <DrawerContent className="mx-auto">
          <DrawerHeader>
            <DrawerTitle>Invoice List</DrawerTitle>
            <DrawerDescription>Your recent invoice list</DrawerDescription>
          </DrawerHeader>
          <div className="p-4">
            <InvoiceListPage />
          </div>
        </DrawerContent>
      </Drawer>

      <Template />
    </div>
  )
}
