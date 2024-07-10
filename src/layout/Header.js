// import React from "react";
// import "../styles/layout/Header.scss";
// import { connect } from "react-redux";
// import { get, post } from "../util/api";
// import { removeExtraSpaces } from "../util/validateInput";

// import store from "../store/store";
// import {
//   updateUserName,
//   updateUserAvatar,
//   clearUser,
// } from "../store/actions/userActions";
// class Header extends React.Component {
//   state = {};

//   async componentDidMount() {
//     var category;
//     var login = {};

//     await get("/user/islogin")
//       .then((response) => {
//         if (response.isLogin) {
//           login.isLogin = true;
//           login.user = response.userinfo;
//         } else {
//           login.isLogin = false;
//         }
//       })
//       .catch((error) => {
//         console.error(error);
//         // Xử lý lỗi nếu có
//       });
//     this.setState({
//       login,
//     });
//     let orderNumber;
//     await get("/order/get-notify")
//       .then((response) => {
//         orderNumber = response.orderNumber;
//       })
//       .catch((error) => {
//         console.error(error);
//         // Xử lý lỗi nếu có
//       });

//     if (orderNumber) {
//       this.setState({
//         orderNumber,
//       });
//     }

//     await get("/category/get-category")
//       .then((response) => {
//         category = response.category;
//       })
//       .catch((error) => {
//         console.error(error);
//         // Xử lý lỗi nếu có
//       });
//     this.setState({
//       category,
//     });
//   }

//   async handleSigout() {
//     await get("/user/sigout")
//       .then((response) => {
//         // if (!response.isLogin) {
//         //     console.log('islogin false');
//         //     localStorage.removeItem('name');
//         //     this.props.clearUser();
//         //     // sessionStorage.removeItem('avatar');
//         // }
//       })
//       .catch((error) => {
//         console.error(error);
//         // Xử lý lỗi nếu có
//       });
//     window.location = "/";
//   }

//   handleSearch(event) {
//     event.preventDefault(); // Ngăn chặn hành vi mặc định của sự kiện submit form

//     const input = document.querySelector('input[name="search"]');

//     const searchValue = removeExtraSpaces(input.value);

//     // searchValue.replace(/\s/g, "");

//     if (searchValue.length > 0) {
//       const params = new URLSearchParams();
//       params.append("key", searchValue);

//       const queryString = params.toString();

//       // Chuyển hướng đến URL với tham số
//       // window.location.href = `http://localhost.com/search?${queryString}`;

//       window.location = `/search?${queryString}`;
//     }
//   }

//   handleTouchUser(e) {
//     var screenWidth =
//       window.innerWidth ||
//       document.documentElement.clientWidth ||
//       document.body.clientWidth;

//     if (screenWidth < 820) {
//       window.location = "/user";
//     }
//   }

//   handleTouchCategory(e) {
//     var screenWidth =
//       window.innerWidth ||
//       document.documentElement.clientWidth ||
//       document.body.clientWidth;

//     if (screenWidth < 820) {
//       let elementLi = e.currentTarget.parentNode.parentNode;
//       // e.preventDefault();
//       elementLi.classList.contains("active")
//         ? elementLi.classList.remove("active")
//         : elementLi.classList.add("active");
//     }
//   }

//   renderCategory(category) {
//     if (category && category.length > 0) {
//       return category.map((item, index) => {
//         if (item.child_category) {
//           return (
//             <>
//               <li key={index} className="child">
//                 <div className="category-title">
//                   <a href={`/category?key=${encodeURIComponent(item.name)}`}>
//                     {item.name}
//                   </a>
//                   <span
//                     onClick={(e) => {
//                       this.handleTouchCategory(e);
//                     }}
//                   ></span>
//                 </div>
//                 <ul>{this.renderCategory(item.child_category)}</ul>
//               </li>
//             </>
//           );
//         } else {
//           return (
//             <li key={index} className="no-child">
//               <div>
//                 <a href={`/category?key=${encodeURIComponent(item.name)}`}>
//                   {item.name}
//                 </a>
//                 <span></span>
//               </div>
//             </li>
//           );
//         }
//       });
//     }
//     return null;
//   }

