import React from "react";
// import '../styles/layout/Main.scss';
// import '../components/Home/HomeComponent.js'
import "../../styles/Home/Home.scss";
import { get, post } from "../../util/api";

class HomeComponent extends React.Component {
  state = {};

  async componentDidMount() {
    var list_book_new, list_book_rating, listBanner, list_topSelling;

    await get("/home/list-product-new")
      .then((response) => {
        list_book_new = response.list_book_new;
      })
      .catch((error) => {
        console.error(error);
      });

    await get("/home/list-product-rating")
      .then((response) => {
        list_book_rating = response.list_book_rating;
      })
      .catch((error) => {
        console.error(error);
      });

    await get("/product/admin-topselling")
      .then((response) => {
        console.log(response);
        list_topSelling = response.list_topSelling;
      })
      .catch((error) => {
        console.error(error);
      });

    await get("/banner/get-banner")
      .then((response) => {
        listBanner = response.listBanner;
      })
      .catch((error) => {
        console.error(error);
      });

    this.setState({
      list_book_new,
      list_book_rating,
      listBanner,
      list_topSelling,
    });
  }

  async banner_slide() {
    const slides = document.querySelectorAll(".slide");
    const swiper = document.getElementsByClassName("swiper-pagination-bullet");
    let currentSlide = 0;
    function showSlide(index) {
      slides.forEach((slide, idx) => {
        if (idx === index) {
          slide.classList.add("active");
          swiper[idx].classList.add("active");
        } else {
          slide.classList.remove("active");
          swiper[idx].classList.remove("active");
        }
      });
    }

    function nextSlide() {
      currentSlide++;
      if (currentSlide === slides.length) {
        currentSlide = 0;
      }
      showSlide(currentSlide);
    }

    setInterval(nextSlide, 5000);
  }

  handleDetailPage(book_id) {
    window.location = "/detail/" + book_id;
  }

  scrollRightButton(e) {
    let container = e.target.parentNode.getElementsByClassName("list-item")[0];

    container.scrollBy({
      left: 200,
      behavior: "smooth",
    });
  }

  scrollLeftButton(e) {
    let container = e.target.parentNode.getElementsByClassName("list-item")[0];

    container.scrollBy({
      left: -200,
      behavior: "smooth",
    });
  }

  handleOverFlow(e) {}

  render() {
    return (
      <>
        <div className="header-banner">
          <div className="banner" onLoad={() => this.banner_slide()}>
            {this.state &&
              this.state.listBanner &&
              this.state.listBanner.map((item, index) => {
                if (index === 0) {
                  return (
                    <div className="slide active">
                      <img src={item.link_banner} alt="Slide 3" />
                    </div>
                  );
                } else {
                  return (
                    <div className="slide">
                      <img src={item.link_banner} alt="Slide 3" />
                    </div>
                  );
                }
              })}

            <div className="swiper-pagination">
              {this.state &&
                this.state.listBanner &&
                this.state.listBanner.map((item, index) => {
                  if (index === 0) {
                    return (
                      <span className="swiper-pagination-bullet active"></span>
                    );
                  } else {
                    return <span className="swiper-pagination-bullet"></span>;
                  }
                })}
            </div>
          </div>
        </div>

        <div className="main-container">
          {/* Sách bán chạy */}
          {this.state && this.state.list_book_new && (
            <div className="category trend">
              <div className="title">
                <label>SÁCH MỚI RA MẮT</label>
              </div>
              <div
                className="list-item"
                id="list-item-container"
                onLoad={(e) => {
                  this.handleOverFlow(e);
                }}
              >
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

          {this.state && this.state.list_topSelling && (
            <div className="category trend">
              <div className="title">
                <label>SÁCH BÁN CHẠY</label>
              </div>
              <div
                className="list-item"
                id="list-item-container"
                onLoad={(e) => {
                  this.handleOverFlow(e);
                }}
              >
                {this.state.list_topSelling.map((item, index) => {
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
          {this.state && this.state.list_book_rating && (
            <div className="category trend">
              <div className="title">
                <label>SÁCH ĐÁNH GIÁ CAO</label>
              </div>
              <div
                className="list-item"
                id="list-item-container"
                onLoad={(e) => {
                  this.handleOverFlow(e);
                }}
              >
                {this.state.list_book_rating.map((item, index) => {
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
      </>
    );
  }
}

export default HomeComponent;
