import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from "./components/Login";
import DanhSachGiangDay from './components/DanhSachGiangDay';
import DiemDanh from './components/DiemDanh';
import PageNotFound from './components/PageNotFound';
import DanhSachCa from "./components/DanhSachCa";
import history from './history';
class App extends Component {

  render() {
    return (
      <Router history={history}>
        <div>
          <Switch>
            <Route exact path="/" component={() => <Login/>} />
            <Route exact path="/danh-sach-giang-day" component={() => <DanhSachGiangDay/>} />
            <Route exact path="/danh-sach-ca" component={() => <DanhSachCa/>} />
            <Route exact path="/diem-danh" component={() => <DiemDanh/>} />
            <Route  component={() => <PageNotFound/>} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
