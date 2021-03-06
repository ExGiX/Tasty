import './ManageTables.css';
import AddProductToTable from './AddProductToTable/AddProductToTable';
import { useEffect, useState } from 'react/cjs/react.development';
import { Fragment } from 'react';
import * as tablesService from '../../../../services/tablesService';
import { useDispatch } from 'react-redux';
import { loader } from '../../../../store/loader';
import { showAlert } from '../../../../store/alert-slice';
import * as menuService from '../../../../services/menuService';


const ManageTables = ({ history, match }) => {

    const dispatch = useDispatch();
    const [tableDetails, setTableDetails] = useState([]);
    const [productsCategory, setProductsCategory] = useState([]);
    const [reserved, setReserved] = useState(false);
    const [product, setProductToTable] = useState([]);
    const [changeTableStatus, setChangeTableStatus] = useState(false);


    useEffect(() => {
        dispatch(loader());
        tablesService.getTableByID(match.params.tableID)
            .then(res => {
                dispatch(loader());
                setTableDetails(res);
            })
            .catch(error => {
                dispatch(loader());
                console.log(error);
            })


        dispatch(loader());
        menuService.getAllProducts()
            .then(res => {
                dispatch(loader());
                res.map(x => {
                    setProductsCategory((state) => !state.includes(x.category) ? [...state, x.category] : [...state]);
                })

            })
            .catch(error => {
                dispatch(loader());
                console.log(error);
            })

    }, [])



    function reservedFunction(e) {
        if (e.target.value === "Reserved") {
            setReserved(true);
        } else {
            setReserved(false);
        }
    }
    function addProduct() {
        setProductToTable(oldState => [...oldState, <AddProductToTable productsCategory={productsCategory ? productsCategory : ""}  />]);
    }

   

    function goBack() {
        return history.goBack();
    }

    function showChangeTableStatus() { 
        setChangeTableStatus((state) => !state)
    }


    const manageTable = (e) => {
        e.preventDefault();
        let products = [];

        if (product.length === 1) {
            products.push({ productName: e.target.productName.value, quantity: Number(e.target.productQuantity.value) });
        } else {

            products = Array.from(e.target.productName).map(x => {
                return { productName: x.value };
            })
            Array.from(e.target.productQuantity).map((x, i) => {
                products[i].quantity = Number(x.value);
            })

        }
        const tableStatus = e.target.tableStatus?.value || "";

        dispatch(loader());
        tablesService.addProduct(match.params.tableID, products, tableStatus)
            .then(res => {
                dispatch(loader());
                history.push('/admin-panel/tables');
            })
            .catch(error => {
                dispatch(loader());
                dispatch(showAlert(error));
                console.log(error);
            })


    }

    

    return (
        <section className="admin-page-manage-table-wrapper">
            <h1>Managing table {tableDetails.name}</h1>
            <div className="admin-page-add-product-button-wrapper">
                <p>Add product to table</p>

                <button className="manage-table-add-product-button" onClick={addProduct} disabled={productsCategory.length ? false : true} >Add product</button>
                <button className="manage-table-add-product-button" onClick={showChangeTableStatus} >Cahnge table status</button>
            </div>
            <div className="admin-page-manage-table-titles">
                <h3>Category</h3>
                <h3>Product</h3>
                <h3>Quantity</h3>
            </div>
            <form onSubmit={manageTable}>
                {product.length >= 1 ? product.map((x, i) => {

                    return <Fragment key={i}>{x}</Fragment>

                }) : <div className="no-products-message">
                    <h1>There's no products yet!</h1>
                    <p>Click add product button to add product</p>
                </div>}
                {changeTableStatus ? <article className="change-table-status">
                    <p>Change table status</p>
                    <select name="tableStatus" onChange={reservedFunction} defaultValue={tableDetails.status} >
                        <option>Active</option>
                        <option>Busy</option>
                        <option>Reserved</option>
                    </select>

                    {
                        reserved ?
                            <Fragment>
                                <input type="date" />
                                <input type="time" />
                            </Fragment>
                            : ""
                    }

                </article> : ""}

                <div className="admin-page-manage-tables-buttons-wrapper">
                    <button className="admin-page-manage-tables-save-changes-button" disabled={product.length >= 1 ? false : true}>Save changes</button>
                    <button className="admin-page-manage-tables-back-button" onClick={goBack} type="button">Back</button>
                </div>
            </form>




        </section >
    )
}

export default ManageTables;