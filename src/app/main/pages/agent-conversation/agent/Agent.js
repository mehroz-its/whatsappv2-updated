import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store/reducers';
import AgentHeader from './AgentHeader';
import AgentContent from './AgentContent';

function Campaign() {
	const [viewChat,setViewChat] = React.useState(null)
	const [selectedAgent,setSelectedAgent]  = React.useState(null)


	const Agent = (value) => {
		setSelectedAgent(value)
		setViewChat(true)
		// console.log('ceeleded', props.ValueForSearch, searchVal);

		// setSearchVal(props.ValueForSearch)
	
		// console.log(data2, 'filterssss');


	}

	return (
		<FusePageCarded
			classes={{
				content: 'flex',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={<AgentHeader  Agent={Agent} />}
			content={<AgentContent  val={selectedAgent} viewChat={viewChat} />}
			// innerScroll
		/>
	);
}

export default withReducer('eCommerceApp', reducer)(Campaign);
