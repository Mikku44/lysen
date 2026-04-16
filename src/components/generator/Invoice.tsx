'use client'

import { RefObject, useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Minus, Download, Eye, CloudUpload } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '@/app/store/hooks'
import {
  resetCurrentInvoice,
  selectInvoice,
  setCurrentInvoice,
  upsertInvoice
} from '@/app/store/features/invoices/invoicesSlice'
import SignatureCanvas from './SignatureCanvas'
import { toast } from '../toast'
import { NumbertoPrice } from '@/lib/currencyFormator'
import Export from './Export'
import { selectTemplate } from '@/app/store/features/template/templateSlice'
import { templateList } from '@/app/constant/app'


interface InvoiceItem {
  id: string
  description: string
  quantity: number
  price: number
}

interface Taxs {
  id: string
  type: 'percent' | 'price'
  name: string
  value: number
}

interface InvoiceData {
  invoiceNumber: string
  date: string
  dueDate: string
  fromCompany: string
  fromAddress: string
  toCompany: string
  toAddress: string
  items: InvoiceItem[]
  taxs: Taxs[]
  notes: string
  terms: string
  constructorName: string
  constructorSign: string
  // Payment fields for receipt
  paymentMethod?: 'cash' | 'transfer' | 'promptpay'
  promptPayId?: string
  bankName?: string
  bankAccount?: string
  accountHolder?: string
}

