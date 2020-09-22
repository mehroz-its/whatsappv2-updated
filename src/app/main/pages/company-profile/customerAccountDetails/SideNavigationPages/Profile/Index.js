import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { useForm } from "react-hook-form";
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import TextField from '@material-ui/core/TextField';



const useStyles = makeStyles({
    root: {
        maxWidth: '100%',
        padding: '0px'
    },
    content: {
        padding: '0px'
    },
 
})


function Profile() {
    const classes = useStyles();

    const { handleSubmit, register, errors } = useForm();
    const onSubmit = values => console.log(values);

    return (
        <Card className={classes.root}>
            <CardContent className={classes.content} style={{ width: '100%' }}>
                <Typography variant='h2' className='companyDetailHeader' >Profile</Typography>
                <Grid container  style={{marginTop:"5px",paddingRight:'15px',paddingLeft:'15px'}} spacing={3}>
                    <Grid item md={6} sm={12} xs={12}  >
                        <TextField required
                            // id={`id-${id}`}
                            size="small"
                            // key={`user_attribute_data_${i}`}
                            value='Company Name'
                            name='Company Name'
                            autoFocus
                            label='Company Name'
                            type='text'
                            variant="outlined"
                            fullWidth
                            autoComplete="off"
                            onChange={(e) => { console.log(e) }} />
                    </Grid>
                    <Grid item md={6} sm={12} xs={12} >
                        <TextField required
                            // id={`id-${id}`}
                            size="small"
                            // key={`user_attribute_data_${i}`}
                            value='Address'
                            name='Address'
                            autoFocus
                            label='Address'
                            type='text'
                            variant="outlined"
                            fullWidth
                            autoComplete="off"
                            onChange={(e) => { console.log(e) }} />
                    </Grid>
                    <Grid item md={6} sm={12} xs={12} >
                        <TextField required
                            // id={`id-${id}`}
                            size="small"
                            // key={`user_attribute_data_${i}`}
                            value='VAT Number'
                            name='VAT Number'
                            autoFocus
                            label='VAT Number'
                            type='text'
                            variant="outlined"
                            fullWidth
                            autoComplete="off"
                            onChange={(e) => { console.log(e) }} />
                    </Grid>
                    <Grid item md={6} sm={12} xs={12} >
                        <TextField required
                            // id={`id-${id}`}
                            size="small"
                            // key={`user_attribute_data_${i}`}
                            value='City'
                            name='City'
                            autoFocus
                            label='City'
                            type='text'
                            variant="outlined"
                            fullWidth
                            autoComplete="off"
                            onChange={(e) => { console.log(e) }} />
                    </Grid>
                    <Grid item md={6} sm={12} xs={12} >
                        <TextField required
                            // id={`id-${id}`}
                            size="small"
                            // key={`user_attribute_data_${i}`}
                            value='Phone'
                            name='Phone'
                            autoFocus
                            label='Phone'
                            type='text'
                            variant="outlined"
                            fullWidth
                            autoComplete="off"
                            onChange={(e) => { console.log(e) }} />
                    </Grid>
                    <Grid item md={6} sm={12} xs={12} >
                        <TextField required
                            // id={`id-${id}`}
                            size="small"
                            // key={`user_attribute_data_${i}`}
                            value='State'
                            name='State'
                            autoFocus
                            label='State'
                            type='text'
                            variant="outlined"
                            fullWidth
                            autoComplete="off"
                            onChange={(e) => { console.log(e) }} />
                    </Grid>
                    <Grid item md={6} sm={12} xs={12} >
                        <TextField required
                            // id={`id-${id}`}
                            size="small"
                            // key={`user_attribute_data_${i}`}
                            value='Website'
                            name='Website'
                            autoFocus
                            label='Website'
                            type='text'
                            variant="outlined"
                            fullWidth
                            autoComplete="off"
                            onChange={(e) => { console.log(e) }} />
                    </Grid>
                    <Grid item md={6} sm={12} xs={12} >
                        <TextField required
                            // id={`id-${id}`}
                            size="small"
                            // key={`user_attribute_data_${i}`}
                            value='Zip Code'
                            name='Zip Code'
                            autoFocus
                            label='Zip Code'
                            type='text'
                            variant="outlined"
                            fullWidth
                            autoComplete="off"
                            onChange={(e) => { console.log(e) }} />
                    </Grid>
                    <Grid item md={6} sm={12} xs={12} >
                        <TextField required
                            // id={`id-${id}`}
                            size="small"
                            // key={`user_attribute_data_${i}`}
                            value='Groups'
                            name='Groups'
                            autoFocus
                            label='Groups'
                            type='text'
                            variant="outlined"
                            fullWidth
                            autoComplete="off"
                            onChange={(e) => { console.log(e) }} />
                    </Grid>
                    <Grid item md={6} sm={12} xs={12} >
                        <TextField required
                            // id={`id-${id}`}
                            size="small"
                            // key={`user_attribute_data_${i}`}
                            value='Country'
                            name='Country'
                            autoFocus
                            label='Country'
                            type='text'
                            variant="outlined"
                            fullWidth
                            autoComplete="off"
                            onChange={(e) => { console.log(e) }} />
                    </Grid>
                    <Grid item md={6} sm={12} xs={12} >
                        <TextField required
                            // id={`id-${id}`}
                            size="small"
                            // key={`user_attribute_data_${i}`}
                            value='Currency'
                            name='Currency'
                            autoFocus
                            label='Currency'
                            type='text'
                            variant="outlined"
                            fullWidth
                            autoComplete="off"
                            onChange={(e) => { console.log(e) }} />
                    </Grid>
                    <Grid item md={6} sm={12} xs={12} >
                        <TextField required
                            // id={`id-${id}`}
                            size="small"
                            // key={`user_attribute_data_${i}`}
                            value='Default Language'
                            name='Default Language'
                            autoFocus
                            label='Default Language'
                            type='text'
                            variant="outlined"
                            fullWidth
                            autoComplete="off"
                            onChange={(e) => { console.log(e) }} />
                    </Grid>
                </Grid>

            </CardContent>
        </Card>
    )
}

export default Profile
