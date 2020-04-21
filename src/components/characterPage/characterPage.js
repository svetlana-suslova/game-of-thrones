import React, {Component} from 'react';
import ItemList from '../itemList/itemList';
import CharDetails, {Field} from '../charDetails/charDetails';
import ErrorMessage from '../errorMessage/errorMessage';
import gotService from '../../services/gotService';
import RowBlock from '../rowBlock/rowBlock';

import './characterPage.sass';

export default class CharacterPage extends Component {
    gotService = new gotService();
    state = {
        selectedChar : null,
        error: false
    }
    componentDidCatch() {
        this.setState({
            error: true
        })
    }
    onCharSelected = (id) => {
        this.setState({
            selectedChar: id
        })
    }

    render () {
        const {selectedChar, error} = this.state;
        if (error) {
            return <ErrorMessage/>
        }
        const itemList = (
            <ItemList 
                onItemSelected={this.onCharSelected}
                getData={this.gotService.getAllCharacters}
                renderItem={ ({name, gender}) => `${name} ${gender}` }/>
        )
        const charDetails = (    
            <CharDetails charId={selectedChar}>
                <Field field='gender' label='Gender'/>
                <Field field='born' label='Born'/>
                <Field field='died' label='Died'/>
                <Field field='culture' label='Culture'/>
            </CharDetails>
        )
        return (
            <RowBlock left={itemList} right={charDetails}/>    
        )   
    }
}