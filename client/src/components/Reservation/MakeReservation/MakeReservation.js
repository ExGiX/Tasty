import './MakeReservation.css';
import { Link } from 'react-router-dom';
import { Fragment } from 'react';
import * as reservationService from '../../../services/reservationService';
import { useDispatch } from 'react-redux';
import { loader } from '../../../store/loader';
import { useState } from 'react';



const MakeReservation = ({ onInputChangeHandler, formData }) => {

    const dispatch = useDispatch();

    const [freeTables, setFreeTables] = useState([]);
    const [isFreeTablesFound, setFoundFreeTable] = useState(true);

    function getFreeTables() {
        dispatch(loader());
        reservationService.getFreeTables()
            .then(res => {
                dispatch(loader());
                setFreeTables(res)
                if(!res.length) { 
                    setFoundFreeTable(false);
                }
            })
            .catch(error => {
                dispatch(loader());
                console.log(error);
            })
    }


    const isFindTableValid = formData.people !== '' && formData.date !== '' && formData.time !== '';

    return (
        <Fragment>
            <article className="reservation-select-menu">

                <select className="reservation-select" name="people" onChange={onInputChangeHandler}>
                    <option>1 person</option>
                    <option>2 people</option>
                    <option>3 people</option>
                </select>

                <input type="date" className="reservation-date" name="date" onChange={onInputChangeHandler} />

                <select className="reservation-select" name="time" onChange={onInputChangeHandler} defaultValue={formData.time}>
                    <option>7 pm</option>
                    <option>8 pm </option>
                    <option>9 pm</option>
                </select>


                <button className="find-table-btn" onClick={getFreeTables} disabled={!isFindTableValid}>Find table</button>
            </article>

            <article className="reservation-free-tables">
                {freeTables.map(x => {
                    return <Link key={x._id} to={`details?table=${x.name}`} >
                        <button className="free-reservation-btn">{x.name}</button>
                    </Link>
                })}
                {!isFreeTablesFound ? <h1>There's no free tables yet!</h1> : ""}
                

            </article>
        </Fragment>
    )
}

export default MakeReservation;