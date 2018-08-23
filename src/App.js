import React, { Component } from "react";
import Nav from "./assests/components/Nav";
import Home from "./assests/components/Home";
import Classes from "./assests/components/Classes";
import Spells from "./assests/components/Spells";
import {
  getBaseClassData,
  getBaseSpellList,
  fetchSpells
} from "./assests/js/api-calls";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "Home",
      component: <Home />,
      classData: {},
      spellList: [],
      spellListFiltered: [],
      selected: ""
    };
    this.setCall = this.setCall.bind(this);
    this.changePage = this.changePage.bind(this);
    this.handleNavClick = this.handleNavClick.bind(this);
    this.handleClassLinkClick = this.handleClassLinkClick.bind(this);
    this.handleSpellLinkClick = this.handleSpellLinkClick.bind(this);
    this.handleLevelChange = this.handleLevelChange.bind(this);
    this.handleSearchUpdate = this.handleSearchUpdate.bind(this);
  }

  componentDidMount() {
    getBaseClassData(this.state.classData, this.setCall);
    getBaseSpellList(this.state.spellList, this.setCall);

    //TODO GET Proficiencieses maybe in diff page like spells?
    //TODO GET Spells
  }

  setCall(data, call) {
    switch (call) {
      case "class":
        this.setState({ classData: data });
        break;
      case "spell":
        this.setState({ spellList: data });
        break;
      default:
        console.log(call);
    }
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
            handleSpellLinkClick={this.handleSpellLinkClick}
            spellListFiltered={this.state.spellListFiltered}
            handleSearchUpdate={this.handleSearchUpdate}
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
            handleClassLinkClick={this.handleClassLinkClick}
            handleLevelChange={this.handleLevelChange}
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

  handleNavClick(e) {
    const pageName = e.target.innerHTML;
    const newComponent = this.changePage(pageName);
    this.setState({
      page: pageName,
      component: newComponent
    });
  }

  handleClassLinkClick(e) {
    const name = e.target.innerHTML;
    if (
      document
        .querySelector(".container-class-main")
        .classList.contains("hidden")
    ) {
      document
        .querySelector(".container-class-main")
        .classList.remove("hidden");
    }

    document.querySelector("#level-select").selectedIndex = 0;

    this.setState({ selected: name }, () => {
      const pageName = this.state.page;
      const newComponent = this.changePage(pageName);
      this.setState({ page: pageName, component: newComponent });
    });
  }
  handleSpellLinkClick(e) {
    const index = this.state.spellList.indexOf(e.target.innerHTML) + 1;
    fetchSpells(index).then(data => console.log(data));
  }
  handleLevelChange(e) {
    let newClassData = this.state.classData;
    newClassData[this.state.selected].selectedLevel = parseInt(
      e.target.value,
      10
    );
    this.setState({ newClassData }, () => {
      const pageName = this.state.page;
      const newComponent = this.changePage(pageName);
      this.setState({ page: pageName, component: newComponent });
    });
  }
  handleSearchUpdate(e) {
    const input = e.target.value;
    let spellList = [];
    this.state.spellList.map(algo => {
      input.split(" ").map(spell => {
        if (algo.toLowerCase().indexOf(spell.toLowerCase()) !== -1) {
          spellList.push(algo);
        }
        return true;
      });
      return true;
    });
    console.log(spellList);
    if (input.length === 0) {
      spellList = [];
    }
    this.setState({ spellListFiltered: spellList }, () => {
      const pageName = this.state.page;
      const newComponent = this.changePage(pageName);
      this.setState({ page: pageName, component: newComponent });
    });
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
