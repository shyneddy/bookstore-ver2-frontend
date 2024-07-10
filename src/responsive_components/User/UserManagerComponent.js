import React from 'react';
import '../../responsive_styles/User/UserManager.scss'
import { get, post } from '../../util/api';
import InfoComponent from './InfoComponent'
import ChangePasswordComponent from './ChangePasswordComponent';
import MyOrderComponent from './MyOrderComponent';
import MyRatingComponent from './MyRatingComponent';
import MyFavoriteComponent from './MyFavoriteComponent';
import UserDetailOrderComponent from './UserDetailOrderComponent';
import {
    BrowserRouter,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";

class UserManagerComponent extends React.Component {

    state = {}

    async handleSigout() {
        await get('/user/sigout')
            .then(response => {
                // if (!response.isLogin) {
                //     console.log('islogin false');
                //     localStorage.removeItem('name');
                //     this.props.clearUser();
                //     // sessionStorage.removeItem('avatar');
                // }

            })
            .catch(error => {
                console.error(error);
                // Xử lý lỗi nếu có
            });
        window.location = "/";
    }

    render() {

        return (
            <>
                <BrowserRouter>
                    <Switch>
                        <Route exact path='/user'>
                            <div className='user-control' id='nav-control'>
                                <ul>
                                    <a href="/user/info"><li className='user-controller'>Thông tin cá nhân</li></a>
                                    <a href="/user/password"><li className='user-controller'>Đổi mật khẩu</li></a>
                                    <a href="/user/order"><li className='user-controller'>Thông tin đơn hàng</li></a>
                                    <a href="/user/favorite"><li className='user-controller'>Sản phẩm ưa thích</li></a>
                                    <a href="/user/rating"><li className='user-controller'>Đánh giá sản phẩm</li></a>
                                    <a onClick={() => this.handleSigout()}><li className='user-controller'>Đăng xuất</li></a>
                                </ul>
                            </div>
                        </Route>

                        <Route exact path='/user/info'>
                            <InfoComponent />
                        </Route>
                        <Route exact path='/user/password'>
                            <ChangePasswordComponent />
                        </Route>

                        <Route exact path='/user/order'>
                            <MyOrderComponent />
                        </Route>

                        <Route exact path='/user/order/:id'>
                            <UserDetailOrderComponent />
                        </Route>

                        <Route exact path='/user/favorite'>
                            <MyFavoriteComponent />
                        </Route>

                        <Route exact path='/user/rating'>
                            <MyRatingComponent />
                        </Route>

                    </Switch>
                </BrowserRouter>
            </>
        )
    }
}

export default UserManagerComponent;