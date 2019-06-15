import React, {Component} from 'react';
import CardHeader from "./card/CardHeader";
import CardContent from "./card/CardContent";
import Card from "./card/Card";
import uuid from "uuid";
import {Link} from "react-router-dom";
import Button from "./ui/Button";

class PollStartCard extends Component {
    render() {

        const linkToPoll = '/poll/' + uuid();

        return (
            <Card>
                <CardHeader>
                    <h2>Hlasovanie</h2>
                </CardHeader>
                <CardContent>
                    <Link to={linkToPoll}>
                        <Button>Spustiť nové hlasovanie</Button>
                    </Link>
                </CardContent>
            </Card>
        );
    }
}

export default PollStartCard;