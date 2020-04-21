import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header/header';
import RandomChar from '../randomChar/randomChar';
import CharacterPage from '../characterPage/characterPage';
import ErrorMessage from '../errorMessage/errorMessage';
import ItemList from '../itemList/itemList';
import CharDetails from '../charDetails/charDetails';
import gotService from '../../services/gotService';

import './app.sass';

export default class App extends Component {
    gotService = new gotService();

    state = {
        randomCharVisible: true,
        error: false
    }
    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    onRandomCharToogle = () => {
        this.setState(({randomCharVisible}) => {
            return {
                randomCharVisible: !randomCharVisible
            }
        })
    }
    
    render () {
        const {randomCharVisible, error} = this.state;
        if (error) {
            return <ErrorMessage/>
        }
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
                    <CharacterPage/>
                </Container>
            </>
        )
    }
}