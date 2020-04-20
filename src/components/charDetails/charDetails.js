import React, {Component} from 'react';
import gotService from '../../services/gotService';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';

import './charDetails.sass';
export default class CharDetails extends Component {
    gotService = new gotService();
    state = {
        char: null,
        loading: true,
        error: false
    }

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.onCharLoading();
            this.updateChar();
        } 
    }

    onCharLoading = () => {
        this.setState({
            loading: true
        })
    }

    onError = (err) => {
        this.setState({
            error: true,
            loading: false
        })
    }

    updateChar = () => { 
        const {charId} = this.props;
        if (!charId) {
            return
        }
        this.gotService.getCharacter(charId)
        .then((char) => {
            this.setState({
                char,
                loading: false
            })
        })
        .catch(this.onError);
    }

    render() {
        const { char, loading, error } = this.state;
        if (!char) {
            return <span className="select-error">Please select a character</span>
        }
    
        let spinner = loading ? <Spinner/> : null;
        const errorMessage = error ? <ErrorMessage/> : null;
        const content = !( loading || error ) ? <View char={char}/> : null;
        return (
            <div className="char-details rounded">
                {spinner}
                {errorMessage}
                {content}   
            </div>
        );
                   
    }
}

const View = ({char}) => {
    const { name, gender, born, died, culture } = char;
    return (
        <>
            <h4>{name}</h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Gender</span>
                    <span>{gender}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Born</span>
                    <span>{born}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Died</span>
                    <span>{died}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Culture</span>
                    <span>{culture}</span>
                </li>
            </ul>
            
        </>
    )
}