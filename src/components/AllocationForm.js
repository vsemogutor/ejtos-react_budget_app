import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const AllocationForm = (props) => {
    const { currency, dispatch, remaining  } = useContext(AppContext);

    const [name, setName] = useState('');
    const [cost, setCost] = useState('');
    const [action, setAction] = useState('');

    const submitEvent = () => {

        if(cost > remaining) {
            alert(`The value cannot exceed remaining funds  ${currency}${remaining}`);
            setCost('');
            return;
        }

        const expense = {
            name: name,
            cost: parseInt(cost),
        };
        if(action === "Reduce") {
            dispatch({
                type: 'RED_EXPENSE',
                payload: expense,
            });
        } else {
            dispatch({
                type: 'ADD_EXPENSE',
                payload: expense,
            });
        }

        setCost('');
    };

    function setCostValidated(event) {
        if(parseInt(event.target.value) < 0) {
            event.preventDefault();
            alert('Budget shouldn\'t be negative. Use reduce option to reduce amount.');
            setCost('');
        } else if(parseInt(event.target.value) === 0) {
            event.preventDefault();
            alert('Zero budget makes no sense.');
            setCost('');
        }
        else {
            setCost(event.target.value);
        }
    }

    return (
        <div>
            <div className='row'>
                <div className="input-group mb-3" style={{ marginLeft: '2rem' }}>
                    <div className="input-group-prepend">
                        <label className="input-group-text" htmlFor="inputGroupSelect01">Department</label>
                    </div>
                    <select className="custom-select" id="inputGroupSelect01" onChange={(event) => setName(event.target.value)}>
                        <option defaultValue>Choose...</option>
                        <option value="Marketing" name="marketing"> Marketing</option>
                        <option value="Sales" name="sales">Sales</option>
                        <option value="Finance" name="finance">Finance</option>
                        <option value="HR" name="hr">HR</option>
                        <option value="IT" name="it">IT</option>
                        <option value="Admin" name="admin">Admin</option>
                    </select>
                    <div className="input-group-prepend" style={{ marginLeft: '2rem' }}>
                        <label className="input-group-text" htmlFor="inputGroupSelect02">Allocation</label>
                    </div>
                    <select className="custom-select" id="inputGroupSelect02" onChange={(event) => setAction(event.target.value)}>
                        <option defaultValue value="Add" name="Add">Add</option>
                        <option value="Reduce" name="Reduce">Reduce</option>
                    </select>
                    <label htmlFor="allocation" style={{ marginLeft: '5px'}}>
                        {currency}
                    </label>
                    <input
                        required='required'
                        name='allocation'
                        type='number'
                        pattern='[0-9\.]*'
                        id='cost'
                        value={cost}
                        style={{ marginLeft: '5px' , size: 10}}
                        onChange={(event) => setCostValidated(event)}>
                    </input>
                    <button className="btn btn-primary" onClick={submitEvent} style={{ marginLeft: '2rem' }}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AllocationForm;