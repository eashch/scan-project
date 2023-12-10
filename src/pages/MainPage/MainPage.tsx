import { useNavigate } from 'react-router-dom';
import Carousel from '../../components/Carousel/Carousel';
import RateCard from '../../components/RateCard/RateCard';
import './style.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

function MainPage() {
    const navigate = useNavigate();
    const inMobile = useSelector((state: RootState) => state.inMobile);
    const isLoggedIn = useSelector((state: RootState) => state.isLoggedIn);
    

    return (
        <main className='main-page'>
            <section className='main-page-general-info-wrapper'>
                <img className='main-page-general-info-wrapper__image' 
                    src='/images/title-image.svg' 
                    alt='happy man searching for information' 
                    width={629} height={620}
                />
                <div className='main-page-general-info'>
                    <h1 className='text_title main-page-general-info__title'>
                        сервис по поиску<br />
                        публикаций<br />
                        о компании<br />
                        по его ИНН
                    </h1>
                    <p className='text main-page-general-info__subtitle'>
                        Комплексный анализ публикаций, получение данных<br />
                        в формате PDF на электронную почту.
                    </p>
                    <button className='text button button-dark'
                        style={{visibility: isLoggedIn ? 'visible' : 'hidden'}}
                        onClick={() => {
                            navigate('search');
                        }}
                    >
                        Запросить данные
                    </button>
                </div>
            </section>
            <section className='our-advantages'>
                <h2 className='text_title our-advantages__title'>
                    Почему именно мы
                </h2>
                <Carousel 
                    items={[
                        {
                            iconPath: '/images/icon-advantages-clock.svg',
                            iconAlt: 'Clock',
                            descriptionWidth: 313,
                            description: 'Высокая и оперативная скорость обработки заявки'
                        },
                        {
                            iconPath: '/images/icon-advantages-lens.svg',
                            iconAlt: 'Lens',
                            descriptionWidth: 285,
                            description: 'Огромная комплексная база данных, обеспечивающая объективный ответ на запрос'
                        },
                        {
                            iconPath: '/images/icon-advantages-shield.svg',
                            iconAlt: 'Shield',
                            descriptionWidth: 311,
                            description: 'Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству'
                        }
                    ]}
                />
                <img className='our-advantages__image' 
                    src={inMobile 
                        ? '/images/sitting-man-with-tickmark-mobile.svg' 
                        : '/images/sitting-man-with-tickmark.svg'}
                    alt='sitting man with tickmark' 
                />
            </section>
            <section className='our-rates'>
                <h2 className='text_title our-rates__title'>
                    наши тарифы
                </h2>
                <div className='rates'>
                    <RateCard 
                        id = {0}
                        headerHasWhiteText = {false}
                        hasOrangeBorder = {true}
                        isCurrentRate = {isLoggedIn}
                        name = 'Beginner'
                        nameShortInfo = 'Для небольшого исследования'
                        iconAlt = 'Lightbulb'
                        postfix='beginner'
                        priceNow = '799 ₽'
                        priceFull = '1 200 ₽'
                        priceOption = 'или 150 ₽/мес. при рассрочке на 24 мес.'
                        includes = {[
                            'Безлимитная история запросов',
                            'Безопасная сделка',
                            'Поддержка 24/7 b'
                        ]}
                        onClick = {() => {

                        }}
                    />
                    <RateCard 
                        id = {1}
                        headerHasWhiteText = {false}
                        hasOrangeBorder = {false}
                        isCurrentRate = {false}
                        postfix='pro'
                        name = 'Pro'
                        nameShortInfo = 'Для HR и фрилансеров'
                        iconAlt = 'Target with arrow'
                        priceNow = '1 299 ₽'
                        priceFull = '2 600 ₽'
                        priceOption = 'или 279 ₽/мес. при рассрочке на 24 мес.'
                        includes = {[
                            'Все пункты тарифа Beginner',
                            'Экспорт истории',
                            'Рекомендации по приоритетам'
                        ]}
                        onClick = {() => {
                            
                        }}
                    />
                    <RateCard 
                        id = {2}
                        headerHasWhiteText = {true}
                        hasOrangeBorder = {false}
                        isCurrentRate = {false}
                        name = 'Business'
                        postfix='business'
                        nameShortInfo = 'Для корпоративных клиентов'
                        iconAlt = 'Laptop'
                        priceNow = '2 379 ₽'
                        priceFull = '3 700 ₽'
                        priceOption = {null}
                        includes = {[
                            'Все пункты тарифа Pro',
                            'Безлимитное количество запросов',
                            'Приоритетная поддержка'
                        ]}
                        onClick = {() => {
                            
                        }}
                    />
                </div>
            </section>            
        </main>
    );
}

export default MainPage;