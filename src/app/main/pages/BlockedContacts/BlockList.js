import FuseAnimate from '@fuse/core/FuseAnimate';
import Typography from '@material-ui/core/Typography';
import React, {useState } from 'react';
import { useDispatch } from 'react-redux';
import BlockContactsTable from './BlockContactsTable';
import CoreHttpHandler from '../../../../http/services/CoreHttpHandler'
import { object } from 'prop-types';
import FuseLoading from '../../../../@fuse/core/FuseLoading/FuseLoading'
function ContactsList(props) {
	const [data, setData] = React.useState([])
	const [data2, setData2] = useState([]);
	const [searchVal, setSearchVal] = useState(props.ValueForSearch)

	const [totalItems, setTotalItems] = React.useState(0)
	const [currentParams, setCurrentParams] = React.useState({limit:5,page:0})
	const [isLoading, setLoading] = React.useState(true)
	

	let filtered = []
	let newobj = {
	}
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
		setLoading(true)

		loadData = () => {
			return CoreHttpHandler.request('contact_book', 'listing', {
				limit: currentParams.limit,
				page: currentParams.page,
				columns: "*",
				sortby: "DESC",
				orderby: "id",
				where: "blocked = $1",
				values: true,
			}, null, null, true);
		};
		loadData().then((response) => {
			setLoading(false)
			setTotalItems(response.data.data.list.totalItems)

			const tableData = response.data.data.list.data
			setData(tableData)
		});
	})


	React.useEffect(() => {
		getData()
	  }, [currentParams]);
	const setPage = (currentPage)=>{
		setCurrentParams({limit:currentParams.limit,page:currentPage})
	}
	
	const setLimit = (pageLimit)=>{
		setCurrentParams({limit:pageLimit,page:0})
	}

	if (searchVal !== props.ValueForSearch) {
		{ search() }
	}

	function search() {
		setSearchVal(props.ValueForSearch)
		setData2(filtered.filter(n => n.name.toLowerCase().includes(props.ValueForSearch.toLowerCase())))
	}
	if (data2.length > 0) {
		filtered = data2
	} else if (data2.length === 0 && searchVal !== '') {
		filtered = data2
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
		],
		[dispatch, user.starred]
	);
	setTimeout(() => {
		return (<FuseLoading />)
	}, 5000);
	if(isLoading){
		
		return (
			<div className="flex flex-1 items-center justify-center h-full">
				<FuseLoading />
			</div>
		);
	}else if (ContactsData.entities.length == 0) {
		return (
			<div className="flex flex-1 items-center justify-center h-full">
				<Typography color="textSecondary" variant="h5">
					No Blocked Contacts
		</Typography>
			</div>
		)
	}else if (filtered.length === 0 && searchVal !== '') {
		return (
			<div className="flex flex-1 items-center justify-center h-full">
				<Typography color="textSecondary" variant="h5">
					No Data Found!
			</Typography>
			</div>
		)
	}else{

		return (
			// <FuseAnimate animation="transition.slideUpIn" delay={300}>
				<BlockContactsTable
					giveVal={props.GiveVal}
					columns={columns}
					data={data}
					getData={getData}
					
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