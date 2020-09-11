import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import WhatsApp from '@material-ui/icons/WhatsApp';
import Facebook from '@material-ui/icons/Facebook';
import Instagram from '@material-ui/icons/Instagram';



  
  const AntTab = withStyles((theme) => ({
    root: {
      textTransform: 'none',
      minWidth: 72,
      fontWeight: theme.typography.fontWeightRegular,
      marginRight: theme.spacing(4),
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:hover': {
        color: 'green',
        opacity: 1,
      },
      '&$selected': {
        color: 'green',
        fontWeight: theme.typography.fontWeightMedium,
      },
      '&:focus': {
        color: 'green',
      },
    },
    
    selected: {},
  }))((props) => <Tab disableRipple {...props} />);

  const AntTab2 = withStyles((theme) => ({
    root: {
      textTransform: 'none',
      minWidth: 72,
      fontSize:10,
      fontWeight: theme.typography.fontWeightRegular,
      marginRight: theme.spacing(4),
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:hover': {
        color: 'blue',
        opacity: 1,
      },
      '&indicator':{
          color:'pink'
      },
      '&$selected': {
        color: 'blue',
        fontWeight: theme.typography.fontWeightMedium,
      },
      '&:focus': {
        color: 'blue',
      },
      '&inkBarStyle':{
        backgroundColor: '#e77600'
      }
    },
    selected: {},

    indicator:{
        backgroundColor:'grey'
    },      
    '&indicator':{
          color:'brown'
      },
    
  }))((props) => <Tab disableRipple {...props} />);

  const AntTab3 = withStyles((theme) => ({
    root: {
      textTransform: 'none',
      minWidth: 72,
      fontWeight: theme.typography.fontWeightRegular,
      marginRight: theme.spacing(4),
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:hover': {
        color: 'brown',
        opacity: 1,
      },

      '&$selected': {
        color: 'brown',
        fontWeight: theme.typography.fontWeightMedium,
      },
      '&:focus': {
        color: 'brown',
      },
    },
    selected: {},
  }))((props) => <Tab disableRipple {...props} />);
  

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    padding: {
      padding: theme.spacing(3),
    },
    demo1: {
      backgroundColor: theme.palette.background.paper,
    },
    demo2: {
      backgroundColor: '#2e1534',
    },
    indicator:{
        background:'black'
    }
  }));



export default function ScrollableTabsButtonAuto(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [background,setBackground] = React.useState('green')

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if(value == 0 ) {
        setBackground('green')
    }
      else if(value == 1 ) {
        setBackground('blue')
    }
      else if(value == 2 ) {
        setBackground('brown')
    }
    props.SelectedValue(newValue)


  };



  return (
    <div style={{marginLeft:'10px'}}>
      <AppBar position="static" color="default">
        <Tabs
          TabIndicatorProps={{
            style: {
              backgroundColor: "green"
            }
          }}
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor=""
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
        className="dashboard-tabs"
        >
        <AntTab
        icon={<WhatsApp/>}  
        {...a11yProps(0)} 
        />
        <AntTab2  
        icon={<Facebook/>}  
        {...a11yProps(1)} 
        />
        <AntTab3  
        icon={<Instagram/>}  
        {...a11yProps(2)}   
        /> 
      
        </Tabs>
      </AppBar>
    
    </div>
  );
}