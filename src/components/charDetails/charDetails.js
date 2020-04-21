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
        const content = !( loading || error ) ? <View 
                                                    char={char} 
                                                    fields={
                                                        React.Children.map(this.props.children, (child) => {
                                                            return React.cloneElement(child, {char})
                                                        })
                                                    }
                                                /> : null;
        return (
            <div className="char-details rounded">
                {spinner}
                {errorMessage}
                {content}   
            </div>
        );                
    }
}
const Field = ({char, field, label}) =>{
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{char[field]}</span>
        </li>
    )
}
export {Field};

const View = ({char, fields}) => {
    const {name} = char;
    return (
        <>
            <h4>{name}</h4>
            <ul className="list-group list-group-flush">
                {fields}
            </ul>   
        </>
    )
}

