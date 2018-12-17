import React, {Component} from 'react';
import AnimateHeight from 'react-animate-height';

class CardContent extends Component {

    state = {
        height: 1
    };

    componentDidMount() {
        this.setState({
            height: this.placeholder.scrollHeight
        });
    }

    componentDidUpdate() {
        if (this.state.height !== this.placeholder.scrollHeight) {
            this.setState({
                height: this.placeholder.scrollHeight
            });
        }
    }

    render() {
        return (
            <AnimateHeight duration={500} height={this.state.height}>
                <div ref={placeholder => this.placeholder = placeholder}>
                    {this.props.ready
                        ? this.props.children
                        : this.props.placeholder
                    }
                </div>
            </AnimateHeight>
        );
    }
}

export default CardContent;
