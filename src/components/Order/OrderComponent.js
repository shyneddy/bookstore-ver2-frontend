import React from "react";
import "../../styles/Order/Order.scss";
import { get, post } from "../../util/api";
import { ToastContainer, toast } from "react-toastify";

class OrderComponent extends React.Component {
  state = {
    // reload: false
  };

  async componentDidMount() {
    await get("/user/islogin")
      .then((response) => {
        console.log(response);
        if (!response.isLogin) {
          window.location = "/login";
        }
      })
      .catch((error) => {
        console.error(error);
        // Xử lý lỗi nếu có
      });

    var list_item = [],
      totalPrice;
    // this.setState({
    //     list_item
    // })
    await get("/order/get-items")
      .then((response) => {
        console.log(response);
        list_item = response.list_item;
        totalPrice = response.totalPrice.total_amount;
      })
      .catch((error) => {
        console.error(error);
        // window.location = "/login";
      });

    this.setState({
      list_item,
      totalPrice,
    });
  }

  handleShopping() {
    window.location = "/";
  }

  async handleIncQuantity(e, max, index, id) {
    let list_item = [...this.state.list_item];
    list_item[index].quantity =
      Number(list_item[index].quantity) + 1 > max
        ? max
        : Number(list_item[index].quantity) + 1;
    if (
      Number(list_item[index].quantity) < 1 ||
      Number(list_item[index].quantity) > max
    ) {
      toast.dismiss();
      toast.error("Số lượng không hợp lệ!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      this.setState({
        list_item,
      });

      await post("/order/update-item", {
        id,
        quantity: this.state.list_item[index].quantity,
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
          // Xử lý lỗi nếu có
        });
      this.componentDidMount();
    }
  }
  async handleDecQuantity(e, max, index, id) {
    let list_item = [...this.state.list_item];
    list_item[index].quantity =
      Number(list_item[index].quantity) - 1 > 0
        ? Number(list_item[index].quantity) - 1
        : 1;
    if (
      Number(list_item[index].quantity) < 1 ||
      Number(list_item[index].quantity) > max
    ) {
      toast.dismiss();
      toast.error("Số lượng không hợp lệ!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      this.setState({
        list_item,
      });

      await post("/order/update-item", {
        id,
        quantity: this.state.list_item[index].quantity,
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
      this.componentDidMount();
    }
  }

  async handleDeleteItemOrder(id) {
    await post("/order/delete-item", { id })
      .then((response) => {
        console.log("delete");
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });

    this.componentDidMount();
  }

  render() {
    return (
      <>
        {this.state &&
        this.state.list_item &&
        this.state.list_item.length > 0 ? (
          <div className="order-container">
            <div className="title-container-top">
              <div className="sub-title product"> &nbsp; &nbsp;Sản phẩm</div>
              <div className="sub-title price">Đơn giá</div>
              <div className="sub-title quantity">Số lượng</div>
              <div className="sub-title total">Thành tiền</div>
              <div className="sub-title remove">Thao tác</div>
            </div>
            <div className="title-container-content">
              {this.state.list_item.map((item, index) => {
                return (
                  <div key={index} className="orderproduct-container">
                    <div className="product">
                      <div className="img">
                        <img src={item.image_url} />
                      </div>
                      <div className="productname">
                        {" "}
                        <a
                          href={`/detail/${item.book_id}`}
                          style={{ color: "black", textDecoration: "none" }}
                        >
                          {item.title}
                        </a>
                      </div>
                    </div>

                    <div className="price">
                      {" "}
                      {item.price.replace(
                        /(\d)(?=(\d\d\d)+(?!\d))/g,
                        "$1."
                      )}đ{" "}
                    </div>

                    {/* <div className='quantity-container'>
                                        <input type="number" id="quantity" name={index} min="1" max="10" defaultValue={item.quantity} onChange={(e) => this.handleChangQuantity(e, index, item.id)} />
                                    </div> */}

                    <div className="quantity-input">
                      <button
                        className="decrease-button"
                        onClick={(e) => {
                          this.handleDecQuantity(
                            e,
                            item.quantity_remaining,
                            index,
                            item.id
                          );
                        }}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        className="cart-item-quantity"
                        min="1"
                        max={item.quantity_remaining}
                        value={item.quantity}
                      />
                      <button
                        className="increase-button"
                        onClick={(e) => {
                          this.handleIncQuantity(
                            e,
                            item.quantity_remaining,
                            index,
                            item.id
                          );
                        }}
                      >
                        +
                      </button>
                    </div>

                    <div className="total-price">
                      {" "}
                      {String(item.price * item.quantity).replace(
                        /(\d)(?=(\d\d\d)+(?!\d))/g,
                        "$1."
                      )}
                      đ{" "}
                    </div>

                    <div
                      className="remove-btn"
                      onClick={() => this.handleDeleteItemOrder(item.id)}
                    >
                      <img
                        src="https://static.thenounproject.com/png/1144254-200.png"
                        style={{ width: "30px" }}
                      />
                    </div>
                  </div>
                );
              })}

              <div className="pay-container">
                <div className="total-order">
                  Tổng thanh toán:{" "}
                  <span>
                    {this.state && this.state.totalPrice
                      ? this.state.totalPrice.replace(
                          /(\d)(?=(\d\d\d)+(?!\d))/g,
                          "$1."
                        )
                      : 0}
                    đ
                  </span>
                </div>
                <div className="btn-pay">
                  <button
                    onClick={() => {
                      window.location = "order/confirm";
                    }}
                  >
                    MUA HÀNG
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="order-noitem">
            <div className="img">
              <img src="https://cdn-icons-png.flaticon.com/512/2038/2038767.png" />
            </div>
            <div className="message">
              Không có sản phẩm nào trong giỏ hàng của bạn
            </div>
            <div className="btn-shopping">
              <button onClick={() => this.handleShopping()}>
                Tiếp tục mua sắm
              </button>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default OrderComponent;
