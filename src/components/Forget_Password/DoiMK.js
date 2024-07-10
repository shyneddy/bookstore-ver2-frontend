import React from "react";
import "../../styles/Forget_Password/DoiMK.scss";
import { get, post } from "../../util/api";
import { withRouter } from "react-router";
import { ToastContainer, toast } from "react-toastify";

class DoiMK extends React.Component {
  state = {
    username: "",
  };

  handleLoginInput(e, key) {
    this.setState({
      [key]: e.target.value,
    });
  }

  async handleLoginSubmit(e) {
    e.preventDefault();

    const username = this.props.match.params.username;

    const { phone_number, password, re_password } = this.state;

    if (!phone_number || !password || !re_password) {
      // alert('vui long nhap day du thong tin');
      toast.dismiss();
      toast.error("Vui lòng nhập đủ thông tin!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      // return;
    } else if (password !== re_password) {
      // alert('nhap lai tk k dung');
      toast.dismiss();
      toast.error("Nhập lại mật khẩu sai!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      // return;
    } else {
      await post("/user/forget-password", { phone_number, password, username })
        .then((response) => {
          // console.log('quen mk');
          console.log(response);
          window.location = `/login`;
        })
        .catch((error) => {
          // console.log('quen mk');

          toast.dismiss();
          toast.error("Đổi mật khẩu thất bại!", {
            position: toast.POSITION.TOP_RIGHT,
          });

          console.error(error);
          // window.location.reload();

          // Xử lý lỗi nếu có
        });
    }

    // window.location = '/'
  }

  render() {
    return (
      <>
        {/* <div className='confirm-password-container'>

                    <div className='Login'>
                        <form onSubmit={() => this.handleLoginSubmit()}>
                            <div className="container">
                                <h1 className='H1'>Quên mật khẩu</h1>
                                <label htmlFor="uname">Mã code</label>
                                <input type="text" placeholder="Nhập tài khoản" required onChange={(e) => this.handleLoginInput(e, 'phone_number')} />

                                <label htmlFor="uname">Mật khẩu mới</label>
                                <input type="text" placeholder="Nhập tài khoản" required onChange={(e) => this.handleLoginInput(e, 'password')} />

                                <label htmlFor="uname">Nhập lại mật khẩu mới</label>
                                <input type="text" placeholder="Nhập tài khoản" required onChange={(e) => this.handleLoginInput(e, 're_password')} />

                                <button type="submit">Đổi mật khẩu</button>

                            </div>
                        </form>
                    </div>
                </div> */}

        <div className="NhapLaiMK">
          <div className="Nhaplai">
            <form onSubmit={(e) => this.handleLoginSubmit(e)}>
              <div className="container">
                <h1 className="H1">Nhập mật khẩu mới</h1>
                {/* <h3>Đây có phải bạn không?</h3> */}
                <label htmlFor="uname">Nhập số điện thoại</label>
                <input
                  type="text"
                  placeholder="Nhập số điện thoại"
                  name="uname"
                  required
                  onChange={(e) => this.handleLoginInput(e, "phone_number")}
                />

                <label htmlFor="psw">Mật khẩu mới</label>
                <input
                  type="password"
                  placeholder="Nhập mật khẩu"
                  name="psw"
                  required
                  onChange={(e) => this.handleLoginInput(e, "password")}
                />
                <label htmlFor="psw">Nhập lại mật khẩu mới</label>
                <input
                  type="password"
                  placeholder="Nhập lại mật khẩu"
                  name="psw"
                  required
                  onChange={(e) => this.handleLoginInput(e, "re_password")}
                />
                {/* <label>
                  <input type="checkbox" checked="checked" name="remember" />{" "}
                  Nhớ mật khẩu
                </label> */}

                <button>Xác nhận</button>
                {/* <button type="submit">Hủy</button> */}

                <span className="psw">
                  <a href="/login">Đăng nhập &nbsp; </a>
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

export default withRouter(DoiMK);
