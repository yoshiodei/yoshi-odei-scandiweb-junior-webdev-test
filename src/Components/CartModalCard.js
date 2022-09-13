import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../Styles/CartModalCard/CartModalCard.styles.css';
import CartModalAttribute from './CartModalAttribute';
import { updateCartObject } from '../Redux/action';

class CartModalCard extends Component {
    constructor(props){
        super(props)
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
        const {item, currencyLabel} = this.props;
        const price = item.prices?.find(item => item.currency.label === currencyLabel.label)
        const displayPrice = price?.amount.toFixed(2);
        
        return (
            <div className='modal-card' key={item.id}>
                <div className='modal-card__details-div'>
                    <div className='modal-card__name-div'>
                        <h3 className='modal-card__name'>{item.brand}</h3>
                        <h3 className='modal-card__name' >{item.name}</h3>
                    </div>

                    <div className='modal-card__price-div'>
                        <h3 className='modal-card__price'>{`${price?.currency?.symbol}${displayPrice}`}</h3>
                    </div>

                    {
                        item?.attributes?.map(attribute => (
                            <CartModalAttribute attribute={attribute} selectedAttribute={item.selectedAttribute} />
                        ))    
                    }
        
                </div>
                <div className='modal-card__item-div'>
                    <div className='modal-card__counter-div'>
                        <div className='modal-card__counter-button' onClick={() => this.addToQuantity(item)}>
                            <p className='modal-card__counter-button-text'>+</p>
                        </div>

                        <div className='modal-card__counter-value'>
                            <p className='modal-card__counter-text'>{item.quantity}</p>
                        </div>

                        <div className='modal-card__counter-button' onClick={()=> this.subtractFromQuantity(item)}>
                            <p className='modal-card__counter-button-text'>-</p>
                        </div>
                    </div>

                    <div className='modal-card__image-div'>
                        <div className='modal-card__image-nav-div'>
                            <img src={item.gallery[0]} className='modal-card__image' alt='product' />
                            <div className='modal-card__image-nav'></div>
                            <div className='modal-card__image-nav'></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { 
        cartObject : state.cartObject,
        currencyLabel : state.currency
    }
}

const mapDispatchToProps = { updateCartObject };

export default connect(mapStateToProps, mapDispatchToProps)(CartModalCard);
