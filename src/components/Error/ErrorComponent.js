import React from 'react';
import '../../styles/Error/Error.scss'

class ErrorComponent extends React.Component {

    render() {
        return (
            <>
                <div class='error-404'>
                    <div className='error'>
                        <img src="https://cdn-icons-png.flaticon.com/128/2828/2828865.png" />
                        <h3>Có lỗi xảy ra!</h3>
                        <a href="/"><button>Quay về trang chủ</button></a>
                    </div>
                </div>

            </>
        )
    }
}


// export default ErrorComponent
export default ErrorComponent;