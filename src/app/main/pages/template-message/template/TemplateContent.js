import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as Actions from '../store/actions';
// import CampaignTableHead from './CampaignTableHead';
import TableData from '../CampaignData'

function TemplateContent(props) {
	console.log(props)
	const dispatch = useDispatch();
	const products = useSelector(({ eCommerceApp }) => eCommerceApp.products.data);
	const searchText = useSelector(({ eCommerceApp }) => eCommerceApp.products.searchText);

	const [selected, setSelected] = useState([]);
	const [data, setData] = useState(TableData);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [order, setOrder] = useState({
		direction: 'asc',
		id: null
	});
	const defaultDropdownData = {
        list: [],
        selected: 0,
	};
	const defaultDialogData = {
        selectedContactGroups: [],
        selectedContacts: [],
        state: false,
        type: null,
    };

	const [dropDownData, setDropdownData] = React.useState(defaultDropdownData);
	const [dialogData, setDialogData] = React.useState(defaultDialogData)
	const [textAreaNumbers, setTextAreaNumbers] = React.useState('');




	const useStyles = makeStyles(theme => ({	
        root: {
            width: '100%',
        },
        paper: {
            width: '100%',
            marginBottom: theme.spacing(2),
        },
        table: {
            minWidth: 750,
        },
        visuallyHidden: {
            border: 0,
            clip: 'rect(0 0 0 0)',
            height: 1,
            margin: -1,
            overflow: 'hidden',
            padding: 0,
            position: 'absolute',
            top: 20,
            width: 1,
        },
    }));

    const classes = useStyles();

	// useEffect(() => {
	// 	dispatch(Actions.getProducts());
	// }, [dispatch]);

	// useEffect(() => {
	// 	if (searchText.length !== 0) {
	// 		setData(_.filter(products, item => item.name.toLowerCase().includes(searchText.toLowerCase())));
	// 		setPage(0);
	// 	} else {
	// 		setData(products);
	// 		console.log(products,'here in prdoducts table')
	// 	}
	// }, [products, searchText]);

	function handleRequestSort(event, property) {
		const id = property;
		let direction = 'desc';

		if (order.id === property && order.direction === 'desc') {
			direction = 'asc';
		}

		setOrder({
			direction,
			id
		});
	}

    const onTextAreaChange = event => {
        setTextAreaNumbers(event.target.value);
	};
	
	const openContactBook = e => {
        setDialogData({
            type: 'contacts',
            state: true,
            selectedContacts: dialogData.selectedContacts,
            selectedContactGroups: dialogData.selectedContactGroups,
        })
	};
	
	const onSelectItemChange = e => {
        const data = { ...dropDownData };

        data.selected = e.target.value;

        setDropdownData(data);
    };

    const openContactGroups = e => {
        setDialogData({
            type: 'groups',
            state: true,
            selectedContacts: dialogData.selectedContacts,
            selectedContactGroups: dialogData.selectedContactGroups,
        })
	};
	
	function handleSelectAllClick(event) {
		if (event.target.checked) {
			setSelected(data.map(n => n.id));
			return;
		}
		setSelected([]);
	}

	function handleClick(n) {
		// props.history.push({pathname:`/apps/groups/group-detail`,id:n.id});
	}

	function handleCheck(event, id) {
		const selectedIndex = selected.indexOf(id);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, id);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
		}

		setSelected(newSelected);
	}

	function handleChangePage(event, value) {
		setPage(value);
	}

	function handleChangeRowsPerPage(event) {
		setRowsPerPage(event.target.value);
	}

	return (
		<div className="w-full flex flex-col" style={{marginTop:'50px'}}>
			<FormControl variant="outlined" fullWidth className={classes.formControl}>
				<Grid container>
					<Grid item xs={3}></Grid>
					<Grid item xs={6} >
						<Select
							id="template_selection"
							fullWidth
							style={{ width: '100%' }}
							value={dropDownData.selected}
							onChange={onSelectItemChange}
							inputProps={{
								name: 'age',
								id: 'outlined-age-native-simple',
							}}
						>
							<MenuItem key={`template_list_item_0`} value="0">Select Template</MenuItem>
							{dropDownData.list.map(data => {
								return (
									<MenuItem key={`template_list_item_${data.id}`} value={data.id}>{data.template_name} [{`Type : ${data.template_type.toUpperCase()}`}]</MenuItem>
								)
							})}
						</Select>
					</Grid>
					<Grid item xs={3}></Grid>
				</Grid>
				<Grid container style={{ marginTop: 20 }}>
					<Grid item xs={3}></Grid>
					<Grid item xs={2} >
						<Button variant="contained" color="primary" onClick={openContactBook} fullWidth>
							Contact Book
                    </Button>
					</Grid>
					<Grid item xs={2} style={{ paddingLeft: 10, paddingRight: 10 }} >

					</Grid>
					<Grid item xs={2} >
						<Button variant="contained" color="primary" onClick={openContactGroups} fullWidth>
							Contact Groups
                    </Button>
					</Grid>
					<Grid item xs={3}></Grid>
				</Grid>
				<Grid container style={{ marginTop: 20 }}>
					<Grid item xs={3}></Grid>
					<Grid item xs={6} >
						<TextField id="outlined-basic-email" multiline
							value={textAreaNumbers}
							onChange={onTextAreaChange}
							rows="4"
							label="Enter Comma Separated Numbers"
							variant="outlined"
							fullWidth />
					</Grid>
					<Grid item xs={3}></Grid>
				</Grid>
				<Grid container style={{ marginTop: 20 }}>
					<Grid item xs={4}></Grid>
					<Grid item xs={4} >
						<Button fullWidth variant="contained" color="secondary" onClick={()=>{console.log('click send')}}>
							Send
                        </Button>
					</Grid>
					<Grid item xs={4}></Grid>
				</Grid>
			</FormControl>

		</div>
	);
}

export default withRouter(TemplateContent);
