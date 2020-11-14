import React, { Component } from 'react';
import AddButton from '../crud/AddButton';
import Input from '../crud/Input';
import Block from './Block';
import DeleteButton from '../crud/DeleteButton';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';


const BlocksContainerElement = styled.div`
    border: ${props => props.isDraggingOver ? '3px solid #FFD700': ''};
    block-style: none;
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
class BlocksContainer extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const blocks = this.props.blocks;
        console.log(blocks);
        return (
            <Droppable droppableId="blocks-container">
                {(provided, snapshot) => (
                    <BlocksContainerElement
                        className="blocks-container"
                        isDraggingOver={snapshot.isDraggingOver}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        >
                        <div className="block-header">Blocks <AddButton getComponent={this.props.getBlocks} component="blocks" /></div>
                        <div className="block">
                          {
                            blocks &&
                              blocks.length > 0 ?
                                (
                                  blocks.map((block, index) => {
                                    return (
                                      <Block key={block._id} index={index} {...block} getComponent={this.props.getBlocks} />
                                    )
                                  })
                                )
                                :
                                (
                                  <div className="none">No Blocks Created</div>
                                )
                          }
                          { provided.placeholder }
                        </div>
                    </BlocksContainerElement>
                )}
            </Droppable>
        )
    }
}
export default BlocksContainer;
