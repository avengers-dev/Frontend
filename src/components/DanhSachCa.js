import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import history from './history';
class DanhSachCa extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isChooseCa :false,
            ds_giang_day : [],
        }
    }
    
    componentWillMount() {
        this.setState({
            ds_giang_day : this.props.ds_giang_day,
        })
    }
    onClick = (e) => {
        var  ds_sinhvien_lop = [];
        sessionStorage.setItem('ca',JSON.stringify(e.target.dataset.id));
        ds_sinhvien_lop.push(this.state.ds_giang_day[e.target.dataset.id]);
        var token_giangvien = JSON.parse(sessionStorage.getItem('token_giang_vien'));
        var obj_check = {
            "mamh" : JSON.parse(sessionStorage.getItem('chon_mon_hoc')),
            "token" : token_giangvien,
            "ca"    : e.target.dataset.id
        }
        axios.post('http://localhost:8000/api/getDanhSachSinhVienCheck',obj_check)
        .then(result => this.props.dispatch({type:'GET_DANH_SACH_SINHVIEN_CHECK',data:result.data.data}))
        var obj = {
            token : token_giangvien,
            ca : ds_sinhvien_lop[0]
        }
        const choose_ca = e.target.dataset.id;
        axios.post('http://localhost:8000/api/getDanhSachSinhVien',obj)
        .then(result => {
            var data = result.data.data;
            for(let i = 0 ; i < data.length ; i++){
                data[i].check = 0;
            }
            localStorage.setItem('danh_sach_sinh_vien',JSON.stringify(data));
            this.props.dispatch({type:'CHOOSE_CA_AND_GET_DS',
                data : {ca : choose_ca , danh_sach_sinh_vien : data }
            });
        })
        .then(() => {
            this.setState({
                isChooseCa : true
            });
        })
        .catch(err => console.log(err));
        history.push('diem-danh');
    }
    render() {
        var mang_ca = [];
        if(this.props.mang_ca.length > 0){
            mang_ca = this.props.mang_ca;
        }
        else{
            mang_ca = JSON.parse(sessionStorage.getItem('mang_ca'));
        } 
        var div_ca = mang_ca.map((item, index) => {
            return (
                <div key={index} className="col-sm-6">
                    <div className="card bg-light">
                        <div className="card-body">
                            <h5 className="card-title"> Ca : {item}</h5>
                            <button data-id={item} onClick={this.onClick} className="btn btn-primary"> Điểm Danh</button>
                        </div>
                    </div>
                </div>
            );
        });
        if(this.state.isChooseCa === true){
            return <Redirect from='danh-sach-ca' to='diem-danh'/>
        }
        return (
            <div className="container" style={{ width: '60%' }}>
                <div className="row">
                    <div className="col-12 logo">
                        <img src="images/logo-itc.png" width="100%" alt="" className="img-fluid" />
                    </div>
                </div>
                <div className="alert alert-primary" role="alert">
                    Môn : { JSON.parse(sessionStorage.getItem('chon_ten_mon_hoc')) }
                </div>
                <div className="row abc">
                    {div_ca}
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        ds_giang_day: state.ds_giang_day,
        mang_ca: state.mang_ca,
        ds_mon_hoc : state.ds_mon_hoc
    }
}
export default connect(mapStateToProps)(DanhSachCa);