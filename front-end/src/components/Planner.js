import React, {Component} from 'react';
import axios from 'axios';
import CalendarContainer from "./Calendar/CalendarContainer";
import AddButton from './crud/AddButton';
import BlocksContainer from './Blocks/BlocksContainer2';
import styled from 'styled-components';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import {changeNodeAtPath, getNodeAtPath, getTreeFromFlatData, getFlatDataFromTree} from "react-sortable-tree";

const ListContainerElement = styled.div`
`;
class Planner extends Component {
    constructor(props) {
            super(props);
            this.onDragEnd = this.onDragEnd.bind(this)
            this.state = {
                    blocks: props.blocks,
                    user: props.user
            };
    }


    updateTree(tree) {
        tree.map((element,i) => {
            if (element._id) {
                return axios.post('/blocks/' + element._id + '/update', {element})
            } else {
                return axios.post('/blocks/create', {element})
                .then(res => {
                    if(res.data){
                        return res.data._id;
                    }
                })
                .catch(err => console.log(err))
            }
        });
    }

    onDragEnd = result => {
        const { destination, source, draggableId, type } = result;

        // if (!destination) {
        //     return;
        // }
        //
        // if (destination.droppableId == source.droppableId && destination.index == source.index) {
        //     return;
        // }
        //
        // if(type == 'lists') {
        //     const movingListIndex = this.state.lists.findIndex(obj => obj._id == draggableId);
        //     const movingList = this.state.lists[movingListIndex]
        //
        //     const newListsOrder = Array.from(this.state.lists)
        //     newListsOrder.splice(source.index, 1);
        //     newListsOrder.splice(destination.index, 0, movingList);
        //     console.log(newListsOrder)
        //     const newState = {
        //         ...this.state,
        //         lists: newListsOrder
        //     }
        //     this.setState(newState);
        //     return;
        // }
        //
        // const startListIndex = this.state.lists.findIndex(obj => obj._id == source.droppableId);
        // const startList = this.state.lists[startListIndex];
        //
        // const endListIndex = this.state.lists.findIndex(obj => obj._id == destination.droppableId);
        // const endList = this.state.lists[endListIndex];
        //
        // if (startList == endList) {
        //     //same list
        //     const newTasks = Array.from(startList.tasks);
        //     const movingTask = startList.tasks[source.index];
        //     newTasks.splice(source.index, 1);
        //     newTasks.splice(destination.index, 0, movingTask);
        //     const newList = {
        //         ...startList,
        //         tasks: newTasks
        //     }
        //
        //     const newLists = Array.from(this.state.lists);
        //     newLists[startListIndex] = newList
        //     const newState = {
        //         ...this.state,
        //         lists: newLists
        //     }
        //     this.setState(newState);
        //     return;
        // }
        //
        // const startTasks = Array.from(startList.tasks);
        // startTasks.splice(source.index, 1);
        //
        // const newStartList = {
        //     ...startList,
        //     tasks: startTasks
        // }
        // const movingTask = startList.tasks[source.index];
        // const endTasks = Array.from(endList.tasks);
        // endTasks.splice(destination.index, 0, movingTask);
        //
        // const newEndList = {
        //     ...endList,
        //     tasks: endTasks
        // }
        //
        // const newLists = Array.from(this.state.lists);
        // newLists[startListIndex] = newStartList
        // newLists[endListIndex] = newEndList
        // const newState = {
        //     ...this.state,
        //     lists: newLists
        // }
        // this.setState(newState);

    }
    render() {
        return (
            <div className="app-content hub">
                <CalendarContainer updateEvent={this.props.updateEvent} fetchEvents={this.props.fetchEvents} events={this.props.events} updateBlock={this.props.updateBlock} treeData={this.props.blocks}/>
                <BlocksContainer updateBlock={this.props.updateBlock} user={this.props.user} treeData={this.props.blocks} />
            </div>
        )
    }
}

export default Planner;
