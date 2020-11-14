import React, { Component } from 'react';
import axios from 'axios';


class AddButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: 'untitled',
            type: 'TaskBlock'
        }
        this.addComponent = this.addComponent.bind(this);
    }

    addComponent() {
        const component = this.state;

        const componentCreateAPI = '/'+ this.props.component + '/create'
        axios.post(`http://localhost:5000${componentCreateAPI}`, component)
            .then(res => {
                if(res.data){
                    this.props.getComponent();
                }
            })
            .catch(err => console.log(err))
    }
    render() {
        return (
            <div className="add-list-form">
                <button onClick={this.addComponent}>&#x002B;</button>
            </div>
        )
    }
}

export default AddButton
