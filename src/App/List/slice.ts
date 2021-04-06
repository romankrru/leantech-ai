import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {debounce} from 'common/helpers'
import {AppDispatch} from 'store'
import { nanoid } from 'nanoid'

type ListItem = {
  id: string
  description: string
}

const initialState: Array<ListItem> = []

const slice = createSlice({
  name: 'list',
  initialState: initialState,

  reducers: {
    add: (state, action: PayloadAction<string>) => {
      return [...state, {id: nanoid(), description: action.payload}]
    },

    removeRandomItem: (state, action: PayloadAction) => {
      const randomIndex = Math.floor(Math.random() * state.length)
      return [...state.slice(0, randomIndex), ...state.slice(randomIndex + 1)]
    }
  }
})

const aux = debounce(
  (dispatch: AppDispatch, payload: string) => dispatch(slice.actions.add(payload)),
  Number(process.env.REACT_APP_LIST_COOLDOWN_MS)
)

const addDebounced = (payload: string) => (dispatch: AppDispatch) => aux(dispatch, payload)

export const actions = {
  addDebounced,
  removeRandomItem: slice.actions.removeRandomItem,
}

export const {reducer} = slice
