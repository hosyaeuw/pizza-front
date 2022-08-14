import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { AppStateType } from '../redux/reducers';

export const useTypedSelector: TypedUseSelectorHook<AppStateType> = useSelector;
