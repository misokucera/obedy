import React, {Component} from 'react';
import styles from './ShareLink.module.css';
import {MdShare} from "react-icons/md";
import ReactTooltip from "react-tooltip";

class ShareLink extends Component {

    private content: HTMLInputElement | null = null;

    copyToClipboard = () => {
        if (this.content) {
            this.content.select();
            document.execCommand('copy');
        }
    };

    render() {
        return (
            <div className={styles['share']} onFocus={this.copyToClipboard} data-tip="Skopírované!" data-event="click focus">
                <input type="text" value={location.href} ref={content => this.content = content} />
                <i className={styles['icon']}><MdShare/></i>
                <ReactTooltip place="bottom" effect="solid" type="dark" globalEventOff="click" />
            </div>
        );
    }
}

export default ShareLink;