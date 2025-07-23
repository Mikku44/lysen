// templateSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface TemplateState {
  color: string
}

const initialState: TemplateState = {
  color: 'oklch(24.394% 0.0019 286.048)'
}

export const templateSlice = createSlice({
  name: 'template',
  initialState,
  reducers: {
    setColor(state, action: PayloadAction<string>) {
      state.color = action.payload
    }
  }
})

export const { setColor } = templateSlice.actions
export const selectTemplate = (state: any) => state.template
export default templateSlice.reducer
