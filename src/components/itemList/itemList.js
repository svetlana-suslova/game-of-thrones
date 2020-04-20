import React, {Component} from 'react';
import gotService from '../../services/gotService';
import Spinner from '../spinner/spinner';

import './itemList.sass';
import ErrorMessage from '../errorMessage/errorMessage';
export default class ItemList extends Component {
    gotService = new gotService();

    state = {
        charList: null,
        loading: true,
        error: false
    }
    componentDidMount() {
        this.gotService.getAllCharacters()
            .then((charList) => {
                this.setState({
                    charList
                })
            })
            .catch(this.onError);
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    renderItems(arr) {
        return arr.map((item) => {
            const {id} = item;
            return (
                <li 
                    key={id} 
                    className="list-group-item"
                    onClick={ () => this.props.onCharSelected(id) }>
                    {item.name}
                </li>
            )
        })
    }

    render() {
        const {charList, loading, error} = this.state;

        if (!charList && loading) {
            return <Spinner/>
        }
        if (error) {
            return <ErrorMessage/>
        }

        const items = this.renderItems(charList);

        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        );
    }
}