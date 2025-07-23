import { createSlice, PayloadAction } from '@reduxjs/toolkit'

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
  currentInvoice : string;
}

const initialState: InvoiceState = {
  invoices: [],
  currentInvoice : ""
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
    }
  }
})

export const {
  setInvoices,
  upsertInvoice,
  updateInvoiceByIndex,
  removeInvoiceByIndex,
  removeInvoiceByNumber,
  clearInvoices
} = invoiceSlice.actions

export default invoiceSlice.reducer
