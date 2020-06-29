import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import Checkbox from '@material-ui/core/Checkbox';
import Icon from '@material-ui/core/Icon';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as Actions from '../store/actions';
import NumberTableHead from './NumberTableHead';
import { Button, Paper } from '@material-ui/core';

import TableData from '../CannedData'
// import CannedDialog from './CannedDialog'
import CoreHttpHandler from '../../../../../http/services/CoreHttpHandler'


function NumberTable(props) {
  console.log(props)
  const dispatch = useDispatch();
  const products = useSelector(({ eCommerceApp }) => eCommerceApp.products.data);
  const searchText = useSelector(({ eCommerceApp }) => eCommerceApp.products.searchText);

  const [selected, setSelected] = useState(props.rowData.customers);
  const [open, setOpen] = React.useState(false);
  const [dialogData, setDialogData] = React.useState(
    {
      id: 0,
      title: '',
      description: '',
      enabled: true,
      customers: [],
    }
  )


  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState({
    direction: 'asc',
    id: null
  });



  const getData = ((loadData) => {
    console.log('called get data')
    loadData = () => {
      return CoreHttpHandler.request('contact_book', 'listing', {

        limit: 100,
        page: 0,
        columns: "id,name,number",
        sortby: "ASC",
        orderby: "id",
        where: "blocked = $1",
        values: false,
      }, null, null, true);
    };
    loadData().then((response) => {
      const tableData = response.data.data.list.data
      console.log(tableData)
      setData(tableData)
    });
  })

  React.useEffect(() => {
    getData()
  }, []);
  // useEffect(() => {
  // 	dispatch(Actions.getProducts());
  // }, [dispatch]);

  // useEffect(() => {
  // 	if (searchText.length !== 0) {
  // 		setData(_.filter(products, item => item.name.toLowerCase().includes(searchText.toLowerCase())));
  // 		setPage(0);
  // 	} else {
  // 		setData(products);
  // 		console.log(products,'here in prdoducts table')
  // 	}
  // }, [products, searchText]);

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
  const handleClose = () => {
    getData()

    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  }
  function handleSelectAllClick(event) {
    console.log(event.target.checked)
    if (event.target.checked) {
      setSelected(data.map(n => n.id));
      return;
    }
    setSelected([]);
    props.sendSelectedNumbers(selected)
    console.log(selected, 'slecete nummmm')
  }

  function handleClick(n) {
    // setDialogData({ enable: n.enabled, id: n.id, name: n.message_name, type: n.message_type, text: n.message_text, url: n.attachment_url, attachment_type: n.attachment_type, file_name: n.attachment_name })
    // console.log(n.customers,'customerscustomerscustomers')
    // setSelected(n.customers)
    setOpen(true);

    // props.history.push({pathname:`/apps/groups/group-detail`,id:n.id});
  }

  function handleCheck(event, id) {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
    props.sendSelectedNumbers(newSelected)
    console.log(newSelected, 'newSelectednewSelectednewSelected')
  }

  function handleChangePage(event, value) {
    setPage(value);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value);
  }

  return (
    <Paper>


      <div className="w-full flex flex-col">
        <FuseScrollbars className="flex-grow overflow-x-auto">
          <Table className="min-w-xs" aria-labelledby="tableTitle" size='small'>
            <NumberTableHead
              numSelected={selected.length}
              order={order}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={data.length}
            />

            <TableBody>
              {_.orderBy(
                data,
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
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  const isSelected = selected.indexOf(n.id) !== -1;
                  return (
                    <TableRow
                      className="h-64 cursor-pointer"
                      hover
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.id}
                      selected={isSelected}
                      onClick={event => handleClick(n)}
                      style={{ height: '33px' }}
                    >

                      <TableCell className="w-64 text-center" padding="none">
                        <Checkbox
                          checked={isSelected}
                          onClick={event => event.stopPropagation()}
                          onChange={event => handleCheck(event, n.id)}
                        />
                      </TableCell>
                      {/* <TableCell component="th" scope="row" >
											{n.id}
										</TableCell> */}
                      <TableCell component="th" scope="row" padding="none" align="left">
                        {n.name}
                      </TableCell>
                      <TableCell component="th" scope="row" align="right" >
                        {n.number}
                      </TableCell>
                      {/* <TableCell component="th" scope="row" align="right">
											{n.message_params}
										</TableCell>
										<TableCell component="th" scope="row" align="right">
											{n.message_type}
										</TableCell>
										<TableCell component="th" scope="row" align="right">
											{n.enabled ? (
												<Icon className="text-green text-20">check_circle</Icon>
											) : (
													<Icon className="text-red text-20">cancel</Icon>
												)}
										</TableCell> */}
                      {/* 
										<TableCell component="th" scope="row" align="right">
											{n.quantity}
											<i
												className={clsx(
													'inline-block w-8 h-8 rounded mx-8',
													n.quantity <= 5 && 'bg-red',
													n.quantity > 5 && n.quantity <= 25 && 'bg-orange',
													n.quantity > 25 && 'bg-green'
												)}
											/>
										</TableCell> */}

                      {/* <TableCell component="th" scope="row" align="right">
											{n.active ? (
												<Icon className="text-green text-20">check_circle</Icon>
											) : (
													<Icon className="text-red text-20">remove_circle</Icon>
												)}
										</TableCell> */}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </FuseScrollbars>

        <TablePagination
          className="overflow-hidden"
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}

          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page'
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page'
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        {/* {open && <CannedDialog isOpen={open} type="Update Canned Message" closeDialog={handleClose} getUpdatedData={getData} data={dialogData} />} */}
      </div>
    </Paper>
  );
}

export default withRouter(NumberTable);	
