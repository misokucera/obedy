import React, {Component} from 'react';
import AnimateHeight from 'react-animate-height';

type State = {
    height: number
}

class CardContent extends Component<{}, State> {

    private content: HTMLDivElement | null = null;

    state = {
        height: 1
    };

    componentDidMount() {
        if (this.content) {
            this.setState({
                height: this.content.scrollHeight
            });
        }
    }

    componentDidUpdate() {
        if (this.content && this.state.height !== this.content.scrollHeight) {
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
