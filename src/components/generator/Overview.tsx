'use client'

import React from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAppDispatch, useAppSelector } from '@/app/store/hooks'
import { removeInvoiceByIndex } from '@/app/store/features/invoices/invoicesSlice'

export default function InvoiceListPage() {
  const invoices = useAppSelector(state => state.invoice.invoices)
  const dispatch = useAppDispatch()

  const handleRemove = (index: number) => {
    if (confirm('Are you sure you want to delete this invoice?')) {
      dispatch(removeInvoiceByIndex(index))
    }
  }

  if (invoices.length === 0) {
    return (
      <div className='p-6 text-center text-gray-500'>
        No invoices yet.
      </div>
    )
  }

  return (
    <div className='p-6 space-y-4  mx-auto shadow-[inset_0px_-8px_40px_-8px_#46464620] rounded-xl pb-10'>
     
      <div className='grid max-h-[60vh] overflow-auto px-2 gap-4 '>
        {invoices.map((invoice, index) => (
          <Card key={invoice.invoiceNumber} className='shadow-none hover:ring hover:ring-[var(--primary)]/20 ring-offset-1 '>
            <CardHeader className=''>
              
              <CardTitle className='text-lg flex justify-between items-center'>
                <div className="flex gap-2 items-center">
                  <div className="px-4 py-2 font-normal text-sm bg-[var(--primary)] rounded-full">{invoice.invoiceNumber}</div>
                  <div className=""></div>
                </div>
                <Button
                  variant='destructive'
                  size='sm'
                  onClick={() => handleRemove(index)}
                  className=''
                >
                  Delete
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className='text-sm space-y-1'>
              <div>
                <strong>To:</strong> <span className="font-[400] ">{invoice.toCompany || "No records found"}</span>
              </div>
              <div>
                <strong>Date:</strong> <span className="font-[400] ">{invoice.date || "No records found"}</span>
              </div>
              <div>
                <strong>Due:</strong> <span className="font-[400] ">{invoice.dueDate || "No records found"}</span>
              </div>
              <div>
                <strong>Items:</strong> <span className="font-[400] ">{invoice.items.length || "No records found"}</span>
              </div>
              <div>
                <strong>Tax:</strong> <span className="font-[400] ">{invoice.taxs.length || "No records found"}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
