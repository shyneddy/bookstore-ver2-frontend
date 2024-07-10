import React from "react";
import "../../admin_styles/layout/Header_Admin.scss";
import { get, post } from "../../util/api";

// import ShowProductsComponent from '../Product/ShowProductsComponent';
import ShowProductsComponent from "../Product/ShowProductsComponent";
import AddProductComponent from "../Product/AddProductComponent";
import EditProductComponent from "../Product/EditProductComponent";
import ShowCategorysComponent from "../Category/ShowCategorysComponent";
import AddCategoryComponent from "../Category/AddCategoryComponent";
import EditCategoryComponent from "../Category/EditCategoryComponent";
import ShowOrdersComponent from "../Order/ShowOrdersComponent";
import Dashboard from "../Dashboard/Dashboard";
import ShowProductRPComponent from "../../responsive_components/Admin/ShowProductRPComponent";
import BannerComponent from "../Banner/BannerComponent";
import RatingManagerComponent from "../Rating/RatingManagerComponent";
import CustomerComponent from "../Customer/CustomerComponent";
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";

class Header_Admin extends React.Component {
  state = {};

  async componentDidMount() {
    let adminName;
    await get("/home/admin-index")
      .then((response) => {
        if (response.admin.full_name) {
          adminName = response.admin.full_name;
        }
      })
      .catch((error) => {
        console.error(error);
        if (!error.response.data.isAdmin) {
          window.location = "/admin-login";
        }
      });
    this.setState({ adminName });
  }

  async handleLogOut() {
    await get("/user/sigout")
      .then((response) => {
        // if (!response.isLogin) {
        //     console.log('islogin false');
        //     localStorage.removeItem('name');
        //     this.props.clearUser();
        //     // sessionStorage.removeItem('avatar');
        // }
      })
      .catch((error) => {
        console.error(error);
        // Xử lý lỗi nếu có
      });
    window.location = "/";
  }

  handleShowNavAdmin() {
    let nav = document.getElementsByClassName("Right-Column")[0];
    if (nav) {
      window.getComputedStyle(nav).getPropertyValue("display") === "none"
        ? (nav.style.display = "block")
        : (nav.style.display = "none");
    }
  }

  render() {
    return (
      <>
        <BrowserRouter>
          {this.state && this.state.adminName && (
            <div className="main" style={{ width: "100%" }}>
              <div className="header-container">
                <div
                  className="btn-show-nav"
                  onClick={() => this.handleShowNavAdmin()}
                >
                  <img src="/menu.png" />
                </div>
                <div className="admin-name">
                  <h3>Admin</h3>
                  <button
                    className="btn-logout"
                    onClick={() => {
                      this.handleLogOut();
                    }}
                  >
                    <a>Đăng xuất</a>
                  </button>
                </div>
              </div>
              <Switch>
                <Route exact path="/admin/list-products">
                  <ShowProductsComponent />
                </Route>

                <Route exact path="/admin">
                  <Dashboard />
                </Route>

                <Route exact path="/admin/add-product">
                  <AddProductComponent />
                </Route>

                <Route path="/admin/edit-product/:id">
                  <EditProductComponent />
                </Route>

                <Route exact path="/admin/list-orders">
                  <ShowOrdersComponent />
                </Route>

                <Route exact path="/admin/list-category">
                  <ShowCategorysComponent />
                </Route>

                <Route exact path="/admin/rating">
                  <RatingManagerComponent />
                </Route>

                <Route exact path="/admin/customer">
                  <CustomerComponent />
                </Route>

                <Route exact path="/admin/banner">
                  <BannerComponent />
                </Route>

                {/* <AddProductComponent /> */}
                {/* <AddCategoryComponent /> */}
                {/* <EditCategoryComponent /> */}
              </Switch>
            </div>
          )}
        </BrowserRouter>
      </>
    );
  }
}

export default Header_Admin;
