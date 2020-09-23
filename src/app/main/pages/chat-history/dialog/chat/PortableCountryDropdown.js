import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const PortableCountryDropdown = function (props) {
  
    const { onInputChange, controlId,countries, selectedCountry, byName } = props;
    

    const defaultValue = (byName) ? 'Select Country' : 0;

    const selected = selectedCountry === 'N/A' ? defaultValue : selectedCountry;
    
    return (
        <div style={{ marginBottom: 20 }}>
            {/* <Select
                name={(controlId) ? `${controlId}-country` : "country"}
                fullWidth
                style={{ width: '100%' }}
                value={selected}
                onChange={onInputChange}
            >
                <MenuItem key={`country_list_item_0`} value={defaultValue}>Select Country</MenuItem>
                { countries.length > 1 ? countries.map((country, i) => {
                        let item = null;
    
                        if (byName) {
                            item = <MenuItem key={`country_list_item_${i}`} value={country.name}>{country.name}</MenuItem>;
                        } else item = <MenuItem key={`country_list_item_${i}`} value={country.id}>{country.name}</MenuItem>;
    
                        return item;
                    }) : null}
              
            </Select> */}
        </div>
    );
};

export default PortableCountryDropdown;