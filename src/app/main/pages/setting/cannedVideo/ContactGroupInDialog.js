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
import NumberTableHead from './NumberTableHead';
import { Button, Paper } from '@material-ui/core';
import CoreHttpHandler from '../../../../http/services/CoreHttpHandler'


function NumberTable(props) {
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
      setData(tableData)
    });
  })

  React.useEffect(() => {
    getData()
  }, []);
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
    if (event.target.checked) {
      setSelected(data.map(n => n.id));
      return;
    }
    setSelected([]);
    props.sendSelectedNumbers(selected)
  }

  function handleClick(n) {
    setOpen(true);
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
      </div>
    </Paper>
  );
}

export default withRouter(NumberTable);	
