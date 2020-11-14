import React, { Component } from 'react';
import axios from 'axios';


class DeleteButton extends Component {
    constructor(props) {
        super(props);
        this.deleteComponent = this.deleteComponent.bind(this);
    }

    deleteComponent(){
        const componentDeleteAPI = '/'+ this.props.component + '/' + this.props.id +'/delete';

        axios.post(`http://localhost:5000${componentDeleteAPI}`, this.props.component)
            .then(res => {
                if(res.data){
                    this.props.getComponent();
                }
            })
            .catch(err => console.log(err))
    }
    render() {
        return (
            <div className={`delete-list-form ${this.props.className}`}>
                <button onClick={this.deleteComponent}>&#x1F5D1;</button>
            </div>
        )
    }
}

export default DeleteButton
