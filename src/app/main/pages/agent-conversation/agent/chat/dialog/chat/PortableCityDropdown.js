import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import CoreHttpHandler from '../../../../../../../../http/services/CoreHttpHandler';
const PortableCityDropdown = function (props) {
    
    const { onInputChange, controlId, selectedCountry, byName, selectedCity } = props;
    
    const [cities, setCurrentCities] = React.useState([]);

    const [displayDropdown, setDisplay] = React.useState(false);

    const defaultValue = (byName) ? 'Select City' : 0;

    const selected = (selectedCity.includes('N/A')) ? defaultValue : selectedCity;
console.log(selectedCountry,'selectedCountry -----')

    React.useEffect(() => {
        CoreHttpHandler.request('locations', 'get_cities', {
            columns: "id, name",
            sortby: "ASC",
            orderby: "id",
            where: (byName) ? "country_id = (SELECT id FROM countries WHERE name = $1)" : "country_id = $1",
            values: selectedCountry.trim(),
            page:0,
            limit: 0,
        }, (response) => {
            const _cities = response.data.data.list.data;
            console.log(response)
            setCurrentCities(_cities);
            setDisplay(true);
        }, (error) => {
            setCurrentCities([]);
            setDisplay(false);
        });
    }, [selectedCountry]);

    return (
        <div style={{ marginBottom: 20 }}>
            {/* {displayDropdown && <Select
                name={(controlId) ? `${controlId}-city` : "city"}
                fullWidth
                style={{ width: '100%' }}
                value={selected}
                onChange={onInputChange}
            >
                <MenuItem  key={`city_list_item_0`} value={defaultValue}>Select City</MenuItem>
                {cities.map((city, i) => {
                    let item = null;

                    if (byName) {
                        item = <MenuItem  key={`city_list_item_${i}`} value={city.name}>{city.name}</MenuItem>;
                    } else item = <MenuItem  key={`city_list_item_${i}`} value={city.id}>{city.name}</MenuItem>;

                    return item;
                })}
            </Select>} */}
        </div>
    );
};

export default PortableCityDropdown;