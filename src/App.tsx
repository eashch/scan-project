import { useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout/Layout';
import MainPage from './pages/MainPage/MainPage';
import AuthorizationPage from './pages/AuthorizationPage/AuthorizationPage';
import SearchPage from './pages/SearchPage/SearchPage';
import SearchResultPage from './pages/SearchResultPage/SearchResultPage';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store/store';
import { setInMobile, setIsLoggedIn, setUserAuthData, setUserInfo } from './store/storageSlice';
import Unauthorized from './pages/Unauthorized/Unauthorized';
import { API_PATH, isUserAuthDataValid } from './api';

function App() {
    const dispatch = useDispatch();
    const inMobile = useSelector((state: RootState) => state.inMobile);
    const isLoggedIn = useSelector((state: RootState) => state.isLoggedIn);
    const userAuthData = useSelector((state: RootState) => state.userAuthData);

    useEffect(() => {
        const media = window.matchMedia('(max-width:1440px)');
        if (media.matches !== inMobile) {
            dispatch(setInMobile(media.matches));
        }
        const listener = () => {
            dispatch(setInMobile(media.matches))
        };
        window.addEventListener("resize", listener);
        return () => window.removeEventListener("resize", listener);
    }, [inMobile]);

    const getUserInfo = async () => {
        if (!isUserAuthDataValid(userAuthData)) {
            dispatch(setUserAuthData(null));
            dispatch(setIsLoggedIn(false));
            return;
        }
            
        axios.get(API_PATH + 'account/info', {
            headers: {
                Authorization: `Bearer ${userAuthData!.token}`,
            }
        }).then((response: any) => {
            dispatch(setUserInfo({
                ...response.data.eventFiltersInfo
            }));
        }).catch((error) => {
            console.error("ERROR: " + error);
        });
    }

    useEffect(() => {
        getUserInfo();
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<MainPage />} />
                    <Route path="authorization" element={
                        <AuthorizationPage />}
                    />
                    <Route path="search" element={
                        isLoggedIn ? <SearchPage /> : <Unauthorized />} 
                    />
                    <Route path="search-result" element={
                        isLoggedIn ? <SearchResultPage /> : <Unauthorized />}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
