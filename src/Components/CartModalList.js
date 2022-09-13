import React, { Component } from 'react';
import { connect } from 'react-redux';

class CartModalList extends Component {
    constructor(props){
        super(props);

    } 

    render() {
        const {cartObject} = this.props; 
        let newCartList = [];
        for(let key in cartObject){
           newCartList = [ ...newCartList , ...cartObject[key]];    
        }

        return (
            <>
                {
                    newCartList.map((item,index) => (
                        <li key={index} >{item.id} - {item.quantity}</li>   
                    ))
                }
            </>
        ) 

    }
}

const mapStateToProps = (state) => {
    return { 
        cartObject: state.cartObject
     }
} 

export default connect(mapStateToProps)(CartModalList);
