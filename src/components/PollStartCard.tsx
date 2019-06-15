import React, {Component} from 'react';
import CardHeader from "./card/CardHeader";
import CardContent from "./card/CardContent";
import Card from "./card/Card";
import uuid from "uuid";
import {Link} from "react-router-dom";

class PollStartCard extends Component {
    render() {

        const linkToPoll = '/poll/' + uuid();

        return (
            <Card>
                <CardHeader>
                    Hlasovanie
                </CardHeader>
                <CardContent>
                    <Link to={linkToPoll}>Spustiť nové hlasovanie</Link>
                </CardContent>
            </Card>
        );
    }
}

export default PollStartCard;