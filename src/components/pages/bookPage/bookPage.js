import React, {Component} from 'react';
import ItemList from '../../itemList/itemList';
import ErrorMessage from '../../errorMessage/errorMessage';
import gotService from '../../../services/gotService';
import {withRouter} from 'react-router-dom';
class BookPage extends Component {
    
    gotService = new gotService();
    
    state = {
        error: false
    }
    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    render () {
        const {error} = this.state;
        if (error) {
            return <ErrorMessage/>
        }
        return (
            <ItemList 
                onItemSelected={ (itemId) => {
                    this.props.history.push(itemId)
                } }
                getData={this.gotService.getAllBooks}
                renderItem={ (item) => item.name }/>    
        )   
    }
}
export default withRouter(BookPage);