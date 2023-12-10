import { useState } from 'react';
import { ICarousel } from '../../interfaces';
import './style.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

function Carousel(carouselProps: ICarousel) {
    const inMobile = useSelector((state: RootState) => state.inMobile);
    const itemsToDisplay = 3;
    const itemsToDisplayMobile = 1;
    const [currentFirstItem, setCurrentFirstItem] = useState<number>(0);

    const addItems = (): JSX.Element[] => {
        if (!carouselProps.items.length)
            return([<></>]);
        const items = [];
        const itemsToShow = inMobile 
            ? itemsToDisplayMobile : itemsToDisplay;
        for (let i = 0; i < itemsToShow; i++) {
            const index = (currentFirstItem + i) 
                % carouselProps.items.length;
            const item = carouselProps.items[index];
            items.push(
                <div className='carousel-item'
                    key={index}
                >
                    <img className='carousel-item__icon'
                        src={item.iconPath} 
                        alt={item.iconAlt} 
                        width={64} height={64}
                    />
                    <p className='carousel-item__description'
                        style={{width: inMobile ? 278.43 : item.descriptionWidth}}
                    >
                        {item.description}
                    </p>
                </div>
            );
        }
        return items;
    };

    return (
        <div className='carousel'>
            <button className='carousel-arrow'
                onClick={() => {
                    if (!carouselProps.items.length)
                        return;
                    
                    setCurrentFirstItem(prev => {
                        let newVal = (prev - 1) >= 0 
                            ? (prev - 1) 
                            : carouselProps.items.length - 1;
                        return newVal;
                    })
                }}
            >
                <img src='/images/arrow-left.svg' 
                    alt='Arrow left' 
                    width={39} height={39}
                />
            </button>
            <div className='carousel-content'>
                {addItems()}
            </div>
            <button className='carousel-arrow'
                onClick={() => {
                    if (carouselProps.items.length)
                        setCurrentFirstItem(prev => (prev + 1) % carouselProps.items.length)
                }}
            >
                <img src='/images/arrow-right.svg' 
                    alt='Arrow left' 
                    width={39} height={39}
                />
            </button>
        </div> 
    );
}

export default Carousel;