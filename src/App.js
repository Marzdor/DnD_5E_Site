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
      spellList: []
    };
    this.changePage = this.changePage.bind(this);
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
        const list = data.results.map(item => item.name);
        this.setState({ spellList: list });
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
          />
        );
        break;
      default:
        console.log(name);
    }
    return page;
  }

  handleNavClick(e) {
    const pageName = e.target.innerHTML;
    const newComponent = this.changePage(pageName);
    this.setState({ page: pageName, component: newComponent });
  }

  handleLinkClick(e) {
    const name = e.target.innerHTML;
    switch (this.state.page) {
      case "Classes":
        const target = this.state.classList.reduce((acc, item) => {
          let url;
          item.name === name ? (url = acc + item.url) : (url = acc + "");
          return url;
        }, "");
        break;
      case "Spells":
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
