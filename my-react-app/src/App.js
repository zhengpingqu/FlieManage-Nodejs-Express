import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {getlist} from './server';

class App extends Component {

  constructor(props){
    super(props);
    this.state={
      list:null,
    }
  }

  componentDidMount(){
    getlist().then((data)=>{
      this.setState({list:data});
    })
  }

  changeList(){
    const data = this.state.list;
    let list = [];

    for (let index in data) {
      list.push((
        <li>
          <p>{ index- 0+ 1 }</p>
          <p>{ data[index] }</p>
          <a href = {`http://localhost:8000/down?file${'='}${data[index]}`}>
            <p><button className="btn">下载</button></p>
          </a>
        </li>
      ))
    }
    return list;
  }

  render() {
    let list = this.state.list ? this.state.list : null;
    if (!list) {
      return (<div>数据加载中</div>)
    }
    list = this.changeList();

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>        

        <div className= "file-container">
          <span>序号</span>
          <span>文件名</span>
          <span>操作</span>
          <ul>
            {list} 
          </ul>
        </div>
        
        <form action="/upload" enctype="multipart/form-data" method="POST">
          <input type="file" name="file"/>
          <input type="submit" value="上传"/>
        </form>
        
        {/* {this.state.list} */}
      </div>
    );
  }
}

export default App;
