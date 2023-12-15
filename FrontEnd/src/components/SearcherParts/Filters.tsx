import '../../styles/filters.css';
import { Dispatch, HtmlHTMLAttributes, SetStateAction, useState} from 'react';

export function Filters(){
    const [isChecked, setIsChecked] = useState(true);
    return(
        <div>
            <p></p>
            <div className = "dual-container">
                <div className="input-container">
                    <div>Release Date:</div>
                    <input type='month'></input>
                    <div>  to  </div>
                    <input type='month'></input>
                    <div className='apply-filter'> Apply Filter: </div>
                    <input type='checkbox' 
                    checked={isChecked}
                    onChange={() => setIsChecked(!isChecked)} />
                </div>

                <div className="input-container">
                    <div>Audience Rating:</div>
                    <input type='number'
                    placeholder='e.g. 1.0'></input>
                    <div>  to  </div>
                    <input type='number'
                    placeholder='e.g. 10.0'></input>
                    <div className='apply-filter'> Apply Filter: </div>
                    <input type='checkbox' 
                    checked={isChecked}
                    onChange={() => setIsChecked(!isChecked)} />
                </div>
            </div>
            
        </div>
    )
}