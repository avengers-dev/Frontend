import React, { Component } from 'react';
class DanhSachGiangDay extends Component {
    render() {
        return (
            <div className="container" style={{ width: '60%' }}>
                <div className="row">
                    <div className="col-12 logo">
                        <img src="images/logo-itc.png" width="100%" alt="" className="img-fluid" />
                    </div>
                </div>
                <div className="alert alert-primary" role="alert">
                    Giáo viên thực hiện: { sessionStorage.getItem('tengiangvien') !== '' ?
                    JSON.parse(sessionStorage.getItem('tengiangvien')) : ''
                }

                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <div className="card bg-light">
                            <div className="card-body">
                                <h5 className="card-title">Thiết kế đồ Hoạ</h5>
                                <p className="card-text">Môn học: cơ sở lập trình.</p>
                                <a href="/diemdanh/tkdh01" className="btn btn-primary">Điểm danh</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="card bg-light">
                            <div className="card-body">
                                <h5 className="card-title">Lập trình di động 1</h5>
                                <p className="card-text">Môn học: cơ sở lập trình.</p>
                                <a href="/diemdanh/ltdt01" className="btn btn-primary">Điểm danh</a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default DanhSachGiangDay;