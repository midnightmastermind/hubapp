import React, { Component } from 'react';
import axios from 'axios';

class Input extends Component {

  constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.onBlur = this.onBlur.bind(this);

      this.state = {
          input: this.props.title,
          component: this.props.component,
          id: this.props.id
      }
  }

  onBlur = (e) => {
    const title = {
        title : this.state.input
    }
    axios.post(`http://localhost:5000/${this.state.component}/${this.state.id}/update`, title)
    .then(res => {
         console.log('Component Updated')
    })
    .catch(err => console.log(err))
    this.setState({ showDelete: false});
  }

  handleChange = (e) => {
    this.setState({
      input: e.target.value
    })
  }

  render() {
    let { input } = this.state;
    return (
      <div className="container">
        <input type="text" onChange={this.handleChange} value={input} onBlur={this.onBlur} />
      </div>
    )
  }
}

export default Input
