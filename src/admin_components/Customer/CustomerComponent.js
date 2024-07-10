import React from "react";
import "../../admin_styles/Customer/Customer.scss";
import { get, post } from "../../util/api";

class CustomerComponent extends React.Component {
  state = {
    filter: "all",
  };

  async getListUser() {
    let listUser = [];

    await get("/user/admin-allUser")
      .then((response) => {
        console.log(response);
        listUser = response.listUser;
      })
      .catch((error) => {
        console.error(error);
      });

    console.log("listUser: ", listUser);
    // this.setState({
    //     listUser
    // })

    return listUser;
  }

  async componentDidMount() {
    let listUser = await this.getListUser();
    this.setState({
      listUser,
    });
  }

  async handleFilterOrder(e) {
    let listUser = await this.getListUser();
    // console.log(this.state.listUser);

    if (e.target.value != "all") {
      console.log(e.target.value);
      // let listUser = [...this.state.listUser];
      let listUserFilter = listUser.filter(
        (item) => item.gender == e.target.value
      );
      this.setState({
        listUser: listUserFilter,
      });
    } else {
      this.setState({
        listUser: listUser,
      });
    }
  }

  async handleFilterPhone(e) {
    let value = e.target.value;
    let listUser = await this.getListUser();

    if (value && value.length > 0) {
      let listUserNew = listUser.filter((item) =>
        item.phone_number.includes(value)
      );
      this.setState({
        listUser: listUserNew,
      });
    } else {
      this.setState({
        listUser,
      });
    }
  }

  render() {
    return (
      <>
        <div className="admin-customer-manager">
          <h1>Thông tin khách hàng</h1>

          <div className="page-struct">
            <h3>
              Có{" "}
              {this.state && this.state.listUser
                ? this.state.listUser.length
                : 0}{" "}
              Khách hàng
            </h3>
            <div className="filter-container">
              <div className="search-bar">
                {/* <!--Thanh tìm kiếm--> */}
                <form action="#" method="get" className="form-search">
                  <input
                    type="text"
                    name="search"
                    placeholder="Nhập số điện thoại..."
                    onChange={(e) => this.handleFilterPhone(e)}
                  />
                  <button type="submit">Tìm kiếm</button>
                </form>
              </div>
              <select
                id="status-filter"
                onChange={(e) => this.handleFilterOrder(e)}
              >
                <option value="all">Tất cả</option>
                <option value="1">Nam</option>
                <option value="0">Nữ</option>
              </select>
            </div>

            <table>
              <thead>
                <tr>
                  <th className="rp-none">ID </th>
                  <th>Tên khách hàng</th>
                  <th>Tên tài khoản</th>
                  <th>Số điện thoại</th>
                  <th>Giới tính</th>
                </tr>
              </thead>
              <tbody>
                {this.state &&
                  this.state.listUser &&
                  this.state.listUser.map((item, index) => {
                    return (
                      <tr>
                        <td className="rp-none">KH#{item.id}</td>
                        <td>{item.full_name}</td>
                        <td>{item.username}</td>
                        <td>{item.phone_number}</td>
                        <td>{item.gender == 1 ? "Nam" : "Nữ"}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
}

export default CustomerComponent;
