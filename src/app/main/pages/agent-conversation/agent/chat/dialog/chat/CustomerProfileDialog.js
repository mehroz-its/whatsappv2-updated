import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import DialogContent from '@material-ui/core/DialogContent';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import { makeStyles } from '@material-ui/core/styles';

import PortableCountryDropdown from './PortableCountryDropdown';
import PortableCityDropdown from './PortableCityDropdown';

const CustomerProfileDialog = function (props) {
    
    const useStyles = makeStyles((theme) => ({
        formControl: {
            margin: theme.spacing(1),
            minWidth: '100%',
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }));

    const [selectedCountry, setSelectedCountry] = React.useState('');
    const [selectedCity, setSelectedCity] = React.useState('');

    const { edit, onDialogPropsChange, data } = props;

    const { countries } = data;

    const { id, number, assign_name, attributes } = data;

    const [customerAttributes, setCustomerAttributes] = React.useState(attributes);

    const onInputChange = e => {
        let id = (e.target.id) ? e.target.id : e.target.name;

        id = id.split('-');

        let name = e.target.name;

        if (id.length > 2) name = id[2];

        if (name === 'age') {
            if (!parseInt(e.target.value)
                || e.target.value.trim().length > 2
                || parseInt(e.target.value) < 0) {
                e.target.value = '';
            }
        }

        const attrs = customerAttributes.map(attr => {
            if (attr[id[0]] === id[1]) {
                attr[name] = e.target.value;
                return attr;
            } else return attr;
        });

        let firstname = "";

        let lastname = "";

        let fullname = "";

        attrs.find(function (element) {
            if (element.firstname) {
                if (element.firstname === 'N/A') {
                    firstname = ''
                } else {
                    firstname = element.firstname
                }

            }

            if (element.lastname) {
                if (element.lastname === 'N/A') {
                    lastname = ''
                } else {
                    lastname = element.lastname
                }
            }
        });

        fullname = firstname + ' ' + lastname;

        setCustomerAttributes(attrs);

        if (name === 'country') {
            setSelectedCountry(e.target.value);
        }

        if (name === 'city') {
            setSelectedCity(e.target.value);
        }

        onDialogPropsChange({
            event: 'input',
            edit,
            value: { attrs: attrs, assigned_name: fullname.trim() },
            key: 'attributes',
            dataKey: 'contact',
        });
    };

    React.useEffect(() => {
        attributes.forEach(attr => {
            const keys = Object.keys(attr);

            if (keys[1] === 'country') setSelectedCountry(attr[keys[1]]);
            if (keys[1] === 'city') setSelectedCity(attr[keys[1]]);
        });
    }, []);

    return (
        <DialogContent >
            <Grid container spacing={2}>
                <Grid item md={12} xs={12}>
                    <div style={{ marginBottom: 20 }}>
                        <TextField value={number} name={'number'} label="Phone Number" variant="outlined" fullWidth autoComplete="off" disabled={true} />
                    </div>
                    {customerAttributes.map((attribute, i) => {
                        const _field = (obj, props) => {
                            const [attribute_id, attribute_value] = props;

                            return { id: obj[attribute_id], value: obj[attribute_value], keys: props };
                        };

                        const { id, value, keys } = _field(attribute, Object.keys(attribute));

                        if (keys[1] === "gender") {
                            return (
                                <div key={`customer_attribute_data_holder_${i}`} style={{ marginBottom: 20 }}>
                                    <FormControl component="fieldset">
                                        <FormLabel component="legend">Gender</FormLabel>
                                        <RadioGroup aria-label="Gender" name={keys[1]} value={value} onChange={onInputChange}>
                                            <FormControlLabel value="female" control={<Radio id={`attribute_id-${id}`} />} label="Female" />
                                            <FormControlLabel value="male" control={<Radio id={`attribute_id-${id}`} />} label="Male" />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                            );
                        } else if (keys[1] === "country") {
                            return (
                                <div key={`customer_attribute_data_holder_${i}`} style={{ marginBottom: 20 }}>
                                    <PortableCountryDropdown controlId={`attribute_id-${id}`} countries={countries} onInputChange={onInputChange} selectedCountry={value} byName={true} />
                                </div>)
                        } else if (keys[1] === "city") {

                            return (
                                <div key={`customer_attribute_data_holder_${i}`} style={{ marginBottom: 20 }}>
                                    {selectedCountry && <PortableCityDropdown controlId={`attribute_id-${id}`} selectedCountry={selectedCountry} onInputChange={onInputChange} selectedCity={selectedCity} byName={true} />}
                                </div>
                            );
                        }
                        else if (keys[1] === "age") {
                            return (
                                <div key={`customer_attribute_data_holder_${i}`} style={{ marginBottom: 20 }}>
                                    <TextField id={`attribute_id-${id}`} key={`customer_attribute_data_${i}`} value={value} name={keys[1]} autoFocus label={`${keys[1].toUpperCase()}`} variant="outlined" fullWidth autoComplete="off" onChange={onInputChange} />
                                </div>
                            );
                        } else {
                            return (
                                <div key={`customer_attribute_data_holder_${i}`} style={{ marginBottom: 20 }}>
                                    <TextField id={`attribute_id-${id}`} key={`customer_attribute_data_${i}`} value={value} name={keys[1]} autoFocus label={`${keys[1].toUpperCase()}`} variant="outlined" fullWidth autoComplete="off" onChange={onInputChange} />
                                </div>
                            );
                        }
                    })}
                </Grid>
            </Grid>
        </DialogContent>
    );
};

export default CustomerProfileDialog;