import React, { Component } from 'react';
class DanhSachGiangDay extends Component {
    onClick = (e) => {
        console.log(JSON.parse(e.target.dataset.id));
    }
    render() {
        var data_giang_day = JSON.parse(localStorage.getItem('danh_sach_giang_day'));
        var date = new Date();
        var current_day = date.getDay();
        var ds_giang_day = Object.keys(data_giang_day).map((item, index) => {
            if (Number(current_day) === Number(item)) {
                return Object.keys(data_giang_day[item]).map((i) => {
                    return (
                        <div key={i} className="col-sm-6">
                            <div className="card bg-light">
                                <div className="card-body">
                                    <h5 className="card-title"> {i}</h5>
                                    <p className="card-text">Ca dạy : { Object.keys(data_giang_day[item][i]).join(',') }
                                    </p>
                                    <button onClick={this.onClick} data-id={JSON.stringify(data_giang_day[item][i])} className="btn btn-primary">Điểm danh</button>
                                </div>
                            </div>
                        </div>
                    );

                    //return Object.keys(data_giang_day[item][i]);
                });
            }

        });
                    
        return (
            <div className="container" style={{ width: '60%' }}>
                <div className="row">
                    <div className="col-12 logo">
                        <img src="images/logo-itc.png" width="100%" alt="" className="img-fluid" />
                    </div>
                </div>
                <div className="alert alert-primary" role="alert">
                    Giáo viên thực hiện: {sessionStorage.getItem('tengiangvien') !== '' ?
                        JSON.parse(sessionStorage.getItem('tengiangvien')) : ''
                    }
                </div>
                <div className="row">
                    {/* <div className="col-sm-6">
                        <div className="card bg-light">
                            <div className="card-body">
                                <h5 className="card-title">Thiết kế đồ Hoạ</h5>
                                <p className="card-text">Môn học: cơ sở lập trình.</p>
                                <a href="/diemdanh/tkdh01" className="btn btn-primary">Điểm danh</a>
                            </div>
                        </div>
                    </div> */}
                    {ds_giang_day}
                </div>
            </div>
        );
    }
}

export default DanhSachGiangDay;