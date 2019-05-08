import React ,{ Component } from 'react';
import {  Route  } from 'react-router-dom';
import './App.css';
import Login from "./components/Login";
import DanhSachGiangDay from './components/DanhSachGiangDay';
import DiemDanh from './components/DiemDanh';



class App extends Component {
  render() {
    return (
      <div>
          <Route exact path="/" component={Login} />
          <Route exact path="/danh-sach-giang-day" component={DanhSachGiangDay} />
          <Route exact path="/diem-danh" component={DiemDanh} />
      </div>

    );
  }
}

export default App;
