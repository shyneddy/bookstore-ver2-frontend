import React from 'react';
import '../styles/layout/Main.scss';
import HomeComponent from '../components/Home/HomeComponent';
import DetailProductComponent from '../components/Product/DetailProductComponent';
import RegisterComponent from '../components/Login_Register/RegisterComponent';
import LoginComponent from '../components/Login_Register/LoginComponent';
import OrderComponent from '../components/Order/OrderComponent';
import InfoUserComponent from '../components/User/InfoUserComponent';
import ConfirmOrderComponent from '../components/Order/ConfirmOrderComponent';
import ShowSearchComponent from '../components/Show_Products/ShowSearchComponent';
import ShowCategoryComponent from '../components/Show_Products/ShowCategoryComponent';
import Login_register_Component from '../components/Login_Register/Login_Register_Component';
import UserManagerComponent from '../responsive_components/User/UserManagerComponent';
import OrderRPComponent from '../responsive_components/Order/OrderRPComponent';
import ChinhSachBM from '../components/Footer_Detail/ChinhSachBM';
import DieuKhoanSD from '../components/Footer_Detail/DieuKhoanSD';
import ErrorComponent from '../components/Error/ErrorComponent';
import QuenMK from '../components/Forget_Password/QuenMK';
import XacNhan from '../components/Forget_Password/XacNhan';
import DoiMK from '../components/Forget_Password/DoiMK';
import {
    BrowserRouter,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";

class Main extends React.Component {

    state = {}


    render() {

        var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;


        return (
            <>
                <BrowserRouter>

                    <Switch>

                        <Route exact path="/">
                            <HomeComponent />
                        </Route>

                        <Route path="/detail/:id">
                            <DetailProductComponent />
                        </Route>

                        <Route exact path="/register">
                            <RegisterComponent />
                        </Route>

                        <Route exact path="/login">
                            <LoginComponent />
                        </Route>

                        <Route exact path="/identify">
                            <QuenMK />
                        </Route>

                        <Route path="/identify/:username">
                            <XacNhan />
                        </Route>

                        <Route path="/confirm/:username">
                            <DoiMK />
                        </Route>

                        <Route exact path="/dieu-khoan">
                            <DieuKhoanSD />
                        </Route>

                        <Route exact path="/chinh-sach-bao-mat">
                            <ChinhSachBM />
                        </Route>

                        <Route exact path="/order">
                            {screenWidth > 840 ?
                                <OrderComponent />
                                :
                                <OrderRPComponent />
                            }
                        </Route>

                        <Route exact path="/order/confirm">
                            <ConfirmOrderComponent />
                        </Route>

                        <Route path="/user">
                            {screenWidth > 840 ?
                                <InfoUserComponent />
                                :
                                <UserManagerComponent />
                            }
                        </Route>

                        <Route path="/search">
                            <ShowSearchComponent />
                        </Route>

                        <Route path="/category">
                            <ShowCategoryComponent />
                        </Route>

                        <Route path="/test-login">
                            <Login_register_Component />
                        </Route>

                        <Route component={ErrorComponent} />

                    </Switch>
                </BrowserRouter>


            </>
        )
    }
}

export default Main