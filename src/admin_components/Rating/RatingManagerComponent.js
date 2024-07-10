import React from 'react';
import '../../admin_styles/Rating/RatingManager.scss';
import { get, post } from '../../util/api';
import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment';
// import Header_Admin from './Header_Admin';
class RatingManagerComponent extends React.Component {

    state = {}

    async componentDidMount() {
        let listRating;
        await get('/rating/get-all-rating')
            .then(response => {
                listRating = response.listRating;
            })
            .catch(error => {
                console.error(error);
                // Xử lý lỗi nếu có
            });
        this.setState({
            listRating
        })
    }

    async handleRemoveRating(rating_id, book_id) {
        let isDeleteRating = false;
        await post('/rating/remove-rating', { rating_id, book_id })
            .then(response => {
                if (response.isDeleteRating) {
                    isDeleteRating = true;
                }
            })
            .catch(error => {
                console.error(error);
                // Xử lý lỗi nếu có
            });
        if (isDeleteRating) {
            this.componentDidMount();
        }
    }

    render() {

        return (
            <>
                <div class="rating-manager-container">
                    <h1>Quản lý đánh giá sản phẩm</h1>
                    <div className='rating-manager'>
                        <div class="review-list">

                            {this.state && this.state.listRating && this.state.listRating.map((item, index) => {
                                return (
                                    <div class="review-item">
                                        <div class="review-header">
                                            <h2 class="review-title">{item.full_name} - {item.title}</h2>
                                            <button class="delete-btn" onClick={() => this.handleRemoveRating(item.id, item.book_id)}>Xóa</button>
                                        </div>
                                        <p className='review-stars'>Đánh giá: {item.stars}/5 - {moment(item.date).format('DD-MM-YYYY HH:mm')}</p>
                                        <p class="review-content">Nội dung đánh giá: {item.comment}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default RatingManagerComponent