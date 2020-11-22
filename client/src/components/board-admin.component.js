import React, { Component } from "react";

import UserService from "../services/user.service";

const gw = [
  [
    { id: 1, name: 'Wasif', rssi: 21, ptt : 'ON' },
    { id: 2, name: 'Ali', rssi: 19, ptt: '---' },
    { id: 3, name: 'Saad', rssi: 16, ptt: '---' },
    { id: 4, name: 'Asad', rssi: 25, ptt: '---' }
  ],
  [
    { id: 1, name: 'Wasif', rssi: 19, ptt : '---' },
    { id: 2, name: 'Ali', rssi: 20, ptt: 'ON' },
    { id: 3, name: 'Saad', rssi: 17, ptt: '---' },
    { id: 4, name: 'Asad', rssi: 24, ptt: '---' }
  ],
  [
    { id: 1, name: 'Wasif', rssi: 20, ptt : '---' },
    { id: 2, name: 'Ali', rssi: 18, ptt: '---' },
    { id: 3, name: 'Saad', rssi: 18, ptt: '---' },
    { id: 4, name: 'Asad', rssi: 22, ptt: 'ON' }
  ],
] 

let toggle = 0;

export default class BoardAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      gateways: [
        { id: 1, name: 'Wasif', rssi: 21, ptt : 'ON' },
        { id: 2, name: 'Ali', rssi: 19, ptt: '---' },
        { id: 3, name: 'Saad', rssi: 16, ptt: '---' },
        { id: 4, name: 'Asad', rssi: 25, ptt: '---' }
     ]
    };
  }

  componentDidMount() {
    this.fetch();
    this.intervalID = setInterval(this.fetch.bind(this), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  fetch() {
    console.log("fetch");
     UserService.getAdminBoard().then(
      response => {
        this.setState({
          content: response.data,
          gateways: gw[toggle]
        });
        toggle += 1;
        toggle %= 3;
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );   
  }

  renderTableHeader() {
    let header = Object.keys(this.state.gateways[0])
    return header.map((key, index) => {
       return <th key={index}>{key.toUpperCase()}</th>
    })
  }

  renderTableData() {
    return this.state.gateways.map((gateway, index) => {
       const { id, name, rssi, ptt } = gateway //destructuring
       return (
          <tr key={id}>
             <td>{id}</td>
             <td>{name}</td>
             <td>{rssi}</td>
             <td>{ptt}</td>
          </tr>
       )
    })
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3 id="title">{this.state.content}</h3>
          <table id='gateways'>
            <tbody>
              <tr>{this.renderTableHeader()}</tr>
              {this.renderTableData()}
            </tbody>
          </table>
        </header>
      </div>
    );
  }
}
