import React, { Component } from 'react';
import CartCard from '../Components/CartCard';
import CartTotal from '../Components/CartTotal';
import { connect } from 'react-redux';
import '../Styles/Cart/Cart.styles.css';

class CartPage extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        document.title = 'Junior Developer Test | Cart';
    }

    render() {
        const {currencyLabel, cartObject} = this.props;

        let newCartList = [];
        for(let key in cartObject){
           newCartList = [ ...newCartList , ...cartObject[key]];    
        }

        return (
            <div className='cart'>
                <h1 className='cart__header'>CART</h1>
                <section className='cart-section'>
                    {
                        newCartList.map(cartItem => (
                            <CartCard cartItem={cartItem} currencyLabel={currencyLabel}/>
                        ))   
                    }
                    
                    <CartTotal cartList={newCartList} />
                </section>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { 
        currencyLabel : state.currency,
        cartObject : state.cartObject 
    }
}

export default connect(mapStateToProps)(CartPage);
