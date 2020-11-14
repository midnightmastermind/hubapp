import React, {Component} from 'react';
import Draggable from './Draggable'

class HubRoot extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="app-content hub">
                <Draggable>
                    <div className="folder"><span onClick={() => this.props.setElement("planner")} className="folder-name">Planner</span></div>
                </Draggable>
                <Draggable>
                    <div className="folder"><span className="folder-name">Notebook</span></div>
                </Draggable>
            </div>
        )
    }
}

export default HubRoot;
