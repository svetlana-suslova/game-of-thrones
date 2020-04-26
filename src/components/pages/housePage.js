import React, {Component} from 'react';
import ItemList from '../itemList/itemList';
import ItemDetails, {Field} from '../itemDetails/itemDetails';
import ErrorMessage from '../errorMessage/errorMessage';
import gotService from '../../services/gotService';
import RowBlock from '../rowBlock/rowBlock';

export default class HousePage extends Component {
    gotService = new gotService();
    state = {
        selectedHouse : null,
        error: false
    }
    componentDidCatch() {
        this.setState({
            error: true
        })
    }
    onHouseSelected = (id) => {
        this.setState({
            selectedHouse: id
        })
    }

    render () {
        const {selectedHouse, error} = this.state;
        if (error) {
            return <ErrorMessage/>
        }
        const itemList = (
            <ItemList 
                onItemSelected={this.onHouseSelected}
                getData={this.gotService.getAllHouses}
                renderItem={ (item) => item.name }/>
        )
        const itemDetails = (
            <ItemDetails 
                itemId={selectedHouse}
                itemLabel={"Please select a house"}
                getData={ () => this.gotService.getHouse(selectedHouse) }>
                <Field field='region' label='Region'/>
                <Field field='words' label='Words'/>
                <Field field='coatOfArms' label='Coat of Arms'/>
            </ItemDetails>
        )
        return (
            <RowBlock left={itemList} right={itemDetails}/>    
        )   
    }
}