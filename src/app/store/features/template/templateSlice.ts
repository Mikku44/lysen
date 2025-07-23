// templateSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'

interface TemplateState {
  color: string
  lang : string
  currency : string
}

const initialState: TemplateState = {
  color: 'oklch(24.394% 0.0019 286.048)',
  lang : "en",
  currency : "USD"
}

export const templateSlice = createSlice({
  name: 'template',
  initialState,
  reducers: {
    setColor(state, action: PayloadAction<string>) {
      state.color = action.payload
    },
    setLang(state, action: PayloadAction<string>) {
      state.lang = action.payload
    },
    setCurrency(state, action: PayloadAction<string>) {
      state.currency = action.payload
    },
  }
})

export const { setColor , setLang , setCurrency} = templateSlice.actions
export const selectTemplate = (state: RootState) => state.template
export default templateSlice.reducer
