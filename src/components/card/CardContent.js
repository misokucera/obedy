import React, {Component} from 'react';
import AnimateHeight from 'react-animate-height';

class CardContent extends Component {

    state = {
        height: 1
    };

    componentDidMount() {
        this.setState({
            height: this.content.scrollHeight
        });
    }

    componentDidUpdate() {
        if (this.state.height !== this.content.scrollHeight) {
            this.setState({
                height: this.content.scrollHeight
            });
        }
    }

    render() {
        return (
            <AnimateHeight duration={500} height={this.state.height}>
                <div ref={content => this.content = content}>
                    {this.props.children}
                </div>
            </AnimateHeight>
        );
    }
}

export default CardContent;
