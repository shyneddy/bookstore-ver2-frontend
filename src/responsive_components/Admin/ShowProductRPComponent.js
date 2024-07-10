import React from 'react';
import '../../responsive_styles/Admin/ShowProductRP.scss'
import { get, post } from '../../util/api';


class ShowProductRPComponent extends React.Component {

    state = {}



    render() {

        return (
            <>

                <div class="product-management">
                    <div class="header">
                        <h2>Quản lý sản phẩm</h2>
                        <div class="actions">
                            <button class="add-product">Thêm sản phẩm</button>
                            <select class="category-select">
                                <option value="">Tất cả danh mục</option>
                                <option value="1">Danh mục 1</option>
                                <option value="2">Danh mục 2</option>
                                <option value="3">Danh mục 3</option>
                            </select>
                            <input type="text" class="search-input" placeholder="Tìm kiếm sản phẩm" />
                        </div>
                    </div>
                    <div class="product-list">
                        <div class="product">
                            <div class="product-image">
                                <img src="product1.jpg" alt="Product 1" />
                            </div>
                            <div class="product-details">
                                <div class="product-code">Mã sản phẩm: 001</div>
                                <div class="product-name">Tên sản phẩm</div>
                                <div class="product-category">Danh mục: Danh mục 1</div>
                                <div class="product-price">Giá: $100</div>
                                <div class="product-quantity">Số lượng: 10</div>
                                <div class="product-actions">
                                    <button class="edit-product">Sửa</button>
                                    <button class="delete-product">Xóa</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default ShowProductRPComponent;