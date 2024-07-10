import React from "react";
import "../../styles/Order/ConfirmOrder.scss";
import axios from "axios";
import { get, post } from "../../util/api";
// import { removeExtraSpaces } from '../../util/validateInput'

class ConfirmOrderComponent extends React.Component {
  state = {};

  async componentDidMount() {
    var list_order, user;
    await get("/order/confirm")
      .then((response) => {
        user = response.user;
      })
      .catch((error) => {
        console.error(error);
        // Xử lý lỗi nếu có
      });

    await get("/order/get-items")
      .then((response) => {
        list_order = response.list_item;
      })
      .catch((error) => {
        console.error(error);
        // Xử lý lỗi nếu có
      });

    this.setState({ user, list_order });
  }

  async handleOrder() {
    const full_name = this.state.user.full_name;
    const phone_number = this.state.user.phone_number;
    const address = this.state.user.address;

    await post("/order/confirm", { full_name, phone_number, address })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
        // Xử lý lỗi nếu có
      });
    window.location = "/";
  }

  handleChangeInfo(e, key) {
    let user = { ...this.state.user };
    user[key] = e.target.value;
    this.setState({
      user,
    });
  }

  render() {
    return (
      <>
        {this.state && this.state.user && (
          <>
            <div className="confirm-container">
              <div className="list-product-container">
                <div className="title">
                  <div className="title-product">Sản phẩm</div>
                  <div className="title-quantity">Số lượng</div>
                  <div className="title-price">Thành tiền</div>
                </div>

                {this.state.list_order &&
                  this.state.list_order.map((item, index) => {
                    return (
                      <div className="list-product" key={index}>
                        <div className="product">
                          <div className="img">
                            <img src={item.image_url} />
                          </div>
                          <div className="name">{item.title}</div>
                        </div>
                        <div className="quantity">
                          <div className="value">{item.quantity}</div>
                        </div>
                        <div className="price">
                          <div className="value">
                            {String(item.price * item.quantity).replace(
                              /(\d)(?=(\d\d\d)+(?!\d))/g,
                              "$1,"
                            )}
                            đ
                          </div>
                        </div>
                      </div>
                    );
                  })}

                {this.state.totalPrice && (
                  <div className="total-container">
                    <div className="title">Tổng: </div>
                    <div className="total-price">
                      {this.state.totalPrice.replace(
                        /(\d)(?=(\d\d\d)+(?!\d))/g,
                        "$1,"
                      )}
                      đ
                    </div>
                  </div>
                )}
              </div>

              {this.state.user && (
                <div className="confirm-infouser-container">
                  <div className="edit-info">
                    <div className="confirm-infouser">
                      <div className="title">Thông tin đơn hàng</div>
                    </div>

                    <div className="short-info">
                      <div className="fullnameuser">
                        <form>
                          <label htmlFor="name">Tên khách hàng:</label>
                          <input
                            type="text"
                            value={this.state.user.full_name}
                            onChange={(e) =>
                              this.handleChangeInfo(e, "full_name")
                            }
                          />
                        </form>
                      </div>

                      <div className="phonenumber">
                        <form>
                          <label htmlFor="name">Số điện thoại:</label>
                          <input
                            type="text"
                            value={this.state.user.phone_number}
                            onChange={(e) =>
                              this.handleChangeInfo(e, "phone_number")
                            }
                          />
                        </form>
                      </div>
                    </div>

                    <div className="address">
                      <form>
                        <label htmlFor="name">Địa chỉ:</label>
                        <input
                          type="text"
                          value={this.state.user.address}
                          onChange={(e) => this.handleChangeInfo(e, "address")}
                        />
                      </form>
                    </div>
                  </div>
                  <div className="btn-comfirmpay">
                    <button
                      onClick={() => {
                        this.handleOrder();
                      }}
                    >
                      XÁC NHẬN MUA HÀNG
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </>
    );
  }
}

export default ConfirmOrderComponent;
