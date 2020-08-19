
import { DateRangePicker } from 'rsuite';
import React from 'react'

class DateRangePickerValue extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: [new Date('2017-02-01'), new Date('2017-05-20')]
        };
    }
    render() {
        return (
            <DateRangePicker
            block
            placeholder="Select Date Range"
            style={{ width: 280 }}
            value={this.state.value}
            onChange={value => {
                this.setState({ value });
                console.log(value);
            }}
            open={true}
            defaultOpen={true}
        />
        );
    }
}

//   ReactDOM.render(<DateRangePickerValue />);
export default DateRangePickerValue