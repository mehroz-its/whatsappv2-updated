import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import Icon from '@material-ui/core/Icon';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import UserTableHead from './ChatBotTableHead';
import ContactsTablePaginationActions from '../setting/canned/ContactsTablePaginationActions';
import UserDialog from './UserDialog'
import CoreHttpHandler from '../../../../http/services/CoreHttpHandler';
import FuseLoading from '../../../../@fuse/core/FuseLoading/FuseLoading'
import moment from "moment"
import DeleteDialog from '../setting/DeletDialog'
import ConfirmationDialogue from "../company-profile/customerAccountDetails/SideNavigationPages/autoReply/confirmationDialogue";
import AddAutoReply from "../company-profile/customerAccountDetails/SideNavigationPages/autoReply/addAutoReply";
import FuseAnimate from '@fuse/core/FuseAnimate';
import Fab from '@material-ui/core/Fab';

const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: '100%',
        padding: '0px'
    },
    content: {
        padding: '0px'
    },
    addButton: {
        position: 'fixed',
        bottom: 80,
        right: 50,
        zIndex: 99
    },
    root2: {
        '& > *': {
            margin: theme.spacing(1)
        }
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 100,
        maxWidth: 150,
        marginTop: '-4',
        minHeight: 10,
        maxHeight: 100
    },
    selectEmpty: {
        marginTop: theme.spacing(2)
    },
    largeIcon: {
        height: 22.5
    },
    addButton: {
        position: 'fixed',
        bottom: 80,
        right: 50,
        zIndex: 99
    }
}));

