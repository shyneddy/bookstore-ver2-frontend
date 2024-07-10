import React from 'react';
import '../../responsive_styles/User/ChangePassword.scss'
import { get, post } from '../../util/api';
class ChangePasswordComponent extends React.Component {

    state = {
        password: '',
        password_new: '',
        password_re: ''
    }

    async componentDidMount() {
        var userinfo, userinfo_copy;
        await get('/user/getinfo')
            .then(response => {
                console.log(response);
                userinfo = response.userinfo;
                userinfo_copy = response.userinfo;
            })
            .catch(error => {
                console.error(error);
                // Xử lý lỗi nếu có
            });

        this.setState({
            userinfo: userinfo,
            userinfo_copy: userinfo_copy
        })
    }

    handleInputPassword(e, key) {

        this.setState({
            [key]: e.target.value
        })
    }

    async handleSubmitPassword(e) {
        e.preventDefault();
        const password_old = this.state.password
        const password_new = this.state.password_new
        const password_re = this.state.password_re

        if (password_new != password_re) {
            alert('Nhập lại mật khẩu sai');
            return;
        }

        await post('/user/updatepassword', {
            password_old,
            password_new
        })
            .then(response => {
                console.log(response);
                if (response.checkPassword) {
                    // window.location = "http://localhost:3000/info";
                    alert('Password sai')

                }
                if (response.isUpdate) {
                    window.location.reload();

                }
            })
            .catch(error => {
                console.error(error);
                // Xử lý lỗi nếu có
                if (error.response.data.falsePassword) {
                    alert('sai mật khẩu')
                }
            });

    }

    render() {

        return (
            <>
                <div class="change-password-wrapper">
                    <h1>Thông tin tài khoản</h1>
                    <div class="form">
                        <div class="form-group">
                            <label for="password">Nhập mật khẩu cũ:</label>
                            <input type="password" class="form-control" id="password" value={this.state.password} onChange={(e) => this.handleInputPassword(e, 'password')} />
                        </div>
                        <div class="form-group">
                            <label for="password-new">Nhập mật khẩu mới:</label>
                            <input type="password" class="form-control" id="password-new" value={this.state.password_new} onChange={(e) => this.handleInputPassword(e, 'password_new')} />
                        </div>

                        <div class="form-group">
                            <label for="password-re">Nhập lại mật khẩu mới:</label>
                            <input type="password" class="form-control" id="password-re" value={this.state.password_re} onChange={(e) => this.handleInputPassword(e, 'password_re')} />
                        </div>

                        <button type="submit" class="btn btn-primary" onClick={(e) => { this.handleSubmitPassword(e) }}>Lưu</button>
                    </div>
                </div>
            </>
        )
    }
}

export default ChangePasswordComponent;