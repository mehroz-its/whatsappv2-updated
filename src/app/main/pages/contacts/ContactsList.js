import FuseAnimate from '@fuse/core/FuseAnimate';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import ContactsTable from './ContactsTable';
import CoreHttpHandler from '../../../../http/services/CoreHttpHandler'
import FuseLoading from '../../../../@fuse/core/FuseLoading/FuseLoading'




function ContactsList(props) {
	const [data, setData] = React.useState([])
	const [rowvalue, setROWvalue] = React.useState('')
	const [totalItems, setTotalItems] = React.useState(0)
	const [currentParams, setCurrentParams] = React.useState({ limit: 5, page: 0 })
	const [isLoading, setLoading] = React.useState(true)

	const [openBlockDialog, setOpenBlockDialog] = React.useState(false);
	const [unblockDialog, setUnBlockDialog] = React.useState(false);
	const [data2, setData2] = useState([]);
	const [searchVal, setSearchVal] = useState(props.ValueForSearch)
	let filtered = []
	data.map((i, v) => {
		let newobj = {
			...i
		}
		i.attributes.map((item, val) => {
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
	const user = ContactsData.user
	const getData = ((loadData) => {
		loadData = () => {
			setLoading(true)

			return CoreHttpHandler.request('contact_book', 'listing', {
				limit: currentParams.limit,
				page: currentParams.page,
				columns: "*",
				sortby: "DESC",
				orderby: "id",
				where: "blocked = $1",
				values: false,
			}, null, null, true);
		};
		loadData().then((response) => {
			setLoading(false)
			const tableData = response.data.data.list.data
			setTotalItems(response.data.data.list.totalItems)
			setData(tableData)

		});
	})

	React.useEffect(() => {
		getData()
	}, [currentParams]);

	const setPage = (currentPage) => {
		setCurrentParams({ limit: currentParams.limit, page: currentPage })
	}

	const setLimit = (pageLimit) => {
		setCurrentParams({ limit: pageLimit, page: 0 })
	}
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
		setROWvalue(row.original)
	}

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
				Header: 'Block',
				accessor: 'block',

				id: 'action',
				// width: 128,
				sortable: false,
				Cell: ({ row }) => (
					<div className="flex" style={{ justifyContent: 'flex-end' }}>
						{row.original.blocked === false ?
							(
								<IconButton
									style={{ alignItems: 'flex-end', alignSelf: 'flex-end' }}
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


	// console.log(user, 'user')

	function handleClick(n) {
		setROWvalue(n.original)
		setOpenBlockDialog(true)
	}

	if (isLoading) {

		return (
			<div className="flex flex-1 items-center justify-center h-full">
				<FuseLoading />
			</div>
		);
	} else if (filtered.length === 0) {
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
			// <FuseAnimate animation="transition.slideUpIn" delay={300}>
			<ContactsTable
				giveVal={props.GiveVal}
				getUpdatedData={() => { getData() }}
				openUnBlockDialog={unblockDialog}
				onBlockDialogClose={handleClose}
				blockRowData={rowvalue}
				openBlockDialog={openBlockDialog}
				columns={columns}
				data={filtered}
				totalItems={totalItems}
				setPage={setPage}
				setLimit={setLimit}
				rowsPerPage={currentParams.limit}
				currentPage={currentParams.page}
				onRowClick={(ev, row) => {
				}}
			/>
			// </FuseAnimate>
		);
	}
}

export default ContactsList;