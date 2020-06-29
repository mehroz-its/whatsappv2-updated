import DemoContent from '@fuse/core/DemoContent';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core/styles';
import React, { useRef } from 'react';
import ContactsHeader from './ContactsHeader';
import ContactsList from './ContactsList';
import ContactsSidebarContent from './ContactsSidebarContent';

const useStyles = makeStyles({
	layoutRoot: {}
});

function ContactsApp() {
	const classes = useStyles();
	const pageLayout = useRef(null);

	return (
		<FusePageSimple
		classes={{
			// contentWrapper: 'p-0 sm:p-24 pb-80 sm:pb-80 h-full',
			// content: 'flex flex-col h-full',
			// leftSidebar: 'w-256 border-0',
			// header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
			// wrapper: 'min-h-0'
		}}
		// header={<ContactsHeader pageLayout={pageLayout} />}

		content={<ContactsList />}
		
			// leftSidebarContent={<ContactsSidebarContent />}
				// sidebarInner
				// ref={pageLayout}	
				// innerScroll
		/>
	);
}

export default ContactsApp;
