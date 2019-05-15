import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import history from './history';
class DanhSachGiangDay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isClickCa : false,
            ds_mon_hoc : []
        }
    }
    
    componentWillMount() {
        this.setState({
            ds_mon_hoc : this.props.ds_mon_hoc
        })
    }
    
    onClick = (e) => {
        var mang_ca = e.target.dataset.ca;
        var ds_giang_day = JSON.parse(e.target.dataset.danh_sach_ca);
        
        var obj = {
            mang_ca : mang_ca.split(','),
            ds_giang_day : ds_giang_day
        };
        
        sessionStorage.setItem('chon_mon_hoc',JSON.stringify(e.target.dataset.monhoc));
        this.props.dispatch({type:'AD_DS_GIANG_DAY_AND_CA',data : obj});
        
        this.setState({
            isClickCa : true
        });
        history.push('danh-sach-ca');   

    }
    
    change_mamh_to_tenmh = (i) => {
        var {ds_mon_hoc} = this.state;
        var result = ds_mon_hoc.map(item => {
            if( i === item.mamh)
                return item.tenmh;
        })
        return result;
    }
    render() {
        if(this.state.isClickCa === true){
            return <Redirect from='danh-sach-giang-day' to='danh-sach-ca' />
        }
        var ten_giang_vien = JSON.parse(sessionStorage.getItem('tengiangvien'));
        if(ten_giang_vien === null){
            return <Redirect to='/'/>
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
                                    data-monhoc={i}
                                    data-danh_sach_ca={JSON.stringify(data_giang_day[item][i])}
                                    data-ca={Object.keys(data_giang_day[item][i])}
                                    className="btn btn-primary">Điểm danh</button>
                                </div>
                            </div>  
                        </div>
                    );
                }));
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