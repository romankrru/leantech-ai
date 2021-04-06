import { TypedUseSelectorHook, useSelector } from 'react-redux'
import type { RootState } from 'store'

// Use instead of plain `useSelector`
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
