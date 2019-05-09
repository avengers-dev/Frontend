import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Login from "./components/Login";
import DanhSachGiangDay from './components/DanhSachGiangDay';
import DiemDanh from './components/DiemDanh';



class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Login} />
          <Route exact path="/danh-sach-giang-day" component={DanhSachGiangDay} />
          <Route exact path="/diem-danh" component={DiemDanh} />
        </div>
      </Router>
    );
  }
}

export default App;
