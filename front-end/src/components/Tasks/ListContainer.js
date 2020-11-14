import React, { Component } from 'react';
import AddButton from './AddButton';
import Input from './Input';
import Task from './Task';
import DeleteButton from './DeleteButton';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const List = styled.div`
    border: ${props => props.isDraggingOver ? '3px solid #FFD700': ''};
    list-style: none;
    text-align: left;
    padding: 0px 15px;
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
class ListContainer extends Component {
    constructor(props) {
        super(props);
        this.setIsShown = this.setIsShown.bind(this)
        this.state = {
            isShown: false
        }
    }

    setIsShown = (isShown) => {
        this.setState({isShown: isShown})
    }

    render() {
        let list = this.props.list;

        return (
            <Draggable draggableId={list._id} index={this.props.index}>
                {provided => (
                    <div
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        className="list"
                        onMouseEnter={() => this.setIsShown(true)}
                        onMouseLeave={() => this.setIsShown(false)}
                        >
                        <div
                            className="header"
                            >
                            <div className="title"><Input title={list.title} id={list._id} component="lists" getComponent={this.props.getLists}/></div>
                                <div className={`edit-buttons ${this.state.isShown ? 'shown' : '' }`}>
                                    <DeleteButton id={this.state.id} component={this.state.component} getComponent={this.props.getComponent}/>
                                    <AddButton list={list._id} component="tasks" getComponent={this.props.getLists}/>
                                    <Handle className="icon" {...provided.dragHandleProps} >settings_ethernet</Handle>
                                </div>
                        </div>
                        <Droppable droppableId={list._id}>
                            {(provided, snapshot) => (
                                <List
                                    isDraggingOver={snapshot.isDraggingOver}
                                    list={list}
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    >
                                    <div className={`tasks ${list.tasks.length > 3 ? "scrollbar" : ""} `}>
                                      {
                                        list.tasks &&
                                          list.tasks.length > 0 ?
                                            (
                                              list.tasks.map((task, index) => {
                                                return (
                                                  <Task key={task._id} index={index} {...task} getComponent={this.props.getLists} />
                                                )
                                              })
                                            )
                                            :
                                            (
                                              <div className="none">No Tasks Created</div>
                                            )
                                      }
                                      { provided.placeholder }
                                    </div>
                                </List>
                            )}
                        </Droppable>
                    </div>
                )}
            </Draggable>
        )
    }
}

export default ListContainer;
