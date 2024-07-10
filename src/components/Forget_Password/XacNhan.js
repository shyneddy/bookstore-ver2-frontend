import React from "react";
import "../../styles/Forget_Password/XacNhan.scss";
import { get, post } from "../../util/api";

import { withRouter } from "react-router";

class XacNhan extends React.Component {
  state = {};

  async componentDidMount() {
    const username = this.props.match.params.username;
    let full_name;
    await get("/user/identify", { username })
      .then((response) => {
        console.log(response);
        full_name = { ...response.user }.full_name;
        // console.log('fullname ', full_name);
      })
      .catch((error) => {
        // Xử lý lỗi nếu có
      });

    if (full_name) {
      console.log(full_name);
      this.setState({
        full_name,
      });
    }
    // window.location = '/'
  }

  handleSussess(e) {
    e.preventDefault();
    window.location = `/confirm/${this.props.match.params.username}`;
  }

  handleCancel(e) {
    e.preventDefault();
    window.location = "/login";
  }

  render() {
    return (
      <>
        {/* <div className='xacnhan-container'>

                    <div className='Login'>
                        <form onSubmit={(e) => this.handleLoginSubmit(e)}>
                            <div className="container">

                                <h1 className='H1'>Quên mật khẩu</h1>

                                {this.state && this.state.full_name ?
                                    <>
                                        <h3> <span style={{ fontWeight: 'bold' }}>{this.state.full_name}:</span> Đây có phải bạn không?</h3>
                                        <button onClick={(e) => { this.handleSussess(e) }}>Hoàn thành</button>
                                    </>
                                    :
                                    <>
                                        <h3>Không tìm thấy</h3>
                                    </>
                                }

                                <button onClick={(e) => this.handleCancel(e)}>Hủy</button>

                                <span className="psw"><a href='/login'>Đăng nhập</a><a href="/register">Đăng ký</a></span>
                            </div>
                        </form>
                    </div>
                </div> */}

        <div className="XacNhan">
          <div className="XN">
            <form onSubmit={(e) => this.handleLoginSubmit(e)}>
              <div className="container">
                <h1 className="H1">Quên mật khẩu</h1>

                {this.state && this.state.full_name ? (
                  <>
                    <h3>
                      <span style={{ fontWeight: "bold" }}>
                        {this.state.full_name}:{" "}
                      </span>
                      Đây có phải bạn không?
                    </h3>
                    <div className="info">
                      <img src="https://babilala.vn/wp-content/uploads/2023/02/cau-hoi-trong-tieng-anh-la-gi.jpg"></img>
                    </div>

                    <button
                      type="submit"
                      onClick={(e) => {
                        this.handleSussess(e);
                      }}
                    >
                      Đây là tôi
                    </button>
                  </>
                ) : (
                  <>
                    <h3>Không tồn tại tài khoản này</h3>
                  </>
                )}

                {/* <h3>Đây có phải bạn không?</h3>
                                <div className='info'>
                                    <img src='https://sohanews.sohacdn.com/zoom/700_438/2015/mishka-1429159271488-16-11-360-479-crop-1429162573885.jpg'></img>
                                </div>

                                <button type="submit" onClick={(e) => { this.handleSussess(e) }}>Hoàn thành</button> */}
                {/* <button type="submit">Hủy</button> */}
                <button onClick={(e) => this.handleCancel(e)}>Hủy</button>

                <span className="psw">
                  <a href="/login">Đăng nhập</a>&nbsp;&nbsp;
                  <a href="/register">Đăng ký</a>
                </span>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}

// export default XacNhan
export default withRouter(XacNhan);
