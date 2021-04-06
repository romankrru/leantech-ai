import {createSlice, PayloadAction} from '@reduxjs/toolkit'

const initialState= {
  active: 'tab-one'
}

const slice = createSlice({
  name: 'tabs',
  initialState: initialState,

  reducers: {
    changeTab: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        active: action.payload,
      }
    }
  },
})

export const {actions, reducer} = slice
