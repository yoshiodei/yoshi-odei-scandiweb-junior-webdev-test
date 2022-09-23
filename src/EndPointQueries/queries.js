import { gql } from "@apollo/client";

export const GET_ALL_PRODUCTS = gql`
query  {
  category {
    name
    products {
      id, name, inStock, gallery,brand
      attributes {id, name, type, items { displayValue, value, id } }
      prices {
        amount,
        currency { label, symbol } 
      }
    }
  }
}
`
export const GET_PRODUCT_DETAIL = gql`
query ($product_id: String!){
	product(id: $product_id){
    id
    name
    inStock
    gallery
    description
    brand
    prices { amount, currency{ label, symbol } }
    attributes {id, name, type, items{ displayValue, value, id}}
  }
}
`
export const GET_ALL_CURRENCY = gql`
query {
	currencies {
    label
    symbol
  }
}
`
export const GET_CATEGORIES = gql`
query {
	categories {
    name
  }
}
`
export const GET_PRODUCTS = gql`
query($categoryName: String!) {
  category(input: { title: $categoryName}){
   name 
   products {
    	id
    	name
      inStock
      gallery
      brand
      prices { currency {label, symbol}, amount }
      attributes {id, name, type, items { displayValue, value, id } }
  }
  }
}
`
