import React, {Component} from 'react';
import {Col, Row} from 'reactstrap';
import ItemList from '../itemList/itemList';
import CharDetails from '../charDetails/charDetails';
import ErrorMessage from '../errorMessage/errorMessage';

import './characterPage.sass';

export default class CharacterPage extends Component {
    state = {
        selectedChar : null,
        error: false
    }
    componentDidCatch() {
        this.setState({
            error: true
        })
    }
    onCharSelected = (id) => {
        this.setState({
            selectedChar: id
        })
    }

    render () {
        const {selectedChar, error} = this.state;
        if (error) {
            return <ErrorMessage/>
        }
        return (
            <Row>
                <Col md='6'>
                    <ItemList onCharSelected={this.onCharSelected}/>
                </Col>
                <Col md='6'>
                    <CharDetails charId={selectedChar}/>
                </Col>
            </Row>
        )   
    }
}