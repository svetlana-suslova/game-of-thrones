import React, {Component} from 'react';
import {Col, Row} from 'reactstrap';
import ItemDetails, {Field} from '../itemDetails/itemDetails';
import gotService from '../../services/gotService';
import {Link} from 'react-router-dom';

export default class BookItemPage extends Component {
    gotService = new gotService();

    render () {
        return (
            <Row>
                <Col md='2'></Col>
                <Col md='8'>
                    <ItemDetails 
                    itemId={this.props.bookId}
                    itemLabel={""}
                    getData={ () => this.gotService.getBook(this.props.bookId) }>
                        <Field field='numberOfPages' label='Pages'/>
                        <Field field='publisher' label='Publisher'/>
                        <Field field='released' label='Release Year'/>
                    </ItemDetails>
                </Col>
                <Col md='2'>
                    <button 
                        type="button"
                        className="btn main-btn">
                        <Link to='/books/'>back to books</Link>
                    </button>
                </Col>
            </Row>     
        )   
    }
}