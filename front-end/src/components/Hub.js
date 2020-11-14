import React, {Component} from 'react';
import Planner from './Planner'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import { fetchBlocks, updateBlock } from "../actions/blockActions";
import { fetchEvents, updateEvent } from "../actions/eventActions";
import Clock from 'react-live-clock';

class Hub extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        this.props.fetchEvents();
        this.props.fetchBlocks();
    }

    onLogoutClick = e => {
        this.props.logoutUser();
    };

    render() {
        const { user } = this.props.auth;
        console.log(this.props);
        return (
            <div className="app-element">
                <div className="hub-top-bar">
                    <div className="welcome">Welcome {user.name.split(" ")[0]}  |  <Clock format={'dddd, MMMM D, YYYY, h:mm:ss A'} /><button onClick={()=>this.onLogoutClick()}>logout</button></div>
                </div>
                <div className="app-window">
                    <div className="planner-window">
                        <Planner fetchEvents={this.props.fetchEvents} updateEvent={this.props.updateEvent} events={this.props.events.events} updateBlock={this.props.updateBlock} blocks={this.props.blocks.blocks} user={user}/>
                    </div>
                    <div className="visualization-window">
                        <div className="visualization">
                            <div className="visualization-top-header">Visualization</div>
                            <div className="visualization-element"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Hub.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    fetchBlocks: PropTypes.func.isRequired,
    updateBlock: PropTypes.func.isRequired,
    fetchEvents: PropTypes.func.isRequired,
    updateEvent: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    events: state.events,
    blocks: state.blocks
});
export default connect(
    mapStateToProps,
    { logoutUser, fetchBlocks, updateBlock, fetchEvents, updateEvent }
)(Hub);