//   handleOpenCategory() {
//     const dropdown = document.getElementById("dropdown-category");
//     if (dropdown) {
//       if (
//         window.getComputedStyle(dropdown).getPropertyValue("display") == "none"
//       ) {
//         dropdown.style.display = "block";
//         dropdown.style.opacity = "0";
//         dropdown.style.height = "0";

//         setTimeout(function () {
//           dropdown.style.opacity = "1";
//           dropdown.style.height = "100%"; /* Chiều cao mong muốn */
//         }, 100);
//       }
//     }
//   }

//   handleCloseCategory(e) {
//     const dropdown = e.target.parentNode.parentNode.parentNode;
//     console.log(dropdown);
//     if (dropdown) {
//       if (
//         window.getComputedStyle(dropdown).getPropertyValue("display") == "block"
//       ) {
//         dropdown.style.display = "none";
//       }
//     }
//   }

//   render() {
//     // function renderCategory(category) {
//     //     if (category && category.length > 0) {
//     //         return category.map((item, index) => {
//     //             if (item.child_category) {
//     //                 return (
//     //                     <>
//     //                         <li key={index}><a href={`/category?key=${encodeURIComponent(item.name)}`} onClick={(e) => { this.handleTouchCategory(e) }} >{item.name}</a><span></span>
//     //                             <ul>
//     //                                 {renderCategory(item.child_category)}
//     //                             </ul>

//     //                         </li>

//     //                     </>

//     //                 );
//     //             } else {

//     //                 return (
//     //                     <li key={index}><a href={`/category?key=${encodeURIComponent(item.name)}`} onClick={(e) => { this.handleTouchCategory(e) }}>{item.name}</a><span></span></li>
//     //                 );

//     //             }
//     //         });
//     //     }
//     //     return null;
//     // }

//     return (
//       <>
//         <header>
//           <div className="header-main">
//             <div className="container">
//               <div className="row">
//                 <div className="logo">
//                   <a href="/">
//                     <img src="/sachlogotrang.png" alt="Logo" />
//                   </a>
//                 </div>

//                 {/* position */}
//                 {/* <div className="header-m">
//                   <li className="category" id="root-category">
//                     <ul className="dropdown">
//                       <div className="dropbtn">
//                         <span
//                           className="icon-menu"
//                           onClick={() => this.handleOpenCategory()}
//                         >
//                           <img src="/sort.png" />
//                         </span>
//                         <span className="icon-seemore"></span>
//                       </div>
//                       <div className="dropdown-content" id="dropdown-category">
//                         <div className="title-category-rp">
//                           <div className="ico-close">
//                             <span
//                               onClick={(e) => this.handleCloseCategory(e)}
//                             ></span>
//                           </div>
//                           <div className="title-category">
//                             Danh mục sản phẩm
//                           </div>
//                         </div>
//                         {this.state &&
//                           this.state.category &&
//                           this.renderCategory(this.state.category)}
//                       </div>
//                     </ul>
//                   </li>

