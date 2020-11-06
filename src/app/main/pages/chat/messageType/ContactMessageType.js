import React from 'react';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MessageStateResolver from './MessageStateResolver'
import moment from 'moment/moment';
import Icon from '@material-ui/core/Icon';





const useStyles = makeStyles({
    root: {
        width: 150,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

const ContactMessageType = function (props) {
    const { message, index } = props;
    var name
    var number = []
    message.attachments.map((val, i) => {
        name = val.name
        number.push(val.number)
    })

    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    return (
        <Card className={classes.root} variant="outlined">
            <CardContent style={{ padding: 5 }}>
                <div style={{ display: 'flex' }}>
                    <Icon color="action" className='text-16' style={{marginRight:'5px',marginTop:'2px'}}>contact_phone</Icon>
                    <Typography className={classes.title} gutterBottom>
                        {name}
                    </Typography>
                </div>

                {
                    number.map((val, index) => {
                        return (
                            <Typography style={{ fontSize: '13px' }}>
                                {val}
                            </Typography>
                        )
                    })
                }
                <p style={{ width: "100%", margin: '5px 0px', fontSize: '10px' }}>{moment(message.dt).format('MMM Do YY, h:mm A')}{message.type === "outbound" ? MessageStateResolver.resolve(message.status,message.mfms) : null}</p>

            </CardContent>
        </Card>
    )
};

export default ContactMessageType;