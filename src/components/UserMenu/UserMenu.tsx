import { Link, useNavigate } from 'react-router-dom';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { setIsLoggedIn, setUserAuthData } from '../../store/storageSlice';
import { RootState } from '../../store/store';

function UserMenu() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userAuthData = useSelector((state: RootState) => state.userAuthData);

    return (
        <div className='user-menu'>
            <div className='text user-menu-options'>
                <Link className='user-menu-options__open-menu' to={'/'}>
                     {userAuthData?.userLogin}
                </Link>
                <a className='user-menu-options__log-out'
                    onClick={() => {
                        dispatch(setUserAuthData(null));
                        dispatch(setIsLoggedIn(false));
                        navigate('/');
                    }}
                >
                    Выйти
                </a>
            </div>
            <img src='images/avatar-mock.png' 
                alt='Avatar' 
                width={32} height={32}
            />
        </div> 
    );
}

export default UserMenu;