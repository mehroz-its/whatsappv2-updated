import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseUtils from '@fuse/utils';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContactsMultiSelectMenu from './ContactsMultiSelectMenu';
import BlockContactsTable from './BlockContactsTable';
import * as Actions from './store/actions';
// import Data from './ContactData'
import CoreHttpHandler from '../../../../http/services/CoreHttpHandler'
import { object } from 'prop-types';


function ContactsList(props) {
	const [data, setData] = React.useState([])

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

	console.log(filtered, 'datadatadatadatadatadatadata')

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
	// const searchText = Data.searchText
	console.log(ContactsData.entities, 'ContactsData.entities')

	const getData = ((loadData) => {
		console.log('called get data')
		loadData = () => {
			return CoreHttpHandler.request('contact_book', 'listing', {


				limit: 100,
				page: 0,
				columns: "*",
				sortby: "DESC",
				orderby: "id",
				where: "blocked = $1",
				values: true,
			}, null, null, true);
		};
		loadData().then((response) => {
			const tableData = response.data.data.list.data
			console.log(tableData)
			setData(tableData)

		});
	})

	React.useEffect(() => {
		getData()
	}, []);


	const [filteredData, setFilteredData] = useState(null);

	const columns = React.useMemo(
		() => [
			// {
			// 	Header: ({ selectedFlatRows }) => {
			// 		const selectedRowIds = selectedFlatRows.map(row => row.original.id);

			// 		return (
			// 			selectedFlatRows.length > 0 && <ContactsMultiSelectMenu selectedContactIds={selectedRowIds} />
			// 		);
			// 	},
			// 	accessor: 'avatar',
			// 	Cell: ({ row }) => {
			// 		return <Avatar className="mx-8" alt={row.original.name} src={row.original.avatar} />;
			// 	},
			// 	className: 'justify-center',
			// 	width: 64,
			// 	sortable: false
			// },
			{
				Header: 'ID',
				accessor: 'id',
				className: 'font-bold',
				sortable: true
			},
			{
				Header: 'Name',
				accessor: 'name',
				className: 'font-bold',
				sortable: true
			},
			{
				Header: 'Number',
				accessor: 'number',
				className: 'font-bold',
				sortable: true
			},
			{
				Header: 'Description',
				accessor: 'reason',
				sortable: true
			},
			{
				Header: 'Blocked On',
				accessor: 'dt',
				sortable: true
			},
			{
				Header: 'Blocked',
				accessor: 'blocked',
				sortable: true
			},

			// {
			// 	id: 'action',
			// 	width: 128,
			// 	sortable: false,
			// 	Cell: ({ row }) => (
			// 		<div className="flex items-center">
			// 			<IconButton
			// 				onClick={ev => {
			// 					ev.stopPropagation();
			// 					dispatch(Actions.toggleStarredContact(row.original.id));
			// 				}}
			// 			>
			// 				{user.starred && user.starred.includes(row.original.id) ? (
			// 					<Icon>star</Icon>
			// 				) : (
			// 						<Icon>star_border</Icon>
			// 					)}
			// 			</IconButton>
			// 			<IconButton
			// 				onClick={ev => {
			// 					ev.stopPropagation();
			// 					dispatch(Actions.removeContact(row.original.id));
			// 				}}
			// 			>
			// 				<Icon>delete</Icon>
			// 			</IconButton>
			// 		</div>
			// 	)
			// }
		],
		[dispatch, user.starred]
	);

	// useEffect(() => {
	// 	function getFilteredArray(entities, _searchText) {
	// 		const arr = Object.keys(entities).map(id => entities[id]);
	// 		if (_searchText.length === 0) {
	// 			return arr;
	// 		}
	// 		return FuseUtils.filterArrayByString(arr, _searchText);
	// 	}

	// 	if (filtered) {
	// 		setFilteredData(getFilteredArray(filtered, searchText));
	// 	}
	// }, [filtered, searchText]);

	// if (!filteredData) {
	// 	return null;
	// }

	if (filtered.length > 0) {
		return (
			<div className="flex flex-1 items-center justify-center h-full">
				<Typography color="textSecondary" variant="h5">
					{/* There are no contacts! */}
					Loading Your Contacts
				</Typography>
			</div>
		);
	} if (filtered.length === 0) {
		return (
			<div className="flex flex-1 items-center justify-center h-full">
				<Typography color="textSecondary" variant="h5">
					{/* There are no contacts! */}
					There are no blocked contacts!
							</Typography>
			</div>
		);

	}
	console.log(ContactsData, 'ContactsData')
	// console.log(user, 'user')

	function handleClick(n) {
		console.log(n, 'nnnn')
		// setDialogData(n)

		// console.log(dialogData,'ContactGroupDialogContactGroupDialog')
		// setOpen(true);

		// props.history.push({pathname:`/apps/groups/group-detail`,id:n.id});
	}
	return (
		<FuseAnimate animation="transition.slideUpIn" delay={300}>
			<BlockContactsTable
				columns={columns}
				data={data}
				onRowClick={(ev, row) => {
					// if (row) {
					// 	dispatch(Actions.openEditContactDialog(row.original));
					// }
					console.log(row, 'rowrow')
				}}
			// onRowClick={console.log('i am clicked')}
			/>
		</FuseAnimate>
	);
}

export default ContactsList;