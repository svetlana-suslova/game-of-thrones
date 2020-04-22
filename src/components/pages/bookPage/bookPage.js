import React, {Component} from 'react';
import ItemList from '../../itemList/itemList';
import ItemDetails, {Field} from '../../itemDetails/itemDetails';
import ErrorMessage from '../../errorMessage/errorMessage';
import gotService from '../../../services/gotService';
import RowBlock from '../../rowBlock/rowBlock';

export default class BookPage extends Component {
    gotService = new gotService();
    state = {
        selectedBook : null,
        error: false
    }
    componentDidCatch() {
        this.setState({
            error: true
        })
    }
    onBookSelected = (id) => {
        this.setState({
            selectedBook: id
        })
    }

    render () {
        const {selectedBook, error} = this.state;
        if (error) {
            return <ErrorMessage/>
        }
        const itemList = (
            <ItemList 
                onItemSelected={this.onBookSelected}
                getData={this.gotService.getAllBooks}
                renderItem={ (item) => item.name }/>
        )
        const itemDetails = (
            <ItemDetails 
                itemId={selectedBook}
                itemLabel={"book"}
                getData={ () => this.gotService.getBook(selectedBook) }>
                <Field field='numberOfPages' label='Number of Pages'/>
                <Field field='publisher' label='Publisher'/>
                <Field field='released' label='Released'/>
            </ItemDetails>
        )
        return (
            <RowBlock left={itemList} right={itemDetails}/>    
        )   
    }
}