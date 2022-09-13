import { 
    UPDATE_CART_LIST,
    UPDATE_CART_OBJECT,
    CHANGE_CURRENCY, 
    ADD_TO_CART, 
    RESTORE_CART_OBJECT,
    CHANGE_CATEGORY 
} from './action.type';

const initialState = {
    category: 'all',
    cartObject: {},
    currency: {label: 'USD', symbol: '$', index: 0}
}


const reducer = (state = initialState , action) => {
    switch(action.type){
        case ADD_TO_CART:   const itemObject = {...state.cartObject};
                            const {addKey, addItem} = action.payload;
                            
                            if(!itemObject[addKey]){
                                itemObject[addKey] = [addItem];
                            } else{
                                itemObject[addKey].push(addItem);
                            }

                            window.sessionStorage.setItem('cartObject', JSON.stringify(itemObject));
                            return {...state, cartObject: itemObject};

        case CHANGE_CURRENCY:   const currency = action.payload;
                                window.sessionStorage.setItem('currency', JSON.stringify(currency));
                                return {...state, currency};
                                
        case UPDATE_CART_LIST:  const updatedItemArray = action.payload;
                                window.sessionStorage.setItem('cartItem', JSON.stringify(updatedItemArray));
                                return {...state, cartItems: action.payload};

        case UPDATE_CART_OBJECT:  const updateObject = {...state.cartObject};
                                  const {updateKey, updateItem} = action.payload;

                                  updateObject[updateKey] = updateItem;

                                  window.sessionStorage.setItem('cartObject', JSON.stringify(updateObject));
                                  return {...state, cartObject: updateObject}; 
                                 
        case RESTORE_CART_OBJECT: return { ...state, cartObject: action.payload };
                                
        case CHANGE_CATEGORY:   return {...state, category: action.payload}                      
                    
        default: return state; 
    }
}

export default reducer;