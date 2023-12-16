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
                    <div>Release Date:</div>
                    <input type='month' value = {props.minMonth}
                    onChange={handleMinMonthChange}></input>
                    <div>  to  </div>
                    <input type='month' value = {props.maxMonth}
                    onChange={handleMaxMonthChange}></input>
                    <div className='apply-filter'> Apply Filter: </div>
                    <input type='checkbox' 
                    checked={props.isCheckedDate}
                    onChange={() => props.setIsCheckedDate(!props.isCheckedDate)} />
                </div>

                <div className="input-container">
                    <div>Audience Rating:</div>
                    <input type='number'
                    placeholder='e.g. 1.0'
                    value = {props.minScore} 
                    onChange={(e) => props.setMinScore(e.target.value)}></input>
                    <div>  to  </div>
                    <input type='number'
                    placeholder='e.g. 10.0'
                    value = {props.maxScore} 
                    onChange={(e) => props.setMaxScore(e.target.value)}></input>
                    <div className='apply-filter'> Apply Filter: </div>
                    <input type='checkbox' 
                    checked={props.isCheckedScore}
                    onChange={() => props.setIsCheckedScore(!props.isCheckedScore)} />
                </div>
            </div>
            
        </div>
    )
}