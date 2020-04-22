import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header/header';
import RandomChar from '../randomChar/randomChar';
import CharacterPage from '../pages/characterPage/characterPage';
import HousePage from '../pages/housePage/housePage';
import BookPage from '../pages/bookPage/bookPage';
import ErrorMessage from '../errorMessage/errorMessage';

import './app.sass';

export default class App extends Component {

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
                    <HousePage/>
                    <BookPage/>
                </Container>
            </>
        )
    }
}