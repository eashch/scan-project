import { useState } from 'react';
import { ISearchResultReportTable } from '../../interfaces';
import './style.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { dateFormatDDMMYYYY } from '../../utils';

function SearchResultReportTable(reportTableProps: ISearchResultReportTable) {
    const inMobile = useSelector((state: RootState) => state.inMobile);
    const itemsToDisplay = 8;
    const itemsToDisplayMobile = 1;
    const [currentFirstItem, setCurrentFirstItem] = useState<number>(0);

    const addLoadingSpinner = (): JSX.Element => {
        return (
            <div className='report-table-spinner'>
                <img className='report-table-spinner__spinner' 
                    src='/images/loading-spinner.svg' 
                    alt='loading spinner' 
                    width={24} height={24}
                />
                <p className='text report-table-spinner__text'>
                    Загружаем данные
                </p>
            </div>
        );
    }

    const addItems = (): JSX.Element[] => {
        if (!reportTableProps.rows.length)
            return([<></>]);
        const items = [];
        const itemsToShow = inMobile 
            ? itemsToDisplayMobile : itemsToDisplay;
   
        for (let i = 0; i < itemsToShow; i++) {
            const index = ((currentFirstItem + i) 
                % reportTableProps.rows.length);
            const item = reportTableProps.rows[index];
            items.push(
                <div className='report-table-month'
                    key={item.date}
                >
                    <span className='text report-table-month__field'>
                        {dateFormatDDMMYYYY(item.date)}
                    </span>
                    <span className='text report-table-month__field'>
                        {item.total}
                    </span>
                    <span className='text report-table-month__field'>
                        {item.risks}
                    </span>
                </div>
            );
        }
        return items;
    };

    return (
        <div className='search-result-report-table'
        >
            <button className='search-result-report-table__arrow'
                onClick={() => {
                    if (!reportTableProps.rows.length)
                        return;
                    
                    setCurrentFirstItem(prev => {
                        let newVal = (prev - 1) >= 0 
                            ? (prev - 1) 
                            : reportTableProps.rows.length - 1;
                        return newVal;
                    })
                }}
            >
                <img src='/images/arrow-left.svg' 
                    alt='Arrow left' 
                    width={39} height={39}
                />
            </button>
            <div className='report-table'>
                <div className='report-table-header'>
                    <span className='text report-table-header__field'>
                        Период
                    </span>
                    <span className='text report-table-header__field'>
                        Всего
                    </span>
                    <span className='text report-table-header__field'>
                        Риски
                    </span>
                </div>
                {
                    reportTableProps.isLoaded 
                        ? (
                            <div className='report-table-months'>
                                { addItems() }
                            </div>
                        )
                        : addLoadingSpinner()
                }
                
            </div>
            <button className='search-result-report-table__arrow'
                onClick={() => {
                    if (reportTableProps.rows.length)
                        setCurrentFirstItem(prev => (prev + 1) % reportTableProps.rows.length)
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

export default SearchResultReportTable;