import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            matkhau: '',
            login_fail: false,
            isLogin: false
        }
    }
    
    componentWillMount() {
        axios.get('http://localhost:8000/api/getAllMonHoc')
        .then(result => {
            sessionStorage.setItem('ds_mon_hoc',JSON.stringify(result.data.data))
            this.props.dispatch({type:'GET_ALL_DS_TEN_MON_HOC',data : result.data.data})
        })
    }
    
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onClick = (e) => {
        e.preventDefault();
        var obj = {
            email: this.state.email,
            matkhau: this.state.matkhau
        }
        axios.post('http://localhost:8000/api/login', obj)
            .then(result => {

                if (result.data.status === 200) {
                    var hotengv = result.data.data[0]['hogv'] + " " + result.data.data[0]['tengv'];
                    localStorage.setItem('danh_sach_giang_day', JSON.stringify(result.data.data[0]['monday']));
                    sessionStorage.setItem('token_giang_vien', JSON.stringify(result.data.data[0]['token']));
                    sessionStorage.setItem('tengiangvien', JSON.stringify(hotengv));
                    this.props.dispatch({ type: 'LOGIN', isLogin: 1 })
                    this.setState({
                        isLogin: true
                    })
                }
                else {
                    this.setState({
                        login_fail: true,
                        email: '',
                        matkhau: '',
                    });
                    document.getElementById('email').focus()
                }
            });
        this.props.dispatch({
            type: 'isLogin'
        });
    }

    render() {
        if (this.state.isLogin === true) {
            return <Redirect to='danh-sach-giang-day' />;
        }
        return (
            <div>
                <form>
                    <div className="container" style={{ width: '60%' }}>
                        <div className="row">
                            <div className="col-12 logo">
                                <img src="images/logo-itc.png" width="100%" alt="" className="img-fluid" />
                            </div>
                        </div>
                        {
                            this.state.login_fail === true ?
                                (
                                    <div className="row">
                                        <div className="col-12">
                                            <div className=" alert alert-danger">
                                                Email hoặc password không chính xác
                                    </div>
                                        </div>
                                    </div>
                                ) : ''
                        }

                        <div className="row" >
                            <div className="col-12">
                                <div>
                                    <div className="form-group">
                                        <label htmlFor="formGroupExampleInput" >Email</label>
                                        <input id="email" type="email" value={this.state.email} onChange={this.onChange} name="email" className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="formGroupExampleInput2">Mật Khẩu</label>
                                        <input type="password" value={this.state.matkhau} onChange={this.onChange} name="matkhau" className="form-control" />
                                    </div>
                                    <button onClick={this.onClick} className="btn btn-primary" >Đăng nhập</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
const mapToPropState = (state) => {
    return {
        isLogin: state.isLogin
    }
}
export default connect(mapToPropState)(Login);