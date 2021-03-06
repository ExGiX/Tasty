import './ManageOrders.css';
import { NavLink , Route } from 'react-router-dom';
import AllOrders from './AllOrders/AllOrders';


const ManageOrders = () => {
    return (
        <section className="admin-page-manage-orders-wrapper">
            <article>
                <div className="manage-order-navigation-links">
                    <ul>
                        <li>
                            <NavLink activeClassName="current-route" to="/admin-panel/manage/orders/all-orders" exact>All Orders</NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName="current-route" to="/admin-panel/manage/orders/pending-orders" exact>Pending Orders</NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName="current-route" to="/admin-panel/manage/orders/delivered-orders" exact>Delivered Orders</NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName="current-route" to="/admin-panel/manage/orders/cancalled-orders">Cancalled Orders</NavLink>
                        </li>
                    </ul>

                </div>
                <div className="manage-orders-product-details-heding">
                    <ul>
                        <li>
                            <i className="fas fa-align-right orderid"></i>
                            Order ID
                        </li>
                        <li>
                            <i className="fas fa-calendar-alt date"></i>
                            Order Date
                        </li>
                        <li>
                            <i className="fas fa-box box"></i>
                            Products
                        </li>
                        <li>
                            <i className="fas fa-dollar-sign price"></i>
                            Total Price
                        </li>
                        <li>
                            <i className="fas fa-signal status"></i>
                            Status
                        </li>
                    </ul>
                </div>


                <Route path="/admin-panel/manage/orders/all-orders"  component={AllOrders}  exact />
                <Route path="/admin-panel/manage/orders/pending-orders"  component={AllOrders} exact />
                <Route path="/admin-panel/manage/orders/delivered-orders"  component={AllOrders} exact />
                <Route path="/admin-panel/manage/orders/cancalled-orders"  component={AllOrders} exact />
                

            </article>
            
        </section>
    )
}


export default ManageOrders;