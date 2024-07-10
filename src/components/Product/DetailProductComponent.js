import React from "react";
import "../../styles/Product/DetailProduct.scss";
import { withRouter } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import ErrorComponent from "../Error/ErrorComponent";
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import { get, post } from "../../util/api";

class DetailProductComponent extends React.Component {
  state = {};

  async componentDidMount() {
    const book_id = this.props.match.params.id;
    var book_detail;
    await get("/product/detail", { book_id })
      .then((response) => {
        book_detail = response.book_detail;
      })
      .catch((error) => {
        console.error(error);
        // Xử lý lỗi nếu có
      });

    var list_book_new;

    await get("/home/list-product-new")
      .then((response) => {
        list_book_new = response.list_book_new;
      })
      .catch((error) => {
        console.error(error);
      });
    if (book_detail) {
      book_detail.quantity = 1;
      this.setState({
        book_detail: book_detail,
        list_book_new,
      });
    }
  }

  handleDecQuantity(max) {
    let book_detail = { ...this.state.book_detail };
    book_detail.quantity =
      Number(book_detail.quantity) - 1 > 0
        ? Number(book_detail.quantity) - 1
        : 1;
    this.setState({
      book_detail,
    });
  }
  handleIncQuantity(max) {
    let book_detail = { ...this.state.book_detail };
    book_detail.quantity =
      Number(book_detail.quantity) + 1 > max
        ? max
        : Number(book_detail.quantity) + 1;
    this.setState({
      book_detail,
    });
  }

