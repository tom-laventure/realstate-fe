import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { RootState, DispatchType } from '../Reducers'

export const useAppDispatch: () => DispatchType = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector