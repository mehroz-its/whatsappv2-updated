import FuseAnimate from '@fuse/core/FuseAnimate';
import { useForm } from '@fuse/hooks';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    root: {
        background: `radial-gradient(${darken(theme.palette.primary.dark, 0.5)} 0%, ${theme.palette.primary.dark} 80%)`,
        color: theme.palette.primary.contrastText,
    }
}));

function ComapnyProfile() {
    const classes = useStyles();
    const { form, handleChange, resetForm } = useForm({
        name: '',
        email: '',
        password: '',
        passwordConfirm: '',
        acceptTermsConditions: false
    });
    function handleSubmit(ev) {
        ev.preventDefault();
        resetForm();
    }
    return (
        <div className={clsx(classes.root, 'flex flex-col flex-auto flex-shrink-0 items-center justify-center p-32')}>
            <div className="flex flex-col items-center justify-center w-full">
                <FuseAnimate animation="transition.expandIn">
                    <Card className="w-full max-w-450">
                        <CardContent className="flex flex-col items-center justify-center p-56">
                            <img className="w-80 m-10" src="assets/images/logos/fuse.svg" alt="logo" />
                            <Typography variant="h6" className="mt-10 mb-16">
                                Onboarding
							</Typography>
                            <form
                                name="registerForm"
                                noValidate
                                className="flex flex-col justify-center w-full"
                                onSubmit={handleSubmit}
                            >
                                <Grid container spacing={3} style={{marginBottom:'10px'}} >
                                    <Grid item md={4} sm={12} xs={12} >
                                        <TextField size='small' id="outlined-basic-email" label="Name" variant="outlined" fullWidth autoComplete="off" />
                                    </Grid>
                                    <Grid item md={4} sm={12} xs={12} >
                                        <TextField  size='small' id="outlined-basic-email" label="Number" variant="outlined" fullWidth autoComplete="off" />
                                    </Grid>
                                    <Grid item md={4} sm={12} xs={12} >
                                        <TextField size='small' id="outlined-basic-email" label="Address" variant="outlined" fullWidth autoComplete="off" />
                                    </Grid>
                                    <Grid item md={4} sm={12} xs={12} >
                                        <TextField  size='small' id="outlined-basic-email" label="Profile Image" variant="outlined" fullWidth autoComplete="off" />
                                    </Grid>
                                    <Grid item md={4} sm={12} xs={12} >
                                        <TextField size='small' id="outlined-basic-email" label="Dummy" variant="outlined" fullWidth autoComplete="off" />
                                    </Grid>
                                      </Grid>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className="w-224 mx-auto mt-16"
                                    aria-label="Register"
                                    disabled={false}
                                    type="submit"
                                >
                                   Register
								</Button>
                            </form>
                        </CardContent>
                    </Card>
                </FuseAnimate>
            </div>
        </div>
    );
}

export default ComapnyProfile;
