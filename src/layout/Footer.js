import React from "react";
import "../styles/layout/Footer.scss";

class Footer extends React.Component {
  state = {};

  render() {
    return (
      <div className="footer-container">
        <div className="footer">
          <div className="about-us">
            <h3>VỀ CHÚNG TÔI</h3>
            <a href="/">Trang chủ</a>
            <a href="/register">Đăng ký</a>
            <a href="/login">Đăng nhập</a>
          </div>

          <div className="news">
            <h3>DỊCH VỤ</h3>
            <a href="/dieu-khoan">Điều khoản sử dụng</a>
            <a href="/chinh-sach-bao-mat">Chính sách bảo mật </a>
          </div>

          <div className="policy">
            <h3>CHÍNH SÁCH</h3>

            <a href="">Chính sách bảo hành</a>
            <a href="">Chính sách đổi trả</a>
            <a href="">Chính sách vận chuyển</a>
          </div>

          <div className="category-hot">
            <h3>DANH MỤC NỔI BẬT</h3>

            <a href="/category?key=Truyện%20tranh%20thiếu%20nhi">
              Truyện tranh
            </a>
            <a href="/category?key=Ngôn%20tình">Sách ngôn tình</a>
            <a href="/category?key=Tâm%20lý">Sách tâm lý</a>
          </div>

          <div className="contact">
            <h3>LIÊN HỆ VỚI CHÚNG TÔI</h3>
            <a href="">
              <img src="/FaceBook.png"></img>
            </a>
            <a href="">
              <img src="/YTB.png"></img>
            </a>
            <a href="">
              <img src="/Instagram.png"></img>
            </a>
            <a href="">
              <img src="/Twitter.png"></img>
            </a>
            <a className="phone">
              <span>Phone: 0822293069</span>
            </a>
            <a className="phone">
              <span>Email: shyneddy2002@gmail.com </span>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
