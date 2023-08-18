import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Dropdown, Container } from 'react-bootstrap';
import '../App.css'
const Currency = () => {
    const { currency } = useContext(AppContext);
    const { currencyList } = useContext(AppContext);
    const { dispatch } = useContext(AppContext);
    const currentCurrencyObject = currencyList.find(x => { return currency == x.symbol });
    function currencyChanged(event) {
        dispatch({
            type: 'CHG_CURRENCY',
            payload: event
        });
    }

    return (
        <div className='alert alert-secondary' style={{padding:'9px'}}>  
            <Dropdown
                onSelect={currencyChanged}>
            <Dropdown.Toggle
                style={{
                    backgroundColor: '#77e977',
                    color: 'white'
                }}
                id="dropdown-basic">
                Currency ({
                    `${currency} ${currentCurrencyObject.name}`
                })
            </Dropdown.Toggle>
            <Dropdown.Menu style={{
                    backgroundColor: '#77e977'
                }}
            >
            {
                currencyList?.map((value) => {
                    return <Dropdown.Item
                        className='currencyDropdown'
                        key={`${value.symbol} ${value.name}`}
                        eventKey={`${value.symbol}`}>
                            {value.symbol} {value.name}
                        </Dropdown.Item>
                })
            }
            </Dropdown.Menu>
        </Dropdown>
    </div>
    );  
};

export default Currency;