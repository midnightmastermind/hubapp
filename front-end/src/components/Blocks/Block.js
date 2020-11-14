import React, { Component } from 'react';
import Input from '../crud/Input';
import DeleteButton from '../crud/DeleteButton';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const BlockElement = styled.div`
    height: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: ${props => props.isDragging ? '3px solid #FFD700': '1px solid #787a80'};
    border-radius: 5px;
    padding: 15px;
    margin-bottom: 10px;
    padding-right: 5px;
    font-size: 14px;
    background: #282c34;
    overflow-wrap: break-word;
    cursor: pointer;
    }
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

class Block extends Component {
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
        const block = this.props;
        return (
            <Draggable draggableId={block._id} index={this.props.index}>
                {(provided, snapshot) => (
                    <BlockElement className="block"
                        ref={provided.innerRef}
                        isDragging={snapshot.isDragging}
                        {...provided.draggableProps}
                        onMouseEnter={() => this.setIsShown(true)}
                        onMouseLeave={() => this.setIsShown(false)}
                        >
                        <Input
                            id={block._id}
                            component="blocks"
                            title={block.title}
                            getComponent={this.props.getComponent}
                            />
                            <div className={`edit-buttons ${this.state.isShown ? 'shown' : ''}`}>
                                <DeleteButton id={block._id} component="blocks" getComponent={this.props.getComponent}/>
                                <Handle className='icon' {...provided.dragHandleProps}>control_camera</Handle>
                            </div>

                    </BlockElement>
                )}
            </Draggable>
        );
    }
}

export default Block;
