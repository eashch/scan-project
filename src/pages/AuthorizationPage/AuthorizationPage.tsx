import { useDispatch } from 'react-redux';
import InputWithLabel from '../../components/InputWithLabel/InputWithLabel';
import './style.css';
import { useState } from 'react';
import axios from 'axios';
import { API_PATH } from '../../api';
import { setIsLoggedIn, setUserAuthData } from '../../store/storageSlice';
import { useNavigate } from 'react-router-dom';

function AuthorizationPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const phoneRegExp = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
    const loginRegExp = /^\d*[a-zA-Z_][a-zA-Z_\d]*$/;
    const [loginOrPhoneNumber, setLoginOrPhoneNumber] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [authError, setAuthError] = useState<boolean>(false);

    const validateLogin = (): boolean => {
        return (loginRegExp.test(loginOrPhoneNumber) 
            || phoneRegExp.test(loginOrPhoneNumber));
    }

    const validateFields = (): boolean => {
        return (password.length > 0 
            && loginOrPhoneNumber.length > 0) 
            && validateLogin();
    };

    const logIn = async () => {
        axios.post(API_PATH + 'account/login', {
            login: loginOrPhoneNumber,
            password: password
        }).then((response: any) => {
            if (response?.data?.accessToken) {
                dispatch(setUserAuthData({
                    userLogin: loginOrPhoneNumber,
                    token: response.data.accessToken,
                    tokenExpireDate: response.data.expire
                }));
                dispatch(setIsLoggedIn(true));
                setAuthError(false);
                navigate('/');
            }
        }).catch((error) => {
            console.error("ERROR: " + error);
            setAuthError(true);
        });
    }

    return (
        <main className='auth-page'>
            <div className='auth-content'>
                <h1 className='text_title auth-content__title'>
                    Для оформления подписки<br />
                    на тариф, необходимо<br />
                    авторизоваться.
                </h1>
                <div className='auth-form'>
                    <img className='auth-form__image-lock'
                        src='/images/auth-lock.svg'
                        alt='Lock'
                    />
                    <div className='auth-options'>
                        <button className='text auth-options__button auth-options__button_active'>
                            Войти
                        </button>
                        <button className='text auth-options__button auth-options__button_register'>
                            Зарегистрироваться
                        </button>
                    </div>
                    <InputWithLabel 
                        label='Логин или номер телефона:'
                        inputType='text'
                        error='Введите корректные данные'
                        hasError={loginOrPhoneNumber.length > 0 
                            && !validateLogin()}
                        inputText={loginOrPhoneNumber}
                        postfix='auth'
                        showThatMandatory={false}
                        onChange={(value: string) => {
                            setLoginOrPhoneNumber(value.trim());
                        }}
                    />
                    <InputWithLabel 
                        label='Пароль:'
                        inputType='password'
                        error='Неправильный пароль'
                        hasError={authError}
                        inputText={password}
                        postfix='auth'
                        showThatMandatory={false}
                        marginTop={-16}
                        onChange={(value: string) => {
                            setPassword(value);
                        }}
                    />
                    <button
                        className={`text button button-dark auth-form__button 
                                    ${!validateFields() ? 'button-dark__disabled' : ''}`}
                        disabled={!validateFields()}
                        onClick={() => {
                            logIn();
                        }}
                    >
                        Войти
                    </button>
                    <a className='text auth-form__reset-password'>
                        Восстановить пароль
                    </a>
                    <p className='text auth-form__log-in-via'>
                        Войти через:
                    </p>
                    <div className='auth-via-social-networks'>
                        <button className='button auth-via-social-networks__button'>
                            <img 
                                src='/images/auth-google.svg' 
                                alt='google logo'
                                width={96}
                                height={31} 
                            />
                        </button>
                        <button className='button auth-via-social-networks__button'>
                            <img 
                                src='/images/auth-facebook.svg' 
                                alt='google logo'
                                width={96}
                                height={31} 
                            />
                        </button>
                        <button className='button auth-via-social-networks__button'>
                            <img 
                                src='/images/auth-yandex.svg' 
                                alt='google logo'
                                width={96}
                                height={31} 
                            />
                        </button>
                    </div>
                </div>
            </div>
            <img className='auth-page__image'
                src='/images/auth-image.svg'
                alt='Two guys with key'
                width={321.764}
                height={342.035}
            />
            
        </main>
    );
}

export default AuthorizationPage;