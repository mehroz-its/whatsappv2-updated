import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseUtils from '@fuse/utils';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContactsMultiSelectMenu from './ContactsMultiSelectMenu';
import BlockContactsTable from './ContactGroupTable';
import * as Actions from './store/actions';
// import Data from './ContactData'
import CoreHttpHandler from '../../../../http/services/CoreHttpHandler'
import { object } from 'prop-types';
import FuseLoading from '../../../../@fuse/core/FuseLoading/FuseLoading'



function ContactsList(props) {

	const [searchVal, setSearchVal] = useState(props.ValueForSearch)
	const {data,onDialogClose,isSearched }  = props
	// const [data2, setData2] = useState(props.data);

	// const [data, setData] = React.useState([])
	// console.log(data2,data,'datatdatadta')
	// if(data.length0){
	// 	setData2(data)
	// }

	let filtered = []
	let newobj = {

	}
	data.map((i, v) => {
		console.log(i,'iii')
		return;
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

	// function search() {
	// 	console.log('ceeleded', props.ValueForSearch, searchVal);

	// 	setSearchVal(props.ValueForSearch)
	// 	setData2(filtered.filter(n => n.firstname.toLowerCase().includes(props.ValueForSearch.toLowerCase())))
	// 	console.log(data, 'filterssss');


	// }
	// if (searchVal !== props.ValueForSearch) {
	// 	search() 
	// 	console.log('i invoked')
	// }

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
	const contacts = ContactsData.entities
	const searchText = ContactsData.searchText
	const user = ContactsData.user
	console.log(ContactsData.entities, 'ContactsData.entities')

	const columns = React.useMemo(
		() => [

			{
				Header: 'ID',
				accessor: 'id',
				className: 'font-bold',
				sortable: true
			},
			{
				Header: 'Title',
				accessor: 'title',
				className: 'font-bold',
				sortable: true
			},
			{
				Header: 'Decsription',
				accessor: 'description',
				className: 'font-bold',
				sortable: true
			},
			{
				Header: 'Total Consumer',
				accessor: 'customers.length',
				sortable: true
			},
			{
				Header: 'Enable',
				accessor: 'enabled',
				sortable: true
			},
		],
		[dispatch, user.starred]
	);

	if (data.length === 0) {
		if (isSearched !== '') {
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
				onClose={onDialogClose}
			// onRowClick={console.log('i am clicked')}
			/>
		</FuseAnimate>
	);
}

export default ContactsList;