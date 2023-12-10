import { useSelector } from 'react-redux';
import './style.css';
import { RootState } from '../../store/store';

function HeaderStatistics() {
    const userData = useSelector((state: RootState) => state.userData);

    if (userData === null) 
        return (
            <div className='header-statistics header-statistics_loading'>
                <img className='header-statistics__spinner' 
                    src='/images/loading-spinner.svg' 
                    alt='loading spinner' 
                    width={24} height={24}
                />
            </div>
        );
    return (
        <div className='text header-statistics'>
            <span className='header-statistics__name'>
                Использовано компаний
            </span>
            <span className='header-statistics__used-companies'>
                {userData.usedCompanyCount}
            </span>
            <span className='header-statistics__name'>
                Лимит по компаниям
            </span>
            <span className='header-statistics__companies-limit'>
                {userData.companyLimit}
            </span>
        </div>
    );
}

export default HeaderStatistics;