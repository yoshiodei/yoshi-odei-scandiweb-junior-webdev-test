import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateCartObject } from '../Redux/action';
import '../Styles/CartCard/CartCard.styles.css';
import CartCardCarousel from './CartCardCarousel';
import CartPageAttributes from './CartPageAttributes';

class CartCard extends Component {
    constructor(props){
        super(props);
    }

    addToQuantity = (item) => {
        const {id, name} = item;
        const newCartList = this.props.cartObject[name].map(cartItem => (cartItem.id !== id ? cartItem : {...cartItem, quantity: ++cartItem.quantity}) );
        this.props.updateCartObject({updateKey: name, updateItem: newCartList});
    }

    subtractFromQuantity = (item) => {
        const {id, name} = item;

        if(item.quantity > 1) {
            const newCartList = this.props.cartObject[name].map(cartItem => (cartItem.id !== id ? cartItem : {...cartItem, quantity: --cartItem.quantity}) );
            this.props.updateCartObject({updateKey: name, updateItem: newCartList});
        }
        else {
            const newCartList = this.props.cartObject[name].filter( cartItem => cartItem.id !== id );
            this.props.updateCartObject({updateKey: name, updateItem: newCartList});
        }
    }

    render() {
        const {cartItem, currencyLabel} = this.props;
        const price = cartItem.prices?.find(price => price.currency.label === currencyLabel.label)
        const {symbol} = price?.currency
        const displayPrice = price?.amount.toFixed(2);

        return (
            <div className='cart-card'>
                <div className='cart-card__details-div'>
                    <div className='cart-card__left-div'>
                        <div className='cart-card__product-title-div'>
                            <h2 className='cart-card__product-name cart-card__product-name--boldened'>{cartItem.brand}</h2>
                            <h2 className='cart-card__product-name'>{cartItem.name}</h2>
                        </div>

                        <div className='cart-card__price-div'>
                            <p className='cart-card__price'>{`${symbol}${displayPrice}`}</p>
                        </div>

                        {
                        cartItem?.attributes?.map(attribute => (
                            <CartPageAttributes attribute={attribute} selectedAttribute={cartItem.selectedAttribute} />
                        ))    
                        }

                    </div>
                    
                    <div className='cart-card__right-div'>
                        <div className='cart-card__counter-div'>
                            <div className='cart-card__counter-button' onClick={() => this.addToQuantity(cartItem)}>
                                <p className='cart-card__counter-button-text'>+</p>
                            </div>
                            <div className='cart-card__counter-value'>
                                <p className='cart-card__counter-text'>{cartItem.quantity}</p>
                            </div>
                            <div className='cart-card__counter-button' onClick={()=> this.subtractFromQuantity(cartItem)}>
                                <p className='cart-card__counter-button-text' >-</p>
                            </div>
                        </div>

                        <CartCardCarousel gallery={cartItem.gallery} id={cartItem.id}  />

                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { 
        currencyLabel : state.currency,
        cartObject: state.cartObject
    }
}

const mapDispatchToProps = { updateCartObject };

export default connect(mapStateToProps, mapDispatchToProps)(CartCard);
