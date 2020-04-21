import React, {Component} from 'react';
import Spinner from '../spinner/spinner';

import './itemList.sass';
import ErrorMessage from '../errorMessage/errorMessage';
export default class ItemList extends Component {
    state = {
        itemList: null,
        loading: true,
        error: false
    }
    componentDidMount() {
        const {getData} = this.props;
        getData()
            .then((itemList) => {
                this.setState({
                    itemList
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
            const label = this.props.renderItem(item);
            return (
                <li 
                    key={id} 
                    className="list-group-item"
                    onClick={ () => this.props.onItemSelected(id) }>
                    {label}
                </li>
            )
        })
    }

    render() {
        const {itemList, loading, error} = this.state;

        if (!itemList && loading) {
            return <Spinner/>
        }
        if (error) {
            return <ErrorMessage/>
        }

        const items = this.renderItems(itemList);

        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        );
    }
}