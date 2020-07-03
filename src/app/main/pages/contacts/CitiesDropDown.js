import { useForm } from '@fuse/hooks';
import FuseUtils from '@fuse/utils/FuseUtils';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import CoreHttpHandler from '../../../../http/services/CoreHttpHandler'

function CitiesDropDown(props) {
    const {country}=props
	const [cities, setCities] = React.useState([]);
    const [cityopen, setSelectCityOpen] = React.useState(false);
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
            console.log(_cities)
            setCities(_cities);
            // setDisplay(true);
        }, (error) => {
            // setCurrentCities([]);
            // setDisplay(false);
        })
    },[country])
    const handleCityChange = (event) => {
		setCity(event.target.value);
        console.log(city)
        props.selectedCity(event.target.value)
		
	}
	const handleCityClose = () => {
		setSelectCityOpen(false);
	};

	const handleCityOpen = () => {
		setSelectCityOpen(true);
	};
    const defaultValueCity = (byName) ? 'Select City' : 0;
    const byName = true

    return (
        <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={cityopen}
            onClose={handleCityClose}
            onOpen={handleCityOpen}
            value={city}
            onChange={handleCityChange}
            fullWidth
        >
            <MenuItem key={`city_list_item_0`} value={defaultValueCity}>Select City</MenuItem>
            {cities.map((city, i) => {
                let item = null;

                if (byName) {
                    item = <MenuItem key={`city_list_item_${i}`} value={city.name}>{city.name}</MenuItem>;
                } else item = <MenuItem key={`city_list_item_${i}`} value={city.id}>{city.name}</MenuItem>;

                return item;
            })}
        </Select>
    )
}


export default CitiesDropDown


