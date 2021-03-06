import './EditReservation.css';
import { useDispatch } from 'react-redux';
import { loader } from '../../../../store/loader';
import * as reservationService from '../../../../services/reservationService';
import { useEffect, useState } from 'react';
import { showAlert } from '../../../../store/alert-slice';

const EditReservation = ({ match, history }) => {

    const dispatch = useDispatch();

    const [reservation, setReservation] = useState({});

    const [errors, setErrors] = useState({
        firstName: false,
        lastName: false,
        people: false,
        time: false,
        date: false,
    })

    const [fields, setFields] = useState({
        firstName: '',
        lastName: '',
        people: '',
        time: '',
        date: '',
    })



    useEffect(() => {
        dispatch(loader());
        reservationService.getReservationByID(match.params.id)
            .then(res => {
                dispatch(loader());
                setReservation(res);
                setFields((state) => ({ ...state, firstName: res.firstName, lastName: res.lastName, date: res.date, people: `${res.people} people`, time: res.time }))
            })
            .catch(error => {
                dispatch(loader());
            })

    }, [])


    function onInputChangeHandler(e) {
        const { name, value } = e.target;
        setErrors(state => ({ ...state, [name]: value === "" ? true : false }));
        setFields(state => ({ ...state, [name]: value }));
    }

    const isFormValid = Object.values(errors).some(x => x === true);



    function updateReservation(e) {
        e.preventDefault();
        const formData = {
            people: Number(e.target.people.value.split(' ')[0]),
            date: e.target.date.value,
            time: e.target.time.value,
            firstName: e.target.firstName.value,
            lastName: e.target.lastName.value,
        }


        dispatch(loader());
        reservationService.updateReservation(match.params.id, formData)
            .then(res => {
                dispatch(loader());
                history.push('/admin-panel/reservations')
            })
            .catch(error => {
                dispatch(loader());
                dispatch(showAlert(error));
            })

    }

    return (
        <section className="admin-panel-manage-reservations-wrapper">
            <article className="admin-panel-manage-reservations-form-wrapper">
                <form onSubmit={updateReservation}>
                    <label>
                        First name
                        <input type="text" name="firstName" defaultValue={reservation.firstName} onChange={onInputChangeHandler} />
                        <div className="form-error-message">
                            {errors.firstName ? <small>Required!</small> : ""}
                        </div>
                    </label>
                    <label>
                        Last name
                        <input type="text" name="lastName" defaultValue={reservation.lastName} onChange={onInputChangeHandler} />
                        <div className="form-error-message">
                            {errors.lastName ? <small>Required!</small> : ""}
                        </div>
                    </label>
                    <label>
                        Date
                        <input type="date" name="date" defaultValue={reservation.date} onChange={onInputChangeHandler} />
                        <div className="form-error-message">
                            {errors.date ? <small>Required!</small> : ""}
                        </div>
                    </label>
                    <label>
                        People
                        <select name="people" defaultValue={reservation.people} onChange={onInputChangeHandler}>
                            <option>1 person</option>
                            <option>2 people</option>
                            <option>3 people</option>
                        </select>
                        <div className="form-error-message">
                            {errors.people ? <small>Required!</small> : ""}
                        </div>
                    </label>
                    <label>
                        Time
                        <select name="time" defaultValue={reservation.time} onChange={onInputChangeHandler}>
                            <option>7 pm</option>
                            <option>8 pm</option>
                            <option>9 pm</option>
                        </select>
                        <div className="form-error-message">
                            {errors.time ? <small>Required!</small> : ""}
                        </div>
                    </label>
                    <button className="edit-reservation-button" disabled={isFormValid}>Edit reservation</button>
                </form>
            </article>
        </section>
    )
}


export default EditReservation;