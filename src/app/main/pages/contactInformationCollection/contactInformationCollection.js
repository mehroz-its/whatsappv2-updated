import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import FuseAnimate from '@fuse/core/FuseAnimate';
import Icon from '@material-ui/core/Icon';
import './widgets/Dashboard.css';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CoreHttpHandler from '../../../../http/services/CoreHttpHandler';
import FuseLoading from '../../../../@fuse/core/FuseLoading/FuseLoading';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';

const useStyles = makeStyles({
	root: {
		width: '100%',
	  },
	  container: {
		maxHeight: 350,
	  },
});

const columns = [
	{ id: 'name', label: 'Name', minWidth: 170 },
	{ id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
	{
	  id: 'population',
	  label: 'Population',
	  minWidth: 170,
	  align: 'right',
	  format: (value) => value.toLocaleString('en-US'),
	},
	{
	  id: 'size',
	  label: 'Size\u00a0(km\u00b2)',
	  minWidth: 170,
	  align: 'right',
	  format: (value) => value.toLocaleString('en-US'),
	},
	{
	  id: 'density',
	  label: 'Density',
	  minWidth: 170,
	  align: 'right',
	  format: (value) => value.toFixed(2),
	},
  ];
  
  function createData(name, code, population, size) {
	const density = population / size;
	return { name, code, population, size, density };
  }
  
  const rows = [
	createData('India', 'IN', 1324171354, 3287263),
	createData('China', 'CN', 1403500365, 9596961),
	createData('Italy', 'IT', 60483973, 301340),
	createData('United States', 'US', 327167434, 9833520),
	createData('Canada', 'CA', 37602103, 9984670),
	createData('Australia', 'AU', 25475400, 7692024),
	createData('Germany', 'DE', 83019200, 357578),
	createData('Ireland', 'IE', 4857000, 70273),
	createData('Mexico', 'MX', 126577691, 1972550),
	createData('Japan', 'JP', 126317000, 377973),
	createData('France', 'FR', 67022000, 640679),
	createData('United Kingdom', 'GB', 67545757, 242495),
	createData('Russia', 'RU', 146793744, 17098246),
	createData('Nigeria', 'NG', 200962417, 923768),
	createData('Brazil', 'BR', 210147125, 8515767),
  ];
function ContactInformationCollection(props) {
	const classes = useStyles();
	const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);


  const [data, setData] = React.useState([])
  const [rowvalue, setROWvalue] = React.useState('')
  const [totalItems, setTotalItems] = React.useState(0)
  const [currentParams, setCurrentParams] = React.useState({ limit: 5, page: 0 })
  const [isLoading, setLoading] = React.useState(true)

  const [openBlockDialog, setOpenBlockDialog] = React.useState(false);
  const [unblockDialog, setUnBlockDialog] = React.useState(false);
  const [data2, setData2] = useState([]);
//   const [searchVal, setSearchVal] = useState(props.ValueForSearch)
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
	React.useEffect(() => {
		getData()
		// CoreHttpHandler.request(
		// 	'dashboard',
		// 	'listing',
		// 	{ ...dataSourceOptions.params },
		// 	dataSourceSuccess,
		// 	dataSourceFailure
		// );
	}, []);
	const getData = ((loadData) => {
		loadData = () => {
			setLoading(true)
			return CoreHttpHandler.request('contact_book', 'listing', {
				limit: currentParams.limit,
				page: currentParams.page,
				columns: "*",
				sortby: "DESC",
				orderby: "id",
				where: "blocked = $1",
				values: false,
			}, null, null, true);
		};
		loadData().then((response) => {
			setLoading(false)
			const tableData = response.data.data.list.data
			setTotalItems(response.data.data.list.totalItems)
			setData(tableData)
			console.log("tableData :" ,  tableData);

		});
	})
	return (
		<FusePageSimple
			classes={{
				header: 'min-h-150 h-150 sm:h-150 sm:min-h-150',
				content: classes.content
			}}
			header={
				<div className="flex flex-col justify-between flex-1 px-20 pt-20 ">
					<div className="flex items-center pt-30">
						<FuseAnimate animation="transition.expandIn" delay={300}>
							<Icon className="text-26">dashboard</Icon>
						</FuseAnimate>
						<FuseAnimate animation="transition.slideLeftIn" delay={300}>
							<Typography className=" py-0 sm:py-24 hidden sm:flex mx-0 sm:mx-12 text-20" variant="h6">
								Information Collection
							</Typography>
						</FuseAnimate>
					</div>
				</div>
			}
			content={
				<>
					<div className="p-24">
						<FuseAnimateGroup
							className="flex flex-wrap"
							enter={{
								animation: 'transition.slideUpBigIn'
							}}
						>
<TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
		  <TableCell
                  key={"sd"}
                  align={"left"}
                  style={{ fontSize:12,padding:12, }}
                >
                Id
                </TableCell>

				<TableCell
                  key={"sd"}
                  align={"left"}
                  style={{ fontSize:12,padding:12, }}
                >
                Name
                </TableCell>
				<TableCell
                  key={"sd"}
                  align={"left"}
                  style={{ fontSize:12,padding:12, }}
                >
                Number
                </TableCell>
		 
          </TableRow>
        </TableHead>
        <TableBody>
		{data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
				
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id} onClick={()=>alert(row.name)}>
					    <TableCell key={row.id} style={{fontSize:12,padding:12}} align={"left"}>
						{row.id}
						</TableCell>
						<TableCell key={row.id} style={{fontSize:12,padding:12}} align={"left"}>
						{row.name}
						</TableCell>
						<TableCell key={row.id} style={{fontSize:12,padding:12}} align={"left"}>
						{row.number}
						</TableCell>
                 
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
	<TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />


						</FuseAnimateGroup>
					</div>
				</>
			}
		/>
	);
}
export default ContactInformationCollection;
