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
import CoreHttpHandler from '../../../../../http/services/CoreHttpHandler'


function ContactsList(props) {
	const dispatch = useDispatch();
	// const contacts = useSelector(({ contactsApp }) => contactsApp.contacts.entities);
    const contacts = Data.entities
	const searchText=Data.searchText
	// const searchText = useSelector(({ contactsApp }) => console.log(contactsApp) );
	// const user = useSelector(({ contactsApp }) => contactsApp.user);
	 const user = Data.user
	// const searchText = Data.searchText

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
				values: false,
			}, null, null, true);
		};
		loadData().then((response) => {
			const tableData = response.data.data.list.data
			console.log(tableData)
			// setData(tableData)
		});
	})

	React.useEffect(() => {
		getData()
	}, []);


	const [filteredData, setFilteredData] = useState(null);

	const columns = React.useMemo(
		() => [
			{
				Header: ({ selectedFlatRows }) => {
					const selectedRowIds = selectedFlatRows.map(row => row.original.id);

					return (
						selectedFlatRows.length > 0 && <ContactsMultiSelectMenu selectedContactIds={selectedRowIds} />
					);
				},
				accessor: 'avatar',
				Cell: ({ row }) => {
					return <Avatar className="mx-8" alt={row.original.name} src={row.original.avatar} />;
				},
				className: 'justify-center',
				width: 64,
				sortable: false
			},
			{
				Header: 'Name',
				accessor: 'name',
				className: 'font-bold',
				sortable: true
			},
			{
				Header: 'Phone',
				accessor: 'phone',
				className: 'font-bold',
				sortable: true
			},
			// {
			// 	Header: 'Company',
			// 	accessor: 'company',
			// 	sortable: true
			// },
			// {
			// 	Header: 'Job Title',
			// 	accessor: 'jobTitle',
			// 	sortable: true
			// },
			// {
			// 	Header: 'Email',
			// 	accessor: 'email',
			// 	sortable: true
			// },
			// {
			// 	Header: 'Phone',
			// 	accessor: 'phone',
			// 	sortable: true
			// },
			{
				id: 'action',
				width: 128,
				sortable: false,
				Cell: ({ row }) => (
					<div className="flex items-center">
						<IconButton
							onClick={ev => {
								ev.stopPropagation();
								dispatch(Actions.toggleStarredContact(row.original.id));
							}}
						>
							{user.starred && user.starred.includes(row.original.id) ? (
								<Icon>star</Icon>
							) : (
								<Icon>star_border</Icon>
							)}
						</IconButton>
						<IconButton
							onClick={ev => {
								ev.stopPropagation();
								dispatch(Actions.removeContact(row.original.id));
							}}
						>
							<Icon>delete</Icon>
						</IconButton>
					</div>
				)
			}
		],
		[dispatch, user.starred]
	);

	useEffect(() => {
		function getFilteredArray(entities, _searchText) {
			const arr = Object.keys(entities).map(id => entities[id]);
			if (_searchText.length === 0) {
				return arr;
			}
			return FuseUtils.filterArrayByString(arr, _searchText);
		}

		if (contacts) {
			setFilteredData(getFilteredArray(contacts, searchText));
		}
	}, [contacts, searchText]);

	if (!filteredData) {
		return null;
	}

	if (filteredData.length === 0) {
		return (
			<div className="flex flex-1 items-center justify-center h-full">
				<Typography color="textSecondary" variant="h5">
					There are no contacts!
				</Typography>
			</div>
		);
	}
	console.log(searchText,'search')
	console.log( user,'user')

	return (
		<FuseAnimate animation="transition.slideUpIn" delay={300}>
			<ContactsTable
				columns={columns}
				data={filteredData}
				onRowClick={(ev, row) => {
					if (row) {
						dispatch(Actions.openEditContactDialog(row.original));
					}
				}}
			/>
		</FuseAnimate>
	);
}

export default ContactsList;