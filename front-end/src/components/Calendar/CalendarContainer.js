import React, {Component} from 'react';
import MonthlyCalendar from "./MonthlyCalendar";
import DailyCalendar from "./DailyCalendar";
import styled from 'styled-components';

const CalendarElement = styled.div`
`;

const Button = styled.div`
    cursor: pointer;
    height: 15px;
`;
class CalendarContainer extends Component {
    constructor(props) {
        super(props);

        this.toggleView = this.toggleView.bind(this);
        this.state = {
            view: 'daily'
        }
    }

    toggleView(view) {
        this.setState({view: view})
    }
    render() {
        return (
            <div className="calendar-container">
                <div className="top-header">
                    <span>Calendar</span>
                    <div className="view-change">
                        <Button onClick={() => this.toggleView("monthly")} className="icon view-toggle">calendar_today</Button>
                        <Button onClick={() => this.toggleView("daily")} className="icon view-toggle">date_range</Button>
                    </div>
                </div>
                <CalendarElement>
                    {this.state.view == "monthly" && <MonthlyCalendar fetchEvents={this.props.fetchEvents} updateEvent={this.props.updateEvent} events={this.props.events} updateBlock={this.props.updateBlock} treeData={this.props.treeData} />}
                    {this.state.view == "daily" && <DailyCalendar fetchEvents={this.props.fetchEvents} updateEvent={this.props.updateEvent} events={this.props.events}  updateBlock={this.props.updateBlock} treeData={this.props.treeData} />}
                </CalendarElement>
            </div>
        )
    }
}

export default CalendarContainer;
