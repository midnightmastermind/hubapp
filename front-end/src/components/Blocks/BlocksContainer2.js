import React, { Component } from 'react';
import AddButton from '../crud/AddButton';
import Input from '../crud/Input';
import Block from './Block';
import DeleteButton from '../crud/DeleteButton';
import styled from 'styled-components';
import SortableTree, {changeNodeAtPath, defaultGetNodeKey, getNodeAtPath, getTreeFromFlatData, getFlatDataFromTree} from "react-sortable-tree";

import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer';
const cloneDeep = require('clone-deep');
const diff = require('deep-diff');
const BlocksContainerElement = styled.div`
    border: ${props => props.isDraggingOver ? '3px solid #FFD700': ''};
    block-style: none;
    text-align: left;
    border-radius: 5px;
`;

const Handle = styled.div`
    font-weight: bold;
    font-size: 20px;
    background-color: #787a80;
    border-radius: 5px;
    cursor: grab;
    color: black;
    width: 27px;
    text-align: center;
    height: 28px;
    padding-top: 4px;

`;

const newBlocks = [
    {
        title: 'FolderBlock',
        parentId: null,
        children: [],
        type: 'FolderBlock',
        deletable: true,
        isDirectory: true,
        scheduled: [],
        expanded: true,
        reoccuring: false,
        completedDates: [],
        completed: false
    },
    {
        title: 'TaskBlock',
        parentId: null,
        children: [],
        type: 'TaskBlock',
        deletable: true,
        isDirectory: false,
        scheduled: [],
        expanded: true,
        reoccuring: false,
        completedDates: [],
        completed: false
    }
];
class BlocksContainer extends Component {
    constructor(props) {
        super(props);

        this.handleNodeClick = this.handleNodeClick.bind(this);
        this.completeTask = this.completeTask.bind(this);
        this.moveNode = this.moveNode.bind(this);
        this.state = {
            treeData: props.treeData,
            newBlocks: newBlocks
        };
    }
    static getDerivedStateFromProps(props, state) {
        if(props.treeData && props.treeData !== state.treeData)
        {
          return {
            treeData: props.treeData
          };
        }
        return null;
      }

    completeTask(node) {
        console.log("fuck");
        console.log(node);
        const completed = node.completed;
        node.completed = !completed;
        this.props.updateBlock(node);
    }
    moveNode(node) {
         console.log("blocks");
         console.log(node);
        if(node.nextPath) {
            this.props.updateBlock(node.nextParentNode);

            if (node.prevPath) {
                let prevPath = node.prevPath.slice(0, node.prevPath.length-1);
                //prevPath[prevPath.length-1]+=1;
                const treeData = node.treeData;
                const prevNode = getNodeAtPath({treeData: treeData, path: prevPath, getNodeKey:({ node }) => node._id, ignoreCollapsed: false});

                if (prevNode && prevNode.treeIndex !== -1) {
                    this.props.updateBlock(prevNode.node)
                }
            }
        }
    }
    handleNodeClick(node, e) {
        // ignore collapse/expand button
        const clickedItemClassName = e.target.className;
        if (
          clickedItemClassName === 'rstcustom__expandButton' ||
          clickedItemClassName === 'rstcustom__collapseButton'
        ) return;
        let nodePath = node.path;
        while (node.node.isDirectory === false) {
            nodePath.pop();
            node = getNodeAtPath({
                treeData: this.state.treeData,
                path: nodePath,
                getNodeKey: ({treeIndex}) => treeIndex,
                ignoreCollapsed: false
            });
        }
        // while (node.node.isDirectory === false) {
        //     console.log(node);
        //     node=node.parentNode;
        // }
        this.setState({ context: nodePath });
    }

    render() {
        return (
            <BlocksContainerElement
                className="blocks-container"
                >
                <div className="blocks-header">Blocks</div>
                <div className="blocks-content">
                    <div className="blocks-inventory">
                        <div className="panel-header">block inventory</div>
                        <SortableTree
                          className="tree"
                          treeData={this.state.newBlocks}
                          onChange={treeData => this.setState({ newBlocks: treeData })}
                          dndType="blocks"
                          rowHeight={20}
                          canDrop={()=>false}
                          getNodeKey={({ node }) => node._id}
                          shouldCopyOnOutsideDrop={true}
                          canNodeHaveChildren={()=>false}
                          generateNodeProps={(rowInfo) => {
                                const { node } = rowInfo;
                                return {
                                  className: `${rowInfo.node.type}`,
                                  key : `${rowInfo.node._id}`,
                                  style: {
                                    height: "17px",
                                    fontSize: "12px",
                                    width: "100%",
                                    border: "1px solid #787a80",
                                    borderRadius: "5px",
                                    },
                                  buttons: rowInfo.node.type === 'TaskBlock' ? [
                                    <label className="checkbox-container browser-default">
                                        <input className="browser-default" checked={rowInfo.node.completed} type="checkbox" />
                                        <span className="checkbox-element browser-default"  onClick={(e,node) => this.completeTask(node)}></span>
                                    </label>
                                ] : []

                                };
                            }}/>
                    </div>
                    <div className="blocks-infastructure">
                        <div className="panel-header">block infastructure</div>
                        <SortableTree
                            className="tree"
                            shouldCopyOnOutsideDrop={true}
                            treeData={this.state.treeData}
                            onMoveNode={node => this.moveNode(node)}
                            getNodeKey={({ node }) => node._id}
                            onChange={treeData =>{
                                this.setState({ treeData: treeData });
                            }}
                            dndType="blocks"
                            rowHeight={20}
                            generateNodeProps={(rowInfo) => ({
                                 className: `${rowInfo.node.type} ${rowInfo.node.completed ? `completed` : ``}`,
                                  style: {
                                    height: "17px",
                                    fontSize: "12px",
                                    width: "100%",
                                    border: "1px solid #787a80",
                                    borderRadius: "5px",
                                },
                                buttons: rowInfo.node.type === 'TaskBlock' ? [
                                    <label className="checkbox-container browser-default">
                                        <input className="browser-default" checked={rowInfo.node.completed} type="checkbox" />
                                        <span className="checkbox-element browser-default" onClick={() => this.completeTask(rowInfo.node)}></span>
                                    </label>
                                ] : []
                            })}/>
                    </div>
                </div>
            </BlocksContainerElement>
        )
    }
}
export default BlocksContainer;
