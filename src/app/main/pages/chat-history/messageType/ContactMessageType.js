import React from 'react';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


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
    console.log(message, 'message in contact resolver')

    var name
    var number = []
    message.attachments.map((val, i) => {
        console.log(val, 'i mmma')
        name = val.name
        number.push(val.number)
    })
 
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    return (
        <Card className={classes.root} variant="outlined">
            <CardContent style={{padding:5}}> 
                <Typography className={classes.title}gutterBottom>
                    {name}
                </Typography>
                {
                    number.map((val, index) => {
                        return (
                            <Typography>
                                {val}
                            </Typography>
                        )
                    })
                }     
            </CardContent>
        </Card>
    )
};

export default ContactMessageType;