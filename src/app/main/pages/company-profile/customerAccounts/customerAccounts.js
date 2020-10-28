import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CoreHttpHandler from '../../../../../http/services/CoreHttpHandler';
import Widget2 from './widgets/Widget2';
import FuseLoading from '../../../../../@fuse/core/FuseLoading/FuseLoading';
import CustomerTable from './customerTable/CustomerTable';
import FuseAnimate from '@fuse/core/FuseAnimate';
import Icon from '@material-ui/core/Icon';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import { useSelector } from 'react-redux';
import TextField from '@material-ui/core/TextField';

////tree
import SortableTree from 'react-sortable-tree';
import 'react-sortable-tree/style.css'; // This only needs to be imported once in your app

import { ThemeProvider, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { add } from 'lodash';

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
	}
});
function CustomerAccounts(props) {
	const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);

	const classes = useStyles();
	const [clients, setClient] = React.useState([]);
	const [activeClients, setActiveClients] = React.useState('');
	const [inactiveClients, setInactiveClients] = React.useState('');
	const [value, setValue] = React.useState('');

	const [totalItems, setTotalItems] = React.useState(0);
	const [currentParams, setCurrentParams] = React.useState({ limit: 10, page: 0 });
	const [isLoading, setLoading] = React.useState(true);
	const [treeData, setTreeData] = React.useState([
		{
			title: 'Incoming Files',
			children: [
				{
					title: 'Culture'
				},
				{
					title: 'Encyclopedia',
					type: 'text',
					parameters: 'abc '
				},
				{
					title: 'Retail',
					children: [
						{ title: 'Node 01' },
						{ title: 'Node 02' },
						{
							title: 'Node 03',
							children: [{ title: 'Subnode 01' }, { title: 'Subnode 01' }, { title: 'Subnode 01' }]
						},
						{ title: 'Node 04' },
						{ title: 'Node 05' }
					]
				}
			]
		}
	]);

	const dataSourceOptions = {
		params: {
			columns: '*',
			sortby: 'ASC',
			page: 1,
			limit: 1,
			orderby: 'id',
			where: 'id != $1 AND displayed = false order by id',
			values: 0
		},
		type: 'dashboard',
		apiType: 'listing'
	};

	React.useEffect(() => {
		fetchPagination();
	}, [currentParams]);

	React.useEffect(() => {
		fetchMeta();
	}, []);
	console.log('treeData : ', treeData);
	const dataSourceSuccessBusiness = response => {
		setClient(response.data.data.clients.clients);
		setActiveClients(response.data.data.clients.active_clients.active);
		setInactiveClients(response.data.data.clients.inactive_clients.inactive);
	};
	const dataSourceFailureBusiness = response => {};
	const changeStatus = params => {
		CoreHttpHandler.request(
			'Business',
			'changeStatus',
			params,
			response => {
				fetchPagination(false);
				fetchMeta();
			},
			dataSourceFailureChangeStatus
		);
	};
	const dataSourceSuccessChangeStatus = response => {
		// CoreHttpHandler.request('Business', 'get', { ...dataSourceOptions.params }, dataSourceSuccessBusiness, dataSourceFailureBusiness);
	};
	const dataSourceFailureChangeStatus = response => {
		console.log('dataSourceFailureChangeStatus response : ', response);
	};

	const fetchMeta = () => {
		CoreHttpHandler.request(
			'Business',
			'get_meta',
			{},
			response => {
				setActiveClients(response.data.data.clients.active_clients.active);
				setInactiveClients(response.data.data.clients.inactive_clients.inactive);
			},
			error => {
				console.log(error);
			}
		);
	};

	const setPage = currentPage => {
		setCurrentParams({ limit: currentParams.limit, page: currentPage });
	};

	const setLimit = pageLimit => {
		setCurrentParams({ limit: pageLimit, page: 0 });
	};

	const fetchPagination = (bool = true) => {
		console.trace();
		if (bool) setLoading(true);

		CoreHttpHandler.request(
			'Business',
			'get_pagination',
			{
				...currentParams,
				columns: '*',
				sortby: 'ASC',
				orderby: 'id',
				where: 'id != $1 AND displayed = false order by id',
				values: 0
			},
			response => {
				setLoading(false);
				setTotalItems(response.data.data.clients.totalItems);

				setClient(response.data.data.clients.clients);
			},
			error => {
				console.log(error);
			}
		);
	};

	const addTree = () => {
		alert();
		let newTree = {
			title: 'New Incoming Files'
		};
		setTreeData(oldArray => [...oldArray, newTree]);
		console.log(treeData);
	};
	const addNewNode = rowInfo => {
		const NEW_NODE = { title: 'Another Node', isDirectory: true, expanded: true };
		const newTree = addNodeUnderParent({
			treeData: treeData,
			newNode: NEW_NODE,
			expandParent: true,
			parentKey: rowInfo ? rowInfo.treeIndex : undefined,
			getNodeKey: ({ treeIndex }) => treeIndex
		});
		setTreeData(newTree.treeData);

		// this.updateTreeData(newTree.treeData);
	};
	const editNewNode = rowInfo => {
		console.log('row Edit', rowInfo);
		// const NEW_NODE = { title: 'Another Node', isDirectory: true, expanded: true };
		// const newTree = addNodeUnderParent({
		// 	treeData: treeData,
		// 	newNode: NEW_NODE,
		// 	expandParent: true,
		// 	parentKey: rowInfo ? rowInfo.treeIndex : undefined,
		// 	getNodeKey: ({ treeIndex }) => treeIndex
		// });
		// setTreeData(newTree.treeData);

		// this.updateTreeData(newTree.treeData);
	};

	const removeNode = rowInfo => {
		const { path } = rowInfo;
		const newTree = removeNodeAtPath({
			treeData: treeData,
			path,
			getNodeKey: ({ treeIndex }) => treeIndex
		});
		setTreeData(newTree);
		// this.updateTreeData(newTree);
	};
	function getNodeAtPath({ treeData, path, getNodeKey, ignoreCollapsed = true }) {
		let foundNodeInfo = null;

		try {
			changeNodeAtPath({
				treeData,
				path,
				getNodeKey,
				ignoreCollapsed,
				newNode: ({ node, treeIndex }) => {
					foundNodeInfo = { node, treeIndex };
					return node;
				}
			});
		} catch (err) {}

		return foundNodeInfo;
	}
	function addNodeUnderParent({
		treeData,
		newNode,
		parentKey = null,
		getNodeKey,
		ignoreCollapsed = true,
		expandParent = false,
		addAsFirstChild = false
	}) {
		if (parentKey === null) {
			return addAsFirstChild
				? {
						treeData: [newNode, ...(treeData || [])],
						treeIndex: 0
				  }
				: {
						treeData: [...(treeData || []), newNode],
						treeIndex: (treeData || []).length
				  };
		}

		let insertedTreeIndex = null;
		let hasBeenAdded = false;
		const changedTreeData = map({
			treeData,
			getNodeKey,
			ignoreCollapsed,
			callback: ({ node, treeIndex, path }) => {
				const key = path ? path[path.length - 1] : null;
				// Return nodes that are not the parent as-is
				if (hasBeenAdded || key !== parentKey) {
					return node;
				}
				hasBeenAdded = true;

				const parentNode = {
					...node
				};

				if (expandParent) {
					parentNode.expanded = true;
				}

				// If no children exist yet, just add the single newNode
				if (!parentNode.children) {
					insertedTreeIndex = treeIndex + 1;
					return {
						...parentNode,
						children: [newNode]
					};
				}

				if (typeof parentNode.children === 'function') {
					throw new Error('Cannot add to children defined by a function');
				}

				let nextTreeIndex = treeIndex + 1;
				for (let i = 0; i < parentNode.children.length; i += 1) {
					nextTreeIndex += 1 + getDescendantCount({ node: parentNode.children[i], ignoreCollapsed });
				}

				insertedTreeIndex = nextTreeIndex;

				const children = addAsFirstChild
					? [newNode, ...parentNode.children]
					: [...parentNode.children, newNode];

				return {
					...parentNode,
					children
				};
			}
		});

		if (!hasBeenAdded) {
			throw new Error('No node found with the given key.');
		}

		return {
			treeData: changedTreeData,
			treeIndex: insertedTreeIndex
		};
	}
	function removeNodeAtPath({ treeData, path, getNodeKey, ignoreCollapsed = true }) {
		return changeNodeAtPath({
			treeData,
			path,
			getNodeKey,
			ignoreCollapsed,
			newNode: null // Delete the node
		});
	}

	function changeNodeAtPath({ treeData, path, newNode, getNodeKey, ignoreCollapsed = true }) {
		const RESULT_MISS = 'RESULT_MISS';
		const traverse = ({ isPseudoRoot = false, node, currentTreeIndex, pathIndex }) => {
			if (!isPseudoRoot && getNodeKey({ node, treeIndex: currentTreeIndex }) !== path[pathIndex]) {
				return RESULT_MISS;
			}

			if (pathIndex >= path.length - 1) {
				// If this is the final location in the path, return its changed form
				return typeof newNode === 'function' ? newNode({ node, treeIndex: currentTreeIndex }) : newNode;
			}
			if (!node.children) {
				// If this node is part of the path, but has no children, return the unchanged node
				throw new Error('Path referenced children of node with no children.');
			}

			let nextTreeIndex = currentTreeIndex + 1;
			for (let i = 0; i < node.children.length; i += 1) {
				const result = traverse({
					node: node.children[i],
					currentTreeIndex: nextTreeIndex,
					pathIndex: pathIndex + 1
				});

				// If the result went down the correct path
				if (result !== RESULT_MISS) {
					if (result) {
						// If the result was truthy (in this case, an object),
						//  pass it to the next level of recursion up
						return {
							...node,
							children: [...node.children.slice(0, i), result, ...node.children.slice(i + 1)]
						};
					}
					// If the result was falsy (returned from the newNode function), then
					//  delete the node from the array.
					return {
						...node,
						children: [...node.children.slice(0, i), ...node.children.slice(i + 1)]
					};
				}

				nextTreeIndex += 1 + getDescendantCount({ node: node.children[i], ignoreCollapsed });
			}

			return;
		};
		// Use a pseudo-root node in the beginning traversal
		const result = traverse({
			node: { children: treeData },
			currentTreeIndex: -1,
			pathIndex: -1,
			isPseudoRoot: true
		});

		if (result === RESULT_MISS) {
			throw new Error('No node found at the given path.');
		}

		return result.children;
	}

	function map({ treeData, getNodeKey, callback, ignoreCollapsed = true }) {
		if (!treeData || treeData.length < 1) {
			return [];
		}

		return mapDescendants({
			callback,
			getNodeKey,
			ignoreCollapsed,
			isPseudoRoot: true,
			node: { children: treeData },
			currentIndex: -1,
			path: [],
			lowerSiblingCounts: []
		}).node.children;
	}

	function getDescendantCount({ node, ignoreCollapsed = true }) {
		return (
			getNodeDataAtTreeIndexOrNextIndex({
				getNodeKey: () => {},
				ignoreCollapsed,
				node,
				currentIndex: 0,
				targetIndex: -1
			}).nextIndex - 1
		);
	}

	function mapDescendants({
		callback,
		getNodeKey,
		ignoreCollapsed,
		isPseudoRoot = false,
		node,
		parentNode = null,
		currentIndex,
		path = [],
		lowerSiblingCounts = []
	}) {
		const nextNode = { ...node };

		// The pseudo-root is not considered in the path
		const selfPath = isPseudoRoot ? [] : [...path, getNodeKey({ node: nextNode, treeIndex: currentIndex })];
		const selfInfo = {
			node: nextNode,
			parentNode,
			path: selfPath,
			lowerSiblingCounts,
			treeIndex: currentIndex
		};

		// Return self on nodes with no children or hidden children
		if (!nextNode.children || (nextNode.expanded !== true && ignoreCollapsed && !isPseudoRoot)) {
			return {
				treeIndex: currentIndex,
				node: callback(selfInfo)
			};
		}
		// Get all descendants
		let childIndex = currentIndex;
		const childCount = nextNode.children.length;
		if (typeof nextNode.children !== 'function') {
			nextNode.children = nextNode.children.map((child, i) => {
				const mapResult = mapDescendants({
					callback,
					getNodeKey,
					ignoreCollapsed,
					node: child,
					parentNode: isPseudoRoot ? null : nextNode,
					currentIndex: childIndex + 1,
					lowerSiblingCounts: [...lowerSiblingCounts, childCount - i - 1],
					path: selfPath
				});
				childIndex = mapResult.treeIndex;

				return mapResult.node;
			});
		}

		return {
			node: callback(selfInfo),
			treeIndex: childIndex
		};
	}

	function getNodeDataAtTreeIndexOrNextIndex({
		targetIndex,
		node,
		currentIndex,
		getNodeKey,
		path = [],
		lowerSiblingCounts = [],
		ignoreCollapsed = true,
		isPseudoRoot = false
	}) {
		// The pseudo-root is not considered in the path
		const selfPath = !isPseudoRoot ? [...path, getNodeKey({ node, treeIndex: currentIndex })] : [];

		// Return target node when found
		if (currentIndex === targetIndex) {
			return {
				node,
				lowerSiblingCounts,
				path: selfPath
			};
		}

		// Add one and continue for nodes with no children or hidden children
		if (!node.children || (ignoreCollapsed && node.expanded !== true)) {
			return { nextIndex: currentIndex + 1 };
		}

		// Iterate over each child and their descendants and return the
		// target node if childIndex reaches the targetIndex
		let childIndex = currentIndex + 1;
		const childCount = node.children.length;
		for (let i = 0; i < childCount; i += 1) {
			const result = getNodeDataAtTreeIndexOrNextIndex({
				ignoreCollapsed,
				getNodeKey,
				targetIndex,
				node: node.children[i],
				currentIndex: childIndex,
				lowerSiblingCounts: [...lowerSiblingCounts, childCount - i - 1],
				path: selfPath
			});

			if (result.node) {
				return result;
			}

			childIndex = result.nextIndex;
		}

		// If the target node is not found, return the farthest traversed index
		return { nextIndex: childIndex };
	}
	const createJson = () => {
		console.log('treedata', treeData);
		let createjs = [];
		let createjsChild = [];
		let defaultt = [];
		treeData.map((data, i) => {
			createjs.defaultmsg = [data.title];
			// defaultt = data.title;
			// createjs.push(defaultt);

			if (data.children && data.children.length > 0) {
				createjsChild = parseChildren(data.children);
				console.log('createjsChild befor push', createjsChild);
				createjs.push(createjsChild);
			}
		});
		console.log('createjs : ', createjs);
	};

	function parseChildren(child) {
		let result = [];
		if (child && child.length) {
			result = child.map((item, i) => {
				if (item) {
					if (item.children && item.children.length) {
						item.children = parseChildren(item.children);
						item.children = item.children.filter(el => el);
						if (item.children && item.children.length) {
							return item.children;
							// return item.children.map(el => el.title);
						}
					} else {
						return item.title;
					}
				}
			});
		}
		return result.filter(el => el);
	}

	return (
		<FusePageSimple
			classes={{
				header: 'min-h-150 h-150 sm:h-150 sm:min-h-150',
				content: classes.content
			}}
			header={
				<div className="flex flex-col justify-between flex-1 px-20 pt-20 ">
					<div className="flex items-center pt-30">
						<FuseAnimate animation="transition.expandIn" delay={300}>
							<Icon className="text-26">dashboard</Icon>
						</FuseAnimate>
						<FuseAnimate animation="transition.slideLeftIn" delay={300}>
							<Typography className=" py-0 sm:py-24 hidden sm:flex mx-0 sm:mx-12 text-20" variant="h6">
								Business Accounts
							</Typography>
						</FuseAnimate>
						{/*  */}
						<div className="flex flex-1 items-center justify-center px-12">
							<ThemeProvider theme={mainTheme}>
								<FuseAnimate animation="transition.slideDownIn" delay={300}>
									<Paper className="flex items-center w-full max-w-sm px-8 py-4" elevation={1}>
										<Icon color="action" fontSize="small">
											search
										</Icon>
										<MuiThemeProvider theme={SearchStyle}>
											<Input
												style={{ border: 'none' }}
												rows={1}
												placeholder="Search"
												className="flex flex-1 mx-8 "
												disableUnderline
												onChange={e => {
													setValue(e.target.value);
												}}
											/>
										</MuiThemeProvider>
									</Paper>
								</FuseAnimate>
							</ThemeProvider>
						</div>
					</div>
				</div>
			}
			content={
				<>
					<div className="p-24" style={{ scrollX: false }}>
						<FuseAnimateGroup
							className="flex flex-wrap"
							enter={{
								animation: 'transition.slideUpBigIn'
							}}
						>
							<Grid container spacing={4}>
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
												Create Account
											</span>
										</Button>
									</Grid>

									<Grid container spacing={3}>
										<Grid item md={6} sm={12} xs={12}>
											<Widget2 count={activeClients} bottom_title="Active Customers" />
										</Grid>
										<Grid item md={6} sm={12} xs={12}>
											<Widget2 count={inactiveClients} bottom_title="Inactive Customers" />
										</Grid>
									</Grid>
								</Grid>
							</Grid>
							<Grid container spacing={3} style={{ marginTop: 10 }}>
								<Grid item md={12} sm={12} xs={12}>
									<CustomerTable
										isLoading={isLoading}
										totalItems={totalItems}
										setPage={setPage}
										setLimit={setLimit}
										rowsPerPage={currentParams.limit}
										currentPage={currentParams.page}
										clients={clients}
										onchange={e => {
											changeStatus(e);
										}}
										searchValue={value}
									/>
								</Grid>
							</Grid>

							{/* <Grid container spacing={3} style={{ marginTop: 10 }}>
								<Grid item md={12} sm={12} xs={12}>
									<div style={{ height: 600 }}>
										<SortableTree
											treeData={treeData}
											scaffoldBlockPxWidth={16}
											generateNodeProps={rowInfo => ({
												buttons: [
													<div>
														<TextField hintText="" multiLine={true} rows={1} rowsMax={4} />
														<br />
														<button label="Delete" onClick={event => removeNode(rowInfo)}>
															Remove
														</button>
														<button label="Add" onClick={event => addNewNode(rowInfo)}>
															Add
														</button>
														<button label="Add" onClick={event => editNewNode(rowInfo)}>
															Edit
														</button>
													</div>
												],
												style: {
													height: '50px'
												}
											})}
											onChange={treeData => {
												console.log('treeData :  ', treeData);
												setTreeData(treeData);
											}}
											// generateNodeProps={add()}
										/>
									</div>
									<Button
										style={{ fontSize: '11px', backgroundColor: '#e73859', color: 'white' }}
										variant="contained"
										color="primary"
										onClick={e => {
											addTree();
										}}
									>
										<span style={{ textTransform: 'capitalize', fontSize: '13px' }}>Add Tree</span>
									</Button>
									<Button
										style={{ fontSize: '11px', backgroundColor: '#e73859', color: 'white' }}
										variant="contained"
										color="primary"
										onClick={e => {
											createJson();
										}}
									>
										<span style={{ textTransform: 'capitalize', fontSize: '13px' }}>
											create Json
										</span>
									</Button>
								</Grid>
							</Grid> */}
						</FuseAnimateGroup>
					</div>
				</>
			}
		/>
	);
}

export default CustomerAccounts;
