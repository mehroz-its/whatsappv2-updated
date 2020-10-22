import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CoreHttpHandler from '../../../../../../../http/services/CoreHttpHandler'
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: '100%',
        padding: '0px'
    },
    content: {
        padding: '0px'
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
}));
function Config(props) {
    const classes = useStyles();
    const [companyDetails, setCompanyDetails] = React.useState(props.data);
    const [subjectId, setSubjectId] = React.useState("");
    const [snackbaropen, setSnackBarOpen] = React.useState(false)
    const [snackbarmessage, setSnackBarMessage] = React.useState('')
    const [ok, setOK] = React.useState('')

    React.useEffect(() => {
        let data = {
            key: ':client_id',
            value: companyDetails.id,
            params: {}
        }
        CoreHttpHandler.request('customerOnBoard', 'getSubject', data, (response) => {
            console.log("response : ", response);
            setSubjectId(response.data.data.clients[0].subject_id)
            }, (error) => {
                console.log("error : ", error);
            });
    }, [])
   
    const submit = () => {
     let params = {
        client_id: companyDetails.id,
        subject_id: subjectId
     }
        CoreHttpHandler.request('customerOnBoard', 'updateSubject', params, (response) => {
        console.log("response : ", response);
             setSnackBarOpen(true)
			setOK('success')
            setSnackBarMessage('Updated successfully')
            setTimeout(() => {
                setSnackBarOpen(false)
            }, 1000);
        }, (error) => {
            console.log("error : ", error);
        });
    }
    return (
        <Card className={classes.root}>
            <CardContent className={classes.content} style={{ width: '100%' }}>
                <Typography variant='h2' className='companyDetailHeader'style={{ backgroundColor: "#fc2254",color:"white" }} >Configration</Typography>
                <Grid container style={{ marginTop: "5px", paddingRight: '15px', paddingLeft: '15px' }} spacing={3}>
                    <Grid item md={6} sm={12} xs={12}  >
                        <TextField required
                            size="small"
                            value={subjectId}
                            name='setSubjectId'
                            autoFocus
                            placeholder='Subject Id'
                            type='text'
                            variant="outlined"
                            fullWidth
                            autoComplete="off"
                            onChange={(e) => { setSubjectId(e.target.value) }} />
                    </Grid>
                    <Grid item md={6} sm={12} xs={12}  >
                        <Button
                            variant="contained"
                            color="primary"
                            className=" mx-auto"
                            aria-label="Register"
                            onClick={() => submit()}>
                            Update
								</Button>
                    </Grid>
                </Grid>
                <Snackbar
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
				open={snackbaropen}
				autoHideDuration={1000}
			>
				<Alert variant="filled" severity={ok}>
					{snackbarmessage}
				</Alert>
			</Snackbar>
            </CardContent>
        </Card>
    )
}

export default Config
