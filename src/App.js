import React, {Component} from 'react';
import Board from "./Board";
import {BrowserRouter as Router, Route} from "react-router-dom";


class App extends Component {

    render() {
        return (
            <Router>
                <div>
                    <Route path="/" component={Board}/>
                </div>
            </Router>
        );
    }
}

export default App;