//                   <div className="search-bar">
//                     <form
//                       action="#"
//                       method="get"
//                       className="form-search"
//                       onSubmit={(e) => {
//                         this.handleSearch(e);
//                       }}
//                     >
//                       <input
//                         type="text"
//                         name="search"
//                         placeholder="Tìm kiếm sản phẩm..."
//                         required
//                       />
//                       <button type="submit">
//                         <a>Tìm kiếm</a>
//                       </button>
//                     </form>
//                   </div>
//                   {this.state &&
//                   this.state.login &&
//                   this.state.login.isLogin ? (
//                     <div className="icon-control-container">
//                       <div className="icon-control">
//                         <div className="order-icon">
//                           <a href="/order">
//                             <div className="icon">
//                               {this.state.orderNumber &&
//                                 this.state.orderNumber > 0 && (
//                                   <div className="notify-number">
//                                     {this.state.orderNumber}
//                                   </div>
//                                 )}
//                             </div>
//                             <div className="title">Giỏ hàng</div>
//                           </a>
//                         </div>
//                         <div
//                           className="user-icon"
//                           onClick={(e) => this.handleTouchUser(e)}
//                         >
//                           <a>
//                             <div className="icon"></div>
//                             <div className="title">
//                               {this.state.login.user.full_name}
//                             </div>
//                           </a>
//                           <div className="dropdown-content">
//                             <a href="/user/info">Thông tin cá nhân</a>
//                             <a href="/user/order">Đơn hàng của tôi</a>
//                             <a href="#" onClick={() => this.handleSigout()}>
//                               Đăng xuất
//                             </a>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="icon-control-container">
//                       <div className="icon-control">
//                         <div className="order-icon">
//                           <a href="/order">
//                             <div className="icon"></div>
//                             <div className="title">Giỏ hàng</div>
//                           </a>
//                         </div>
//                         <div className="user-icon">
//                           <a href="/login">
//                             <div className="icon"></div>
//                             <div className="title">Tài khoản</div>
//                           </a>
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div> */}


//                 {/* position */}
//                 <div className='header-m'>
//                   <li className='category' id='root-category'>
//                     <ul className="dropdown">
//                       <div className="dropbtn">
//                         <span className='icon-menu' onClick={() => this.handleOpenCategory()}>
//                           <img src='/sort.png' />
//                         </span>
//                         <span className='icon-seemore'></span>
//                       </div>
//                       <div className="dropdown-content" id='dropdown-category'>
//                         <div className='title-category-rp'>
//                           <div className='ico-close'>
//                             <span onClick={(e) => this.handleCloseCategory(e)}></span>
//                           </div>
//                           <div className='title-category'>
//                             Danh mục sản phẩm
//                           </div>
//                         </div>
//                         {this.state && this.state.category && this.renderCategory(this.state.category)}
//                       </div>
//                     </ul>
//                   </li>

//                   <div className="search-bar">
//                     <form action="#" method="get" className='form-search' onSubmit={(e) => { this.handleSearch(e) }}>
//                       <input type="text" name="search" placeholder="Tìm kiếm sản phẩm..." required />
//                       <button type="submit"><a>Tìm kiếm</a></button>
//                     </form>
//                   </div>
//                   {this.state && this.state.login && this.state.login.isLogin ?

//                     <div className="icon-control-container">
//                       <div className='icon-control'>
//                         <div className="order-icon">
//                           <a href="/order">
//                             <div className='icon'>
//                             </div>
//                             <div className='title'>
//                               Giỏ hàng
//                             </div>
//                           </a>

//                         </div>
//                         <div className="user-icon" onClick={(e) => this.handleTouchUser(e)}>
//                           <a>
//                             <div className='icon'>
//                             </div>
//                             <div className='title'>
//                               {this.state.login.user.full_name}
//                             </div>
//                           </a>
//                           <div className="dropdown-content">
//                             <a href="/user/info">Thông tin cá nhân</a>
//                             <a href="/user/order">Đơn hàng của tôi</a>
//                             <a href="#" onClick={() => this.handleSigout()}>Đăng xuất</a>
//                           </div>

//                         </div>
//                       </div>
//                     </div>

//                     :

//                     <div className="icon-control-container">
//                       <div className='icon-control'>
//                         <div className="order-icon">
//                           <a href="/order">
//                             <div className='icon'>
//                             </div>
//                             <div className='title'>
//                               Giỏ hàng
//                             </div>
//                           </a>

//                         </div>
//                         <div className="user-icon">
//                           <a href="/login">
//                             <div className='icon'>
//                             </div>
//                             <div className='title'>
//                               Tài khoản
//                             </div>

//                           </a>

//                         </div>
//                       </div>
//                     </div>
//                   }
//                 </div>


//               </div>
//             </div>
//           </div>
//         </header>
//       </>
//     );
//   }
// }

// // export default Header
// export default Header;





