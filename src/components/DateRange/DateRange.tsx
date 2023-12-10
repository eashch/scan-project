import { createRef, useRef, useState } from 'react';
import { IDateRange } from '../../interfaces';
import './style.css';

function DateRange(dateRangeProps: IDateRange) {
    const [focusedStartDate, setFocusedStartDate] = useState<boolean>(false);
    const [focusedEndDate, setFocusedEndDate] = useState<boolean>(false);
    const inputStart = createRef<HTMLInputElement>();
    const inputEnd = createRef<HTMLInputElement>();

    return (
        <div className='date-range'>
            <span className={`text date-range__label`}>
                {dateRangeProps.label}
                <p className={`text date-range__asterisk ${dateRangeProps.hasError 
                        ? ' date-range__asterisk_error' : ''}`}
                    style={{visibility: dateRangeProps.showThatMandatory 
                        ? 'visible' : 'hidden'}}
                >
                    *
                </p>
            </span>
            <div className='date-inputs'>
                <div className='date-input-wrapper'
                    onClick={() => {
                        if (inputStart.current)
                            inputStart.current.showPicker();
                    }}
                >
                    <input
                        ref={inputStart}
                        className={`text input date-inputs__input
                            ${dateRangeProps.hasError ? ' date-inputs__input_error' : ''}`}
                        type={'date'}
                        value={dateRangeProps.startDateText}
                        placeholder={focusedStartDate ? '' : 'Дата начала'}
                        onFocus={() => setFocusedStartDate(true)}
                        onBlur={() => setFocusedStartDate(false)}
                        style={{textIndent: (focusedStartDate 
                            || dateRangeProps.startDateText !== '') ? 18 : 0}}
                        onChange={(e) => dateRangeProps.onStartDateChanged(e.target.value)}
                    >
                    </input>
                    <div className={`date-input-placeholder ${dateRangeProps.hasError 
                            ? ' date-inputs__input_error' : ''}`}
                        style={{backgroundColor: dateRangeProps.startDateText !== '' 
                            ? 'transparent' : '#FFFFFF'}}
                    >
                            <span className={`text date-input-placeholder__text ${dateRangeProps.hasError 
                                    ? ' date-range__asterisk_error' : ''}`}
                                style={{visibility: dateRangeProps.startDateText !== '' 
                                    ? 'hidden' : 'visible'}}
                            >
                                Дата начала
                            </span>
                            <div className='arrow-wrapper'>
                                <img 
                                    src='/images/select-arrow.svg'
                                    alt='arrow'
                                    className='arrow-wrapper__arrow'
                                />
                            </div>
                    </div>
                </div>


                <div className='date-input-wrapper'
                    onClick={() => {
                        if (inputEnd.current)
                            inputEnd.current.showPicker();
                    }}
                >
                    <input
                        ref={inputEnd}
                        className={`text input date-inputs__input
                            ${dateRangeProps.hasError ? ' date-inputs__input_error' : ''}`}
                        type={'date'}
                        value={dateRangeProps.endDateText}
                        placeholder={focusedEndDate ? '' : 'Дата начала'}
                        onFocus={() => setFocusedEndDate(true)}
                        onBlur={() => setFocusedEndDate(false)}
                        style={{textIndent: (focusedEndDate 
                            || dateRangeProps.endDateText !== '') ? 18 : 0}}
                        onChange={(e) => dateRangeProps.onEndDateChanged(e.target.value)}
                    >
                    </input>
                    <div className={`date-input-placeholder ${dateRangeProps.hasError 
                            ? ' date-inputs__input_error' : ''}`}
                        style={{backgroundColor: dateRangeProps.endDateText !== '' 
                            ? 'transparent' : '#FFFFFF'}}
                    >
                            <span className={`text date-input-placeholder__text ${dateRangeProps.hasError 
                                    ? ' date-range__asterisk_error' : ''}`}
                                style={{visibility: dateRangeProps.endDateText !== '' 
                                    ? 'hidden' : 'visible'}}
                            >
                                Дата конца
                            </span>
                            <div className='arrow-wrapper'>
                                <img 
                                    src='/images/select-arrow.svg'
                                    alt='arrow'
                                    className='arrow-wrapper__arrow'
                                />
                            </div>
                    </div>
                </div>
            </div>
            <p className={`text date-range__error `}
                style={{visibility: dateRangeProps.hasError 
                    ? 'visible' : 'hidden'}}
            >
                Введите корректные данные
            </p>
        </div> 
    );
}

export default DateRange;