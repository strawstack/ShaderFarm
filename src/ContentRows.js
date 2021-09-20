import React from 'react';
import styles from './ContentRows.module.css';
import { shaderlist } from './shaderlist.js';
import ContentRow from './ContentRow.js';
import * as THREE from 'three';

class ContentRows extends React.Component {
    constructor(props) {
        super(props);
        this.state = { counter: 0 };
    }

    render() {
        const shaderElements = shaderlist.map((data, index) => {
            return <ContentRow key={index} name={data.name} vert={data.vert} frag={data.frag} three={THREE} />
        });
        return (
            <div className={styles.ContentRows}>
                { shaderElements }
            </div>
        );
    }
}

export default ContentRows;