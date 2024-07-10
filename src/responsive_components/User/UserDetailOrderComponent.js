import React from 'react';
import '../../responsive_styles/User/UserDetailOrder.scss'
import { get, post } from '../../util/api';
import { withRouter } from "react-router";


class UserDetailOrderComponent extends React.Component {

    state = {}

    async componentDidMount() {
        const order_id = this.props.match.params.id;
        let myOrderBooks, totalOrder;
        await get('/order/get-detail-order-by-user', { order_id: order_id })
            .then(response => {
                console.log(response);
                myOrderBooks = response.myOrderBooks;
                totalOrder = response.totalOrder;

            })
            .catch(error => {
                console.error(error);
                // Xử lý lỗi nếu có
            });

        this.setState({ myOrderBooks, totalOrder })

    }
    render() {

        return (
            <>
                {this.state && this.state.myOrderBooks && this.state.myOrderBooks.length > 0 ?
                    <div className='user-detail-order-wrapper'>
                        <h1>Thông tin đơn hàng</h1>

                        <div className="cart-list">
                            {this.state.myOrderBooks.map((item, index) => {
                                return (
                                    <div className="cart-item" key={index}>
                                        <div className="cart-item-image">
                                            <img src={item.image_url} alt="Product 2" />
                                        </div>
                                        <div className="cart-item-info">
                                            <h3 className="cart-item-name">{item.title}</h3>
                                            <p className="cart-item-price">{item.price.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}đ</p>
                                            <div className="quantity-input">
                                                <input type="number" className="cart-item-quantity" value={item.quantity} />
                                            </div>
                                            <p className='quantity-remaining'>Còn 2 sản phẩm</p>
                                        </div>
                                        {/* <div className="cart-item-actions">
                                            <button className="remove-button" onClick={() => this.handleDeleteItemOrder(item.id)}>Xóa</button>
                                        </div> */}
                                    </div>
                                )
                            })}

                        </div>

                        <div className="cart-total">
                            <p className="cart-total-label">Tổng tiền:</p>
                            <p className="cart-total-amount">{this.state && this.state.totalOrder ? this.state.totalOrder.total_amount.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.") : 0}đ</p>
                        </div>


                    </div>

                    :
                    <div className='order-noitem'>
                        <div className='img'>
                            <img src='https://cdn-icons-png.flaticon.com/512/2038/2038767.png' />
                        </div>
                        <div className='message'>Không có sản phẩm nào trong giỏ hàng của bạn</div>
                        <div className='btn-shopping'>
                            <button onClick={() => this.handleShopping()}>Tiếp tục mua sắm</button>
                        </div>
                    </div>
                }
            </>
        )
    }
}

export default withRouter(UserDetailOrderComponent);