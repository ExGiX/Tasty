import { Pie } from 'react-chartjs-2';
import './Tables.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as tablesService from '../../../services/tablesService';
import { useEffect, useState } from 'react';
import { loader } from '../../../store/loader';
import { showAlert } from '../../../store/alert-slice';
import { Fragment } from 'react';
import { Table } from './Table/Table'
import { useAppSelector } from '../../../store/index';

const Tables = () => {

    const dispatch = useDispatch();
    const authState = useAppSelector(state => state.auth);

    const [tables, setTables] = useState([]);
    const [modal, setModal] = useState(false);

    useEffect(() => {
        dispatch(loader());
        tablesService.getTables()
            .then(res => {
                dispatch(loader());
                setTables(res);
            })
            .catch(error => {
                dispatch(loader());
                dispatch(showAlert(error));
                console.log(error);
            })
    }, []);


    const deleteTable = (id) => {
        dispatch(loader());
        tablesService.deleteTable(id)
            .then(res => {
                dispatch(loader());
                setTables(res);
            })
            .catch(error => {
                dispatch(loader());
            })
    }


    return (
        <section className="admin-page-manage-tables-wrapper">
            <section className="admin-page-manage-tables">
                <h1>Manage tables</h1>
                {authState.userAuthState.isAdmin ? <div className="admin-page-buttons-wrapper">
                    <Link to="/admin-panel/tables/create">
                        <button className="add-table-button">Add table</button>
                    </Link>
                </div> : ""}

                <table>
                    <thead>
                        <tr>
                            <th>Table name</th>
                            <th>Table capacity</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tables.length > 0 ? tables.map(x => {
                            return <Table key={x._id} data={x} id={x._id} deleteTable={deleteTable} />
                        }) : ""}
                    </tbody>
                </table>
            </section>
        </section>
    )
}

export default Tables;