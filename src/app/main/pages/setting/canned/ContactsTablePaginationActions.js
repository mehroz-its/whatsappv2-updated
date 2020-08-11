import React from 'react';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { useTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const ContactsTablePaginationActions = props => {
	const theme = useTheme();
	const { count, page, rowsPerPage, onChangePage } = props;

	const handleFirstPageButtonClick = event => {
		onChangePage(event, 0);
	};

	const handleBackButtonClick = event => {
		onChangePage(event, page - 1);
	};

	const handleNextButtonClick = event => {
		onChangePage(event, page + 1);
	};

	const handleLastPageButtonClick = event => {
		onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
	};

	return (
		<div className="flex-shrink-0 px-12 overflow-hidden">
			<IconButton  className="text-4 mt-0 "
			
			size="small" onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label="first page">
				{theme.direction === 'rtl' ? <LastPageIcon style={{fontSize:'20px'}} /> : <FirstPageIcon style={{fontSize:'20px'}} />}
			</IconButton>
			<IconButton  className="text-64 mt-0" size="small" onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
				{theme.direction === 'rtl' ? <KeyboardArrowRight style={{fontSize:'20px'}} /> : <KeyboardArrowLeft style={{fontSize:'20px'}} />}
			</IconButton>
			<IconButton
			className="text-64 mt-0" 
			size="small"
		
				onClick={handleNextButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label="next page"
			>
				{theme.direction === 'rtl' ? <KeyboardArrowLeft style={{fontSize:'20px'}} /> : <KeyboardArrowRight style={{fontSize:'20px'}} />}
			</IconButton>
			<IconButton
			className="text-64 mt-0" 
			classes={{
				sizeSmall:'text-xs'
			}}
		
			size="small"
				onClick={handleLastPageButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label="last page"
			>
				{theme.direction === 'rtl' ? <FirstPageIcon style={{fontSize:'20px'}} /> : <LastPageIcon  style={{fontSize:'20px'}} />}
			</IconButton>
		</div>
	);
};

ContactsTablePaginationActions.propTypes = {
	count: PropTypes.number.isRequired,
	onChangePage: PropTypes.func.isRequired,
	page: PropTypes.number.isRequired,
	rowsPerPage: PropTypes.number.isRequired
};

export default ContactsTablePaginationActions;
