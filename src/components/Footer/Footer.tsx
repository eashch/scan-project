import { useSelector } from 'react-redux';
import './style.css';
import { RootState } from '../../store/store';

function Footer() {
    const inMobile = useSelector((state: RootState) => state.inMobile);

    return (
        <footer className='footer'>
            <div className='footer-container'>
                <img 
                    src={inMobile ? '/images/footer-logo-mobile.svg'  
                        : 'images/footer-logo.svg'}
                    alt='Scan logo'
                />
                <div className='footer-description'>
                    <p className='text footer-description__text'>
                        г. Москва, Цветной б-р, 40<br />
                        +7 495 771 21 11<br />
                        info@skan.ru
                    </p>
                    <p className='text footer-description__text footer-description__text_copyright'>
                        Copyright. 2022
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;