import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Select from "@material-ui/core/Select";
import CoreHttpHandler from '../../../../../http/services/CoreHttpHandler'
import CircularProgress from '@material-ui/core/CircularProgress';





const CampaignDialog = (props) => {
    // console.log(props, 'in dialog')
    const { isOpen ,data} = props
    const [openDialog, setopenDialog] = React.useState(isOpen);
    const [name, setName] = React.useState(data.name);
    const [description, setDescription] = React.useState(data.description);
    const [begin_dt, setBegin_dt] = React.useState('');
    const [templateId, setTemplateId] = React.useState(null);
    const [activated, setActivated] = React.useState('');
    const [templateList, setTemplateList] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [uploadedFilePath, setUploadedFilePath] = React.useState('');





    const handleSubmit = () => {
        let params = {
            type: "template",
            template: {
                template_id: templateId,
                msisdnUrl: uploadedFilePath,
                name: name,
                description: description
            }
        }
        CoreHttpHandler.request(
            "campaigns",
            "create_message",
            params,
            response => {
                console.log('created succesfully')
                props.closeDialog()
                setopenDialog(false);
            },
            error => {
                console.log(error)
                props.closeDialog()
                setopenDialog(false);
            }
        );
    };


    const handleClose = () => {
        props.closeDialog()
        setopenDialog(false);
    };

    
    const getData = ((loadData) => {
        loadData = () => {
            return CoreHttpHandler.request(
                "template",
                "listing",
                {
                    columns: "id, template_name",
                    sortby: "ASC",
                    orderby: "id",
                    where: "id != $1",
                    values: 0,
                    page: 0,
                    limit: 0,
                }, null, null, true);
        };
        loadData().then((response) => {
            const list = response.data.data.list.data
            setTemplateList(list);
        });
    })

    React.useEffect(() => {
        getData()
    }, []);


    const onChangeHandler = event => {
        setIsLoading(true);

        if (event.target.files.length > 0) {
            const _data = new FormData();

            let _name = event.target.files[0].name;

            _name = _name.replace(/\s/g, "");

            _data.append(
                "file",
                event.target.files[0],
                `${new Date().getTime()}_${_name}`
            );

            CoreHttpHandler.request(
                "content",
                "upload",
                {
                    params: _data
                },
                response => {
                    setIsLoading(false);
                    setUploadedFilePath(response.data.data.link)

                    onInputChange({
                        target: {
                            name: 'msisdnUrl',
                            value: response.data.data.link
                        }
                    })
                },
                error => {
                }
            );
        }
    };




    const onInputChange = e => {

        switch (e.target.name) {

            case "name":
                setName(e.target.value)
                break;
            // case "message":
            //     _func = setMessage;
            //     break;
            case "description":
                setDescription(e.target.value);
                console.log(description)
                break;
            // case "template_type":
            //     _func = setTemplate_type;
            //     break;
            // case "params":
            //     _func = setParams;
            //     break;
            case "begin_dt":
                setBegin_dt(e.target.value);
            case "template_id":
                setTemplateId(e.target.value);
                break;
            // case "msisdnUrl":
            //     _func = setUploadedFilePath;
            //     break;
            case "activated":
                setActivated(e.target.vale);
                break;
        }
    }


    return (
        // <div> {isOpen}</div>
        <Dialog open={openDialog} aria-labelledby="form-dialog-title" classes={{
            paper: 'm-24'
        }}

            fullWidth
            maxWidth="xs">
            <DialogTitle id="form-dialog-title">{props.type}</DialogTitle>
            <DialogContent classes={{ root: 'p-24' }}>
                <div className="flex">
                    <div className="min-w-48 pt-20">
                        <Icon color="action">account_circle</Icon>
                    </div>

                    <TextField
                        className="mb-24"
                        label="Name"
                        autoFocus
                        id="name"
                        name="name"
                        variant="outlined"
                        required
                        fullWidth
                        onChange={onInputChange}
                    // onChange={(e)=>{console.log(e.target.value)}}

                    />
                </div>

                <div className="flex">
                    <div className="min-w-48 pt-20">
                        <Icon color="action">account_circle</Icon>
                    </div>

                    <TextField
                        className="mb-24"
                        label="Description"
                        autoFocus
                        id="description"
                        name="description"
                        onChange={onInputChange}

                        // onChange={(e)=>{console.log(e.target.value)}}
                        variant="outlined"
                        required
                        fullWidth
                    />
                </div>
                <div className="flex">
                    <div className="min-w-48 pt-20">
                        <Icon color="action">account_circle</Icon>
                    </div>
                    <Select
                        name={"template_list"} fullWidth style={{ width: "100%" }} native value={templateId} onChange={onInputChange} labelWidth={0}
                        inputProps={{ name: "template_id", id: "outlined-age-native-simple" }}
                    >
                        <option key={`template_list_item_0`} value="0">
                            Select Template
                        </option>
                        {templateList.map(data => {
                            return (
                                <option key={`template_list_item_${data.id}`} value={data.id}>
                                    {data.template_name}
                                </option>
                            );
                        })}
                    </Select>
                </div>
                {templateId !== null ?
                    (<div container >

                        <div className="flex" >
                            <div className="min-w-48 mt-24">
                                <Icon color="action">attach_file</Icon>
                            </div>
                            {isLoading === true ? <CircularProgress color="secondary" style={{ marginLeft: '40%' }} />
                                : <TextField className="mt-20 mb-20" id="outlined-basic-email" name={"url"} label="Url" variant="outlined" fullWidth disabled={true} onChange={onInputChange} value={uploadedFilePath} />
                            }
                            {/* <div item  style={{ marginTop: 10, marginBottom: 10 }}>
                             
                            </div> */}
                        </div>
                        <div item xs={12} >
                            <input accept=".csv" style={{ paddingTop: '10px' }} id="contained-button-file" type="file" name="url" filename={uploadedFilePath} style={{ display: "none" }} onChange={onChangeHandler} />
                            <label htmlFor="contained-button-file">
                                <Button id="content-upload-button" variant="contained" color="primary" component="span"                            >
                                    Upload
                         </Button>
                            </label>
                        </div>
                    </div>
                    ) : null}

                {/* <div className="flex">
                    <div className="min-w-48 pt-20">
                        <Icon color="action">cake</Icon>
                    </div>
                    <TextField
                        className="mb-24"
                        id="begin_dt"
                        name="begin_dt"
                        label="Begin Date"
                        type="date"
                        onChange={onInputChange}
                        InputLabelProps={{
                            shrink: true
                        }}
                        variant="outlined"
                        fullWidth
                    />
                </div> */}

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}   color="primary">
                    Cancel
             </Button>
                <Button onClick={handleSubmit} color="primary">
                    Done
         </Button>
            </DialogActions>
        </Dialog>

    )
}

export default CampaignDialog