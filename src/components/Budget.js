import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Budget = () => {
    const { budget } = useContext(AppContext);
    const { dispatch } = useContext(AppContext);
    const { expenses } = useContext(AppContext);
    const { currency } = useContext(AppContext);
    const MAX_VALUE = 20000;
    const totalExpenses = expenses.reduce((total, item) => {
        return (total += item.cost);
    }, 0);

    const updateBudget = (value) => {
        if(value > MAX_VALUE) {
            alert(`The value cannot exceed ${MAX_VALUE}`);
            return;
        }

        if(value < totalExpenses) {
            alert('You cannot reduce budget value lower than the spending');
            return;
        }

        dispatch({
            type: 'SET_BUDGET',
            payload: value
        });
    };

    return (
        <div className='alert alert-secondary'>
            <span style={{whiteSpace: 'nowrap'}}>Budget: {currency}<input
                    required='required'
                    type='number'
                    pattern="[0-9\.]*"
                    id='cost'
                    step='10'
                    value={budget}
                    style={{ marginLeft: '2rem' , size: 10}}
                    onChange={(event) => {updateBudget(event.target.value)}}>
                </input>
            </span>
        </div>
    );
};
export default Budget;