import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseUtils from '@fuse/utils';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContactsMultiSelectMenu from './ContactsMultiSelectMenu';
import ContactsTable from './ContactsTable';
import * as Actions from './store/actions';
import Data from './ContactData'
import CoreHttpHandler from '../../../../http/services/CoreHttpHandler'
import { object } from 'prop-types';
import FuseLoading from '../../../../@fuse/core/FuseLoading/FuseLoading'
import BlockContactInDialog from './BlockContactInDialog'



function ContactsList(props) {
	const [data, setData] = React.useState([])
	const [rowvalue, setROWvalue] = React.useState('')

	const [openBlockDialog, setOpenBlockDialog] = React.useState(false);
	const [unblockDialog, setUnBlockDialog] = React.useState(false);


	const [data2, setData2] = useState([]);
	const [searchVal, setSearchVal] = useState(props.ValueForSearch)
	let filtered = []
	let newobj = {

	}
	data.map((i, v) => {
		let newobj = {
			...i
		}
		i.attributes.map((item, val) => {
			// console.log(`${Object.keys(item)[0]}${Object.keys(item)[1]}:${Object.values(item)[0]}`,'item')
			// let val1 = `${Object.keys(item)[0]}${Object.keys(item)[1]}:${Object.values(item)[0]}`
			// let val2 = `${Object.keys(item)[1]}:${Object.values(item)[1]}`
			newobj[`${Object.keys(item)[0]}${Object.keys(item)[1]}`] = `${Object.values(item)[0]}`
			newobj[`${Object.keys(item)[1]}`] = `${Object.values(item)[1]}`



		})
		filtered.push(newobj)

	})

	let ContactsData = {
		entities: data,
		searchText: "",
		user: {
			avatar: "assets/images/avatars/profile.jpg",
			frequentContacts: ['5725a6809fdd915739187ed5', "5725a68031fdbb1db2c1af47", "5725a680606588342058356d", "5725a680e7eb988a58ddf303"],
			groups: [
				{ contactIds: ["5725a680bbcec3cc32a8488a", "5725a680e87cb319bd9bd673", "5725a6802d10e277a0f35775"], id: "5725a6802d10e277a0f35739", name: "Friends" },
				{ contactIds: ["5725a680bbcec3cc32a8488a", "5725a680e87cb319bd9bd673", "5725a6802d10e277a0f35775"], id: "5725a6802d10e277a0f35739", name: "Clients" },
				{ contactIds: ["5725a680bbcec3cc32a8488a", "5725a680e87cb319bd9bd673", "5725a6802d10e277a0f35775"], id: "5725a6802d10e277a0f35739", name: "Recent Workers" },

			],
			id: "5725a6802d10e277a0f35724",
			name: "John Dossse",
			starred: ["5725a680ae1ae9a3c960d487", "5725a6801146cce777df2a08", "5725a680bbcec3cc32a8488a"]
		}
	}


	const dispatch = useDispatch();
	// const contacts = useSelector(({ contactsApp }) => contactsApp.contacts.entities);
	const contacts = ContactsData.entities
	// const [contacts,setContacts] = React.useState([])
	const searchText = ContactsData.searchText
	// const searchText = useSelector(({ contactsApp }) => console.log(contactsApp) );
	// const user = useSelector(({ contactsApp }) => contactsApp.user);
	const user = ContactsData.user

	const getData = ((loadData) => {
		loadData = () => {
			return CoreHttpHandler.request('contact_book', 'listing', {

				limit: 100,
				page: 0,
				columns: "*",
				sortby: "DESC",
				orderby: "id",
				where: "blocked = $1",
				values: false,
			}, null, null, true);
		};
		loadData().then((response) => {
			const tableData = response.data.data.list.data
			setData(tableData)

		});
	})

	React.useEffect(() => {
		getData()
	}, []);

	if (searchVal !== props.ValueForSearch) {
		{ search() }
	}

	const handleClose = () => {
		setOpenBlockDialog(false);
		setUnBlockDialog(false)
	};
	function search() {
		setSearchVal(props.ValueForSearch)
		setData2(filtered.filter(n => n.firstname.toLowerCase().includes(props.ValueForSearch.toLowerCase())))

	}

	if (data2.length > 0) {
		filtered = data2
	} else if (data2.length === 0 && searchVal !== '') {
		filtered = data2
	}
	const handleUnblockClick = (row) => {
		// ev.stopPropagation();
		setROWvalue(row.original)
	}
	const [filteredData, setFilteredData] = useState(null);

	const columns = React.useMemo(
		() => [
			{
				Header: 'ID',
				accessor: 'id',
				className: 'font-bold',
				sortable: true
			},
			{
				Header: 'First Name',
				accessor: 'firstname',
				className: 'font-bold',
				sortable: true
			},
			{
				Header: 'Last Name',
				accessor: 'lastname',
				className: 'font-bold',
				sortable: true
			},
			{
				Header: 'Age',
				accessor: 'age',
				sortable: true
			},
			{
				Header: 'Gender',
				accessor: 'gender',
				sortable: true
			},
			{
				Header: 'Number',
				accessor: 'number',
				sortable: true
			},
			{
				Header: 'Email',
				accessor: 'email',
				sortable: true
			},
			{
				id: 'action',
			    
				width: 128,
				sortable: false,
				Cell: ({ row }) => (
					<div className="flex items-center">
						{row.original.blocked === false ?
							(
								<IconButton
									onClick={ev => {
										ev.stopPropagation();
										handleClick(row)
									}}
								>
									<Icon name='lock'>block</Icon>
								</IconButton>
							) : (
								<IconButton
									onClick={ev => {
										ev.stopPropagation();
										setUnBlockDialog(true)
										handleUnblockClick(row)
									}}
								>
									<Icon>phone</Icon>
								</IconButton>
							)}

					</div>
				)
			}
		],
		[dispatch, user.starred]
	);


	if (filtered.length === 0) {
		if (searchVal !== '') {
			return (
				<div className="flex flex-1 items-center justify-center h-full">

					<Typography color="textSecondary" variant="h5">
						{/* There are no contacts! */}
					No Data Found!
				</Typography>
				</div>
			)


		} else {
			return (
				<div className="flex flex-1 items-center justify-center h-full">
					<FuseLoading />
				</div>
			);
		}

	}
	console.log(ContactsData, 'ContactsData')
	// console.log(user, 'user')

	function handleClick(n) {
		setROWvalue(n.original)
		setOpenBlockDialog(true)
	}
	return (
		<FuseAnimate animation="transition.slideUpIn" delay={300}>
			<ContactsTable
			   giveVal={props.GiveVal}
				getUpdatedData={() => { getData() }}
				openUnBlockDialog={unblockDialog}
				onBlockDialogClose={handleClose}
				blockRowData={rowvalue}
				openBlockDialog={openBlockDialog}
				columns={columns}
				data={filtered}
				onRowClick={(ev, row) => {
				}}
			/>
		</FuseAnimate>
	);
}

export default ContactsList;