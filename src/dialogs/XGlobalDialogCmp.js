import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import { green } from '@material-ui/core/colors';
import { makeStyles,ThemeProvider,createMuiTheme,withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';


const useStyles = makeStyles((theme) => ({
  
    margin: {
        
          color:'white',
          paddingLeft:'14px',
          fontWeight:'bold',
          paddingRight:'14px',
          paddingTop:'5px',
          paddingBottom:'5px',
          fontSize:'12px',
         
        },
  }))

  const theme = createMuiTheme({
	palette: {
	  primary: green,
	},
	});  


const XGlobalDialog = function XGlobalDialog(props) {

    
	setTimeout(() => {
		setSnackBarMessage('')
	setSnackBarOpen(false)
	}, 6000);

    const [snackbaropen, setSnackBarOpen] = React.useState(false)
	const [snackbarmessage, setSnackBarMessage] = React.useState('')
	const [ok, setOK] = React.useState('')

    const classes = useStyles(props);


    const { onDialogPropsChange, options, actions, content, defaultState, dialogTitle, data, contentProps } = props;

    const _actions = actions.map((item, i) => {
      
        if(item.label == "Yes"||item.label=="Update")
        {
      
            return (
                <ThemeProvider theme={theme}>
                <Button key={`global_dialog_action_${i}`} 
                    onClick={(event, index) => {item.handler(event, index, defaultState)
                        // setSnackBarMessage("Updated Successfully")
                        // setOK("success")
                        // setSnackBarOpen(true)
                        // console.log(item.handler,'item handler')
                 }
                    } 
                    { ...item.options }
                    color="primary"
                    variant="contained"
                    className={classes.margin}
                    size="small"
                    >
                    {item.label}
                </Button>
                </ThemeProvider>
            );
        }
        

        return (
            <Button key={`global_dialog_action_${i}`} 
                onClick={(event, index) => item.handler(event, index, defaultState)} 
                { ...item.options }
                color="primary"
                variant="contained"
                size="small"
                >
                {item.label}
            </Button>
        );
    });

    const _content = (content === null) ? <div></div> : content;

    return (
        <>
        		<Snackbar

anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
open={snackbaropen}
autoHideDuration={6000}

>
<Alert variant="filled" severity={ok}>
	{snackbarmessage}
</Alert>
</Snackbar>
        <Dialog open={defaultState} {...options} fullWidth={true}>
            {/* <DialogTitle id="form-dialog-title">{dialogTitle}</DialogTitle> */}
            <AppBar position="static" elevation={1} style={{marginBottom:'8px'}}>
				
				<div className="flex flex-col items-center justify-center pb-10 text-20 align-items-center "
        style={{paddingBottom:20,paddingTop:20}}>
	      {dialogTitle}
				</div>
			</AppBar>
            <_content {...contentProps}  onDialogPropsChange={onDialogPropsChange} onChangeToggle={(e)=>{props.onChangeToggle(e)}} data={data} />
            <DialogActions>{_actions}</DialogActions>
        </Dialog>
        </>
    );

};

export default XGlobalDialog;