function ChatBotTable(props) {
	function displayError(msg) {
		props.showError(msg)
	}
	function closeDialog(val) {
		setOpen(false)
		setDeleteDialog(false)
		props.onClose(val)
	}
	const handleClickAdd = () => {
        setOpen(true);
    };
    const classes = useStyles();

	const [open, setOpen] = React.useState(false);
	const [chatBotData, setChatBotData] = React.useState(null);
	const [selected, setSelected] = useState([]);

	const { rowsPerPage, currentPage, setLimit, totalItems, setPage, isLoading } = props;

	const [deleteDialogData, setDeleteDialogData] = React.useState({});
	const [deleteDialog, setDeleteDialog] = React.useState(false);

	const [confirmation, setConfirmationType] = React.useState(null);
	const [confirmationData, setConfirmationData] = React.useState(null);
	const [order, setOrder] = useState({
		direction: 'asc',
		id: null
	});
	const [dialogData, setDialogData] = useState({
		enabled: '',
		id: '',
		username: '',
		position: "",
		email: '',
		number: '',
		roles: []

	})


	const updateChatBot = n => {
		setOpen(true)
		setChatBotData(n)
	}
	const openConfirmationDialogue = (type, data) => {

		setConfirmationData(data)
		setConfirmationType(type)
	}

	const handleConfirmationDialogClose = e => {
		setConfirmationData(null)
		setConfirmationType(null)
	}


	const handleConfirmationSubmit = value => {
		if (confirmationData && confirmation) {
			let update_params = {
				attributeType: confirmation,
				value,
				id: confirmationData.id,
			}
			CoreHttpHandler.request(
				'CompanyAgent',
				'update_self_chatbot_attribute',
				update_params,
				response => {
					handleConfirmationDialogClose()
					if (props.refreshTable) {
						props.refreshTable()
					}
					if (props.showMessage) {
						props.showMessage({ msg: "Successfully Updated", success: true })
					}
				},
			);
		}

	}

	function handleRequestSort(event, property) {
		const id = property;
		let direction = 'desc';
		if (order.id === property && order.direction === 'desc') {
			direction = 'asc';
		}
		setOrder({
			direction,
			id
		});
	}
	function handleClick(n) {
		setOpen(true)
		setDialogData({
			enabled: n.enabled,
			id: n.id,
			username: n.username,
			position: n.position,
			email: n.email,
			number: n.number,
			roles: n.roles
		})
	}
	let data2 = props.dataa

	React.useEffect(()=>{
		if(props.removeSearchBar){
			props.removeSearchBar(open)
		}
	},[open])


	const handleChangePage = (event, newPage) => {
		setPage(newPage)
	};

	const handleChangeRowsPerPage = event => {
		setLimit(Number(event.target.value));
	};

    const saveHandler = ({ treeData, name, startMessage, endMessage }) => {
		let update_params = {
			treeData,
			name,
			startMessage, 
			endMessage
		};
		CoreHttpHandler.request(
			'CompanyAgent',
			'add_self_chatbot',
			update_params,
			response => {
				closeHandler({ msg: "Successfully Saved", success: true })
				if(props.refreshTable){
					props.refreshTable()
				}
			},
		);
        
    }
    const updateHandler = ({ treeData, name, startMessage, endMessage }) => {
        if (chatBotData) {
            let update_params = {
                treeData,
                name,
				id:chatBotData.id,
				startMessage,
				endMessage
            }
            CoreHttpHandler.request(
                'CompanyAgent',
                'update_self_chatbot',
                update_params,
                response => {
                    closeHandler({ msg: "Successfully Updated", success: true })
					if(props.refreshTable){
						props.refreshTable()
					}                
				},
            );
        }
    }
	const hadleDelete = (event, n) => {
		event.stopPropagation()
		setDeleteDialog(true)
		setDeleteDialogData(n)
		return;
		CoreHttpHandler.requestCustomer('users', 'delete',
			{
				key: ':id',
				value: n.id
			}
			, (response) => {
				closeDialog("delete")
			}, (error) => {
				closeDialog(error.response.data.message)
			});
	}


    function closeHandler({ msg, success }) {
        setOpen(false)
		setChatBotData(null)
		if(props.showMessage)
        props.showMessage({ msg, success})
	}
	

	return (
		open ?
			<AddAutoReply
				data={chatBotData}
				closeHandler={closeHandler}
				saveHandler={saveHandler}
				updateHandler={updateHandler}
			/> :

			<React.Fragment>
				{
					isLoading ?
						(
							<div className="flex flex-1 items-center justify-center h-full">
								<FuseLoading />
							</div>
						)
						: (
							!data2.length ?
								(
									<div className="flex flex-1 items-center justify-center h-full">
										<Typography color="textSecondary" variant="h5">
											No Data Found
							</Typography>
									</div>
								)
								:
								(
									<div className="w-full flex flex-col">
										<FuseScrollbars className="flex-grow overflow-x-auto">
											<Table className="min-w-xl" aria-labelledby="tableTitle">
												<UserTableHead
													numSelected={selected.length}
													order={order}
													// onSelectAllClick={handleSelectAllClick}
													onRequestSort={handleRequestSort}
													rowCount={data2.length}
												/>

												<TableBody>
													{_.orderBy(
														data2,
														[
															o => {
																switch (order.id) {
																	case 'categories': {
																		return o.categories[0];
																	}
																	default: {
																		return o[order.id];
																	}
																}
															}
														],
														[order.direction]
													)
														.map(n => {
															const isSelected = selected.indexOf(n.id) !== -1;
															return (
																<TableRow
																	className="h-10 cursor-pointer"
																	hover
																	role="checkbox"
																	aria-checked={isSelected}
																	tabIndex={-1}
																	key={n.id}
																	selected={isSelected}

																>

																	<TableCell
																		component="th"
																		scope="row"
																		align="center"
																		style={{ fontSize: '11px', padding: '10px' }}
																	>
																		{n.name}
																	</TableCell>




																	<TableCell
																		component="th"
																		scope="row"
																		align="center"
																		style={{ fontSize: '11px', padding: '10px' }}
																		onClick={(e) => { openConfirmationDialogue("enabled", n) }}
																	>
																		<div>
																			{
																				n.enabled === true ?

																					<Icon name="lock" color="primary">
																						check_circle
																		</Icon>
																					:
																					<Icon name="lock">radio_button_unchecked</Icon>
																			}
																		</div>
																	</TableCell>

																	<TableCell
																		component="th"
																		scope="row"
																		align="center"
																		style={{ fontSize: '11px', padding: '10px' }}
																		onClick={
																			(e) => {
																				if (n.enabled && !n.is_deleted && !n.is_default) {
																					openConfirmationDialogue("default", n)

																				}

																			}

																		}

																	>
																		<div>
																			{
																				n.is_default === true ?

																					<Icon name="lock" color="primary">
																						check_circle
																		</Icon>
																					:
																					<Icon name="lock">radio_button_unchecked</Icon>
																			}
																		</div>
																	</TableCell>




																	<TableCell
																		component="th"
																		scope="row"
																		align="center"
																		style={{ fontSize: '11px', padding: '10px' }}
																	>
																		{moment(n.dt).format("YYYY-MM-DD hh:mm")}
																	</TableCell>


																	<TableCell
																		component="th"
																		scope="row"
																		align="center"
																		style={{ fontSize: '11px', padding: '10px' }}
																		onClick={(e) => { openConfirmationDialogue("delete", n) }}

																	>
																		<div>
																			{

																				<Icon name="lock">delete</Icon>
																			}
																		</div>
																	</TableCell>

																	<TableCell
																		component="th"
																		scope="row"
																		align="center"
																		style={{ fontSize: '11px', padding: '10px' }}
																		onClick={e => { updateChatBot(n) }}
																	>
																		<Icon name="lock" color="primary">
																			edit
																				</Icon>
																	</TableCell>

																</TableRow>
															);
														})}
												</TableBody>
											</Table>
											{
												confirmation && confirmationData ?
													<ConfirmationDialogue
														type={confirmation}
														data={confirmationData}
														handleDialogClose={handleConfirmationDialogClose}
														handleSubmit={handleConfirmationSubmit}
													/>

													: null
											}

										</FuseScrollbars>
									</div>

								)
						)
				}


				<FuseAnimate animation="transition.expandIn" delay={300}>
					<Fab
						color="primary"
						aria-label="add"
						size="medium"
						className={classes.addButton}
						onClick={handleClickAdd}
					>
						<Icon>person_add</Icon>
					</Fab>
				</FuseAnimate>

			</React.Fragment>

	);


}

export default withRouter(ChatBotTable);