export default function InvoiceGenerator() {
  const { currency } = useAppSelector(selectTemplate)
  const currentInvoice = useAppSelector(selectInvoice)
  const { t } = useTranslation()
  const [refreshKey, setRefreshKey] = useState(0)
  const invoiceRef = useRef<HTMLElement>(null)
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    invoiceNumber: '',
    date: new Date().toISOString().split('T')[0],
    dueDate: '',
    fromCompany: '',
    fromAddress: '',
    toCompany: '',
    toAddress: '',
    items: [{ id: '1', description: '', quantity: 1, price: 0 }],
    taxs: [],
    notes: '',
    terms: '',
    constructorName: '',
    constructorSign: '',
    // Payment fields
    paymentMethod: 'cash',
    promptPayId: '',
    bankName: '',
    bankAccount: '',
    accountHolder: ''
  })

  const [showPreview, setShowPreview] = useState(false)
  const dispatch = useAppDispatch()
  // const currencies = ['THB', 'USD', 'JPY', 'KRW', 'CNY', 'MYR']
  // const switchCurrency = () => {
  //   const currentIndex = currencies.indexOf(currency)
  //   const nextIndex = (currentIndex + 1) % currencies.length
  //   setCurrency(currencies[nextIndex])
  // }
  // const toggleLang = () => {
  //   const newLang = i18n.language === 'en' ? 'th' : 'en'
  //   i18n.changeLanguage(newLang)
  //   dispatch(setLang(newLang))

  // }

  const [currentForm, setCurrentForm] = useState('invoice')
  const [index, setIndex] = useState(0)

  const saveInvoice = () => {
    toast('Quotation has been saved!')
    dispatch(upsertInvoice(invoiceData))
  }

  const importInvoice = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json'; // Only allow JSON files

    input.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0];

      if (file) {
        const reader = new FileReader();

        reader.onload = (event) => {
          try {
            // 2. Parse the file content
            const json = JSON.parse(event.target?.result as string);

            // 3. Basic Validation: Check if it looks like an invoice
            if (json.invoiceNumber && Array.isArray(json.items)) {

              // 4. Update Redux Store
              dispatch(upsertInvoice(json));

              // Optional: If you want to switch to this invoice immediately
              dispatch(setCurrentInvoice(json));

              toast('Invoice has been imported!');
            } else {
              toast('Invalid invoice format.');
            }
          } catch (error) {
            console.error("Import Error:", error);
            toast('Failed to parse file.');
          }
        };

        reader.readAsText(file);
      }
    };

    input.click();
  }

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      description: '',
      quantity: 1,
      price: 0
    }
    setInvoiceData(prev => ({
      ...prev,
      items: [...prev.items, newItem]
    }))
  }

  const removeItem = (id: string) => {
    setInvoiceData(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id)
    }))
  }

  const updateItem = (
    id: string,
    field: keyof InvoiceItem,
    value: string | number
  ) => {
    setInvoiceData(prev => ({
      ...prev,
      items: prev.items.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    }))
  }

  const addTax = () => {
    const newTax: Taxs = {
      id: Date.now().toString(),
      type: 'percent',
      name: '',
      value: 0
    }

    setInvoiceData(prev => ({
      ...prev,
      taxs: [...prev.taxs, newTax]
    }))
  }

  const removeTax = (id: string) => {
    setInvoiceData(prev => ({
      ...prev,
      taxs: prev.taxs.filter(tax => tax.id !== id)
    }))
  }

  const updateTax = (id: string, field: keyof Taxs, value: string | number) => {
    setInvoiceData(prev => ({
      ...prev,
      taxs: prev.taxs.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    }))
  }

  const calculateTotal = () => {
    const subtotal = calculateSubtotal()
    const totalTax = invoiceData.taxs.reduce((sum, tax) => {
      if (tax.type === 'percent') {
        return sum + (tax.value / 100) * subtotal
      } else {
        return sum + tax.value
      }
    }, 0)

    return subtotal + totalTax
  }

  const handleInputChange = (field: keyof InvoiceData, value: string) => {
    setInvoiceData(prev => ({ ...prev, [field]: value }))
  }

  const calculateSubtotal = () => {
    return invoiceData.items.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    )
  }

  const handleSwitchForm = () => {

    let idx = index
    if (index == 0) {
      setIndex(1)
      idx = 1
    } else {
      setIndex(0)
      idx = 0
    }
    setCurrentForm(templateList[idx])
  }

  useEffect(() => {
    handleInputChange('invoiceNumber', `INV-${Date.now()}`)
    setRefreshKey(prev => prev + 1)
  }, [])

  useEffect(() => {
    setInvoiceData(currentInvoice)
  }, [currentInvoice])

  return (
    <div className='min-h-screen bg-white'>
      <div className='max-w-7xl mx-auto p-6'>
        {/* Header */}
        <div className='flex print:hidden lg:flex-row flex-col gap-5 items-center justify-between mb-8'>
          <div>
            <div className='max-w-3xl'>{JSON.stringify(selectInvoice)}</div>
            <h1 className='text-3xl font-light text-black'>
              Quotation Generator
            </h1>
            <p className='text-gray-600 mt-1'>
              Create professional Quotations in minutes
            </p>
          </div>
          <div className='flex gap-3 flex-wrap justify-center'>
            {/* <Button onClick={switchCurrency}>{currency}</Button>
            <Button onClick={toggleLang}>
              {i18n.language === 'en' ? 'TH' : 'EN'}
            </Button> */}
            <Button
              variant='outline'
              onClick={() => dispatch(resetCurrentInvoice())}
              className='flex items-center gap-2'
            >
              New Quatation
            </Button>
            <Button
              variant='outline'
              onClick={() => setShowPreview(!showPreview)}
              className='flex items-center gap-2'
            >
              <Eye className='w-4 h-4' />
              {showPreview ? 'Edit' : 'Preview'}
            </Button>
            <Button
              onClick={importInvoice}
              className='flex items-center gap-2  hover:brightness-110'
            >
              <CloudUpload className='w-4 h-4' />
              Import
            </Button>
            <Export
              key={refreshKey}
              invoiceData={invoiceData}
              onExport={() => {
                setShowPreview(true)
              }}
            ></Export>
            <Button
              onClick={saveInvoice}
              className='flex items-center gap-2  hover:brightness-110'
            >
              <Download className='w-4 h-4' />
              Keep on your device
            </Button>

            <Button
              onClick={handleSwitchForm}
              className='flex items-center gap-2  hover:brightness-110'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
              >
                <path
                  fill='currentColor'
                  d='M8.625 8.5h-4.5a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v3.5h3.5a1 1 0 0 1 0 2'
                />
                <path
                  fill='currentColor'
                  d='M21 13a1 1 0 0 1-1-1A7.995 7.995 0 0 0 5.08 8.001a1 1 0 0 1-1.731-1.002A9.995 9.995 0 0 1 22 12a1 1 0 0 1-1 1m-1.125 9a1 1 0 0 1-1-1v-3.5h-3.5a1 1 0 0 1 0-2h4.5a1 1 0 0 1 1 1V21a1 1 0 0 1-1 1'
                />
                <path
                  fill='currentColor'
                  d='M12 22A10.01 10.01 0 0 1 2 12a1 1 0 0 1 2 0a7.995 7.995 0 0 0 14.92 3.999a1 1 0 0 1 1.731 1.002A10.03 10.03 0 0 1 12 22'
                />
              </svg>
              Switch to Receive
            </Button>
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          {/* Form Section */}
          {!showPreview && (
            <div className='space-y-6'>
              {/* Invoice Details */}
              <Card>
                <CardHeader>
                  <CardTitle className='text-lg font-medium'>
                    {t('invoiceDetails')}
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-1'>
                        {t('invoiceNumber')}
                      </label>
                      <Input
                        value={invoiceData.invoiceNumber}
                        onChange={e =>
                          handleInputChange('invoiceNumber', e.target.value)
                        }
                        placeholder='INV-001'
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-1'>
                        {t('date')}
                      </label>
                      <Input
                        type='date'
                        value={invoiceData.date}
                        onChange={e =>
                          handleInputChange('date', e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      {t('dueDate')}
                    </label>
                    <Input
                      type='date'
                      value={invoiceData.dueDate}
                      className=''
                      onChange={e =>
                        handleInputChange('dueDate', e.target.value)
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              {/* From Section */}
              <Card>
                <CardHeader>
                  <CardTitle className='text-lg font-medium'>
                    {t('from')}
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      {t('companyName')}
                    </label>
                    <Input
                      value={invoiceData.fromCompany}
                      onChange={e =>
                        handleInputChange('fromCompany', e.target.value)
                      }
                      placeholder={t('yourCompanyName')}
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      {t('address')}
                    </label>
                    <Textarea
                      value={invoiceData.fromAddress}
                      onChange={e =>
                        handleInputChange('fromAddress', e.target.value)
                      }
                      placeholder={t('yourCompanyAddress')}
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* To Section */}
              <Card>
                <CardHeader>
                  <CardTitle className='text-lg font-medium'>
                    {t('billTo')}
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      {t('clientName')}
                    </label>
                    <Input
                      value={invoiceData.toCompany}
                      onChange={e =>
                        handleInputChange('toCompany', e.target.value)
                      }
                      placeholder={t('clientCompanyName')}
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      {t('address')}
                    </label>
                    <Textarea
                      value={invoiceData.toAddress}
                      onChange={e =>
                        handleInputChange('toAddress', e.target.value)
                      }
                      placeholder={t('clientAddress')}
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Items Section */}
              <Card>
                <CardHeader>
                  <CardTitle className='text-lg font-medium flex items-center justify-between'>
                    {t('items')}
                    <Button
                      onClick={addItem}
                      size='sm'
                      variant='outline'
                      className='flex items-center gap-1 bg-transparent'
                    >
                      <Plus className='w-4 h-4' />
                      {t('addItem')}
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                  {invoiceData.items.map(item => (
                    <div
                      key={item.id}
                      className='grid grid-cols-12 gap-2 items-end'
                    >
                      <div className='col-span-5'>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                          {t('description')}
                        </label>
                        <Input
                          value={item.description}
                          onChange={e =>
                            updateItem(item.id, 'description', e.target.value)
                          }
                          placeholder={t('itemDescription')}
                        />
                      </div>
                      <div className='col-span-2'>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                          {t('qty')}
                        </label>
                        <Input
                          type='number'
                          value={item.quantity}
                          onChange={e =>
                            updateItem(
                              item.id,
                              'quantity',
                              Number.parseInt(e.target.value) || 0
                            )
                          }
                          min='1'
                        />
                      </div>
                      <div className='col-span-3'>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                          {t('price')}
                        </label>
                        <Input
                          type='number'
                          value={item.price}
                          onChange={e =>
                            updateItem(
                              item.id,
                              'price',
                              Number.parseFloat(e.target.value) || 0
                            )
                          }
                          step='0.01'
                          min='0'
                        />
                      </div>
                      <div className='col-span-2'>
                        <Button
                          onClick={() => removeItem(item.id)}
                          size='sm'
                          variant='outline'
                          disabled={invoiceData.items.length === 1}
                          className='w-full'
                        >
                          <Minus className='w-4 h-4' />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
              {/* Taxs Section */}
              <Card>
                <CardHeader>
                  <CardTitle className='text-lg font-medium flex items-center justify-between'>
                    {t('tax')}
                    <Button
                      onClick={addTax}
                      size='sm'
                      variant='outline'
                      className='flex items-center gap-1 bg-transparent'
                    >
                      <Plus className='w-4 h-4' />
                      {t('addItem')}
                    </Button>
                  </CardTitle>
                </CardHeader>

                <CardContent className='space-y-4'>
                  {invoiceData.taxs.map(item => (
                    <div
                      key={item.id}
                      className='grid grid-cols-12 gap-2 items-end'
                    >
                      {/* Tax name */}
                      <div className='col-span-5'>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                          {t('name')}
                        </label>
                        <Input
                          value={item.name}
                          onChange={e =>
                            updateTax(item.id, 'name', e.target.value)
                          }
                          placeholder={t('name')}
                        />
                      </div>

                      {/* Tax type: select between "percent" and "price" */}
                      <div className='col-span-2'>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                          {t('type')}
                        </label>
                        <select
                          value={item.type}
                          onChange={e =>
                            updateTax(
                              item.id,
                              'type',
                              e.target.value as 'percent' | 'price'
                            )
                          }
                          className='w-full px-3 py-2 border rounded-md'
                        >
                          <option value='percent'>{t('percent')}</option>
                          <option value='price'>{t('price')}</option>
                        </select>
                      </div>

                      {/* Tax value */}
                      <div className='col-span-3'>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                          {t('value')}
                        </label>
                        <Input
                          type='number'
                          value={item.value}
                          onChange={e =>
                            updateTax(
                              item.id,
                              'value',
                              parseFloat(e.target.value) || 0
                            )
                          }
                          step='0.01'
                          min='0'
                        />
                      </div>

                      {/* Remove Button */}
                      <div className='col-span-2'>
                        <Button
                          onClick={() => removeTax(item.id)}
                          size='sm'
                          variant='outline'
                          className='w-full'
                        >
                          <Minus className='w-4 h-4' />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Notes Section */}
              <Card>
                <CardHeader>
                  <CardTitle className='text-lg font-medium'>
                    {t('notes')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={invoiceData.notes}
                    onChange={e => handleInputChange('notes', e.target.value)}
                    placeholder={t('additionalNotes')}
                    rows={3}
                  />
                </CardContent>
              </Card>
              {/* terms Section */}
              <Card>
                <CardHeader>
                  <CardTitle className='text-lg font-medium'>
                    {t('terms')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={invoiceData.terms}
                    onChange={e => handleInputChange('terms', e.target.value)}
                    placeholder={t('additionalTerms')}
                    rows={3}
                  />
                </CardContent>
              </Card>

              {/* Construtor */}
              <Card>
                <CardHeader>
                  <CardTitle className='text-lg font-medium'>
                    {t('Construtor')}
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      {t('constructorName')}
                    </label>
                    <Input
                      value={invoiceData.constructorName}
                      onChange={e =>
                        handleInputChange('constructorName', e.target.value)
                      }
                      placeholder={t('constructorName')}
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      {t('signature')}
                    </label>
                    {/* canvas */}

                    <SignatureCanvas
                      value={invoiceData.constructorSign}
                      onChange={dataUrl =>
                        handleInputChange('constructorSign', dataUrl)
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Payment Section - Only for Receipt */}
              {currentForm === 'receipt' && (
                <Card>
                  <CardHeader>
                    <CardTitle className='text-lg font-medium'>
                      {t('paymentMethod') || 'Payment Method'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-4'>
                    {/* Payment Method Selection */}
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        {t('selectPaymentMethod') || 'Select Payment Method'}
                      </label>
                      <div className='flex gap-2 flex-wrap'>
                        <Button
                          type='button'
                          variant={invoiceData.paymentMethod === 'cash' ? 'default' : 'outline'}
                          onClick={() => handleInputChange('paymentMethod', 'cash')}
                          className='flex-1'
                        >
                          {t('cash') || 'Cash'}
                        </Button>
                        <Button
                          type='button'
                          variant={invoiceData.paymentMethod === 'transfer' ? 'default' : 'outline'}
                          onClick={() => handleInputChange('paymentMethod', 'transfer')}
                          className='flex-1'
                        >
                          {t('bankTransfer') || 'Bank Transfer'}
                        </Button>
                        <Button
                          type='button'
                          variant={invoiceData.paymentMethod === 'promptpay' ? 'default' : 'outline'}
                          onClick={() => handleInputChange('paymentMethod', 'promptpay')}
                          className='flex-1'
                        >
                          PromptPay
                        </Button>
                      </div>
                    </div>

                    {/* Bank Transfer Fields */}
                    {invoiceData.paymentMethod === 'transfer' && (
                      <div className='space-y-3'>
                        <div>
                          <label className='block text-sm font-medium text-gray-700 mb-1'>
                            {t('bankName') || 'Bank Name'}
                          </label>
                          <Input
                            value={invoiceData.bankName || ''}
                            onChange={e =>
                              handleInputChange('bankName', e.target.value)
                            }
                            placeholder={t('enterBankName') || 'e.g., Kasikorn Bank'}
                          />
                        </div>
                        <div>
                          <label className='block text-sm font-medium text-gray-700 mb-1'>
                            {t('accountHolder') || 'Account Holder Name'}
                          </label>
                          <Input
                            value={invoiceData.accountHolder || ''}
                            onChange={e =>
                              handleInputChange('accountHolder', e.target.value)
                            }
                            placeholder={t('enterAccountHolder') || 'Account holder name'}
                          />
                        </div>
                        <div>
                          <label className='block text-sm font-medium text-gray-700 mb-1'>
                            {t('bankAccount') || 'Bank Account Number'}
                          </label>
                          <Input
                            value={invoiceData.bankAccount || ''}
                            onChange={e =>
                              handleInputChange('bankAccount', e.target.value)
                            }
                            placeholder={t('enterBankAccount') || 'Account number'}
                          />
                        </div>
                      </div>
                    )}

                    {/* PromptPay Fields */}
                    {invoiceData.paymentMethod === 'promptpay' && (
                      <div className='space-y-4'>
                        <div>
                          <label className='block text-sm font-medium text-gray-700 mb-1'>
                            {t('promptPayId') || 'PromptPay ID / Mobile Number'}
                          </label>
                          <Input
                            value={invoiceData.promptPayId || ''}
                            onChange={e =>
                              handleInputChange('promptPayId', e.target.value)
                            }
                            placeholder={t('enterPromptPayId') || 'e.g., 0812345678 or ID number'}
                            maxLength={13}
                          />
                          <p className='text-xs text-gray-500 mt-1'>
                            Enter phone number (10 digits) or Thai national ID (13 digits)
                          </p>
                        </div>
                        {/* QR Code Display */}
                        
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Preview Section */}
          <div
            ref={invoiceRef as RefObject<HTMLDivElement>}
            className={`${showPreview ? 'lg:col-span-2' : ''
              } font-sarabun duration-200 `}
          >
            <Card className='h-fit   shadow-none'>
              <CardContent className='p-8 flex flex-col min-h-[1400px] justify-between'>
                <div className='space-y-8'>
                  {/* Header */}
                  <div className='flex justify-between items-start'>
                    <div>
                      <h2 className='text-2xl font-bold text-black'>
                        {t(currentForm)}
                      </h2>
                      <p className='text-gray-600'>
                        {invoiceData.invoiceNumber}
                      </p>
                    </div>
                    <div className='text-right'>
                      <p className='text-sm text-gray-600'>
                        {t('date')}: {invoiceData.date}
                      </p>
                      {invoiceData.dueDate && (
                        <p className='text-sm text-gray-600'>
                          {t('due')}: {invoiceData.dueDate}
                        </p>
                      )}
                    </div>
                  </div>

                  <hr />
                  {/* From/To */}
                  <div className='grid grid-cols-12 gap-8 '>
                    <div className='col-span-8'>
                      <h3 className='font-medium text-black mb-2'>
                        {t('from')}:
                      </h3>
                      <div className='text-sm text-gray-700'>
                        <p className='font-medium'>
                          {invoiceData.fromCompany || t('yourCompany')}
                        </p>
                        <p className='whitespace-pre-line'>
                          {invoiceData.fromAddress}
                        </p>
                      </div>
                    </div>
                    <div className='col-span-4'>
                      <h3 className='font-medium text-black mb-2'>
                        {t('billTo')}:
                      </h3>
                      <div className='text-sm text-gray-700'>
                        <p className='font-medium'>
                          {invoiceData.toCompany || t('clientCompany')}
                        </p>
                        <p className='whitespace-pre-line'>
                          {invoiceData.toAddress}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Items Table */}
                  <div className='rounded-md overflow-hidden border border-black/10'>
                    <table className='w-full  '>
                      <thead>
                        <tr className='border-b border-gray-200 bg-[var(--primary)] text-white '>
                          <th className='text-left py-2 font-medium px-4'>
                            {t('description')}
                          </th>
                          <th className='text-right py-2 font-medium '>
                            {t('qty')}
                          </th>
                          <th className='text-right py-2 font-medium '>
                            {t('price')}
                          </th>
                          <th className='text-right py-2 font-medium px-4'>
                            {t('Total')}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {invoiceData.items.map(item => (
                          <tr
                            key={item.id}
                            className='border-b border-gray-100'
                          >
                            <td className='py-3 text-gray-700 px-4'>
                              {item.description || t('itemDescription')}
                            </td>
                            <td className='py-3 text-right text-gray-700'>
                              {item.quantity}
                            </td>
                            <td className='py-3 text-right text-gray-700'>
                              {NumbertoPrice(item.price, currency)}
                            </td>
                            <td className='py-3 text-right text-gray-700 px-4'>
                              {NumbertoPrice(
                                item.quantity * item.price,
                                currency
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Total */}
                  <div className='flex justify-end'>
                    <div className='w-64 space-y-1'>
                      {/* Subtotal */}
                      <div className='flex justify-between items-center py-1 border-t border-gray-200'>
                        <span className='text-gray-700'>{t('subtotal')}:</span>
                        <span className='text-gray-700'>
                          {NumbertoPrice(calculateSubtotal(), currency)}
                        </span>
                      </div>

                      {/* Tax Breakdown */}
                      {invoiceData.taxs.map(tax => {
                        const subtotal = calculateSubtotal()
                        const taxAmount =
                          tax.type === 'percent'
                            ? NumbertoPrice(
                              (tax.value / 100) * subtotal,
                              currency
                            )
                            : NumbertoPrice(tax.value, currency)

                        return (
                          <div
                            key={tax.id}
                            className='flex justify-between items-center text-sm text-gray-600'
                          >
                            <span>
                              {tax.name || t('tax')} (
                              {tax.type === 'percent'
                                ? `${tax.value}%`
                                : `${NumbertoPrice(tax.value, currency)}`}
                              ):
                            </span>
                            <span>{taxAmount}</span>
                          </div>
                        )
                      })}

                      {/* Grand Total */}
                      <div className='flex justify-between items-center py-2 border-t border-gray-300'>
                        <span className='font-medium text-black'>
                          {t('total')}:
                        </span>
                        <span className='font-bold text-xl text-[var(--primary)]'>
                          {NumbertoPrice(calculateTotal(), currency)}
                        </span>


                      </div>

                      {/* Payment Info - Only for Receipt */}
                      <div className=" sticky top-4 mt-10">
                       
                        {/* <LoadDataQR data={invoiceData} /> */}

                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  {invoiceData.notes && (
                    <div>
                      <h3 className='font-bold text-[var(--primary)] mb-2'>
                        {t('notes')}:
                      </h3>
                      <p className='text-sm text-gray-700 whitespace-pre-line'>
                        {invoiceData.notes}
                      </p>
                    </div>
                  )}
                  {/* terms */}
                  {invoiceData.terms && (
                    <div>
                      <h3 className='font-bold text-[var(--primary)] mb-2'>
                        {t('terms')}:
                      </h3>
                      <p className='text-sm text-gray-700 whitespace-pre-line'>
                        {invoiceData.terms}
                      </p>
                    </div>
                  )}

                  {/* Payment Info - Only for Receipt */}
                  {currentForm === 'receipt' && invoiceData.paymentMethod && (
                    <div className='mt-6 pt-6 border-t border-gray-200'>
                      <h3 className='font-bold text-[var(--primary)] mb-4'>
                        {t('paymentMethod') || 'Payment Method'}:
                      </h3>

                      {/* Cash Payment */}
                      {invoiceData.paymentMethod === 'cash' && (
                        <div className='bg-gray-50 p-4 rounded-lg'>
                          <div className='flex items-center gap-2 mb-2'>
                            <svg className='w-5 h-5 text-green-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z' />
                            </svg>
                            <span className='font-medium text-gray-900'>
                              {t('paidByCash') || 'Paid by Cash'}
                            </span>
                          </div>
                          <p className='text-sm text-gray-600'>
                            {t('amountReceived') || 'Amount Received'}: {NumbertoPrice(calculateTotal(), currency)}
                          </p>
                        </div>
                      )}

                      {/* Bank Transfer */}
                      {invoiceData.paymentMethod === 'transfer' && (
                        <div className='bg-gray-50 p-4 rounded-lg space-y-2'>
                          <div className='flex items-center gap-2 mb-2'>
                            <svg className='w-5 h-5 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' />
                            </svg>
                            <span className='font-medium text-gray-900'>
                              {t('bankTransfer') || 'Bank Transfer'}
                            </span>
                          </div>
                          {invoiceData.bankName && (
                            <p className='text-sm text-gray-700'>
                              <span className='font-medium'>{t('bank') || 'Bank'}:</span> {invoiceData.bankName}
                            </p>
                          )}
                          {invoiceData.accountHolder && (
                            <p className='text-sm text-gray-700'>
                              <span className='font-medium'>{t('accountHolder') || 'Account Holder'}:</span> {invoiceData.accountHolder}
                            </p>
                          )}
                          {invoiceData.bankAccount && (
                            <p className='text-sm text-gray-700'>
                              <span className='font-medium'>{t('accountNumber') || 'Account Number'}:</span> {invoiceData.bankAccount}
                            </p>
                          )}
                          <p className='text-sm text-gray-600 pt-2 border-t border-gray-200 mt-2'>
                            {t('amountTransferred') || 'Amount Transferred'}: {NumbertoPrice(calculateTotal(), currency)}
                          </p>
                        </div>
                      )}




                      {/* PromptPay */}
                      {invoiceData.paymentMethod === 'promptpay' && (
                        <div className='bg-gray-50 p-4 rounded-lg'>
                          <div className='flex flex-col md:flex-row md:items-start gap-6'>
                            <div className='flex-1 space-y-2'>
                              <div className='flex items-center gap-2 mb-3'>
                                <svg className='w-5 h-5 text-purple-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v1m6 11h2m-6 0h-2v4h2v-4zM6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' />
                                </svg>
                                <span className='font-medium text-gray-900'>
                                  PromptPay
                                </span>
                              </div>
                              {invoiceData.promptPayId && (
                                <p className='text-sm text-gray-700'>
                                  <span className='font-medium'>{t('promptPayId') || 'PromptPay ID'}:</span> {invoiceData.promptPayId}
                                </p>
                              )}
                              <p className='text-sm text-gray-600 pt-2'>
                                {t('amount') || 'Amount'}: <span className='font-bold text-[var(--primary)]'>{NumbertoPrice(calculateTotal(), currency)}</span>
                              </p>
                            </div>

                        
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                {/* signature */}
                <div className='grid grid-cols-2 mt-10'>
                  <div className='grid justify-items-center w-full'>
                    <div className=''>{t('Customer')}</div>
                    <div className='py-4 border-b border-black/60 border-dashed w-48'></div>
                    <div className={`py-4 text-black/60  tracking-wider`}>
                      ( _____________________________ )
                    </div>
                    <div className=' text-black/60 tracking-wider'>
                      {t('date')}____ /____ /____
                    </div>
                  </div>

                  <div className='grid justify-items-center w-full'>
                    <div className='relative z-10'>{t('Construtor')}</div>
                    {invoiceData.constructorSign ? (
                      <div className='py-4 flex justify-center  w-48 h-fit'>
                        <img
                          alt='signature'
                          className='w-[150px] absolute  -translate-y-5  '
                          src={invoiceData.constructorSign}
                        />
                      </div>
                    ) : (
                      <div className='py-4 border-b border-black/60 border-dashed w-48'></div>
                    )}
                    <div
                      className={`py-4 relative z-10 text-black/60  border-t border-black/60 border-dashed ${!invoiceData.constructorName && 'tracking-wider'
                        }`}
                    >
                      ({' '}
                      {invoiceData.constructorName ||
                        '_____________________________'}{' '}
                      )
                    </div>

                    <div className='relative z-10 text-black/60 tracking-wider'>
                      {t('date')}{' '}
                      {invoiceData.date.split('-').reverse().join('/')}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
