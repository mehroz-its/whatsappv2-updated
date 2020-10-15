import React, { useState } from 'react';
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
    maxWidth: 150,
    marginTop: '-4',
    minHeight: 10,
    maxHeight: 100,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  largeIcon: {
    height: 23,
  },
}));

function Contact() {
  const classes = useStyles();
  const [number, SetNumber] = useState(10)
  const handleChange = (event) => {
    SetNumber(event.target.value);
  };

  return (
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
      <div style={{ flexDirection: 'row', flex: 1, display: 'flex' }}>

        <div style={{ marginTop: '20px' }}>
          <Button
            size='small'
            variant="contained"
            color="primary"
            style={{ borderRadius: 0 }}
          >
            Export
            </Button>

        </div>
      </div>
      <FusePageCarded
        classes={{
          content: 'flex',
        }}
        content={<ContactTable ValueForSearch='' />}
      />
    </>
  )
}

export default Contact  