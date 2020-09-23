import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import CoreHttpHandler from '../../../../../http/services/CoreHttpHandler'
import reducer from '../store/reducers';
import TemplateHeader from './TemplateHeader';
import TemplateTable from './TemplateTable';
import { makeStyles } from '@material-ui/core/styles';
import TemplateDialog from './TemplateDialog'
const useStyles = makeStyles((theme) => ({
	addButton: {
		position: 'absolute',
		bottom: 50,
		right: 50,
		zIndex: 99
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 330,
	},
}));
function Campaign(props) {
	const classes = useStyles(props);
	const [open, setOpen] = React.useState(false);
	const [data, setData] = React.useState([]);
	const [data2, setData2] = React.useState(data);
	const [val, setVal] = React.useState('')
	const handleClickOpen = () => {
		setOpen(true);
	};
	const getData = ((loadData) => {
		loadData = () => {
			return CoreHttpHandler.request('template', 'listing', {
				limit: 10,
				page: 0,
				columns: "*",
				sortby: "DESC",
				orderby: "id",
				where: "id != $1",
				values: 0,
			}, null, null, true);
		};
		loadData().then((response) => {
			const tableData = response.data.data.list.data
			setData(tableData)
			setData2(tableData)
		});
	})

	React.useEffect(() => {
		getData()
	}, []);

	function search(value) {
		setVal(value)
		setData2(data.filter(n => n.template_name.toLowerCase().includes(value.toLowerCase())))
	}


	const handleClose = () => {
		setOpen(false);
	};

	const updateText = (search) => {
		setVal(search)
	}

	const [age, setAge] = React.useState('Text');

	return (
		<>
			<FusePageCarded
				classes={{
					content: 'flex',
					header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
				}}
				header={<TemplateHeader SearchVal={search} />}
				content={<TemplateTable dataa={data2} ValueForSearch={val} />}
			/>
			{open && <TemplateDialog type="Add Template" isOpen={open} closeDialog={handleClose} />}
		</>
	);
}
export default withReducer('eCommerceApp', reducer)(Campaign);
