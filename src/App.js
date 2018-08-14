import React, { Component } from "react";
import "./App.css";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Classes from "./components/Classes";
import Spells from "./components/Spells";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "Home",
      component: <Home />,
      classList: [],
      classData: {},
      spellList: [],
      spellData: {},
      selected: { item: "", target: "" }
    };
    this.changePage = this.changePage.bind(this);
    this.getClassData = this.getClassData.bind(this);
    this.getStartEqipment = this.getStartEqipment.bind(this);
    this.handleNavClick = this.handleNavClick.bind(this);
    this.handleLinkClick = this.handleLinkClick.bind(this);
  }

  componentDidMount() {
    fetch("http://www.dnd5eapi.co/api/classes/")
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.setState({ classList: data.results });
      });
    fetch("http://www.dnd5eapi.co/api/spells/")
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.setState({ spellList: data.results });
      });
  }

  changePage(name) {
    let page;

    switch (name) {
      case "Home":
        page = <Home />;
        break;
      case "Spells":
        page = (
          <Spells
            handleLinkClick={this.handleLinkClick}
            spellList={this.state.spellList}
          />
        );
        break;
      case "Classes":
        page = (
          <Classes
            handleLinkClick={this.handleLinkClick}
            classList={this.state.classList}
            classData={this.state.classData}
            name={this.state.selected.item}
          />
        );
        break;
      default:
        console.log(name);
    }
    return page;
  }

  getClassData(target, name) {
    fetch(target)
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.setState({
          selected: { item: name, target: target },
          classData: data
        });
      });
  }
  //TODO GET STARTING EQUIPMENT DATA ...
  getStartEqipment(target) {
    fetch(target)
      .then(res => {
        return res.json();
      })
      .then(data => {
        // console.log(data);
        // this.setState({ classList: data.results });
      });
  }

  handleNavClick(e) {
    const pageName = e.target.innerHTML;
    const newComponent = this.changePage(pageName);
    this.setState({ page: pageName, component: newComponent });
  }

  handleLinkClick(e) {
    const name = e.target.innerHTML;
    let target;
    switch (this.state.page) {
      case "Classes":
        target = this.state.classList.reduce((acc, item) => {
          let url;
          item.name === name ? (url = acc + item.url) : (url = acc + "");
          return url;
        }, "");
        this.getClassData(target, name);
        console.log(this.state.selected.item);
        break;
      case "Spells":
        target = this.state.spellList.reduce((acc, item) => {
          let url;
          item.name === name ? (url = acc + item.url) : (url = acc + "");
          return url;
        }, "");
        console.log(target);
        break;
      default:
        console.log(this.state.page);
    }
  }
  render() {
    return (
      <section>
        <Nav handleNavClick={this.handleNavClick} />
        {this.state.component}
      </section>
    );
  }
}

export default App;
