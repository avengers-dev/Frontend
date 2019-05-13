import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
class DiemDanh extends Component {
    constructor(props) {
        super(props);
        this.state = {
            danh_sv : []
        }
    }
    componentWillMount() {
        this.setState({
            danhsach_sv : this.props
        });
    }
    render() {
        var ten_giang_vien = JSON.parse(sessionStorage.getItem('tengiangvien'));
        if (ten_giang_vien === null) {
            return <Redirect to='/' />
        }
        var ds_sinhvien = [];
        if(this.props.danhsach_sv.length > 0){ 
            ds_sinhvien = this.props.danhsach_sv;
        }else{ 
            ds_sinhvien = JSON.parse(localStorage.getItem('danh_sach_sinh_vien'));
        }
        var sinhvien = ds_sinhvien.map((item,index )=> {
            return (
                <tr key={index}>
                    <td >{item.masv}</td>
                    <td >{item.hosv}</td>
                    <td >{item.tensv}</td>
                    <td>
                        <div className="custom-control custom-switch">
                            <input type="checkbox" className="custom-control-input" />
                            <label className="custom-control-label" />
                        </div>
                    </td>
                </tr>
            );
        })
        return (
            <div className="container" style={{ width: '60%',marginBottom:'1%' }}>
                <div className="alert alert-primary"style={{ marginTop: '0.5%' }} role="alert">
                    Giáo viên thực hiện: {JSON.parse(sessionStorage.getItem('tengiangvien'))}
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
                        {sinhvien}
                    </tbody>
                </table>
                <button type="button" className="btn btn-outline-success"> Lưu Lại</button>
                <button onClick={this.onClick} type="button" className="btn btn-outline-danger" style={{ marginLeft: '10px' }}>Huỷ bỏ</button>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return  {
        danhsach_sv : state.danh_sach_sinh_vien
    };
}
export default connect(mapStateToProps)(DiemDanh);