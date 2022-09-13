import React, { Component } from 'react';
import { GET_ALL_CURRENCY } from '../EndPointQueries/queries';
import { Query } from "@apollo/client/react/components";
import { changeCurrency } from '../Redux/action';
import { connect } from 'react-redux';

class CurrencySwitcher extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        const currencyGroup = document.getElementsByClassName(`navbar__currency-switcher-list-item`);
        this.setState({currencyGroup})
    }

    switchCurrency = (e, currency, index) => {
        for(const currency of this.state.currencyGroup){
            currency.classList.remove('navbar__currency-switcher-list-item--selected');
        }
        e.target.classList.add('navbar__currency-switcher-list-item--selected');

        const currencyObject = {...currency, index}
        this.props.changeCurrency(currencyObject);
        this.props.toggleCurrencySwitcher();
    }

    render() {
        const {toggleCurrencySwitcher} = this.props;

        return (
            <div className='navbar__currency-switcher-div' onClick={()=> toggleCurrencySwitcher()}>
                <ul className='navbar__currency-switcher-list' >
                    <Query query={GET_ALL_CURRENCY}
                        
                    >
                        {({loading, data, error}) => {
                            if(loading) return <div>...Loading</div>
                            if(error) return <div>...Error</div>
                            const {currencies} = data;
                            return (currencies.map((currency,index) => (
                                        <li className={(index === 0) ? 'navbar__currency-switcher-list-item navbar__currency-switcher-list-item--selected' : 'navbar__currency-switcher-list-item'} 
                                            key={index} onClick={(e) => this.switchCurrency(e,currency,index)}>
                                            { `${currency.symbol} ${currency.label}` }
                                        </li>
                                    )))
                            }
                        }
                    </Query>
                </ul>
            </div>
        );
    }
}

const mapDispatchToProps = { changeCurrency }

export default connect(null,mapDispatchToProps)(CurrencySwitcher);
