import { useSelector } from 'react-redux';
import { IRateCard } from '../../interfaces';
import { RootState } from '../../store/store';
import './style.css';

function RateCard(rateCardProps: IRateCard) {
    const inMobile = useSelector((state: RootState) => state.inMobile);

    const addAdvantages = (): JSX.Element[] => {
        return rateCardProps.includes.map((advantage, index) => {
            return (
                <div className='rate-advantage'
                    key={index}
                >
                    <img src='/images/rate-tickmark.svg' 
                        alt='tickmark'
                        width={20}
                        height={20}
                    />
                    <span className='text rate-advantage__option'>
                        {advantage}
                    </span>
                </div>
            );
        });
    }

    return (
        <div className={`rate rate_${rateCardProps.postfix} ${rateCardProps.hasOrangeBorder 
            ? 'rate_orange-border' : ''}`}
            key={rateCardProps.id}
        >
            <div className={`rate-header rate-header_${rateCardProps.postfix}`}>
                <div className='rate-header-title'>
                    <h4 className={`text rate-header-title__title rate-header-title__title_${rateCardProps.postfix} ${rateCardProps.headerHasWhiteText ? 'rate-header-title__title_white' : ''}`}>
                        {rateCardProps.name}
                    </h4>
                    <p className={`text rate-header-title__subtitle ${rateCardProps.headerHasWhiteText ? 'rate-header-title__subtitle_white' : ''}`}>
                        {rateCardProps.nameShortInfo}
                    </p>
                </div>
                <img  className={`rate-header__image_${rateCardProps.postfix}`}
                    src={`/images/rate-${rateCardProps.postfix}.svg`} 
                    alt={rateCardProps.iconAlt}
                />
            </div>
            <div className='rate-content'>
                <div className='text rate-current' 
                    style={{display: (rateCardProps.isCurrentRate && !inMobile)
                        ? 'flex' : 'none'}}
                >
                    <span>
                        Текущий тариф
                    </span>
                </div>
                <div className='rate-price'>
                    <span className='text rate-price__price-now'>
                        {rateCardProps.priceNow}
                    </span>
                    <span className='text rate-price__price-full'>
                        {rateCardProps.priceFull}
                    </span>
                </div>
                <span className={`text rate-content__price-option rate-content__price-option_${rateCardProps.postfix}`}
                    style={{visibility: rateCardProps.priceOption !== null 
                        ? 'visible' : 'hidden'}}
                >
                    {rateCardProps.priceOption !== null ? rateCardProps.priceOption : 'NONE'}
                </span>
                <span className='text rate-content__rate-has'>
                    В тариф входит:
                </span>
                {addAdvantages()}
                <button className={`text button button-dark rate-content__button 
                        ${rateCardProps.isCurrentRate 
                            ? 'rate-content__button_current-rate' : ''}`}>
                    {rateCardProps.isCurrentRate 
                        ? 'Перейти в личный кабинет' 
                        : 'Подробнее'}
                </button>
            </div>
        </div>
    );
}

export default RateCard;