import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CoreHttpHandler from '../../../../../../../http/services/CoreHttpHandler';

import FuseAnimate from '@fuse/core/FuseAnimate';
import Icon from '@material-ui/core/Icon';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import { useSelector } from 'react-redux';
import TextField from '@material-ui/core/TextField';

import AddTreeNode from "./AddTreeNode"
import EditTreeNode from "./EditTreeNode"
import DeleteTreeNode from "./DeleteTreeNode"
import ChildrenTreeNode from "./ChildrenTreeNode";

import SortableTree, { changeNodeAtPath, removeNodeAtPath, getNodeAtPath } from 'react-sortable-tree';
import { addNodeUnderParent, getParentIndex } from "./helperfunctions"

import 'react-sortable-tree/style.css';
import { green } from '@material-ui/core/colors';

import { ThemeProvider, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { add } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const SearchStyle = createMuiTheme({
    overrides: {
        MuiInput: {
            root: {
                paddingTop: 0,
                fontSize: '12px',
                paddingBottom: 0,
                margin: 0,
                border: 0,
                borderRadius: 0,
                height: '30px'
            }
        }
    }
});

const useStyles = makeStyles({
    layoutRoot: {},
    content: {
        '& canvas': {
            maxHeight: '80%'
        }
    },

    margin: {
        color: 'white',
        paddingLeft: '14px',
        paddingRight: '14px',
        paddingTop: '5px',
        paddingBottom: '5px',
        fontSize: '1.3rem',
    },
});
function AddAutoReply(props) {
    const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);

    const { data } = props;


    const classes = useStyles();

    const [treeData, setTreeData] = React.useState(
        [
            {
                "id": uuidv4(),
                "title": "Welcome",
                "type": "text",
                "expanded": true,
                "repeatPreviousMessage": true,
                "messages": [
                    "Welcome!"
                ],
                "children": []
            }
        ]
    );
    const [value, setValue] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [header, setHeader] = React.useState("Chat Bot")
    const [openAddModal, setOpenAddModal] = React.useState(null);
    const [openEditModal, setOpenEditModal] = React.useState(null);
    const [openDeleteModal, setOpenDeleteModal] = React.useState(null);
    const [openChildrenModal, setOpenChildrenModal] = React.useState(null);
    const [endMessage, setEndMessage] = React.useState("");
    const [startMessage, setStartMessage] = React.useState("");
    const [surveyMessage, setSurveyMessage] = React.useState("");
    const [surveyAnswers, setSurveyAnswers] = React.useState("");
    const [chatBotName, setChatBotName] = React.useState("");
    const [status, setStatus] = React.useState(false);


    const updateChatBotName = (e) => {
        setChatBotName(e.target.value)
    }

    React.useEffect(() => {

        if (data) {
            const { name, body } = data;

            if (name) {
                setChatBotName(name)
            }

            if (body) {
                console.log('body ', body)
                if(body.__default){
                    setTreeData([body.__default])
                }
                if(body.__startMessageConversationMessage&&body.__startMessageConversationMessage.messages&&body.__startMessageConversationMessage.messages.length){
                    setStartMessage(body.__startMessageConversationMessage.messages[0])
                }
                if(body.__endMessageConversationMessage&&body.__endMessageConversationMessage.messages&&body.__endMessageConversationMessage.messages.length){
                    setEndMessage(body.__endMessageConversationMessage.messages[0])
                }
                if(body.__surveyMessage&&body.__surveyMessage.messages&&body.__surveyMessage.messages.length){
                    console.log("body and survey message ", body.__surveyMessage)
                    setSurveyMessage(body.__surveyMessage.messages[0]);
                    setStatus(true);
                    if(body.__surveyMessage.answers && body.__surveyMessage.answers.length) {
                        setSurveyAnswers(body.__surveyMessage.answers)
                    }
                }
            }
        }



    }, [])
    const openChildrenModalDialogue = (row) => {
        setOpenChildrenModal(row)
    }
    const openDeleteModalDialogue = (row) => {
        setOpenDeleteModal(row)
    }

    const handleChildrenDialogClose = () => {
        setOpenChildrenModal(null)
    }
    const handleDeleteDialogClose = () => {
        setOpenDeleteModal(null)
    }
    const handleEditDialogClose = () => {
        setOpenEditModal(null)
    }
    const handleAddDialogClose = () => {
        setOpenAddModal(null)
    }
    const openAddModalDialogue = (row) => {
        setOpenAddModal(row)
    }
    const openEditModalDialogue = (row) => {
        setOpenEditModal(row)
    }
    const asyncForEach = async (array, callback) => {
        for (let index = 0; index < array.length; index++) {
            await callback(array[index], index, array);
        }
    }
    const getNodeKey = ({ node: object, treeIndex: number }) => {
        return number;
    };

    const addNode = (newNode) => {

        let parentKey = getNodeKey(openAddModal);

        if (parentKey == -1) {
            parentKey = null;
        }
        let newTree = addNodeUnderParent({
            treeData,
            newNode: { ...newNode, id: uuidv4() },
            expandParent: true,
            parentKey: parentKey,
            getNodeKey: ({ treeIndex }) => treeIndex
        });
        setTreeData(newTree.treeData)
        setOpenAddModal(false)
    }
    const childrenNode = (data) => {
        const { path, node } = openChildrenModal;
        let changeNodeObject = {
            treeData,
            path: path,
            newNode: { ...node, __ref: data },
            getNodeKey: ({ treeIndex }) => treeIndex,
            ignoreCollapsed: true

        };
        let newTree = changeNodeAtPath(changeNodeObject);
        setTreeData(newTree)
        setOpenChildrenModal(false)
    }

    const editNode = (data) => {
        const { path, node } = openEditModal;
        let newTree = updateNodeData(data, path, node)
        setTreeData(newTree)
        setOpenEditModal(false)
    }

    const toggleChecked = e => {
		console.log('ToggleChecked e', e.target.checked);
		setStatus(e.target.checked);
	};

    const updateNodeData = (data, path, node, treeDataUpdate) => {

        let changeNodeObject = {
            treeData: treeDataUpdate ? treeDataUpdate : treeData,
            path: path,
            newNode: { ...node, ...data },
            getNodeKey: ({ treeIndex }) => treeIndex,
            ignoreCollapsed: true

        };
        let newTree = changeNodeAtPath(changeNodeObject);
        return newTree
    }
    const deleteNode = () => {
        const { path, node, parentNode } = openDeleteModal;

        let _newTree = null
        let _newTree2 = null
        //remove ref from parent

        if (parentNode && parentNode.__ref && parentNode.__ref.length) {
            let data = parentNode.__ref.filter(el => el.id != node.id)
            let parentPath = path.map(el => el)
            parentPath.pop()
            _newTree2 = updateNodeData({ __ref: data }, parentPath, parentNode)
        }

        if (parentNode && parentNode.__next && parentNode.__next == node.id) {
            let parentPath = path.map(el => el)
            parentPath.pop()
            _newTree2 = updateNodeData({ __next: undefined }, parentPath, parentNode, _newTree2 ? _newTree2 : treeData)
        }

        //find children and move them up

        if (node.children && node.children.length) {

            let _path = path.map(el => el)
            _path.pop()
            let parentNode = getNodeAtPath({
                treeData: _newTree2 ? _newTree2 : treeData,
                path: _path,
                getNodeKey: ({ treeIndex }) => treeIndex,
                ignoreCollapsed: true
            });
            let parentKey = getNodeKey(parentNode);

            if (parentKey == -1) {
                parentKey = null;
            }

            const _length = node.children.length

            const parentIndex = getParentIndex(node.id, openDeleteModal.parentNode)
            for (let i = 0; i < _length; i++) {
                let el = node.children[i]
                _newTree = addNodeUnderParent({
                    treeData: _newTree ? _newTree.treeData : (_newTree2 ? _newTree2 : treeData),
                    newNode: el,
                    expandParent: true,
                    parentKey: parentKey,
                    getNodeKey: ({ treeIndex }) => treeIndex,
                    insetAtIndex: i + parentIndex + 1
                });
            }

            setTreeData(_newTree.treeData)

        }

        let newTree = removeNodeAtPath({
            treeData: _newTree ? _newTree.treeData : (_newTree2 ? _newTree2 : treeData),
            path: path,
            getNodeKey: ({ treeIndex }) => treeIndex,
            ignoreCollapsed: true,
        })

        setTreeData(newTree)
        handleDeleteDialogClose(false)

    }

    const canNodeHaveChildren = (event) => {
        return true
    }

    const nodeMove = ({ nextParentNode, nextPath, nextTreeIndex, node, path, prevPath, treeData, treeIndex }) => {
        prevPath.pop()
        if (prevPath && prevPath.length) {
            let parentNode = getNodeAtPath({
                treeData: treeData,
                path: prevPath,
                getNodeKey: ({ treeIndex }) => treeIndex,
                ignoreCollapsed: true
            })
            let newTree = null
            if (parentNode && parentNode.node && parentNode.node.__ref && parentNode.node.__ref.length) {
                let data = parentNode.node.__ref.filter(el => el.id != node.id)
                newTree = updateNodeData({ __ref: data }, prevPath, parentNode.node)

            }
            if (parentNode && parentNode.node && parentNode.node.__next && parentNode.node.__next == node.id) {
                newTree = updateNodeData({ __next: undefined }, prevPath, parentNode.node, newTree ? newTree : treeData)
            }
            if (parentNode && parentNode.node && parentNode.node.onCompleteNext && parentNode.node.onCompleteNext == node.id) {
                newTree = updateNodeData({ onCompleteNext: undefined }, prevPath, parentNode.node, newTree ? newTree : treeData)
            }

            if (newTree) {
                setTreeData(newTree)

            }
        }

    }

    React.useEffect(() => {
        // console.log("=========TREE UPDATED==========")
        // if (treeData) {
        //     console.log(JSON.stringify(treeData, null, 2))
        // }
        // console.log("=================")
    }, [treeData])

    function closeHandler() {
        props.closeHandler({})
    }
    function saveHandler() {

        let _startMessage   = startMessage  ? { "id": uuidv4(), "title": "Start Conversation Message", "type": "text", "expanded": true, "repeatPreviousMessage": true, "messages": [ startMessage ], "children": [] } : undefined; 
        let _endMessage     = endMessage    ? { "id": uuidv4(), "title": "End Conversation Message", "type": "text", "expanded": true, "repeatPreviousMessage": true, "messages": [ endMessage ], "children": [] }: undefined;
        let _surveyMessage = surveyMessage  ? { "id": uuidv4(), "title": "Survey Message", "type": "text", "expanded": true, "repeatPreviousMessage": true, "messages": [ surveyMessage ], "children": [] }: undefined;
        if (surveyAnswers && surveyAnswers != null ) {
            _surveyMessage = surveyMessage  ? { "id": uuidv4(), "title": "Survey Message", "type": "text", "expanded": true, "repeatPreviousMessage": true, "messages": [ surveyMessage ], "children": [], "answers": [surveyAnswers] }: undefined;
        }

        if (data) {
            
            if(startMessage&&data.__startMessageConversationMessage&&data.__startMessageConversationMessage.messages&&data.__startMessageConversationMessage.messages.length){
                _startMessage = data.__startMessageConversationMessage;
                _startMessage.__startMessageConversationMessage.messages[0] = startMessage
            }
            if(endMessage&&data.__endMessageConversationMessage&&data.__endMessageConversationMessage.messages&&data.__endMessageConversationMessage.messages.length){
                _endMessage = data.__endMessageConversationMessage;
                _endMessage.__endMessageConversationMessage.messages[0] = startMessage
            }
            if(surveyMessage&&data.__surveyMessage&&data.__surveyMessage.messages&&data.__surveyMessage.messages.length){
                _surveyMessage = data.__surveyMessage;
                _surveyMessage.__surveyMessage.messages[0] = surveyMessage
            }
            
            props.updateHandler({ treeData: treeData[0], name: chatBotName,startMessage:_startMessage,endMessage:_endMessage, surveyMessage:_surveyMessage })
        } else {
            props.saveHandler({ treeData: treeData[0], name: chatBotName,startMessage:_startMessage,endMessage:_endMessage, surveyMessage:_surveyMessage })
        }
    }


    const theme = createMuiTheme({
        palette: {
            primary: green,
        },
    });

    return (

        <FusePageSimple
            classes={{
                header: 'min-h-50 h-50 sm:h-50 sm:min-h-50 autoReplyHeader',

                content: classes.content
            }}
            header={
                <div className="flex flex-col justify-between flex-1 pl-20">
                    <div className="flex items-center">
                        <FuseAnimate animation="transition.expandIn" delay={300}>
                            <Icon className="text-26">dashboard</Icon>
                        </FuseAnimate>
                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                            <Typography className=" py-0 sm:py-24 hidden sm:flex mx-0 sm:mx-12 text-20" variant="h6">
                                {header}
                            </Typography>
                        </FuseAnimate>

                        <div className="flex flex-1 items-end justify-end px-12">
                            <ThemeProvider theme={mainTheme}>
                                <FuseAnimate animation="transition.slideDownIn" delay={300}>
                                    <React.Fragment>

                                        <Button onClick={closeHandler} color="primary" size="small" variant="contained" style={{ marginRight: "10px" }}>
                                            Cancel
                                    </Button>
                                        <ThemeProvider theme={theme}>
                                            <Button variant="contained" onClick={saveHandler} color="primary" size="small" className={classes.margin}>
                                                {data ? "UPDATE" : "SAVE"}
                                            </Button>
                                        </ThemeProvider>


                                    </React.Fragment>

                                </FuseAnimate>
                            </ThemeProvider>
                        </div>
                    </div>
                </div>
            }
            content={
                <div style={{ backgroundColor: "white", paddingTop: "20px" }} className="w-75">
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        align="center"
                        className={"p-20"}
                    >
                        <FormControlLabel
						style={{ marginLeft: '2px' }}
						control={
							<Switch
								checked={status}
								onChange={toggleChecked}
								name="status"
								color="primary"
								size="small"
                                
							/>
                            
						}
                        label= "Survey Question?"
					/>
                        <Grid container className={"mb-20"}>
                            <Grid item md={3} sm={12} xs={12}>
                                <div className="flex" >
                                    <TextField
                                        fullWidth
                                        label="Chat Bot Name"
                                        autoFocus
                                        id={"name_chat_both"}
                                        name="chatBotName"
                                        variant="outlined"
                                        value={chatBotName}
                                        onChange={updateChatBotName}
                                        size="small"
                                        inputProps={{ maxLength: 30 }}
                                    />
                                </div>
                            </Grid>
                        </Grid>

                        <Grid container className={"mb-20"}>
                            <Grid item md={6} sm={12} xs={12}>
                                <div className="flex" >
                                    <TextField
                                        label="Agent Conversation Start Message"
                                        fullWidth
                                        id={"agent_conversation_start_message"}
                                        name="chatBotName"
                                        variant="outlined"
                                        multiline
                                        rows={1}
                                        value={startMessage}
                                        onChange={e=>{setStartMessage(e.target.value)}}
                                        size="small"
                                        inputProps={{ maxLength: 800 }}
                                        rowsMax={6}
                                    />
                                </div>
                            </Grid>
                        </Grid>
                        {status === true && (
                        <Grid container className={"mb-20"}>
                            <Grid item md={6} sm={12} xs={12}>
                                <div className="flex" >
                                    <TextField
                                        label="Survey Message"
                                        fullWidth
                                        id={"survey_message"}
                                        name="chatBotName"
                                        variant="outlined"
                                        multiline
                                        rows={1}
                                        value={surveyMessage}
                                        onChange={e=>{setSurveyMessage(e.target.value)}}
                                        size="small"
                                        inputProps={{ maxLength: 800 }}
                                        rowsMax={6}
                                    />
                                </div>
                            </Grid>
                        </Grid>
                        )}
                        {status === true && (
                        <Grid container className={"mb-20"}>
                        <Grid item md={6} sm={12} xs={12}>
                            <div className="flex" >
                                <TextField
                                    label="Survey Answers"
                                    fullWidth
                                    id={"survey_Answers"}
                                    name="chatBotName"
                                    variant="outlined"
                                    multiline
                                    rows={1}
                                    value={surveyAnswers}
                                    onChange={e=>{setSurveyAnswers(e.target.value)}}
                                    size="small"
                                    inputProps={{ maxLength: 800 }}
                                    rowsMax={6}
                                />
                            </div>
                        </Grid>
                        </Grid>
                        )}
                        

                        <Grid container>
                            <Grid item md={6} sm={12} xs={12}>
                                <div className="flex" >
                                    <TextField
                                        label="Agent Conversation End Message"

                                        fullWidth
                                        id={"agent_conversation_end_message"}
                                        name="chatBotName"
                                        multiline
                                        rows={1}
                                        variant="outlined"
                                        value={endMessage}
                                        onChange={e=>{setEndMessage(e.target.value)}}
                                        size="small"
                                        inputProps={{ maxLength: 800 }}
                                        rowsMax={6}
                                    />
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>

                    <div className="p-24" style={{ scrollX: false, paddingTop: "0px" }}>
                        <FuseAnimateGroup
                            className="flex flex-wrap"
                            enter={{
                                animation: 'transition.slideUpBigIn'
                            }}
                        >
                            {/* <Grid container spacing={4}>
                                <Grid item md={12} sm={12} xs={12}>
                                    <Grid
                                        container
                                        spacing={4}
                                        style={{ marginBottom: '22px', marginTop: '-1px', marginLeft: 4 }}
                                    >
                                        <Button
                                            style={{ fontSize: '11px', backgroundColor: '#e73859', color: 'white' }}
                                            variant="contained"
                                            color="primary"
                                            onClick={e => {
                                                props.history.push({ pathname: '/apps/company-forms' });
                                            }}
                                        >
                                            <span style={{ textTransform: 'capitalize', fontSize: '13px' }}>
                                                Create Tree
											</span>
                                        </Button>
                                    </Grid>

                                    <Grid container spacing={3}>

                                    </Grid>
                                </Grid>
                            </Grid> */}

                            <Grid container spacing={3} style={{ marginTop: 10 }}>
                                <Grid item md={12} sm={12} xs={12}>
                                    <div style={{}}>

                                        <SortableTree
                                            // maxDepth={3}
                                            treeData={treeData}
                                            isVirtualized={false}
                                            scaffoldBlockPxWidth={50}
                                            // canNodeHaveChildren={canNodeHaveChildren}

                                            generateNodeProps={rowInfo => ({
                                                buttons: [

                                                    <div className="chatBotContainer">
                                                        <div className="chatBotIconContainer">
                                                            {/* <TextField hintText="" multiLine={true} rows={1} rowsMax={4} /> */}
                                                            {/* <br /> */}
                                                            {/* <button label="Delete" onClick={event => removeNode(rowInfo)}>
                                                                Remove
                                                            </button> */}


                                                            <Tooltip title="Add Child Node" arrow >
                                                                <Icon className={"chatBotButtons"} onClick={event => openAddModalDialogue(rowInfo)}>add</Icon>
                                                            </Tooltip>
                                                            <Tooltip title="Edit Node" arrow >
                                                                <Icon className={"chatBotButtons"} onClick={event => openEditModalDialogue(rowInfo)}>edit</Icon>
                                                            </Tooltip>



                                                            {
                                                                rowInfo.path.length > 1 ?

                                                                    <Tooltip title="Delete Node" arrow >
                                                                        <Icon className={"chatBotButtons"} onClick={event => openDeleteModalDialogue(rowInfo)}>delete</Icon>
                                                                    </Tooltip>
                                                                    : null
                                                            }
                                                            {
                                                                rowInfo.node.children && rowInfo.node.children.length && rowInfo.node.type != "ic" && rowInfo.node.type != "action" && rowInfo.node.type != "testApi" ?

                                                                    <Tooltip title="Link Children" arrow >
                                                                        <Icon className={"chatBotButtons"} onClick={event => openChildrenModalDialogue(rowInfo)}>leak_add</Icon>
                                                                    </Tooltip>
                                                                    : null
                                                            }

                                                            {/* <button label="Add" onClick={event => handleClickOpen()}>
                                                                Edit
                                                            </button> */}

                                                        </div>


                                                        {
                                                            rowInfo.path.length > 1 ?
                                                                (

                                                                    <React.Fragment>
                                                                        {
                                                                            rowInfo.parentNode && rowInfo.parentNode.__ref && rowInfo.parentNode.__ref.length && rowInfo.parentNode.__ref.some(el => (el.id === rowInfo.node.id) && el.key) ?
                                                                                <div className="chatBotKey">

                                                                                    {
                                                                                        rowInfo.linked_node = true
                                                                                    }
                                                                                    <span className={"chatBotTreeKey"}>
                                                                                        {
                                                                                            rowInfo.parentNode.__ref.filter(el => el.id === rowInfo.node.id)[0].key
                                                                                        }
                                                                                    </span>
                                                                                </div>
                                                                                : null
                                                                        }

                                                                        {
                                                                            rowInfo.parentNode && rowInfo.parentNode.__next && rowInfo.node.id === rowInfo.parentNode.__next ?
                                                                                <div className="chatBotKey">
                                                                                    {
                                                                                        rowInfo.linked_node = true
                                                                                    }
                                                                                    <Tooltip title="Called Immediately After Parent" arrow className={"chatBotTreeKey"}>
                                                                                        <Icon>fast_forward</Icon>
                                                                                    </Tooltip>
                                                                                </div>
                                                                                : null
                                                                        }
                                                                        {

                                                                            rowInfo.parentNode && rowInfo.parentNode.onCompleteNext && rowInfo.node.id === rowInfo.parentNode.onCompleteNext ?
                                                                                <div className="chatBotKey">
                                                                                    {
                                                                                        rowInfo.linked_node = true
                                                                                    }
                                                                                    <Tooltip title="Called After Parent Completion" arrow className={"chatBotTreeKey"}>
                                                                                        <Icon>exit_to_app</Icon>
                                                                                    </Tooltip>
                                                                                </div>

                                                                                : null


                                                                        }

                                                                        {
                                                                            !rowInfo.linked_node ?

                                                                                <div className="chatBotKey chatBotKeyBad">
                                                                                    <Tooltip title="Unconnected Node" arrow className={"chatBotTreeKey"}>
                                                                                        <Icon>link_off</Icon>
                                                                                    </Tooltip>
                                                                                </div>

                                                                                : null
                                                                        }

                                                                    </React.Fragment>

                                                                )
                                                                : null
                                                        }
                                                    </div>
                                                ],
                                                style: {
                                                    // height: '50px'
                                                },
                                                className: "chatBotTree-base-icon chatBotTree-" + rowInfo.node.type
                                            })}
                                            onChange={treeData => {
                                                setTreeData(treeData)
                                            }}
                                            canDrop={({ nextParent, nextPath }) => (!nextParent || !nextParent.noChildren) && nextPath.length > 1}
                                            onMoveNode={nodeMove}
                                        />


                                    </div>

                                </Grid>
                            </Grid>

                            {openAddModal && (
                                <AddTreeNode
                                    addTreeNode={openAddModal}
                                    closeDialog={handleAddDialogClose}
                                    isOpen={openAddModal ? true : false}
                                    submitNode={addNode}

                                />
                            )}
                            {openEditModal && (
                                <EditTreeNode
                                    editTreeNode={openEditModal}
                                    closeDialog={handleEditDialogClose}
                                    isOpen={openEditModal ? true : false}
                                    submitNode={editNode}

                                />
                            )}
                            {
                                openDeleteModal && (
                                    <DeleteTreeNode
                                        deleteTreeNode={openDeleteModal}
                                        closeDialog={handleDeleteDialogClose}
                                        isOpen={openDeleteModal ? true : false}
                                        submitNode={deleteNode}

                                    />
                                )
                            }
                            {
                                openChildrenModal && (
                                    <ChildrenTreeNode
                                        childrenTreeNode={openChildrenModal}
                                        closeDialog={handleChildrenDialogClose}
                                        isOpen={openChildrenModal ? true : false}
                                        submitNode={childrenNode}

                                    />
                                )
                            }

                        </FuseAnimateGroup>
                    </div>
                </div>
            }
        />
    );
}

export default AddAutoReply;

