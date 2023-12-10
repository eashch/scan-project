import { useState } from 'react';
import { IInputWithLabel } from '../../interfaces';
import './style.css';

function InputWithLabel(inputProps: IInputWithLabel) {
    const [focused, setFocused] = useState<boolean>(false);

    return (
        <div className='input-with-label'
            style={{marginTop: inputProps?.marginTop}}
            key={`input-with-label-${inputProps.id}`}
        >
            <span className={`text input-with-label__label input-with-label__label_${inputProps.postfix}`}>
                {inputProps.label}
                <p className={`text input-with-label__asterisk ${inputProps.hasError 
                        ? ' input-with-label__asterisk_error' : ''}`}
                    style={{visibility: inputProps.showThatMandatory 
                        ? 'visible' : 'hidden'}}
                >
                    *
                </p>
            </span>
            <div className='input-wrapper'>
                <input
                    className={`input ${inputProps.postfix 
                        ? ('input-with-label__input_' + inputProps.postfix) : ''}
                        ${inputProps.hasError ? ' input-with-label__input_error' : ''}`}
                    type={inputProps.inputType}
                    value={inputProps.inputText}
                    placeholder={focused ? '' : (inputProps.placeholder ?? '')}
                    onChange={(e) => inputProps.onChange(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    style={{textIndent: (focused || inputProps.inputText !== '') 
                        ? 18 : 0}}
                >
                </input>
                <p className={`input-with-label__error ${inputProps.postfix 
                        ? ('input-with-label__error_' + inputProps.postfix) : ''}`}
                    style={{visibility: inputProps.hasError 
                        ? 'visible' : 'hidden'}}
                >
                    {inputProps.error}
                </p>         
            </div>
            
        </div> 
    );
}

export default InputWithLabel;