import { IDropdownWithLabel } from '../../interfaces';
import './style.css';

function DropdownWithLabel(dropdownProps: IDropdownWithLabel) {

    const addOptions = (): JSX.Element[] => {
        return (
            dropdownProps.options.map((item, index) => {
                return (
                    <option
                        className='text dropdown__option' 
                        value={item.value}
                        key={index}
                    >
                        {item.title}
                    </option>
                );
            })
        );
    }

    return (
        <div className='dropdown'>
            <p className='text dropdown__label'>
                {dropdownProps.label}
            </p>
            <select
                className='text dropdown__option dropdown__select'
                onChange={(event) => dropdownProps.onChange(event.target.value)}
            >
                {addOptions()}
            </select>
        </div> 
    );
}

export default DropdownWithLabel;