import React from 'react';
import '../styles/layout/Header.scss'
import { connect } from 'react-redux';
import { get, post } from '../util/api';
import { removeExtraSpaces } from '../util/validateInput';

import store from '../store/store';
import { updateUserName, updateUserAvatar, clearUser } from '../store/actions/userActions';
class Header extends React.Component {

  state = {}

  async componentDidMount() {
    var category;
    var login = {};

    await get('/user/islogin')
      .then(response => {
        if (response.isLogin) {
          login.isLogin = true;
          login.user = response.userinfo;
        } else {
          login.isLogin = false;
        }

      })
      .catch(error => {
        console.error(error);
        // Xử lý lỗi nếu có
      });
    this.setState({
      login
    })
    let orderNumber;
    await get('/order/get-notify')

      .then(response => {
        orderNumber = response.orderNumber;

      })
      .catch(error => {
        console.error(error);
        // Xử lý lỗi nếu có
      });

    if (orderNumber) {
      this.setState({
        orderNumber
      })
    }

    await get('/category/get-category')

      .then(response => {
        category = response.category;

      })
      .catch(error => {
        console.error(error);
        // Xử lý lỗi nếu có
      });
    this.setState({
      category
    })

  }


  async handleSigout() {
    await get('/user/sigout')
      .then(response => {
        // if (!response.isLogin) {
        //     console.log('islogin false');
        //     localStorage.removeItem('name');
        //     this.props.clearUser();
        //     // sessionStorage.removeItem('avatar');
        // }

      })
      .catch(error => {
        console.error(error);
        // Xử lý lỗi nếu có
      });
    window.location = "/";
  }

  handleSearch(event) {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của sự kiện submit form



    const input = document.querySelector('input[name="search"]');

    const searchValue = removeExtraSpaces(input.value);

    // searchValue.replace(/\s/g, "");

    if (searchValue.length > 0) {

      const params = new URLSearchParams();
      params.append('key', searchValue);

      const queryString = params.toString();

      // Chuyển hướng đến URL với tham số
      // window.location.href = `http://localhost.com/search?${queryString}`;

      window.location = `/search?${queryString}`;
    }


  }

  handleTouchUser(e) {
    // Lấy chiều rộng và chiều cao của màn hình
    var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    // Kiểm tra chiều rộng để xác định loại màn hình
    if (screenWidth < 820) {
      window.location = '/user'
    }
  }

  handleTouchCategory(e) {
    var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    // Kiểm tra chiều rộng để xác định loại màn hình
    if (screenWidth < 820) {
      let elementLi = e.currentTarget.parentNode.parentNode;
      // e.preventDefault();
      elementLi.classList.contains('active') ? elementLi.classList.remove('active') : elementLi.classList.add('active');

    }
  }

  renderCategory(category) {
    if (category && category.length > 0) {
      return category.map((item, index) => {
        if (item.child_category) {
          return (
            <>
              <li key={index} className='child'>
                <div className='catogory-title'>
                  <a href={`/category?key=${encodeURIComponent(item.name)}`}>{item.name}</a>
                  <span onClick={(e) => { this.handleTouchCategory(e) }}></span>
                </div>
                <ul>
                  {this.renderCategory(item.child_category)}
                </ul>

              </li>

            </>

          );
        } else {
          return (
            <li key={index} className='no-child'>
              <div>
                <a href={`/category?key=${encodeURIComponent(item.name)}`}>{item.name}</a><span></span>
              </div>
            </li>
          );

        }
      });
    }
    return null;
  }

  handleOpenCategory() {
    const dropdown = document.getElementById('dropdown-category');
    if (dropdown) {
      if (window.getComputedStyle(dropdown).getPropertyValue('display') == 'none') {
        dropdown.style.display = 'block';
        dropdown.style.opacity = '0';
        dropdown.style.height = '0';

        setTimeout(function () {
          dropdown.style.opacity = '1';
          dropdown.style.height = '100%'; /* Chiều cao mong muốn */
        }, 100);
      }
    }
  }

