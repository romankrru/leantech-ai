import { configureStore, DeepPartial, StateFromReducersMapObject } from '@reduxjs/toolkit'
import {reducer as listReducer} from 'App/List'
import {reducer as tabsReducer} from 'App/Tabs'
import {createLogger} from 'redux-logger'
const logger = createLogger({})

const reducer = {
  list: listReducer,
  tabs: tabsReducer
}

export type State = StateFromReducersMapObject<typeof reducer>

export const initStore = (preloadedState?: DeepPartial<State>) => configureStore({
  reducer: reducer,
  preloadedState: preloadedState,

  middleware: getDefaultMiddleware => {
    const middlewares = []

    if(process.env.NODE_ENV === 'development') {
      middlewares.push(logger)
    }

    return getDefaultMiddleware().concat(middlewares)
  }
})

export const store = initStore()
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
