import React from "react";
import "../../admin_styles/layout/Main_Admin.scss";
import "../../admin_styles/Product/ShowProducts.scss";
import { get, post } from "../../util/api";
import { withRouter } from "react-router";
import { removeExtraSpaces } from "../../util/validateInput";
class ShowProductsComponent extends React.Component {
  state = { selectCategory: 0 };

  async componentDidMount() {
    let fullListProduct;
    let fullListCategory;

    await get("/product/admin-fullproduct")
      .then((response) => {
        fullListProduct = response.fullListProduct;
      })
      .catch((error) => {
        console.error(error);
        // Xử lý lỗi nếu có
      });

    await get("/category/admin-fullcategory")
      .then((response) => {
        fullListCategory = response.fullListCategory;
      })
      .catch((error) => {
        console.error(error);
        // Xử lý lỗi nếu có
      });

    this.setState({
      fullListProduct,
      fullListCategory,
    });
  }

  async handleSearch(e) {
    e.preventDefault();

    const input = document.querySelector('input[name="search"]');
    const searchValue = removeExtraSpaces(input.value);
    if (searchValue.length === 0) {
      this.componentDidMount();
    }
    // // const params = new URLSearchParams();
    // params.append('key', searchValue);

    // const queryString = params.toString();

    // const { location } = this.props;
    // const params = new URLSearchParams(location.search);
    // const key = params.get('key');
    // this.setState({ key })
    // window.location.href = `http://localhost.com/search?${queryString}`;

    var search_items;
    await post("/product/search-items", { key: searchValue })
      .then((response) => {
        // console.log(response);
        search_items = response.searchItems;
      })
      .catch((error) => {
        console.error(error);
        // Xử lý lỗi nếu có
      });
    this.setState({ fullListProduct: search_items });

    // Chuyển hướng đến URL với tham số
    // window.location.href = `http://localhost.com/search?${queryString}`;

    // window.location = `/search?${queryString}`;
    // Xử lý tìm kiếm sản phẩm
  }

  async handleRemoveProduct(book_id, isDelete) {
    let isSuccess = false;
    await post("/product/admin-removeproduct", { book_id, isDelete })
      .then((response) => {
        if (response.isSuccess) {
          isSuccess = true;
        }
      })
      .catch((error) => {
        console.error(error);
        // Xử lý lỗi nếu có
      });

    if (isSuccess) {
      this.componentDidMount();
    }
  }

  async selectByCategory(e) {
    if (e.target.value == 0) {
      this.componentDidMount();
    }

    let list_items;
    await post("/product/category", { key: e.target.value })
      .then((response) => {
        console.log("post");
        console.log(response.listItems);
        list_items = response.listItems;
      })
      .catch((error) => {
        console.error(error);
        // Xử lý lỗi nếu có
      });
    this.setState({ fullListProduct: list_items });
  }

  render() {
    return (
      <div className="show-products-admin">
        <h1>Quản lý sách</h1>
        <div className="page-struct">
          <div className="filter-control">
            {/* <input type="number" id="IDsp" name="Ma" value="ID" /> */}
            <div className="search-bar">
              {/* <!--Thanh tìm kiếm--> */}
              <form
                action="#"
                method="get"
                className="form-search"
                onSubmit={(e) => {
                  this.handleSearch(e);
                }}
              >
                <input
                  type="text"
                  name="search"
                  placeholder="Tìm kiếm sản phẩm..."
                />
                <button type="submit">Tìm kiếm</button>
              </form>
            </div>
            <select
              id="nh"
              name="nh"
              onChange={(e) => this.selectByCategory(e)}
            >
              <option value={0}>Tất cả danh mục</option>
              {this.state &&
                this.state.fullListCategory &&
                this.state.fullListCategory.map((item, index) => {
                  return <option value={item.name}>{item.name}</option>;
                })}
            </select>

            <a
              href="/admin/add-product"
              style={{ textDecoration: "none", color: "black" }}
            >
              <button className="btn-add">
                Thêm mới
                <img
                  src="https://cdn3.iconfinder.com/data/icons/eightyshades/512/14_Add-512.png"
                  alt="ThemMoi"
                />
              </button>
            </a>
          </div>

          <table>
            <thead>
              <tr>
                {/* <th>STT</th> */}
                <th className="rp-none">Mã hàng</th>
                <th>Tên sách</th>
                <th className="rp-none">Avatar</th>
                <th className="rp-none">Danh mục</th>
                <th className="rp-none">Giá</th>
                <th>Số lượng</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {this.state &&
                this.state.fullListProduct &&
                this.state.fullListProduct.map((item, index) => {
                  return (
                    <tr>
                      {/* <td>{index + 1}</td> */}
                      <td className="rp-none">SP #{item.id}</td>
                      <td>{item.title}</td>
                      <td className="rp-none">
                        <div className="avatar">
                          <img src={item.image_url} alt="avatar" />
                        </div>
                      </td>
                      <td className="rp-none">{item.name}</td>
                      <td className="rp-none">
                        {item.price.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") +
                          "đ"}
                      </td>
                      <td>{item.quantity_remaining}</td>
                      <td>
                        <div className="button-group">
                          <a
                            href={`/admin/edit-product/${item.id}`}
                            style={{ textDecoration: "none", color: "black" }}
                          >
                            <button className="s">
                              <img src="/edit.png" alt="Sua" />
                              {/* Sửa */}
                            </button>
                          </a>

                          {item.isDelete == true ? (
                            <button
                              className="x"
                              onClick={() =>
                                this.handleRemoveProduct(item.id, item.isDelete)
                              }
                            >
                              <img src="/refresh.png" alt="Xoa" />
                              {/* Phục hồi */}
                            </button>
                          ) : (
                            <button
                              className="x"
                              onClick={() =>
                                this.handleRemoveProduct(item.id, item.isDelete)
                              }
                            >
                              <img src="/bin.png" alt="Xoa" />
                              {/* Xóa */}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              {/* Thêm các hàng khác tương tự */}
            </tbody>
            <tfoot>
              <tr>{/* <td colSpan="8">Tổng tiền:</td> */}</tr>
            </tfoot>
          </table>
        </div>
      </div>
    );
  }
}

export default withRouter(ShowProductsComponent);
