import React, { Component } from "react";
import Nav from "./assests/components/Nav";
import Home from "./assests/components/Home";
import Classes from "./assests/components/Classes";
import Spells from "./assests/components/Spells";
import { getBaseClassData } from "./assests/js/api-calls";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "Home",
      component: <Home />,
      classData: {},
      spellData: {},
      selected: ""
    };
    this.setClassCall = this.setClassCall.bind(this);
    this.changePage = this.changePage.bind(this);
    this.cleanStartEqupmentData = this.cleanStartEqupmentData.bind(this);
    this.handleNavClick = this.handleNavClick.bind(this);
    this.handleLinkClick = this.handleLinkClick.bind(this);
  }

  componentDidMount() {
    getBaseClassData(this.state.classData, this.setClassCall);

    fetch("http://www.dnd5eapi.co/api/spells/")
      .then(res => {
        return res.json();
      })
      .then(data => {
        let newSpellData = this.state.spellData;
        newSpellData.spellList = data.results.map(item => {
          return item.name;
        });
        this.setState({ spellData: newSpellData });
      });

    //TODO GET Proficiencieses maybe in diff page like spells?
    //TODO GET Sub CLass
  }

  setClassCall(data) {
    this.setState({ classData: data });
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
        let classData;
        this.state.selected === ""
          ? (classData = this.state.classData)
          : (classData = this.state.classData[this.state.selected]);

        page = (
          <Classes
            handleLinkClick={this.handleLinkClick}
            classData={classData}
            name={this.state.selected}
          />
        );
        break;
      default:
        console.log(name);
    }
    return page;
  }

  cleanStartEqupmentData(target) {}

  handleNavClick(e) {
    const pageName = e.target.innerHTML;
    const newComponent = this.changePage(pageName);
    this.setState({ page: pageName, component: newComponent });
  }

  handleLinkClick(e) {
    const name = e.target.innerHTML;
    switch (this.state.page) {
      case "Classes":
        this.setState({ selected: name }, () => {
          const pageName = this.state.page;
          const newComponent = this.changePage(pageName);
          this.setState({ page: pageName, component: newComponent });
        });
        break;
      case "Spells":
        break;
      default:
        console.log(this.state.page);
    }
  }
  render() {
    return (
      <main>
        <Nav handleNavClick={this.handleNavClick} />
        {this.state.component}
      </main>
    );
  }
}

export default App;
