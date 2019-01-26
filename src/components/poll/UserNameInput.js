import React, {Component} from 'react';
import User from "../../lib/User";

class UserNameInput extends Component {
    state = {
        name: ''
    };

    componentDidMount() {
        this.setState({
            name: User.getName() || ''
        });
    }

    handleChange = (event) => {
        const name = event.target.value;

        this.setState({ name }, () => User.setName(name));
    };

    render() {
        return (
            <div>
                <input type="text" placeholder="<meno>" value={this.state.name} onChange={this.handleChange}/>
            </div>
        );
    }
}

export default UserNameInput;
