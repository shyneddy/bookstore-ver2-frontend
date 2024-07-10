import React from "react";
import "../../admin_styles/Banner/Banner.scss";
import { get, post } from "../../util/api";
import { ToastContainer, toast } from "react-toastify";

// import Header_Admin from './Header_Admin';
class BannerComponent extends React.Component {
  state = {};

  async componentDidMount() {
    let listBanner;
    await get("/banner/get-banner")
      .then((response) => {
        listBanner = response.listBanner;
      })
      .catch((error) => {
        console.error(error);
        // Xử lý lỗi nếu có
      });
    this.setState({
      listBanner,
    });
  }

  async onFileChange(e) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.setState({
        imageSrc: reader.result,
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }

    // console.log(e.target.files);

    // Update the state
    await this.setState({ selectedFileBanner: e.target.files[0] });

    let formData = new FormData();
    formData.append("selectedFileBanner", this.state.selectedFileBanner);

    let isAddBanner = false;
    await post("/banner/add-banner", formData, {
      withCredentials: true,
    })
      .then(function (response) {
        console.log(response);
        if (response.isAddBanner) {
          isAddBanner = true;
        }
      })
      .catch(function (error) {
        console.log(error);
        toast.dismiss();
        toast.error("Thêm hình ảnh thất bại", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });

    if (isAddBanner) {
      this.componentDidMount();
    }
  }

  async handleRemoveBanner(banner_id) {
    let isDeleteBanner = false;
    await post(
      "/banner/remove-banner",
      { banner_id },
      {
        withCredentials: true,
      }
    )
      .then(function (response) {
        console.log(response);
        if (response.isDeleteBanner) {
          isDeleteBanner = true;
        }
      })
      .catch(function (error) {
        console.log(error);
        toast.dismiss();
        toast.error("Xóa hình ảnh thất bại", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });

    if (isDeleteBanner) {
      this.componentDidMount();
    }
  }

  render() {
    return (
      <>
        <div class="banner-container">
          <h1>Quản lý ảnh banner</h1>
          <form id="add-image-form">
            <label for="image-input" class="add-image-label">
              <span class="icon">+</span>
              <span class="text">Thêm ảnh</span>
            </label>
            <input
              type="file"
              id="image-input"
              accept="image/*"
              onChange={(e) => this.onFileChange(e)}
            />
          </form>
          <div className="banner-manager">
            <div class="image-list">
              {this.state && this.state.listBanner ? (
                this.state.listBanner.map((item, index) => {
                  return (
                    <div class="image-item">
                      <img src={item.link_banner} alt="Ảnh 1" />
                      <div class="overlay">
                        <button
                          class="delete-btn"
                          onClick={() => this.handleRemoveBanner(item.id)}
                        >
                          Xóa
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div>KHÔNG CÓ BANNER</div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default BannerComponent;
