import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import history from './history';
class DanhSachCa extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mang_ca : [],
            isChooseCa :false,
            ds_giang_day : []
        }
    }
    
    componentWillMount() {
        this.setState({
            mang_ca : this.props.mang_ca,
            ds_giang_day : this.props.ds_giang_day
        })
    }
    onClick = (e) => {
        var  ds_sinhvien_lop = [];
        Object.keys(this.state.ds_giang_day).forEach((item) => {
            if(Number(item) === Number(e.target.dataset.id)){
                return ds_sinhvien_lop.push(this.state.ds_giang_day[item]);
            }
        })
        var token_giangvien = JSON.parse(sessionStorage.getItem('token_giang_vien'));
        var obj = {
            token : token_giangvien,
            ca : ds_sinhvien_lop[0]
        }
        const ca = e.target.dataset.id;
        
        axios.post('http://localhost:8000/api/getDanhSachSinhVien',obj)
        .then(result => {
            localStorage.setItem('danh_sach_sinh_vien',JSON.stringify(result.data));
            this.props.dispatch({type:'CHOOSE_CA_AND_GET_DS',
                data : {ca : ca , danh_sach_sinh_vien :  result.data }
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
        
        var { mang_ca } = this.state;
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
                    Môn : {JSON.parse(sessionStorage.getItem('chon_mon_hoc'))}
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
        mang_ca: state.mang_ca
    }
}
export default connect(mapStateToProps)(DanhSachCa);