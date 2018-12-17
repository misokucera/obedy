import React, {Component} from 'react';
import styles from "./TextPlaceholder.module.css";

const maxLines = 3;
const minLines = 3;
const maxWidth = 60;
const minWidth = 20;

class TextPlaceholder extends Component {

    randomInt(min, max) {
        return Math.floor(Math.random() * Math.floor(max - min + 1)) + min;
    }

    render() {
        const linesCount = this.randomInt(minLines, maxLines);

        const lines = [...Array(linesCount)].map((line, index) => {
            const width = this.randomInt(minWidth, maxWidth) + "%";
            return <div key={index} className={styles['line']} style={{ width }} />;
        });

        return (
            <div>{lines}</div>
        );
    }
}

export default TextPlaceholder;
