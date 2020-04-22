import React, {Component} from 'react';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';

import './itemDetails.sass';

export default class ItemDetails extends Component {
    state = {
        item: null,
        loading: true,
        error: false
    }

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId) {
            this.onItemLoading();
            this.updateItem();
        } 
    }

    onItemLoading = () => {
        this.setState({
            loading: true
        })
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    updateItem = () => { 
        const {itemId, getData} = this.props;
        if (!itemId) {
            return
        }
        getData(itemId)
        .then((item) => {
            this.setState({
                item,
                loading: false
            })
        })
        .catch(this.onError);
    }

    render() {
        const { item, loading, error } = this.state;
        const {itemLabel} = this.props;
        if (!item) {
            return <span className="select-error">{`Please select a ${itemLabel}`}</span>
        }
    
        let spinner = loading ? <Spinner/> : null;
        const errorMessage = error ? <ErrorMessage/> : null;
        const content = !( loading || error ) ? <View 
                                                    item={item} 
                                                    fields={
                                                        React.Children.map(this.props.children, (child) => {
                                                            return React.cloneElement(child, {item})
                                                        })
                                                    }
                                                /> : null;
        return (
            <div className="item-details rounded">
                {spinner}
                {errorMessage}
                {content}   
            </div>
        );                
    }
}
const Field = ({item, field, label}) =>{
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    )
}
export {Field};

const View = ({item, fields}) => {
    const {name} = item;
    return (
        <>
            <h4>{name}</h4>
            <ul className="list-group list-group-flush">
                {fields}
            </ul>   
        </>
    )
}

