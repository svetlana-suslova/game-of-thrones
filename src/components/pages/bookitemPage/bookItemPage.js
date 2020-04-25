import React, {Component} from 'react';
import ItemDetails, {Field} from '../../itemDetails/itemDetails';
import gotService from '../../../services/gotService';

export default class BookPage extends Component {
    gotService = new gotService();

    render () {
        return (
            <ItemDetails 
                itemId={this.props.bookId}
                itemLabel={"book"}
                getData={ () => this.gotService.getBook(this.props.bookId) }>
                <Field field='numberOfPages' label='Pages'/>
                <Field field='publisher' label='Publisher'/>
                <Field field='released' label='Release Year'/>
            </ItemDetails>  
        )   
    }
}