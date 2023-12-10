import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ISearchRequest, IStorageSlice, IUserAuthData, IUserData } from '../interfaces'

const userDataLocalStorageName = 'userAuthData';

const getUserAuthDataFromLocalStorage = (): IUserAuthData | null => {
    const data: IUserAuthData | null = localStorage.getItem(userDataLocalStorageName) 
        ? JSON.parse(localStorage.getItem(userDataLocalStorageName)!)
        : null;
    return data;
}

const initialState = {
    isLoggedIn: getUserAuthDataFromLocalStorage() !== null,
    inMobile: false,
    userData: null,
    userAuthData: getUserAuthDataFromLocalStorage(),
    searchRequest: null,
} as IStorageSlice;

const storageSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setUserAuthData(state, action: PayloadAction<IUserAuthData | null>) {
            localStorage.setItem(userDataLocalStorageName, 
                JSON.stringify(action.payload));
            state.userAuthData = action.payload;
        },
        setSearchRequest(state, action: PayloadAction<ISearchRequest>) {
            state.searchRequest = action.payload;
        },
        setUserInfo(state, action: PayloadAction<IUserData>) {
            state.userData = action.payload;
        },
        setIsLoggedIn(state, action: PayloadAction<boolean>) {
            state.isLoggedIn = action.payload;
        },
        setInMobile(state, action: PayloadAction<boolean>) {
            state.inMobile = action.payload;
        }
    },
});

export const { 
    setUserAuthData,
    setSearchRequest,
    setInMobile,
    setIsLoggedIn,
    setUserInfo
} = storageSlice.actions
export default storageSlice.reducer