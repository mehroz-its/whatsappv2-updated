

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
		setdateRange(startDate, endDate);
		console.log("START_AND_END", startDate, endDate);
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
        						
                <Button 
                id="content-upload-button" 
                style={{ marginLeft: '8px', marginTop: '6px', fontSize: '10px' }} size='small' variant="contained" color="primary" component="span" >
                    Generate Report 
                 </Button> 
                <Button id="content-upload-button" style={{ marginLeft: '8px', marginTop: '6px', fontSize: '10px' }} size='small' variant="contained" color="primary" component="span"                            >
                    Export
                 </Button>
        </>
        );
    
}


export default DateRangePickerVal