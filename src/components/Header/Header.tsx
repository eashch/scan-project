import './style.css';
import { Link, useNavigate } from 'react-router-dom';
import HeaderStatistics from '../HeaderStatistics/HeaderStatistics';
import UserMenu from '../UserMenu/UserMenu';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

function Header() {
    const navigate = useNavigate();
    const [mobileMenuActive, setMobileMenuActive] = useState<boolean>(false);
    const inMobile = useSelector((state: RootState) => state.inMobile);
    const isLoggedIn = useSelector((state: RootState) => state.isLoggedIn);

    useEffect(() => {
        document.body.style.overflow 
            = mobileMenuActive ? 'hidden' : 'scroll';
    }, [mobileMenuActive]);

    return (
        <header className='header'>
            <div className='header-container'>
                <img
                    className='header-container__logo' 
                    src={inMobile ? '/images/header-mobile-logo.svg' : 'images/header-logo.svg'}
                    alt='Scan logo'
                />
                <div className='header-content'
                    style={{display: inMobile 
                        ? (mobileMenuActive ? 'flex' : 'none') : 'flex'}}
                >
                    <div className='header-content-mobile'>
                        <img className='header-content-mobile__icon' 
                            src= 'images/footer-logo.svg'
                            alt='Scan logo'
                        />
                        <button className='button header-content-mobile__exit-menu'
                            onClick={() => {
                                setMobileMenuActive(false);
                            }}
                        >
                            <img 
                                src='/images/mobile-menu-cross.svg'
                                alt='Mobile menu cross'
                                width= {24.749}
                                height= {24.749}
                            />
                        </button>
                    </div>
                    <nav className='header-container__navigation'>
                        <Link className='text header-container__link' to={'/'}
                            onClick={() => {
                                setMobileMenuActive(false);
                            }}
                        >
                            Главная
                        </Link>
                        <Link className='text header-container__link' to={''}>
                            Тарифы
                        </Link>
                        <Link className='text header-container__link' to={''}>
                            FAQ
                        </Link>
                    </nav>
                    <div className='header-authorization'
                        style={{display: isLoggedIn ? 'none' : 'flex'}}
                    >
                        <Link className='text header-container__link header-container__link_dim' to={'/'}>
                            Зарегистрироваться
                        </Link>
                        <div className='header-authorization__divider'></div>
                        <button className='button text header-authorization__button-log-in' 
                            type="button"
                            onClick={() => {
                                navigate('authorization');
                                setMobileMenuActive(false);
                            }}
                        >
                            Войти
                        </button>
                    </div>
                </div>
                <div className='header-authorized'
                    style={{display: isLoggedIn ? 'flex' : 'none'}}
                >
                    <HeaderStatistics />
                    <UserMenu />
                </div>
                
                <button className='button header-container__mobile-menu'
                    onClick={() => {
                        setMobileMenuActive(true);
                    }}
                >
                    <img 
                        src='/images/header-mobile-menu-icon.svg'
                        alt='Mobile menu icon'
                        width= {30}
                        height= {25}
                    />
                </button>
            </div>
        </header>
    );
}

export default Header;