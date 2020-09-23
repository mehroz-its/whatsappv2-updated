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
	const Agent = (value) => {
		setSelectedAgent(value)
		setViewChat(true)
	}
	const Totalsssss = (value) => {
		setTotal(value)
	}

	const load = (value) =>{
	}
	return (
		<FusePageCarded
			classes={{
				content: 'flex',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={<AgentHeader  Agent={Agent} test={Total} load={load} />}
			content={<AgentContent  selectedAgent={selectedAgent} displayChat={viewChat} Total={Totalsssss} />}
			innerScroll
		/>
	);
}

export default withReducer('eCommerceApp', reducer)(Campaign);
