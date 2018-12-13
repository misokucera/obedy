import React, {Component} from 'react';
import moment from "moment/moment";

class DateTime extends Component {

    format(timestamp) {
        return timestamp ? moment(timestamp).format('D.M.Y HH:mm:ss') : '';
    }

    render() {
        const dateTime = this.format(this.props.timestamp);

        return (
            <span className={this.props.class}>
                {dateTime ? 'Aktualizované v ' + dateTime : "…"}
            </span>
        );
    }
}

export default DateTime;
