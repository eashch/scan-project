import { ICheckboxWithLabel } from '../../interfaces';
import './style.css';

function CheckboxWithLabel(checkboxProps: ICheckboxWithLabel) {
    return (
        <div className='checkbox-with-label'
            key={`checkbox-${checkboxProps.id}`}
        >
            <input
                className={`checkbox-with-label__checkbox ${checkboxProps.isChecked 
                    ? '' : 'checkbox-with-label__checkbox_unchecked'}`}
                name={`checkbox-${checkboxProps.id}`}
                id={`checkbox-${checkboxProps.id}`}
                type='checkbox'
                checked={checkboxProps.isChecked}
                onChange={(e) => checkboxProps.onChange(e.target.checked)}
            >
            </input>
            <label 
                htmlFor={`checkbox-${checkboxProps.id}`}
            >
            </label>
            <p 
                className={`text checkbox-with-label__label ${checkboxProps.isChecked 
                    ? '' : 'checkbox-with-label__label_unchecked'}`}
            >
                {checkboxProps.label}
            </p>
        </div> 
    );
}

export default CheckboxWithLabel;