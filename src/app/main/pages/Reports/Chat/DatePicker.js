

import React from 'react'
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import './react_dates_overrides.css'
import Button from '@material-ui/core/Button';
import { DateRangePicker } from 'react-dates';

 function DateRangePickerVal(props){

    const [dateRange, setdateRange] = React.useState({
		startDate: null,
		endDate: null
    });
    const { startDate, endDate } = dateRange;
    const [focus, setFocus] = React.useState(null);    
	const handleOnDateChange = (startDate, endDate) => {
    setdateRange(startDate)
    let Starting_Date =   startDate.startDate != null ?  Starting_Date = Object.values(startDate.startDate) : null
    let Ending_Date=  startDate.endDate != null ?  Ending_Date = Object.values(startDate.endDate): null
    let startingDate = new Date(Starting_Date);
    if(startDate.startDate && startDate.endDate)
    {
      props.SelectedDates(Starting_Date[4],Ending_Date[4])
    }
    }
    
 

        return (
            <>
            
            <DateRangePicker
            isOutsideRange={() => false}
            startDatePlaceholderText="Start Date"
            startDate={startDate}
            onDatesChange={handleOnDateChange}
            endDatePlaceholderText="End Date"
            endDate={endDate}
            numberOfMonths={2}
            displayFormat="MMM D Y"
            showClearDates={true}
            focusedInput={focus}
            onFocusChange={focus => setFocus(focus)}
            startDateId="startDateMookh"
            endDateId="endDateMookh"
            minimumNights={0}
            small

        />
        						

        </>
        );
    
}


export default DateRangePickerVal