import React, {Component} from 'react';
import styles from './ShareLink.module.css';
import {MdShare} from "react-icons/md";

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
            <div className={styles['share']} onClick={this.copyToClipboard}>
                <input type="text" value={location.href} ref={content => this.content = content} />
                <i className={styles['icon']}><MdShare/></i>
            </div>
        );
    }
}

export default ShareLink;