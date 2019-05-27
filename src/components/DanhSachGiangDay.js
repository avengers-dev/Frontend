import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import history from './history';
class DanhSachGiangDay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isClickCa : false,
            ds_mon_hoc : [],
            is_login : true
        }
    }
    
    componentWillMount() {
        this.setState({
            ds_mon_hoc : this.props.ds_mon_hoc
        });
        
    }
    
    onClick = (e) => {
        var mang_ca = e.target.dataset.mang_ca;
        var ds_giang_day = JSON.parse(e.target.dataset.danh_sach_ca);
        
        var obj = {
            mang_ca : mang_ca.split(','),
            ds_giang_day : ds_giang_day
        };
        sessionStorage.setItem('chon_ten_mon_hoc',JSON.stringify(e.target.dataset.ten_mon_hoc));
        sessionStorage.setItem('mang_ca',JSON.stringify(mang_ca.split(',')));
        sessionStorage.setItem('chon_mon_hoc',JSON.stringify(e.target.dataset.monhoc));
        this.props.dispatch({type:'AD_DS_GIANG_DAY_AND_CA',data : obj});
        
        this.setState({
            isClickCa : true
        });
        history.push('danh-sach-ca');   

    }
    
    change_mamh_to_tenmh = (mamh) => {
        var {ds_mon_hoc} = this.state;
        if(ds_mon_hoc.length === 0){
            ds_mon_hoc = JSON.parse(sessionStorage.getItem('ds_mon_hoc'));
        }
        var result = '';
        for(let i = 0 ; i < ds_mon_hoc.length ; i++){
            if(ds_mon_hoc[i].mamh === mamh){
                result = ds_mon_hoc[i].tenmh;
                break;
            }
        }
        return result;
    }
    onClickLogOut = () => {
        localStorage.clear();
        sessionStorage.clear();
        history.push('/');
        this.setState({
            is_login : false
        })
    }
    render() {
        if(this.state.isClickCa === true){
            return <Redirect from='danh-sach-giang-day' to='danh-sach-ca' />;
        }
        var ten_giang_vien = JSON.parse(sessionStorage.getItem('tengiangvien'));
        if(ten_giang_vien === null || this.state.is_login === false){
            return <Redirect  to='/' />;
        }
        var data_giang_day = JSON.parse(localStorage.getItem('danh_sach_giang_day'));
        var date = new Date();
        var current_day = date.getDay();
        var ds_giang_day = Object.keys(data_giang_day).map((item) => {
            if(Number(current_day) === Number(item)) {
                return (Object.keys(data_giang_day[item]).map((i) => {
                    return (
                        <div key={i} className="col-sm-6">
                            <div className="card bg-light">
                                <div className="card-body">
                                    <h5 className="card-title"> 
                                    { this.change_mamh_to_tenmh(i) }</h5>
                                    <p className="card-text">Ca dạy : {Object.keys(data_giang_day[item][i]).join(',')}
                                    </p>
                                    <button 
                                    onClick={this.onClick}
                                    data-ten_mon_hoc={this.change_mamh_to_tenmh(i)}
                                    data-monhoc={i}
                                    data-danh_sach_ca={JSON.stringify(data_giang_day[item][i])}
                                    data-mang_ca={Object.keys(data_giang_day[item][i])}
                                    className="btn btn-primary">Điểm danh</button>
                                </div>
                            </div>  
                        </div>
                    );
                }));
            }
            return true;
        });
        return (
            <div className="container" style={{ width: '60%' }}>
                <div className="row">
                    <div className="col-12 logo">
                        <img src="images/logo-itc.png" width="100%" alt="" className="img-fluid" />
                    </div>
                </div>
                <div  className="alert alert-primary" style={{position:'relative'}} role="alert">
                    Giáo viên thực hiện: {sessionStorage.getItem('tengiangvien') !== '' ?
                        JSON.parse(sessionStorage.getItem('tengiangvien')) : ''
                    }
                    <button style={{position:'absolute',top:'10%',right:'1%'}} onClick={this.onClickLogOut} className="btn btn-primary">Logout</button>
                </div>
                <div className="row">
                    {ds_giang_day}
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {  
        ds_mon_hoc : state.ds_mon_hoc
    }
}
export default connect(mapStateToProps)(DanhSachGiangDay);