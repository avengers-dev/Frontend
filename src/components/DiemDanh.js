import React, { Component } from 'react';

class DiemDanh extends Component {
    render() {
        return (
            <div className="container" style={{ width: '60%' }}>
                <div className="alert alert-primary" role="alert">
                    Giáo viên thực hiện: Trần Công Mua
                </div>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">Mã SV</th>
                            <th scope="col">Họ lót</th>
                            <th scope="col">Tên</th>
                            <th scope="col">Handle</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td >1</td>
                            <td >Nguyễn Quốc</td>
                            <td >Bảo</td>
                            <td>
                                <div className="custom-control custom-switch">
                                    <input type="checkbox" className="custom-control-input" />
                                    <label className="custom-control-label" />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td >2</td>
                            <td >Phạm Ngọc Thoại</td>
                            <td >Kỳ</td>
                            <td>
                                <div className="custom-control custom-switch">
                                    <input type="checkbox" className="custom-control-input" />
                                    <label className="custom-control-label" />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td >3</td>
                            <td >Nguyễn Phúc</td>
                            <td >Thịnh</td>
                            <td>
                                <div className="custom-control custom-switch">
                                    <input type="checkbox" />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button type="button" className="btn btn-outline-success"> Lưu Lại</button>
                <button onClick={this.onClick} type="button" className="btn btn-outline-danger" style={{ marginLeft: '10px' }}>Huỷ bỏ</button>
            </div>
        );
    }
}

export default DiemDanh;