  handleCloseCategory(e) {
    const dropdown = e.target.parentNode.parentNode.parentNode;
    console.log(dropdown);
    if (dropdown) {
      if (window.getComputedStyle(dropdown).getPropertyValue('display') == 'block') {
        dropdown.style.display = 'none'
      }
    }
  }

  render() {

    // function renderCategory(category) {
    //     if (category && category.length > 0) {
    //         return category.map((item, index) => {
    //             if (item.child_category) {
    //                 return (
    //                     <>
    //                         <li key={index}><a href={`/category?key=${encodeURIComponent(item.name)}`} onClick={(e) => { this.handleTouchCategory(e) }} >{item.name}</a><span></span>
    //                             <ul>
    //                                 {renderCategory(item.child_category)}
    //                             </ul>

    //                         </li>

    //                     </>

    //                 );
    //             } else {

    //                 return (
    //                     <li key={index}><a href={`/category?key=${encodeURIComponent(item.name)}`} onClick={(e) => { this.handleTouchCategory(e) }}>{item.name}</a><span></span></li>
    //                 );

    //             }
    //         });
    //     }
    //     return null;
    // }


    return (
      <>
        <header>
          <div className="header-main">
            <div className="container">
              <div className="row">
                <div className="logo">
                  <a href="/"><img src="/sachlogotrang.png" alt="Logo" /></a>
                </div>

                {/* position */}
                <div className='header-m'>
                  <li className='category' id='root-category'>
                    <ul className="dropdown">
                      <div className="dropbtn">
                        <span className='icon-menu' onClick={() => this.handleOpenCategory()}>
                          <img src='/sort.png' />
                        </span>
                        <span className='icon-seemore'></span>
                      </div>
                      <div className="dropdown-content" id='dropdown-category'>
                        <div className='title-category-rp'>
                          <div className='ico-close'>
                            <span onClick={(e) => this.handleCloseCategory(e)}></span>
                          </div>
                          <div className='title-category'>
                            Danh mục sản phẩm
                          </div>
                        </div>
                        {this.state && this.state.category && this.renderCategory(this.state.category)}
                      </div>
                    </ul>
                  </li>

                  <div className="search-bar">
                    <form action="#" method="get" className='form-search' onSubmit={(e) => { this.handleSearch(e) }}>
                      <input type="text" name="search" placeholder="Tìm kiếm sản phẩm..." required />
                      <button type="submit"><a>Tìm kiếm</a></button>
                    </form>
                  </div>
                  {this.state && this.state.login && this.state.login.isLogin ?

                    <div className="icon-control-container">
                      <div className='icon-control'>
                        <div className="order-icon">
                          <a href="/order">
                            <div className='icon'>
                              {this.state.orderNumber && this.state.orderNumber > 0 &&
                                <div className='notify-number'>{this.state.orderNumber}</div>
                              }

                            </div>
                            <div className='title'>
                              Giỏ hàng
                            </div>
                          </a>


                        </div>
                        <div className="user-icon" onClick={(e) => this.handleTouchUser(e)}>
                          <a>
                            <div className='icon'>
                            </div>
                            <div className='title'>
                              {this.state.login.user.full_name}
                            </div>
                          </a>
                          <div className="dropdown-content">
                            <a href="/user/info">Thông tin cá nhân</a>
                            <a href="/user/order">Đơn hàng của tôi</a>
                            <a href="#" onClick={() => this.handleSigout()}>Đăng xuất</a>
                          </div>

                        </div>
                      </div>
                    </div>

                    :

                    <div className="icon-control-container">
                      <div className='icon-control'>
                        <div className="order-icon">
                          <a href="/order">
                            <div className='icon'>
                            </div>
                            <div className='title'>
                              Giỏ hàng
                            </div>
                          </a>

                        </div>
                        <div className="user-icon">
                          <a href="/login">
                            <div className='icon'>
                            </div>
                            <div className='title'>
                              Tài khoản
                            </div>

                          </a>

                        </div>
                      </div>
                    </div>
                  }
                </div>

              </div>
            </div>
          </div>
        </header>
      </>
    )
  }
}


// export default Header
export default Header;