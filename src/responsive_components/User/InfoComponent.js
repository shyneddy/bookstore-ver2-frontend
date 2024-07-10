import React from 'react';
import '../../responsive_styles/User/Info.scss'
import validator from 'validator';
import { get, post } from '../../util/api';
class InfoComponent extends React.Component {

    state = {}

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

    async handleUpdateInfo() {

        if (this.state.userinfo != this.state.userinfo_copy) {
            console.log('update.....');
            const userInfoNew = this.state.userinfo;

            if (!userInfoNew.full_name || validator.isEmpty(userInfoNew.full_name)) {
                alert('Tên không được để trống')
                return;
            }

            // Kiểm tra số điện thoại
            if (!userInfoNew.phone_number || !validator.isMobilePhone(userInfoNew.phone_number, 'vi-VN')) {
                alert('Số điện thoại không được để trống')
                return;
            }

            if (!userInfoNew.address || validator.isEmpty(userInfoNew.address)) {
                alert('Địa chỉ không được để trống')
                return;
            }

            await post('/user/updateinfo', { ...userInfoNew })
                .then(response => {
                    console.log(response);
                    if (response.isUpdate) {
                        window.location.reload();

                    }
                })
                .catch(error => {
                    console.error(error);
                    // Xử lý lỗi nếu có
                });

            // window.location = "http://localhost:3000/info";
        }

    }

    handleChangeInfo(e, key) {

        let userinfo = { ...this.state.userinfo };
        userinfo[key] = e.target.value;


        this.setState({
            userinfo
        })

    }

    render() {

        return (
            <>
                {this.state && this.state.userinfo &&
                    <div class="info-user-wrapper">
                        <h1>Thông tin tài khoản</h1>
                        <div class="form">
                            <div class="form-group">
                                <label for="name">Họ và tên</label>
                                <input type="text" class="form-control" id="name" placeholder="Nhập họ và tên" value={this.state.userinfo.full_name} onChange={(e) => { this.handleChangeInfo(e, 'full_name') }} />
                            </div>
                            <div class="form-group">
                                <label for="phone">Số điện thoại</label>
                                <input type="tel" class="form-control" id="phone" placeholder="Nhập số điện thoại" value={this.state.userinfo.phone_number} onChange={(e) => { this.handleChangeInfo(e, 'phone_number') }} />
                            </div>
                            <div class="form-group">
                                <label for="gender">Giới tính</label>
                                <select class="form-control" id="gender" onChange={(e) => { this.handleChangeInfo(e, 'gender') }}>
                                    {this.state.userinfo.gender == 1 ? <>
                                        <option selected value="1">Nam</option>
                                        <option value="0">Nữ</option>

                                    </> :
                                        <>
                                            <option value="1">Nam</option>
                                            <option selected value="0">Nữ</option>
                                        </>
                                    }

                                </select>
                            </div>
                            <div class="form-group">
                                <label for="address">Địa chỉ</label>
                                <input type="text" class="form-control" id="address" placeholder="Nhập địa chỉ" value={this.state.userinfo.address} onChange={(e) => { this.handleChangeInfo(e, 'address') }} />
                            </div>

                            <button type="submit" class="btn btn-primary" onClick={() => { this.handleUpdateInfo() }}>Lưu</button>
                        </div>
                    </div>

                }
            </>
        )
    }
}

export default InfoComponent;