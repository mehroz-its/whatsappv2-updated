import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Icon from '@material-ui/core/Icon';
import FusePageCarded from '@fuse/core/FusePageCarded';
import ContactTable from './ContactTable'

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 100,
        maxWidth:150,
        marginTop:'-4',
        minHeight:10,
        maxHeight:100,
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
      largeIcon: {
        // width: 10,
        // marginLeft:'-2px',
        height: 23,
      },
  }));

function Contact(){
    const classes = useStyles();
    const [number,SetNumber] = useState(10) 
    const handleChange = (event) => {
		SetNumber(event.target.value);
    };
    
       return(
           <>
        <div className={classes.root}>
            <Button
            size='small' 
            variant="contained" 
            color="primary" 
            
            >
            New Contact    
            </Button>
        </div>
        <div style={{flexDirection:'row',flex:1,display:'flex'}}>
        <FormControl className={classes.formControl}>
        <Select
          value={number}
          onChange={handleChange}
          displayEmpty
          className={classes.selectEmpty}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={25}>25</MenuItem>
          <MenuItem value={50}>50</MenuItem>
        </Select>
    </FormControl>
    <div style={{marginTop:'20px'}}>
    <Button
            size='small' 
            variant="contained" 
            color="primary" 
            style={{borderRadius:0}}
            >
            Export    
            </Button>
            <Button
            style={{marginLeft:'-4px',paddingTop:'10px'}}
            size='small' 
            variant="contained" 
            color="primary" 
            style={{borderRadius:0}}
            >
            <Icon
            fontSize="small"
            className={classes.largeIcon}
            
            >send</Icon> 
            </Button>
    </div>
    </div>
            <FusePageCarded
				classes={{
					content: 'flex',
					header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
					root: classes.layoutRoot,
				}}
				content={<ContactTable  />}
			// innerScroll
			/>
            </>
       ) 
}

export default Contact  