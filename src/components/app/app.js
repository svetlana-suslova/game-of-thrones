import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header/header';
import RandomChar from '../randomChar/randomChar';
import ItemList from '../itemList/itemList';
import CharDetails from '../charDetails/charDetails';

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
        return (
            <> 
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            <RandomChar randomCharVisible={randomCharVisible} 
                            onRandomCharToogle={this.onRandomCharToogle}/>
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