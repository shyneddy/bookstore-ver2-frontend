import React from "react";
import "../../admin_styles/Dashboard/Dashboard.scss";
import { get, post } from "../../util/api";
import moment from "moment";

class ShowCategorysComponent extends React.Component {
  state = {};

  async componentDidMount() {
    let list_topSelling;
    let list_OrderNew;
    let totalSales;
    let totalOrder;
    let countProducts;
    let totalReturn;

    await get("/product/admin-topselling")
      .then((response) => {
        console.log(response);
        list_topSelling = response.list_topSelling;
      })
      .catch((error) => {
        console.error(error);
      });

    await get("/order/admin-ordernew")
      .then((response) => {
        console.log(response);
        list_OrderNew = response.list_OrderNew;
      })
      .catch((error) => {
        console.error(error);
      });
    await get("/order/admin-dashboard-status")
      .then((response) => {
        console.log(response);
        totalSales = response.totalSales;
        totalOrder = response.totalOrder;
        countProducts = response.countProducts;
        totalReturn = response.totalReturn;
      })
      .catch((error) => {
        console.error(error);
      });

    this.setState({
      list_topSelling,
      list_OrderNew,
      totalSales,
      totalOrder,
      countProducts,
      totalReturn,
    });
  }

  render() {
    return (
      <>
        <section class="home-section">
          {/* <h1>Dashboard</h1> */}
          <div class="home-content">
            <div class="overview-boxes">
              <div class="box">
                <div class="right-side">
                  <div class="box-topic">Tổng đơn hàng</div>
                  <div class="number">
                    {this.state && this.state.totalOrder
                      ? this.state.totalOrder
                      : 0}
                  </div>
                  <div class="indicator">
                    <i class="bx bx-up-arrow-alt"></i>
                    <span class="text">Up from yesterday</span>
                  </div>
                </div>
              </div>
              <div class="box">
                <div class="right-side">
                  <div class="box-topic">Tổng doanh thu</div>
                  <div class="number">
                    {this.state && this.state.totalSales
                      ? this.state.totalSales.replace(
                          /(\d)(?=(\d\d\d)+(?!\d))/g,
                          "$1,"
                        ) + "đ"
                      : 0}
                  </div>
                  <div class="indicator">
                    <i class="bx bx-up-arrow-alt"></i>
                    <span class="text">Up from yesterday</span>
                  </div>
                </div>
              </div>
              <div class="box">
                <div class="right-side">
                  <div class="box-topic">Tổng sản phẩm</div>
                  <div class="number">
                    {this.state && this.state.countProducts
                      ? this.state.countProducts
                      : 0}
                  </div>
                  <div class="indicator">
                    <i class="bx bx-up-arrow-alt"></i>
                    <span class="text">Up from yesterday</span>
                  </div>
                </div>
              </div>
              <div class="box">
                <div class="right-side">
                  <div class="box-topic">Đơn hàng bị hủy</div>
                  <div class="number">
                    {this.state && this.state.totalReturn
                      ? this.state.totalReturn
                      : 0}
                  </div>
                  <div class="indicator">
                    <i class="bx bx-down-arrow-alt down"></i>
                    <span class="text">Down From Today</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="sales-boxes">
              <div class="recent-sales box">
                <div class="title">Recent Sales</div>
                <div class="sales-details">
                  <ul class="details rp-mb">
                    <li class="topic">Date</li>
                    {this.state &&
                      this.state.list_OrderNew &&
                      this.state.list_OrderNew.map((item, index) => {
                        return (
                          <li>
                            <a href="#">
                              {moment(item.order_date).format("DD-MM-YYYY")}
                            </a>
                          </li>
                        );
                      })}
                  </ul>
                  <ul class="details customer">
                    <li class="topic">Customer</li>
                    {this.state &&
                      this.state.list_OrderNew &&
                      this.state.list_OrderNew.map((item, index) => {
                        return (
                          <li>
                            <a href="#">{item.full_name}</a>
                          </li>
                        );
                      })}
                  </ul>
                  <ul class="details status">
                    <li class="topic">Sales</li>
                    {this.state &&
                      this.state.list_OrderNew &&
                      this.state.list_OrderNew.map((item, index) => {
                        return (
                          <li>
                            <a href="#">{item.status}</a>
                          </li>
                        );
                      })}
                  </ul>
                  <ul class="details rp-mb">
                    <li class="topic">Total</li>
                    {this.state &&
                      this.state.list_OrderNew &&
                      this.state.list_OrderNew.map((item, index) => {
                        return (
                          <li>
                            <a href="#">
                              {item.total_amount.replace(
                                /(\d)(?=(\d\d\d)+(?!\d))/g,
                                "$1,"
                              ) + "đ"}
                            </a>
                          </li>
                        );
                      })}
                  </ul>
                </div>
                <div class="button">
                  <a href="/admin/list-orders">See All</a>
                </div>
              </div>
              <div class="top-sales box">
                <div class="title">Top Seling Product</div>
                <ul class="top-sales-details">
                  {this.state &&
                    this.state.list_topSelling &&
                    this.state.list_topSelling.map((item, index) => {
                      return (
                        <li>
                          <a href="#">
                            <img src={item.image_url} alt="" />
                            <span class="product">{item.title}</span>
                          </a>
                          <span class="price">
                            {item.price.replace(
                              /(\d)(?=(\d\d\d)+(?!\d))/g,
                              "$1,"
                            ) + "đ"}
                          </span>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default ShowCategorysComponent;
