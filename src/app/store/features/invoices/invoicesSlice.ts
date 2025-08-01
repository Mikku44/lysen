import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'

export interface InvoiceItem {
  id: string
  description: string
  quantity: number
  price: number
}

export interface Taxs {
  id: string
  type: 'percent' | 'price'
  name: string
  value: number
}

export interface InvoiceData {
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
}

interface InvoiceState {
  invoices: InvoiceData[]
  currentInvoice: InvoiceData;
}

const initialState: InvoiceState = {
  invoices: [],
  currentInvoice: {
    invoiceNumber: '',
    date: '',
    dueDate: '',
    fromCompany: '',
    fromAddress: '',
    toCompany: '',
    toAddress: '',
    items: [],
    taxs: [],
    notes: '',
    terms: '',
    constructorName: '',
    constructorSign: ''
  }
}

const invoiceSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {

    setInvoices: (state, action: PayloadAction<InvoiceData[]>) => {
      state.invoices = action.payload
    },
    upsertInvoice: (state, action: PayloadAction<InvoiceData>) => {
      const index = state.invoices.findIndex(
        inv => inv.invoiceNumber === action.payload.invoiceNumber
      )

      if (index !== -1) {
        state.invoices[index] = action.payload // update
      } else {
        state.invoices.push(action.payload) // add new
      }
    },
    updateInvoiceByIndex: (
      state,
      action: PayloadAction<{ index: number; data: InvoiceData }>
    ) => {
      if (state.invoices[action.payload.index]) {
        state.invoices[action.payload.index] = action.payload.data
      }
    },
    removeInvoiceByIndex: (state, action: PayloadAction<number>) => {
      if (state.invoices[action.payload]) {
        state.invoices.splice(action.payload, 1)
      }
    },
    removeInvoiceByNumber: (state, action: PayloadAction<string>) => {
      state.invoices = state.invoices.filter(
        inv => inv.invoiceNumber !== action.payload
      )
    },
    clearInvoices: state => {
      state.invoices = []
    },
    //current Invoice
    setCurrentInvoice: (state, action: PayloadAction<InvoiceData>) => {
       console.log("State : ",action.payload)
      state.currentInvoice = action.payload;
    },
    resetCurrentInvoice: (state) => {
      console.log("Reset invoice!")
      state.currentInvoice = initialState.currentInvoice;
    },
    // updateCurrentInvoiceField: (
    //   state,
    //   action: PayloadAction<{ field: keyof InvoiceData; value: any }>
    // ) => {
    //   (state.currentInvoice[action.payload.field] as any) = action.payload.value;
    // },

  }
})

export const {
  setInvoices,
  upsertInvoice,
  updateInvoiceByIndex,
  removeInvoiceByIndex,
  removeInvoiceByNumber,
  clearInvoices,
  setCurrentInvoice,
  resetCurrentInvoice,
  // updateCurrentInvoiceField
} = invoiceSlice.actions


export const selectInvoices = (state: RootState) => state.invoice.invoices
export const selectInvoice = (state: RootState) => state.invoice.currentInvoice
export default invoiceSlice.reducer
