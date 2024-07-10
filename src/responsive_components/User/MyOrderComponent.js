import React from 'react';
import '../../responsive_styles/User/MyOrder.scss'
import { get, post } from '../../util/api';
import moment from 'moment';

class MyOrderComponent extends React.Component {

    state = { filter: 'Ngày' }

    async componentDidMount() {
        let list_User_Order;
        await get('/order/get-user-order')
            .then(response => {
                console.log(response);
                list_User_Order = response.list_User_Order;

            })
            .catch(error => {
                console.error(error);
            });

        this.setState({ list_User_Order })

    }

    handleHideDetailProduct() {
        let positionElement = document.getElementsByClassName('position-container');
        for (var i = 0; i < positionElement.length; i++) {
            positionElement[i].setAttribute('style', 'display: none')

        }
    }

    handleViewDetailOrder(e) {
        let tr_parent = e.target.parentNode.parentNode.getElementsByClassName('position-container');
        // console.log(tr_parent);
        tr_parent[0].setAttribute('style', 'display: block')
    }
    handleFilterOrder(e) {
        this.setState({
            filter: e.target.value
        })
    }
    render() {

        return (
            <>
                <div class="myorder-rp-container">
                    <h1>Trang quản lý đơn hàng</h1>
                    <select id="status-filter" onChange={(e) => this.handleFilterOrder(e)}>
                        <option value="Ngày">Ngày đặt hàng</option>
                        <option value="Đang chờ xử lý">Đang chờ xử lý</option>
                        <option value="Đã tiếp nhận">Đã tiếp nhận</option>
                        <option value="Đang vận chuyển">Đang vận chuyển</option>
                        <option value="Hoàn tất">Hoàn thành</option>
                        <option value="Hủy">Bị hủy</option>
                    </select>
                    {this.state && this.state.list_User_Order ?
                        <div class="order-list">

                            {this.state.list_User_Order.map((item, index) => {
                                if (this.state.filter === "Ngày") {
                                    return (
                                        <a href={`/user/order/${item.id}`} style={{ color: 'black', textDecoration: 'none' }}>
                                            <div class="order-item" key={index}>
                                                <div class="order-info">
                                                    <span class="label">Mã đơn hàng:</span>
                                                    <span class="value">DH #{item.id}</span>
                                                </div>
                                                <div class="order-info">
                                                    <span class="label">Ngày mua:</span>
                                                    <span class="value">{moment(item.order_date).format("DD-MM-YYYY")}</span>
                                                </div>
                                                <div class="order-info">
                                                    <span class="label">Tình trạng đơn hàng:</span>
                                                    <span class="value">{item.status}</span>
                                                </div>
                                                <div class="order-info">
                                                    <span class="label">Giá:</span>
                                                    <span class="value">{item.total_amount.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + 'đ'}</span>
                                                </div>
                                            </div>
                                        </a>
                                    )
                                } else {
                                    if (item.status === this.state.filter) {
                                        return (
                                            <a href={`/user/order/${item.id}`} style={{ color: 'black', textDecoration: 'none' }}>
                                                <div class="order-item" key={index}>
                                                    <div class="order-info">
                                                        <span class="label">Mã đơn hàng:</span>
                                                        <span class="value">DH #{item.id}</span>
                                                    </div>
                                                    <div class="order-info">
                                                        <span class="label">Ngày mua:</span>
                                                        <span class="value">{moment(item.order_date).format("DD-MM-YYYY")}</span>
                                                    </div>
                                                    <div class="order-info">
                                                        <span class="label">Tình trạng đơn hàng:</span>
                                                        <span class="value">{item.status}</span>
                                                    </div>
                                                    <div class="order-info">
                                                        <span class="label">Giá:</span>
                                                        <span class="value">{item.total_amount.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + 'đ'}</span>
                                                    </div>
                                                </div>
                                            </a>
                                        )
                                    }
                                }

                            })}

                        </div>
                        :
                        <div>
                            KHÔNG CÓ SẢN PHẨM
                        </div>
                    }
                </div>
            </>
        )
    }
}

export default MyOrderComponent;