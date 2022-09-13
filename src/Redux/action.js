import { 
    UPDATE_CART_LIST,
    UPDATE_CART_OBJECT,
    CHANGE_CURRENCY, 
    ADD_TO_CART,
    CHANGE_CATEGORY,
    RESTORE_CART_OBJECT
} from './action.type';

export const addToCart = (cartItemObject) => {
   return{ 
    type: ADD_TO_CART,
    payload: cartItemObject
    }
}

export const changeCurrency = (currencyLabel) => {
    return {
        type: CHANGE_CURRENCY,
        payload: currencyLabel
    }
}

export const updateCartList = (updatedCartList) => {
    return {
        type: UPDATE_CART_LIST,
        payload: updatedCartList
    }
}
             
export const updateCartObject = (updatedCartObject) => {
    return {
        type: UPDATE_CART_OBJECT,
        payload: updatedCartObject
    }
}

export const changeCategory = (categoryName) => {
  return {
    type: CHANGE_CATEGORY,
    payload: categoryName
  }
}

export const restoreCartObject = (cartObject) => {
  return {
    type: RESTORE_CART_OBJECT,
    payload: cartObject
  }
}