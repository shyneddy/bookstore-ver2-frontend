import React from 'react';
import '../../responsive_styles/User/MyFavorite.scss'
import { get, post } from '../../util/api';


class MyFavoriteComponent extends React.Component {

    state = {}

    async componentDidMount() {
        let list_User_Favorite;
        await get('/product/user-favorite')
            .then(response => {
                console.log(response);
                list_User_Favorite = response.list_User_Favorite;

            })
            .catch(error => {
                console.error(error);
                // Xử lý lỗi nếu có
            });

        this.setState({ list_User_Favorite })

    }

    render() {

        return (
            <>
                <div className='my-favorite-rp-container'>
                    <h1>Trang quản lý sản phẩm đã yêu thích</h1>

                    {this.state && this.state.list_User_Favorite ?
                        <div class="product-list">
                            {this.state.list_User_Favorite.map((item, index) => {
                                return (
                                    <a href={`/detail/${item.id}`} style={{ color: 'black', textDecoration: 'none' }}>
                                        <div class="product">
                                            <div class="product-image">
                                                <img src={item.image_url} alt="Product 1" />
                                            </div>
                                            <div class="product-info">
                                                <h3 class="product-name">{item.title}</h3>
                                                <p class="product-price">{item.price.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + 'đ'}</p>
                                            </div>
                                        </div>
                                    </a>
                                )
                            })}

                        </div>
                        :
                        <div>KHÔNG CÓ SẢN PHẨM</div>

                    }

                </div>
            </>
        )
    }
}

export default MyFavoriteComponent;