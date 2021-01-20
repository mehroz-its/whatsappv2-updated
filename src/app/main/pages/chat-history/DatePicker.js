

import React from 'react'
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import './react_dates_overrides.css'
import { DateRangePicker } from 'react-dates';
import moment from "moment";

function DateRangePickerVal(props) {

    const { selectedRecipient, SelectedDates } = props;
    const { last_closed } = selectedRecipient

    const [dateRange, setdateRange] = React.useState({
      startDate: null,
      endDate: last_closed?moment(last_closed):moment()
    });
    const { startDate, endDate } = dateRange;
    const [focus, setFocus] = React.useState(null);
    const TestCustomCloseIcon = () => (
      <span></span>
    );
    
    React.useEffect(()=>{
      if(dateRange){
        SelectedDates(dateRange)
      }
    },[dateRange])
    
    const handleOnDateChange = ({startDate, endDate}) => {

      let newDate = {
        ...dateRange
      }
      if(startDate){
        newDate.startDate=startDate
      }
      
      if(endDate){
        newDate.endDate=endDate
      }

      
      if(newDate.endDate&&newDate.startDate){
        if(newDate.endDate.isBefore(newDate.startDate)){
          return
        }
      }
      setdateRange(newDate)


      // let Starting_Date = startDate.startDate != null ? Starting_Date = Object.values(startDate.startDate) : null
      // let Ending_Date = startDate.endDate != null ? Ending_Date = Object.values(startDate.endDate) : null
      // let startingDate = new Date(Starting_Date);
      // if (startDate.startDate && startDate.endDate) {
      //   props.SelectedDates(Starting_Date[4], Ending_Date[4])
      // }
    }
  
    if (selectedRecipient) {
  
      return (
        <>
  
          <DateRangePicker
            isOutsideRange={date => date.isAfter(last_closed?moment(last_closed):moment())}
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
            customCloseIcon={<TestCustomCloseIcon />}
  
          />
  
  
        </>
      );
    } else {
        return (
          <></>
        )
    }
}


export default DateRangePickerVal