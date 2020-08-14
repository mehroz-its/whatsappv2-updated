import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store/reducers';
import AgentHeader from './AgentHeader';
import AgentContent from './AgentContent';

function Campaign() {
	const [viewChat,setViewChat] = React.useState(null)
	const [selectedAgent,setSelectedAgent]  = React.useState('All')
	const [Total,setTotal]  = React.useState(null)
	var testing = null;


	const Agent = (value) => {
		setSelectedAgent(value)
		setViewChat(true)
		console.log(viewChat, value,'i am in main')
	}
	const Totalsssss = (value) => {
		setTotal(value)

		console.log(value,testing,'i am in Totalaalllllllllllllll')
	}



	

	return (
		<FusePageCarded
			classes={{
				content: 'flex',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={<AgentHeader  Agent={Agent} test={Total} />}
			content={<AgentContent  selectedAgent={selectedAgent} displayChat={viewChat} Total={Totalsssss} />}
			innerScroll
		/>
	);
}

export default withReducer('eCommerceApp', reducer)(Campaign);
