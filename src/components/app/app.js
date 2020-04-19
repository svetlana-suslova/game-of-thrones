import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header/header';
import RandomChar from '../randomChar/randomChar';
import ItemList from '../itemList/itemList';
import CharDetails from '../charDetails/charDetails';

import './app.sass';

export default class App extends Component {
    state = {
        randomCharVisible: true
    }

    onRandomCharToogle = () => {
        this.setState(({randomCharVisible}) => {
            return {
                randomCharVisible: !randomCharVisible
            }
        })
    }
    
    render () {
        const {randomCharVisible} = this.state;
        let buttonText = "Hide Random Character";
        if (!randomCharVisible) {
            buttonText = "Show Random Character";
        }
        const char = randomCharVisible ? <RandomChar/> : null;
        
        return (
            <> 
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 5, offset: 0}} className="random-char-block">
                        <button 
                            type="button"
                            className="btn random-char-btn"
                            onClick={this.onRandomCharToogle}>{buttonText}
                        </button>
                        {char}
                        </Col>
                    </Row>
                    <Row>
                        <Col md='6'>
                            <ItemList />
                        </Col>
                        <Col md='6'>
                            <CharDetails />
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}