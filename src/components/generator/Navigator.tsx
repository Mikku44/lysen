'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer'

import InvoiceListPage from './Overview'
import Template from '../Template'
import { Badge } from '../ui/badge'
import { useAppSelector } from '@/app/store/hooks'
import { selectInvoices } from '@/app/store/features/invoices/invoicesSlice'
import { motion } from 'framer-motion'
import { selectUser } from '@/app/store/features/user/userSlice'
import useOnlinePresence from '../firebase/useOnlinePresence'

export default function Navigator () {
  const [open, setOpen] = useState(false)
  const invoiceList = useAppSelector(selectInvoices)
  const user = useAppSelector(selectUser)
  useOnlinePresence(user.id)

  return (
    <div
      className='max-w-7xl mx-auto print:hidden p-6 flex
    gap-5
    lg:flex-row flex-col justify-between'
    >
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <div className='relative lg:w-fit w-full'>
            <motion.div
              key={invoiceList?.length}
              animate={{ scale: 1.2 }}
              initial={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              className=' top-[-10px] right-[-10px] absolute '
            >
              <Badge
                className='h-6 min-w-6 rounded-full font-bold p-1 font-mono tabular-nums'
                variant='destructive'
              >
                {invoiceList?.length}
              </Badge>
            </motion.div>
            <Button className='w-full' variant='outline'>
              See all Quotation
            </Button>
          </div>
        </DrawerTrigger>
        <DrawerContent className='mx-auto'>
          <DrawerHeader>
            <DrawerTitle>Invoice List</DrawerTitle>
            <DrawerDescription>Your recent invoice list</DrawerDescription>
          </DrawerHeader>
          <div className='p-4'>
            <InvoiceListPage />
          </div>
        </DrawerContent>
      </Drawer>

      <div className='flex lg:flex-row flex-col lg:mx-0 mx-auto gap-1 items-end'>
        <div className=''>Customize Template</div>
        <Template />
      </div>
    </div>
  )
}
