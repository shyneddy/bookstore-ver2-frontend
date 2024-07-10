import React from 'react';
import '../../responsive_styles/Order/OrderRP.scss'
import { get, post } from '../../util/api';
import { ToastContainer, toast } from 'react-toastify';


class OrderRPComponent extends React.Component {

    state = {}

    async componentDidMount() {
        await get('/user/islogin')
            .then(response => {
                console.log(response);
                if (!response.isLogin) {
                    window.location = "/login";

                }
            })
            .catch(error => {
                console.error(error);
                // Xử lý lỗi nếu có
            });


        var list_item = [], totalPrice;
        // this.setState({
        //     list_item
        // })
        await get('/order/get-items')
            .then(response => {
                console.log(response);
                list_item = response.list_item;
                totalPrice = response.totalPrice.total_amount;
            })
            .catch(error => {
                console.error(error);
                // window.location = "/login";
            });


        this.setState({
            list_item,
            totalPrice
        })



    }

    handleShopping() {
        window.location = "/";
    }



    async handleIncQuantity(e, max, index, id) {
        let list_item = [...this.state.list_item];
        list_item[index].quantity = Number(list_item[index].quantity) + 1 > max ? max : Number(list_item[index].quantity) + 1;
        if (Number(list_item[index].quantity) < 1 || Number(list_item[index].quantity) > max) {
            toast.dismiss();
            toast.error("Số lượng không hợp lệ!", {
                position: toast.POSITION.TOP_RIGHT
            });
        } else {
            this.setState({
                list_item
            })

            await post('/order/update-item', { id, quantity: this.state.list_item[index].quantity })
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.error(error);
                    // Xử lý lỗi nếu có
                });
            this.componentDidMount();
        }


    }
    async handleDecQuantity(e, max, index, id) {
        let list_item = [...this.state.list_item];
        list_item[index].quantity = Number(list_item[index].quantity) - 1 > 0 ? Number(list_item[index].quantity) - 1 : 1;
        if (Number(list_item[index].quantity) < 1 || Number(list_item[index].quantity) > max) {
            toast.dismiss();
            toast.error("Số lượng không hợp lệ!", {
                position: toast.POSITION.TOP_RIGHT
            });
        } else {

            this.setState({
                list_item
            })

            await post('/order/update-item', { id, quantity: this.state.list_item[index].quantity })
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.error(error);
                });
            this.componentDidMount();

        }

    }

    async handleDeleteItemOrder(id) {
        await post('/order/delete-item', { id })
            .then(response => {
                console.log('delete');
                console.log(response);
            })
            .catch(error => {
                console.error(error);
            });

        this.componentDidMount()

    }

    render() {

        return (
            <>

                {this.state && this.state.list_item && this.state.list_item.length > 0 ?
                    <div className='user-order-wrapper'>
                        <h1>Quản lý giỏ hàng</h1>

                        <div className="cart-list">

                            {this.state.list_item.map((item, index) => {
                                return (
                                    <div className="cart-item" key={index}>
                                        <div className="cart-item-image">
                                            <img src={item.image_url} alt="Product 2" />
                                        </div>
                                        <div className="cart-item-info">
                                            <h3 className="cart-item-name">{item.title}</h3>
                                            <p className="cart-item-price">{item.price.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}đ</p>
                                            <div className="quantity-input">
                                                <button className="decrease-button" onClick={(e) => { this.handleDecQuantity(e, item.quantity_remaining, index, item.id) }}>-</button>
                                                <input type="number" className="cart-item-quantity" min="1" max={item.quantity_remaining} value={item.quantity} />
                                                <button className="increase-button" onClick={(e) => { this.handleIncQuantity(e, item.quantity_remaining, index, item.id) }}>+</button>
                                            </div>
                                            <p className='quantity-remaining'>Còn {item.quantity_remaining} sản phẩm</p>
                                        </div>
                                        <div className="cart-item-actions">
                                            <button className="remove-button" onClick={() => this.handleDeleteItemOrder(item.id)}>Xóa</button>
                                        </div>
                                    </div>
                                )
                            })}

                        </div>

                        <div className="cart-total">
                            <p className="cart-total-label">Tổng tiền:</p>
                            <p className="cart-total-amount">{this.state && this.state.totalPrice ? this.state.totalPrice.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.") : 0}đ</p>
                        </div>

                        <button className="checkout-button" onClick={() => {
                            window.location = "order/confirm";
                        }}>Mua ngay</button>
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

export default OrderRPComponent;