import React, { Component } from 'react';
import JSONData from '../src/data/data.json'
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: 'React Simple Reserve App',
      index: '',
      datas: JSONData,
      sortingNames: [],
      emailErrorMessage: 'input valid email',
      sortedCheck: false
    }

    this.sort = this.sort.bind(this);
    this.updateCheckbox = this.updateCheckbox.bind(this);
  }

  componentDidMount() {
    let { datas, sortingNames } = this.state; //short way for not wrriting every thime this.state.SMTH
    this.refs.name.focus();
    datas.map((item, index) => {
      sortingNames.push(item.name);
    });
  }

  componentWillMount() {
    let { sortedCheck } = this.state;
    if (sortedCheck) {
      this.sort();
    }
  }

  submit = (e) => {
    e.preventDefault(); //Stopping default browser events
    let isValid = this.validate();

    if (isValid) {    //if email is valid then push the information into the data
      let { datas, sortingNames } = this.state;
      let id = 0;
      let name = this.refs.name.value;
      let surname = this.refs.surname.value;
      let email = this.refs.email.value;
      let address = this.refs.address.value;
      let date = this.refs.date.value;

      let data = { id, name, surname, email, address, date }
      data.id = JSONData[JSONData.length - 1].id + 1
      datas.push(data)
      sortingNames.push(data.name);

      this.refs.myForm.reset();
      this.refs.name.focus();
      let { sortedCheck } = this.state;
      if (sortedCheck) {
        this.sort();
      }
    } else {
      alert(this.state.emailErrorMessage)
    }

  }

  remove = (index) => {
    let datas = this.state.datas;
    datas.splice(index, 1);

    //when you delete some row the id-s are decrement by one (started from the deleting once)
    for (let i = index; i < datas.length; i++) {
      datas[i].id -= 1;
    }

    this.setState({
      datas: datas
    });

    this.refs.myForm.reset();
    this.refs.name.focus();
  }

  sort = () => {
    let { datas, sortingNames } = this.state;
    let newData = [];
    let sorted = sortingNames.sort();

    for (let i = 0; i < sorted.length; i++) {
      datas.map((item, index) => {
        if (item.name === sorted[i]) {
          newData.push(item);
          return;
        }
      });
    }

    this.setState({
      datas: newData,
      sortingNames: sorted
    });

    console.log("sortedNames :::", sorted);
  }

  validate = () => {
    let email = this.refs.email.value;
    let regex = /\S+@\S+\.\S+/;

    if (regex.test(email)) {
      this.setState({ emailErrorMessage: "valid email" })
      return true;
    }
    else {
      this.setState({ emailErrorMessage: "invalid email" })
      return false;
    }
  }

  updateCheckbox = () => {
    let { sortedCheck } = this.state;
    if (!sortedCheck) {
      this.sort();
    }
    this.setState({
      sortedCheck: !sortedCheck
    });
  };

  render() {
    let { sortedCheck } = this.state;
    return (
      <div className="App">
        <h2>{this.state.title}</h2>
        <form ref="myForm" className="myForm">
          <input type="text" ref="name" placeholder="input your name" className="formField" />
          <input type="text" ref="surname" placeholder="input your surname" className="formField" />
          <input type="email" ref="email" placeholder="input your mail" className="formField" />
          <input type="text" ref="address" placeholder="input your address" className="formField" />
          <span>Input the day when you want to reserve</span>
          <input type="date" ref="date" className="formField" />
          <button onClick={(e) => this.submit(e)} className="myButton"> submit </button>
        </form>
        <form>
          <label>
            <input onChange={this.updateCheckbox} checked={sortedCheck} type="checkbox" />
            <span>Sort by name</span>
          </label>
        </form>
        <table className="table-wrapper" >
          <tbody>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>surname</th>
              <th>address</th>
              <th>email</th>
              <th>date</th>
            </tr>
            {this.state.datas.map((data, i) =>
              <tr key={i} className="myList">
                <td>{i + 1}.</td>
                <td>{data.name}</td>
                <td>{data.surname}</td>
                <td>{data.address}</td>
                <td>{data.email}</td>
                <td>{data.date}</td>
                <td>
                  <button onClick={() => this.remove(i)} className="myListButton">remove</button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;