import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            matkhau: '',
            login_fail: false,
        }
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onClick = () => {
        var obj = {
            email: this.state.email,
            matkhau: this.state.matkhau
        }
        axios.post('http://localhost:8000/api/login', obj)
            .then(result => {
                
                if (result.data.status === 200) {
                    localStorage.setItem('danh_sach_giang_day', JSON.stringify(result.data.data[0]['monday']));
                    sessionStorage.setItem('tengiangvien', JSON.stringify(result.data.data[0]['hoten']));
                    this.props.history.push('danh-sach-giang-day');
                }
                else{
                    this.setState({
                        login_fail : true
                    });
                }
            });
    }

    render() {
        return (
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
                                <input type="email" value={this.state.email} onChange={this.onChange} name="email" className="form-control" />
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
        );
    }
}

export default Login;