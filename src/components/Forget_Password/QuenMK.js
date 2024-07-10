import React from "react";
import "../../styles/Forget_Password/QuenMk.scss";
import { get, post } from "../../util/api";
import { ToastContainer, toast } from "react-toastify";

class QuenMK extends React.Component {
  state = {
    username: "",
  };

  handleLoginInput(e) {
    this.setState({
      username: e.target.value,
    });
  }

  async handleLoginSubmit(e) {
    e.preventDefault();

    await post("/user/identify", { username: this.state.username })
      .then((response) => {
        // console.log('quen mk');
        console.log(response);
        window.location = `/identify/${response.user.username}`;
      })
      .catch((error) => {
        // console.log('quen mk');
        toast.dismiss();
        toast.error("Không tồn tại tài khoản!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        console.error(error);
        // window.location.reload();

        // Xử lý lỗi nếu có
      });

    // window.location = '/'
  }

  render() {
    return (
      <>
        <div className="forget-password-container">
          <div className="Login">
            <form onSubmit={(e) => this.handleLoginSubmit(e)}>
              <div className="container">
                <h1 className="H1">Quên mật khẩu</h1>
                <label htmlFor="uname">Tài khoản</label>
                <input
                  type="text"
                  placeholder="Nhập tài khoản"
                  required
                  onChange={(e) => this.handleLoginInput(e)}
                />

                <button>Xác nhận</button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default QuenMK;
