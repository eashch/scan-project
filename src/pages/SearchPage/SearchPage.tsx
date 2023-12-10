import { useState } from 'react';
import CheckboxWithLabel from '../../components/CheckboxWithLabel/CheckboxWithLabel';
import InputWithLabel from '../../components/InputWithLabel/InputWithLabel';
import './style.css';
import DropdownWithLabel from '../../components/DropdownWithLabel/DropdownWithLabel';
import { useDispatch } from 'react-redux';
import DateRange from '../../components/DateRange/DateRange';
import { TApiSearchTonality } from '../../api';
import { setSearchRequest } from '../../store/storageSlice';
import { checkTaxpayerId10Digits, validateDate, validateDateRange } from '../../utils';
import { useNavigate } from 'react-router-dom';

function SearchPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [taxpayerID, setTaxpayerID] = useState<string>('');
    const [taxpayerIDError, setTaxpayerIDError] = useState<boolean>(false);

    const [tonality, setTonality] = useState<string>('0');
    const [documentsToFindMax, setDocumentsToFindMax] = useState<string>('');
    const [dateStart, setDateStart] = useState<string>('');
    const [dateEnd, setDateEnd] = useState<string>('');

    const [maximumCompleteness, setMaximumCompleteness] = useState<boolean>(false);
    const [businessContextMentions, setBusinessContextMentions] = useState<boolean>(false);
    const [mainRoleInPublications, setMainRoleInPublications] = useState<boolean>(false);
    const [publicationsWithRiskFactorOnly, setPublicationsWithRiskFactorOnly] = useState<boolean>(false);
    const [includeTechnicalMarketNews, setIncludeTechnicalMarketNews] = useState<boolean>(false);
    const [includeAnnouncementsAndCalendars, setIncludeAnnouncementsAndCalendars] = useState<boolean>(false);
    const [includeNewsReports, setIncludeNewsReports] = useState<boolean>(false);
    

    const validateFields = (): boolean => {
        return (
            taxpayerID.length > 0 
            && !taxpayerIDError
            && documentsToFindMax.length > 0
            && validateDateRange(dateStart, dateEnd)
        );
    };

    const search = (): void => {
        const tonalityValues = ['any', 'positive', 'negative'];
        const tonalityRequest = tonalityValues[parseInt(tonality)];

        const req = {
            taxPayerID: parseInt(taxpayerID),
            tonality: tonalityRequest as TApiSearchTonality,
            documentsMaxNumber: parseInt(documentsToFindMax),
            dateStart: (new Date(dateStart)).toISOString(),
            dateEnd: (new Date(dateEnd)).toISOString(),
            maximumCompleteness: maximumCompleteness,
            businessContextMentions: businessContextMentions,
            mainRoleInPublications: mainRoleInPublications,
            publicationsWithRiskFactorOnly: publicationsWithRiskFactorOnly,
            includeTechnicalMarketNews: includeTechnicalMarketNews,
            includeAnnouncementsAndCalendars: includeAnnouncementsAndCalendars,
            includeNewsReports: includeNewsReports
        };

        dispatch(setSearchRequest({
            taxPayerID: parseInt(taxpayerID),
            tonality: tonalityRequest as TApiSearchTonality,
            documentsMaxNumber: parseInt(documentsToFindMax),
            dateStart: (new Date(dateStart)).toISOString(),
            dateEnd: (new Date(dateEnd)).toISOString(),
            maximumCompleteness: maximumCompleteness,
            businessContextMentions: businessContextMentions,
            mainRoleInPublications: mainRoleInPublications,
            publicationsWithRiskFactorOnly: publicationsWithRiskFactorOnly,
            includeTechnicalMarketNews: includeTechnicalMarketNews,
            includeAnnouncementsAndCalendars: includeAnnouncementsAndCalendars,
            includeNewsReports: includeNewsReports
        }));
        navigate('../search-result');
    }

    return (
        <main className='search-page'>
            <div className='search-controls'>
                <h1 className='text_title search-controls__title'>
                    Найдите необходимые<br />
                    данные в пару кликов.
                </h1>
                <p className='text search-controls__description'>
                    Задайте параметры поиска.<br />
                    Чем больше заполните, тем точнее поиск
                </p>
                <img className='search-images__flying-page_mobile'
                    src='/images/search-page-flying-page.svg'
                    alt='Flying page'
                    width={91}
                    height={111.118}
                />
                <div className='search-form'>
                    <div className='search-form-inputs'>
                        <InputWithLabel 
                            id={0}
                            label='ИНН компании'
                            inputType='text'
                            error='Введите корректные данные'
                            hasError={taxpayerIDError}
                            inputText={taxpayerID}
                            postfix='search'
                            showThatMandatory={true}
                            placeholder='10 цифр'
                            onChange={(value: string) => {
                                const numbersOnly = /^\+?(0|[1-9]\d*)$/;
                                if (!numbersOnly.test(value)) {
                                    setTaxpayerID('');
                                    return;
                                }
                                setTaxpayerID(value);
                                const validID = checkTaxpayerId10Digits(value);
                                setTaxpayerIDError(!validID);                                
                            }}
                        />
                        <div className='dropdown-wrapper'>
                            <DropdownWithLabel
                                id={0} 
                                label='Тональность'
                                options={[{title:'Любая', value: '0'}, 
                                    {title:'Позитивная', value: '1'}, 
                                    {title:'Негативная', value: '2'}]}
                                onChange={(value: string) => {
                                    setTonality(value);
                                }}
                            />
                        </div>
                        <InputWithLabel 
                            id={1}
                            label='Количество документов в выдаче'
                            inputType='text'
                            error='Обязательное поле'
                            hasError={false}
                            inputText={documentsToFindMax}
                            postfix='search'
                            showThatMandatory={true}
                            placeholder='От 1 до 1000'
                            onChange={(value: string) => {
                                const numbersOnly = /^\+?(0|[1-9]\d*)$/;
                                if (!numbersOnly.test(value)) {
                                    setDocumentsToFindMax('');
                                    return;
                                }
                                const num = parseInt(value);
                                const valueClamped = Math.min(1000, Math.max(num, 1));
                                setDocumentsToFindMax(valueClamped.toString());
                            }}
                        />
                        <div className='date-wrapper'>
                            <DateRange 
                                id={0}
                                label='Диапазон поиска'
                                hasError={!((dateStart === '' && dateEnd === '') 
                                    || validateDateRange(dateStart, dateEnd))}
                                error='Введите корректные данные'
                                showThatMandatory={true}
                                startDateText={dateStart}
                                endDateText={dateEnd}
                                onStartDateChanged={(value: string) => {
                                    setDateStart(value);
                                    validateDate(value);
                                }}
                                onEndDateChanged={(value: string) => {
                                    setDateEnd(value);
                                    validateDate(value);
                                }}
                            />
                        </div>
                    </div>
                    <div className='search-form-right-side'>
                        <div className='search-form-checkboxes'>
                            <CheckboxWithLabel 
                                id={0}
                                label='Признак максимальной полноты'
                                isChecked={maximumCompleteness}
                                onChange={(value: boolean) => {
                                    setMaximumCompleteness(value);
                                }}
                            />
                            <CheckboxWithLabel 
                                id={1}
                                label='Упоминания в бизнес-контексте'
                                isChecked={businessContextMentions}
                                onChange={(value: boolean) => {
                                    setBusinessContextMentions(value);
                                }}
                            />
                            <CheckboxWithLabel 
                                id={2}
                                label='Главная роль в публикации'
                                isChecked={mainRoleInPublications}
                                onChange={(value: boolean) => {
                                    setMainRoleInPublications(value);
                                }}
                            />
                            <CheckboxWithLabel 
                                id={3}
                                label='Публикации только с риск-факторами'
                                isChecked={publicationsWithRiskFactorOnly}
                                onChange={(value: boolean) => {
                                    setPublicationsWithRiskFactorOnly(value);
                                }}
                            />
                            <CheckboxWithLabel 
                                id={4}
                                label='Включать технические новости рынков'
                                isChecked={includeTechnicalMarketNews}
                                onChange={(value: boolean) => {
                                    setIncludeTechnicalMarketNews(value);
                                }}
                            />
                            <CheckboxWithLabel 
                                id={5}
                                label='Включать анонсы и календари'
                                isChecked={includeAnnouncementsAndCalendars}
                                onChange={(value: boolean) => {
                                    setIncludeAnnouncementsAndCalendars(value);
                                }}
                            />
                            <CheckboxWithLabel 
                                id={6}
                                label='Включать сводки новостей'
                                isChecked={includeNewsReports}
                                onChange={(value: boolean) => {
                                    setIncludeNewsReports(value);
                                }}
                            />
                        </div>
                        <button
                            className={`text button button-dark search-form-right-side__button 
                                        ${!validateFields() ? 'button-dark__disabled' : ''}`}
                            disabled={!validateFields()}
                            onClick={() => {
                                search();
                            }}
                        >
                            Поиск
                        </button>
                        <p className='text search-form-right-side__description'>
                            * Обязательные к заполнению поля
                        </p>
                    </div>
                    
                </div>
            </div>
            <div className='search-images'>
                <img className='search-images__flying-page'
                    src='/images/search-page-flying-page.svg'
                    alt='Flying page'
                    width={91}
                    height={111.118}
                />
                <img className='search-images__flying-folders'
                    src='/images/search-page-flying-folders.svg'
                    alt='Flying folders'
                    width={140.608}
                    height={68.394}
                />
                <img className='search-images__man-with-lens'
                    src='/images/search-page-man-with-lens.svg'
                    alt='Man with lens'
                    width={442.573}
                    height={470.214}
                />
            </div>
        </main>
    );
}

export default SearchPage;