import '../../styles/filters.css';
import { ChangeEvent, Dispatch, HtmlHTMLAttributes, SetStateAction, useState} from 'react';

interface filtersProps{
    isCheckedDate : boolean;
    setIsCheckedDate :  React.Dispatch<React.SetStateAction<boolean>>;
    isCheckedScore: boolean;
    setIsCheckedScore : React.Dispatch<React.SetStateAction<boolean>>;
    minMonth : string;
    setMinMonth :React.Dispatch<React.SetStateAction<string>>;
    maxMonth : string;
    setMaxMonth : React.Dispatch<React.SetStateAction<string>>;

    minScore :string;
    setMinScore : Dispatch<SetStateAction<string>>;
    maxScore :string;
    setMaxScore : Dispatch<SetStateAction<string>>;
}


export function Filters(props : filtersProps){

    // function handleMinMonthChange(event: any) {
    //     console.log(event);
    //     //setMinMonth(event.target.value);
    // };

    const handleMinMonthChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.type)
        props.setMinMonth(event.target.value);
    };

    const handleMaxMonthChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.type)
        props.setMaxMonth(event.target.value);
    };

    
    return(
        <div>
            <p></p>
            <div className = "dual-container">
                <div className="input-container">
                    <div aria-label='Release Date Filter'>Release Date:</div>
                    <input type='month' value = {props.minMonth} 
                    onChange={handleMinMonthChange}
                    aria-description='Enter the oldest year for your filter'>
                    </input>

                    <div>  to  </div>

                    <input type='month' value = {props.maxMonth}
                    onChange={handleMaxMonthChange}
                    aria-description='Enter the most recent year for your filter'>
                    </input>
                    <div className='apply-filter' aria-label='Apply Filter'> Apply Filter: </div>
                    <input type='checkbox' checked={props.isCheckedDate}
                    onChange={() => props.setIsCheckedDate(!props.isCheckedDate)} 
                    aria-label='Checkbox for Filter'/>
                </div>

                <div className="input-container">
                    <div aria-label='Audience Rating Filter'>Audience Rating:</div>
                    <input type='number' placeholder='e.g. 1.0' value = {props.minScore} 
                    onChange={(e) => props.setMinScore(e.target.value)}
                    aria-description='Enter the lowest Audience Rating Score for your filter'>
                    </input>

                    <div>  to  </div>

                    <input type='number' placeholder='e.g. 10.0' value = {props.maxScore} 
                    onChange={(e) => props.setMaxScore(e.target.value)}
                    aria-description='Enter the highest Audience Rating Score for your filter'>
                    </input>
                    <div className='apply-filter' aria-label='Apply Filter'> Apply Filter: </div>
                    <input type='checkbox' checked={props.isCheckedScore}
                    onChange={() => props.setIsCheckedScore(!props.isCheckedScore)} 
                    aria-label='Checkbox for Filter'/>
                </div>
            </div>
            
        </div>
    )
}