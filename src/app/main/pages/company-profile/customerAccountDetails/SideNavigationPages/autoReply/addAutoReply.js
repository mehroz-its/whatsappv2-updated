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
              "id": "064582ec-37ce-4c25-8a6f-9ab270247f6f",
              "title": "Welcome",
              "type": "text",
              "expanded": true,
              "repeatPreviousMessage": true,
              "messages": [
                "\nWelcome to Intellexal Solutions WhatsApp Enterprise Edition, please select the option from below.\n\nPress 1️⃣ for text\nPress 2️⃣ for image\nPress 3️⃣ for audio\nPress 4️⃣ for IC\npress 5 for api\npress 6 for agent assign\n"
              ],
              "attributes": [],
              "children": [
                {
                  "type": "text",
                  "title": "text",
                  "attributes": [],
                  "repeatPreviousMessage": true,
                  "messages": [
                    "this is your text"
                  ],
                  "id": "af68ae50-4ec4-45d6-9eec-88d4752744a8"
                },
                {
                  "type": "text",
                  "title": "image",
                  "attributes": [],
                  "repeatPreviousMessage": true,
                  "id": "b02701f5-fc54-4c54-97a4-cbdbd686388a",
                  "messages": [
                    "dsdasdsa"
                  ]
                },
                {
                  "type": "audio",
                  "title": "audio",
                  "attributes": [],
                  "repeatPreviousMessage": true,
                  "audio": [
                    {
                      "URL": "https://upload.its.com.pk/v1/fetch/file/3c461d95-940b-48c5-aff9-6de30eff0eca.opus",
                      "caption": "this is your audio"
                    }
                  ],
                  "id": "1c597d70-c64c-46b4-8b93-452016c93464"
                },
                {
                  "type": "text",
                  "title": "invoke imediately",
                  "attributes": [],
                  "repeatPreviousMessage": true,
                  "messages": [
                    "i was invoked immediately"
                  ],
                  "id": "474a7b06-5f65-44da-ae01-5984a07316d1"
                },
                {
                  "type": "ic",
                  "title": "Ic",
                  "attributes": [],
                  "repeatPreviousMessage": true,
                  "questions": [
                    {
                      "question": "What"
                    },
                    {
                      "question": "How"
                    }
                  ],
                  "storeDataInCache": true,
                  "cacheKeyIsId": true,
                  "oneTimeCollection": true,
                  "onCompleteNext": "7cdf9e25-d637-4a01-befb-1aca5c2fb812",
                  "id": "ad2effa1-f858-40fd-9bc8-2dddbc8573d7",
                  "expanded": true,
                  "children": [
                    {
                      "type": "text",
                      "title": "Completed Ic",
                      "attributes": [],
                      "repeatPreviousMessage": true,
                      "messages": [
                        "thanks for completing IC"
                      ],
                      "id": "7cdf9e25-d637-4a01-befb-1aca5c2fb812",
                      "expanded": true,
                      "children": [
                        {
                          "type": "text",
                          "title": "new bot",
                          "attributes": [],
                          "repeatPreviousMessage": true,
                          "messages": [
                            "Now Press 1 to immediately return here\nPress 2 for 1.1\npress 3 for main menu"
                          ],
                          "id": "9e6aaf6b-1e50-46dc-b349-235be3c3262f",
                          "expanded": true,
                          "children": [
                            {
                              "type": "action",
                              "title": "go back 1",
                              "attributes": [],
                              "repeatPreviousMessage": true,
                              "actionType": "goBack",
                              "steps": 1,
                              "id": "ba3e6468-40ee-4809-a865-2e6e8c69cb7e"
                            },
                            {
                              "type": "text",
                              "title": "1.1",
                              "attributes": [],
                              "repeatPreviousMessage": true,
                              "messages": [
                                "in 1.1 press 1"
                              ],
                              "id": "04715026-e68e-4e2e-8db7-ef3a2ea1d767",
                              "expanded": false,
                              "children": [
                                {
                                  "type": "text",
                                  "title": "1.1.1",
                                  "attributes": [],
                                  "repeatPreviousMessage": true,
                                  "messages": [
                                    "in 1.1.1 press 1"
                                  ],
                                  "id": "923af4ad-3129-4f8e-93fa-0fd87c7bc731",
                                  "expanded": true,
                                  "children": [
                                    {
                                      "type": "text",
                                      "title": "1.1.1.1",
                                      "attributes": [],
                                      "repeatPreviousMessage": true,
                                      "messages": [
                                        "in 1.1.1.1 press 0 to go back to 1"
                                      ],
                                      "id": "ddbc540d-9bd2-4a31-a6b4-382422b977ed",
                                      "expanded": true,
                                      "children": [
                                        {
                                          "type": "action",
                                          "title": "go back",
                                          "attributes": [],
                                          "repeatPreviousMessage": true,
                                          "actionType": "goBack",
                                          "steps": "3",
                                          "id": "a53cb66d-8bcf-42a1-9d48-4215991310ad"
                                        }
                                      ],
                                      "__ref": [
                                        {
                                          "key": "0",
                                          "id": "a53cb66d-8bcf-42a1-9d48-4215991310ad"
                                        }
                                      ]
                                    }
                                  ],
                                  "__ref": [
                                    {
                                      "key": "1",
                                      "id": "ddbc540d-9bd2-4a31-a6b4-382422b977ed"
                                    }
                                  ]
                                }
                              ],
                              "__ref": [
                                {
                                  "key": "1",
                                  "id": "923af4ad-3129-4f8e-93fa-0fd87c7bc731"
                                }
                              ]
                            },
                            {
                              "type": "action",
                              "title": "main menu",
                              "attributes": [],
                              "repeatPreviousMessage": true,
                              "actionType": "goBack",
                              "steps": "4",
                              "id": "1da86860-6518-4d96-a01c-5bb16a6a9b79"
                            }
                          ],
                          "__ref": [
                            {
                              "key": "1",
                              "id": "ba3e6468-40ee-4809-a865-2e6e8c69cb7e"
                            },
                            {
                              "key": "2",
                              "id": "04715026-e68e-4e2e-8db7-ef3a2ea1d767"
                            },
                            {
                              "key": "3",
                              "id": "1da86860-6518-4d96-a01c-5bb16a6a9b79"
                            }
                          ]
                        }
                      ],
                      "__next": "9e6aaf6b-1e50-46dc-b349-235be3c3262f"
                    }
                  ]
                },
                {
                  "type": "action",
                  "title": "agentAssign",
                  "attributes": [],
                  "repeatPreviousMessage": true,
                  "actionType": "agentAssign",
                  "id": "41031cd0-a5f9-4cf1-a698-eb218721b80c"
                },
                {
                  "type": "testApi",
                  "title": "test api",
                  "attributes": [],
                  "repeatPreviousMessage": true,
                  "questions": [
                    {
                      "question": "what user id"
                    }
                  ],
                  "response": "data.first_name",
                  "url": "https://reqres.in/api/users/$1",
                  "onCompleteNext": "02b07e31-1251-4a24-a952-179bdcdfa611",
                  "id": "c305cc5f-3295-42cd-b966-44999ba0b2ee",
                  "expanded": true,
                  "children": [
                    {
                      "type": "action",
                      "title": "go back",
                      "attributes": [],
                      "repeatPreviousMessage": true,
                      "actionType": "goBack",
                      "steps": "2",
                      "id": "02b07e31-1251-4a24-a952-179bdcdfa611"
                    }
                  ]
                },
                {
                  "type": "ic",
                  "title": "dasdsad",
                  "attributes": [],
                  "repeatPreviousMessage": true,
                  "questions": [
                    {
                      "question": "dasdasd"
                    }
                  ],
                  "storeDataInCache": true,
                  "cacheKeyIsId": true,
                  "oneTimeCollection": true,
                  "onCompleteNext": "c6841d2d-5e3a-4b94-9f58-63d302a437eb",
                  "id": "5d30478b-021c-4222-bf76-15048d6094be",
                  "expanded": true,
                  "children": [
                    {
                      "type": "text",
                      "title": "dasdasdas",
                      "attributes": [],
                      "repeatPreviousMessage": true,
                      "messages": [
                        "adasdasda"
                      ],
                      "id": "c6841d2d-5e3a-4b94-9f58-63d302a437eb"
                    }
                  ]
                }
              ],
              "invalidResponse": "in correct reply bro",
              "__ref": [
                {
                  "key": "1",
                  "id": "af68ae50-4ec4-45d6-9eec-88d4752744a8"
                },
                {
                  "key": "2",
                  "id": "b02701f5-fc54-4c54-97a4-cbdbd686388a"
                },
                {
                  "key": "3",
                  "id": "1c597d70-c64c-46b4-8b93-452016c93464"
                },
                {
                  "key": null,
                  "id": "474a7b06-5f65-44da-ae01-5984a07316d1"
                },
                {
                  "key": "4",
                  "id": "ad2effa1-f858-40fd-9bc8-2dddbc8573d7"
                },
                {
                  "key": "6",
                  "id": "41031cd0-a5f9-4cf1-a698-eb218721b80c"
                },
                {
                  "key": "5",
                  "id": "c305cc5f-3295-42cd-b966-44999ba0b2ee"
                }
              ],
              "__next": "474a7b06-5f65-44da-ae01-5984a07316d1"
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

    const [chatBotName, setChatBotName] = React.useState("")

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
                setTreeData([body])
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
        console.log("=========TREE UPDATED==========")
        if (treeData) {
            console.log(JSON.stringify(treeData, null, 2))
        }
        console.log("=================")
    }, [treeData])

    function closeHandler() {
        props.closeHandler({})
    }
    function saveHandler() {
        if (data) {
            props.updateHandler({ treeData: treeData[0], name: chatBotName })
        } else {
            props.saveHandler({ treeData: treeData[0], name: chatBotName })
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
                <div style={{ backgroundColor: "white", paddingTop: "20px" }}>
                    <div className="flex ml-20" >
                        <TextField
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
                                                            rowInfo.path.length > 1?
                                                                (

                                                                    <React.Fragment>
                                                                        {
                                                                            rowInfo.parentNode&&rowInfo.parentNode.__ref && rowInfo.parentNode.__ref.length && rowInfo.parentNode.__ref.some(el => (el.id === rowInfo.node.id) && el.key) ?
                                                                                <div className="chatBotKey">
                                                                                
                                                                                {
                                                                                    rowInfo.linked_node=true
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
                                                                            rowInfo.parentNode&&rowInfo.parentNode.__next && rowInfo.node.id === rowInfo.parentNode.__next ?
                                                                                <div className="chatBotKey">
                                                                                {
                                                                                    rowInfo.linked_node=true
                                                                                }
                                                                                    <Tooltip title="Called Immediately After Parent" arrow className={"chatBotTreeKey"}>
                                                                                        <Icon>fast_forward</Icon>
                                                                                    </Tooltip>
                                                                                </div>
                                                                                : null
                                                                        }
                                                                        {

                                                                            rowInfo.parentNode&&rowInfo.parentNode.onCompleteNext && rowInfo.node.id === rowInfo.parentNode.onCompleteNext ?
                                                                                <div className="chatBotKey">
                                                                                {
                                                                                    rowInfo.linked_node=true
                                                                                }
                                                                                    <Tooltip title="Called After Parent Completion" arrow className={"chatBotTreeKey"}>
                                                                                        <Icon>exit_to_app</Icon>
                                                                                    </Tooltip>
                                                                                </div>

                                                                                : null


                                                                        }

                                                                        {
                                                                            !rowInfo.linked_node?

                                                                            <div className="chatBotKey chatBotKeyBad">
                                                                                <Tooltip title="Unconnected Node" arrow className={"chatBotTreeKey"}>
                                                                                    <Icon>link_off</Icon>
                                                                                </Tooltip>
                                                                            </div>

                                                                            :null
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
                                                className:"chatBotTree-base-icon chatBotTree-"+rowInfo.node.type
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
                </ div>
            }
        />
    );
}

export default AddAutoReply;

