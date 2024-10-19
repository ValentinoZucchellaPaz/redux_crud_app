import {useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../store'
import type {TypedUseSelectorHook } from 'react-redux'

// lineas importantes
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch: () => AppDispatch = useDispatch