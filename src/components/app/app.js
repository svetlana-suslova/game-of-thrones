import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header/header';
import RandomChar from '../randomChar/randomChar';
import CharacterPage from '../pages/characterPage/characterPage';
import HousePage from '../pages/housePage/housePage';
import BookPage from '../pages/bookPage/bookPage';
import BookItemPage from '../pages/bookitemPage/bookItemPage';
import ErrorMessage from '../errorMessage/errorMessage';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import './app.sass';

export default class App extends Component {

    state = {
        randomCharVisible: false,
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
            <Router>
                <> 
                    <Container>
                        <Header />
                    </Container>
                    <Container>
                        <Row>
                            <Col lg={{size: 5, offset: 0}} className="random-char-block">
                            <button 
                                type="button"
                                className="btn main-btn"
                                onClick={this.onRandomCharToogle}>{buttonText}
                            </button>
                            {char}
                            </Col>
                        </Row>
                        <Route path='/characters' component={CharacterPage}/>
                        <Route path='/houses' component={HousePage}/>
                        <Route path='/books' exact component={BookPage}/>
                        <Route path='/books/:id' render={
                            ({match}) => {
                                const {id} = match.params;
                            return <BookItemPage bookId={id} />}
                        }/>
                    </Container>
                </>
            </Router>
        )
    }
}