import './AdminPanel.css';
import Aside from './Aside/Aside';
import Dashboard from './Dashboard/Dashboard';
import { Switch, Route, Redirect } from 'react-router-dom';
import Tables from './Tables/Tables';
import TableDetails from './Tables/TableDetails/TableDetails';
import ManageTables from './Tables/ManageTables/ManageTables';
import CreateTable from './Tables/CreateTable/CreateTable';
import ManageDailyMenu from './ManageDailyMenu/ManageDailyMenu';
import AddProductToDalyMenu from './ManageDailyMenu/AddProductToDailyMenu/AddProductToDailyMenu';
import EditProduct from './ManageDailyMenu/EditProduct/EditProduct';
import ManageMenu from './ManageMenu/ManageMenu';
import ManageMenuCategory from './ManageMenu/ManageMenuCategory/ManageMenuCategory';
import AddProductToCategory from './ManageMenu/AddProductToCategory/AddProductToCategory';
import EditMenuProduct from './ManageMenu/EditMenuProduct/EditMenuProduct';
import ManageOrders from './ManageOrders/ManageOrders';
import OrderDetails from './ManageOrders/OrderDetails/OrderDetails';
import ManageDiscounts from './ManageDiscounts/ManagaDiscounts';
import MakeAccount from './MakeAccount/MakeAccount';
import ManageReservations from './ManageReservations/ManageReservations';
import EditReservation from './ManageReservations/EditReservation/EditReservation';
import { useAppSelector } from '../../store/index';
import WelcomeToPanel from './WelcomeToPanel/WelcomeToPanel';

const AdminPanel = ({ setDailyMenuProducts }) => {
    const authState = useAppSelector(state => state.auth);

    return (
        <main>
            <div className="admin-entire-page-wrapper">
                <section className="admin-page-wrapper">
                    <Aside />
                    <Switch>
                        <Route path="/admin-panel" component={authState.userAuthState.isAdmin ? Dashboard : WelcomeToPanel} exact />
                        <Route path="/admin-panel/tables" component={Tables} exact />
                        <Route path="/admin-panel/tables/create" component={CreateTable} exact />
                        <Route path="/admin-panel/tables/details/:tableID" component={TableDetails} />
                        <Route path="/admin-panel/tables/manage/:tableID" component={ManageTables} />
                        <Route path="/admin-panel/manage/orders/:page" component={ManageOrders} exact />
                        <Route path="/admin-panel/manage/order/details/:id" component={OrderDetails} exact />
                        <Route path="/admin-panel/reservations" component={ManageReservations} exact />
                        <Route path="/admin-panel/reservations/edit/:id" component={EditReservation} exact />
                        {authState.userAuthState.isAdmin ? <Route path="/admin-panel/manage/daily-menu" component={ManageDailyMenu} >
                            <ManageDailyMenu setDailyMenuProducts={setDailyMenuProducts} />
                        </Route> : ""}
                        {authState.userAuthState.isAdmin ? <Route path="/admin-panel/daily-menu/product/create" component={AddProductToDalyMenu}>
                            <AddProductToDalyMenu setDailyMenuProducts={setDailyMenuProducts} />
                        </Route> : ""}
                        {authState.userAuthState.isAdmin ? <Route path="/admin-panel/daily-menu/product/edit/:id" component={EditProduct} exact /> : ""}
                        {authState.userAuthState.isAdmin ? <Route path="/admin-panel/manage/menu" component={ManageMenu} exact /> : ""}
                        {authState.userAuthState.isAdmin ? <Route path="/admin-panel/manage/menu/add-product" component={AddProductToCategory} exact /> : ""}
                        {authState.userAuthState.isAdmin ? <Route path="/admin-panel/manage/menu/:category" component={ManageMenuCategory} exact /> : ""}
                        {authState.userAuthState.isAdmin ? <Route path="/admin-panel/manage/menu/product/edit/:id" component={EditMenuProduct} exact /> : ""}
                        {authState.userAuthState.isAdmin ? <Route path="/admin-panel/discounts" component={ManageDiscounts} /> : ""}
                        {authState.userAuthState.isAdmin ? <Route path="/admin-panel/make-account" component={MakeAccount} /> : ""}

                        <Route path="*" component={Dashboard} >
                            <Redirect to="/admin-panel" />
                        </Route>

                    </Switch>
                </section>
            </div>
        </main>
    )
}

export default AdminPanel;
