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
      component: <Home />
    };
    this.handleNavClick = this.handleNavClick.bind(this);
    this.changePage = this.changePage.bind(this);
  }
  changePage(name) {
    let page;
    switch (name) {
      case "Home":
        page = <Home />;
        break;
      case "Spells":
        page = <Spells />;
        break;
      case "Classes":
        page = <Classes />;
        break;
      default:
        console.log(this.state.page);
    }
    return page;
  }
  handleNavClick(e) {
    const pageName = e.target.innerHTML;
    const newComponent = this.changePage(pageName);
    this.setState({ page: pageName, component: newComponent });
  }
  render() {
    return (
      <div>
        <Nav handleNavClick={this.handleNavClick} />
        {this.state.component}
      </div>
    );
  }
}

export default App;
