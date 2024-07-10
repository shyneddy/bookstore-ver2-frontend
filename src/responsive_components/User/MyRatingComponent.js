import React from 'react';
import '../../responsive_styles/User/MyRating.scss'
import { get, post } from '../../util/api';


class MyOrderComponent extends React.Component {

    state = {}
    async componentDidMount() {
        let list_User_Rating;
        await get('/product/user-rating')
            .then(response => {
                console.log(response);
                list_User_Rating = response.list_User_Rating;

            })
            .catch(error => {
                console.error(error);
                // Xử lý lỗi nếu có
            });

        this.setState({ list_User_Rating })

    }
    render() {

        return (
            <>
                <div className='my-rating-container'>
                    <h1>Trang quản lý sản phẩm đã đánh giá</h1>

                    {this.state && this.state.list_User_Rating ?
                        <div class="product-list">

                            {this.state.list_User_Rating.map((item, index) => {
                                return (
                                    <a href={`/detail/${item.id}`} style={{ color: 'black', textDecoration: 'none' }}>
                                        <div class="product">
                                            <div class="product-image">
                                                <img src={item.image_url} alt="Product 1" />
                                            </div>
                                            <div class="product-info">
                                                <h3 class="product-name">{item.title}</h3>
                                                <p class="product-rating">Đánh giá: {item.stars}/5</p>
                                                <p class="product-review">Đánh giá của bạn: {item.comment}</p>
                                            </div>
                                        </div>
                                    </a>
                                )
                            })}

                        </div>
                        :
                        <div></div>
                    }


                </div>
            </>
        )
    }
}

export default MyOrderComponent;