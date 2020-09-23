
import React from 'react';
import CoreHttpHandler from '../../../../http/services/CoreHttpHandler'
function CitiesDropDown(props) {
    const {country}=props
    const [city, setCity] = React.useState('Country');
    React.useEffect(() => {
        CoreHttpHandler.request('locations', 'get_cities', {
            columns: "id, name",
            sortby: "ASC",
            orderby: "id",
            where: (byName) ? "country_id = (SELECT id FROM countries WHERE name = $1)" : "country_id = $1",
            values: country.trim(),
            page: 0,
            limit: 0,
        }, (response) => {
            const _cities = response.data.data.list.data;
            setCities(_cities);
        }, (error) => {
        })
    },[country])
  
	const defaultValueCity = city === 'N/A' ? 'Select Country' : city
    const byName = true
    return (
       <div/>
    )
}


export default CitiesDropDown


