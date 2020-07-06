import DemoContent from '@fuse/core/DemoContent';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core/styles';
import React, { useRef } from 'react';
import ContactsHeader from './ContactsHeader';
import ContactsList from './ContactsList';
import ContactsSidebarContent from './ContactsSidebarContent';
import FuseAnimate from '@fuse/core/FuseAnimate';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import ContactDialog from './ContactDialog'
import * as Actions from './store/actions';
import { useDispatch } from 'react-redux';







const useStyles = makeStyles({
	layoutRoot: {}
});

function ContactsApp() {
	const classes = useStyles();
	const pageLayout = useRef(null);
	const [open, setOpen] = React.useState(false);
	const[val,setVal]=React.useState('')
	const dispatch = useDispatch();


	// const handleChange = (event) => {
	// 	setAge(event.target.value);
	// };

	const handleClose = () => {
		setOpen(false);
	};
	const handleClickOpen = () => {
		setOpen(true);
	}

	const [dialogData, setDialogData] = React.useState(
		{
		  id: 0,
		  title: '',
		  description: '',
		  enabled: true,
		  customers: [],
		}
	  )

	  const updateText =(search)=>
	  {
		setVal(search)
	  }

	return (
		<>
		<FusePageSimple
		classes={{
			contentWrapper: 'p-0 sm:p-24 pb-80 sm:pb-80 h-full',
			content: 'flex flex-col h-full',
			leftSidebar: 'w-256 border-0',
			header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
			wrapper: 'min-h-0'
		}}
		header={<ContactsHeader pageLayout={pageLayout}   SearchVal={updateText}/>}

		content={<ContactsList   ValueForSearch={val} />}
		
			leftSidebarContent={<ContactsSidebarContent />}
				sidebarInner
				ref={pageLayout}	
				// innerScroll
		/>
	
			</>
			);
}

export default ContactsApp;
