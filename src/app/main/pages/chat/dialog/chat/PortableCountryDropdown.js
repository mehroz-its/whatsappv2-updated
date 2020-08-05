import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const PortableCountryDropdown = function (props) {
  
    const { onInputChange, controlId,countries, selectedCountry, byName } = props;
    console.log("selectedCountry : " ,  props);
    

    const defaultValue = (byName) ? 'Select Country' : 0;

    const selected = selectedCountry === 'N/A' ? defaultValue : selectedCountry;
    
    return (
        <div style={{ marginBottom: 20 }}>
           
        </div>
    );
};

export default PortableCountryDropdown;