  async handleAddOrder() {
    await post("/order/add-item", { ...this.state.book_detail })
      .then((response) => {
        if (response.addOrder) {
          toast.dismiss();
          toast.success("Đã vào giỏ hàng !", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      })
      .catch((error) => {
        console.error(error);
        // Xử lý lỗi nếu có
        toast.dismiss();
        toast.warning("Vui lòng đăng nhập !", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  }

  index_small_img = 0;

  handleViewImg(index) {
    const images = this.state.book_detail.img;
    this.index_small_img = index;
    var small_img = document.getElementsByClassName(
      "product-details__small-img"
    );

    for (var i = 0; i < small_img.length; i++) {
      small_img[i].classList.remove("isChoose");
    }
    // alert(index)
    var anh = document.getElementById("front-img");
    anh.src = images[this.index_small_img].image_url;
    // clearBoder()
    small_img[this.index_small_img].classList.add("isChoose");
  }

  highlightStars(index) {
    const stars = document.getElementsByClassName("rating");
    for (let i = 0; i <= index; i++) {
      stars[i].classList.add("highlight");
    }
  }
  resetStars() {
    const stars = document.getElementsByClassName("rating");
    for (let i = 0; i < stars.length; i++) {
      if (!stars[i].classList.contains("selected")) {
        stars[i].classList.remove("highlight");
      }
    }
  }

  selectStars(index) {
    const stars = document.getElementsByClassName("rating");
    for (let i = 0; i < stars.length; i++) {
      stars[i].classList.remove("selected");
    }

    for (let i = 0; i <= index; i++) {
      stars[i].classList.add("selected");
    }

    this.resetStars();
  }

  async handleRating(book_id) {
    const stars = document.getElementsByClassName("rating");
    const comment = document.getElementsByClassName("write-comment")[0].value;
    // console.log(comment);
    var rating = 0;
    for (let i = 0; i < stars.length; i++) {
      if (stars[i].classList.contains("selected")) {
        rating++;
      }
    }

    if (rating === 0 || comment.length === 0) {
      toast.dismiss();
      toast.error("Đánh giá thật bại !", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    await post("/product/rating", { rating: rating, comment, book_id: book_id })
      .then((response) => {
        // console.log(response);
      })
      .catch((error) => {
        console.error(error);
        // Xử lý lỗi nếu có
      });

    // this.componentDidMount();
    window.location.reload();
  }

  async handleFavorite(book_id) {
    // alert('handleFavorite')
    var isFavorite = false;
    await post("/product/favorite", { book_id: book_id })
      .then((response) => {
        console.log(response);
        if (response.isFavorites) {
          isFavorite = response.isFavorites;
          console.log("true");
        }
      })
      .catch((error) => {
        console.log("error");
        // console.error(error);
        // Xử lý lỗi nếu có
        if (error.response.data.isLogin === false) {
          toast.dismiss();
          toast.warning("Vui lòng đăng nhập !", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      });

    console.log(isFavorite);
    if (isFavorite) {
      if (isFavorite === true) {
        toast.dismiss();
        toast.success("Đã thích !", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } else {
      toast.dismiss();
      toast.warning("Bỏ thích !", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    this.componentDidMount();
  }

  startX = 0;
  dist = 0;

  handleTouchStart = (event) => {
    this.startX = event.touches[0].clientX;
  };

  handleTouchMove = (event) => {
    const currentX = event.touches[0].clientX;
    this.dist = this.startX - currentX;
  };

  handleTouchEnd = () => {
    const images = this.state.book_detail.img;
    var small_img = document.getElementsByClassName(
      "product-details__small-img"
    );

    for (var i = 0; i < small_img.length; i++) {
      small_img[i].classList.remove("isChoose");
    }
    var anh = document.getElementById("front-img");

    if (this.dist > 0) {
      this.index_small_img++;
      if (this.index_small_img > images.length - 1) {
        this.index_small_img = 0;
      }
      anh.src = images[this.index_small_img].image_url;
      small_img[this.index_small_img].classList.add("isChoose");
    } else if (this.dist < 0) {
      this.index_small_img--;
      if (this.index_small_img < 0) {
        this.index_small_img = images.length - 1;
      }
      anh.src = images[this.index_small_img].image_url;
      small_img[this.index_small_img].classList.add("isChoose");
    }
    this.dist = 0;
  };

  handleDetailPage(book_id) {
    window.location = "/detail/" + book_id;
  }

  scrollRightButton(e) {
    let container = e.target.parentNode.getElementsByClassName("list-item")[0];

    // const container = document.querySelector('.list-item');
    container.scrollBy({
      left: 200,
      behavior: "smooth",
    });
  }

  scrollLeftButton(e) {
    let container = e.target.parentNode.getElementsByClassName("list-item")[0];
    // console.log(container);
    // const container = document.querySelector('.list-item');
    container.scrollBy({
      left: -200,
      behavior: "smooth",
    });
  }

  render() {
    return (
      <>
        {this.state && this.state.book_detail ? (
          <div className="page-detail-container">
            <div className="product-details">
              <div className="image">
                <div className="product-details__small">
                  {this.state.book_detail.img &&
                    this.state.book_detail.img.map((item, index) => {
                      return (
                        <div
                          className={`product-details__small-img ${
                            index == 0 ? "isChoose" : ""
                          }`}
                        >
                          <img
                            src={item.image_url}
                            alt=""
                            onClick={() => this.handleViewImg(index)}
                          />
                        </div>
                      );
                    })}
                </div>
                <div className="large_img" onMous>
                  <img
                    id="front-img"
                    src={
                      this.state.book_detail.img
                        ? this.state.book_detail.img[0].image_url
                        : ""
                    }
                    alt="Ảnh sản phẩm"
                    onTouchStart={this.handleTouchStart}
                    onTouchMove={this.handleTouchMove}
                    onTouchEnd={this.handleTouchEnd}
                  />
                </div>
              </div>

              <div className="detail">
                <h1>{this.state.book_detail.title}</h1>
                <div className="product-rating-statis">
                  {(() => {
                    const jsxElements = [];
                    for (let i = 0; i < 5; i++) {
                      if (i <= this.state.book_detail.rating - 1) {
                        jsxElements.push(
                          <span className="star highlight">&#9733;</span>
                        );
                      } else {
                        jsxElements.push(<span className="star">&#9733;</span>);
                      }
                    }
                    return jsxElements;
                  })()}
                  |{" "}
                  {this.state.book_detail.user_rating
                    ? this.state.book_detail.user_rating
                    : 0}{" "}
                  lượt đánh giá | Đã bán: {this.state.book_detail.quantity_sold}
                </div>
                <hr />
                <div className="product-price">
                  Giá:{" "}
                  <span>
                    {this.state.book_detail.price.replace(
                      /(\d)(?=(\d\d\d)+(?!\d))/g,
                      "$1,"
                    ) + "đ"}
                  </span>
                </div>

                <div className="quantity-remaining">
                  Số lượng còn lại:{" "}
                  <span>{this.state.book_detail.quantity_remaining}</span>
                </div>

                <div className="product-quantity">
                  Số lượng:&nbsp;&nbsp;
                  {/* <input type="number" id="quantity" name="quantity" min="1" max={this.state.book_detail.quantity_remaining} value={this.state.book_detail.quantity} onChange={(e) => this.handleQuantityInput(e)} /> */}
                  <div className="quantity-input">
                    <button
                      className="decrease-button"
                      onClick={() => {
                        this.handleDecQuantity(
                          this.state.book_detail.quantity_remaining
                        );
                      }}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      className="cart-item-quantity"
                      min="1"
                      max={this.state.book_detail.quantity_remaining}
                      value={this.state.book_detail.quantity}
                    />
                    <button
                      className="increase-button"
                      onClick={() => {
                        this.handleIncQuantity(
                          this.state.book_detail.quantity_remaining
                        );
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  className="buy-button"
                  onClick={() => this.handleAddOrder()}
                >
                  Mua hàng
                </button>
                <button
                  className="favorite-button"
                  onClick={() => this.handleFavorite(this.state.book_detail.id)}
                >
                  {this.state.book_detail.favorite ? "Đã thích" : "Yêu thích"}
                </button>

                <div className="info">Thông tin</div>
                <hr />
                <div className="product-category">
                  Danh mục: <span>{this.state.book_detail.category_name}</span>
                </div>
                <div className="product-publisher">
                  Tác giả: <span>{this.state.book_detail.author}</span>
                </div>

                <div className="product-reviews">
                  <p>Đánh giá sản phẩm:</p>

                  {typeof this.state.book_detail.isRating !== "undefined" ? (
                    this.state.book_detail.isRating === true ? (
                      <>
                        <ol class="list-inline" title="Average rating">
                          {(() => {
                            const jsxElements = [];
                            for (let i = 0; i < 5; i++) {
                              if (i < this.state.book_detail.my_rating) {
                                jsxElements.push(
                                  <li
                                    class="rating highlight selected"
                                    onMouseOver={() => this.highlightStars(i)}
                                    onClick={() => this.selectStars(i)}
                                    onMouseOut={this.resetStars}
                                  >
                                    &#9733;
                                  </li>
                                );
                              } else {
                                jsxElements.push(
                                  <li
                                    class="rating"
                                    onMouseOver={() => this.highlightStars(i)}
                                    onClick={() => this.selectStars(i)}
                                    onMouseOut={this.resetStars}
                                  >
                                    &#9733;
                                  </li>
                                );
                              }
                            }
                            return jsxElements;
                          })()}
                        </ol>
                        <textarea
                          class="write-comment"
                          placeholder="Nhập lời nhận xét"
                        ></textarea>
                        <button
                          onClick={() =>
                            this.handleRating(this.state.book_detail.id)
                          }
                        >
                          Đánh giá lại
                        </button>
                      </>
                    ) : (
                      <>
                        <ol class="list-inline" title="Average rating">
                          <li
                            class="rating"
                            onMouseOver={() => this.highlightStars(0)}
                            onClick={() => this.selectStars(0)}
                            onMouseOut={this.resetStars}
                          >
                            &#9733;
                          </li>

                          <li
                            class="rating"
                            onMouseOver={() => this.highlightStars(1)}
                            onClick={() => this.selectStars(1)}
                            onMouseOut={this.resetStars}
                          >
                            &#9733;
                          </li>

                          <li
                            class="rating"
                            onMouseOver={() => this.highlightStars(2)}
                            onClick={() => this.selectStars(2)}
                            onMouseOut={this.resetStars}
                          >
                            &#9733;
                          </li>

                          <li
                            class="rating"
                            onMouseOver={() => this.highlightStars(3)}
                            onClick={() => this.selectStars(3)}
                            onMouseOut={this.resetStars}
                          >
                            &#9733;
                          </li>

                          <li
                            class="rating"
                            onMouseOver={() => this.highlightStars(4)}
                            onClick={() => this.selectStars(4)}
                            onMouseOut={this.resetStars}
                          >
                            &#9733;
                          </li>
                        </ol>
                        <textarea
                          class="write-comment"
                          placeholder="Nhập lời nhận xét"
                        ></textarea>
                        <button
                          onClick={() =>
                            this.handleRating(this.state.book_detail.id)
                          }
                        >
                          Gửi đánh giá
                        </button>
                      </>
                    )
                  ) : (
                    <>
                      <ol class="list-inline" title="Average rating">
                        <li
                          class="rating"
                          // onMouseOver={() => this.highlightStars(0)}
                          // onClick={() => this.selectStars(0)}
                          // onMouseOut={this.resetStars}
                        >
                          &#9733;
                        </li>

                        <li
                          class="rating"
                          // onMouseOver={() => this.highlightStars(1)}
                          // onClick={() => this.selectStars(1)}
                          // onMouseOut={this.resetStars}
                        >
                          &#9733;
                        </li>

                        <li
                          class="rating"
                          // onMouseOver={() => this.highlightStars(2)}
                          // onClick={() => this.selectStars(2)}
                          // onMouseOut={this.resetStars}
                        >
                          &#9733;
                        </li>

                        <li
                          class="rating"
                          // onMouseOver={() => this.highlightStars(3)}
                          // onClick={() => this.selectStars(3)}
                          // onMouseOut={this.resetStars}
                        >
                          &#9733;
                        </li>

                        <li
                          class="rating"
                          // onMouseOver={() => this.highlightStars(4)}
                          // onClick={() => this.selectStars(4)}
                          // onMouseOut={this.resetStars}
                        >
                          &#9733;
                        </li>
                      </ol>

                      <a href="/login"> Vui lòng đăng nhập để đánh giá</a>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="product-description">
              <div className="title">Nội dung:</div>
              <div className="content">{`${this.state.book_detail.description}`}</div>
            </div>

            {/* <hr /> */}
            <div class="review-list">
              <h2 class="title">Đánh giá của khách hàng:</h2>

              {this.state.book_detail.allComment.length > 0 ? (
                this.state.book_detail.allComment.map((item, index) => {
                  return (
                    <div class="review">
                      <p class="customer">Khách hàng: {item.full_name}</p>
                      <div class="rating">
                        {item.stars == 1 ? (
                          <span class="stars">★</span>
                        ) : item.stars == 2 ? (
                          <span class="stars">★★</span>
                        ) : item.stars == 3 ? (
                          <span class="stars">★★★</span>
                        ) : item.stars == 4 ? (
                          <span class="stars">★★★★</span>
                        ) : item.stars == 5 ? (
                          <span class="stars">★★★★★</span>
                        ) : null}
                      </div>
                      <p class="comment">
                        {item.comment ? item.comment : "Không có nhận xét"}
                      </p>
                      <hr style={{ opacity: "0.7" }} />
                    </div>
                  );
                })
              ) : (
                <div>CHƯA CÓ NHẬN XÉT</div>
              )}
            </div>

            {this.state && this.state.list_book_new && (
              <div className="category trend">
                <div className="title">
                  <label>SÁCH MỚI RA MẮT</label>
                </div>
                <div className="list-item" id="list-item-container">
                  {this.state.list_book_new.map((item, index) => {
                    return (
                      <>
                        <div
                          key={index}
                          className="product-card"
                          title={item.title}
                          onClick={() => this.handleDetailPage(item.id)}
                        >
                          <div className="product-image">
                            <img src={item.image_url} alt="Book 1" />
                          </div>
                          <div className="product-info">
                            <h2 className="product-title">{item.title}</h2>
                            <p className="product-author">By {item.author}</p>
                            <p className="product-price">
                              {item.price.replace(
                                /(\d)(?=(\d\d\d)+(?!\d))/g,
                                "$1,"
                              ) + "đ"}
                            </p>
                            <div className="product-rating">
                              {(() => {
                                const jsxElements = [];
                                for (let i = 0; i < 5; i++) {
                                  if (i <= item.rating - 1) {
                                    jsxElements.push(
                                      <span className="star highlight">
                                        &#9733;
                                      </span>
                                    );
                                  } else {
                                    jsxElements.push(
                                      <span className="star">&#9733;</span>
                                    );
                                  }
                                }
                                return jsxElements;
                              })()}
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
                <button
                  className="prev-button"
                  id="prev-button"
                  onClick={(e) => this.scrollLeftButton(e)}
                >
                  &#60;
                </button>{" "}
                {/* Nút di chuyển sang trái */}
                <button
                  className="next-button"
                  id="next-button"
                  onClick={(e) => this.scrollRightButton(e)}
                >
                  &#62;
                </button>{" "}
                {/* Nút di chuyển sang trái */}
              </div>
            )}
          </div>
        ) : (
          <ErrorComponent />
        )}
      </>
    );
  }
}

export default withRouter(DetailProductComponent);
