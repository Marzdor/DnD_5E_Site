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
      classData: [],
      spellData: {}
    };
    this.changePage = this.changePage.bind(this);
    this.cleanClassData = this.cleanClassData.bind(this);
    this.cleanStartEqupmentData = this.cleanStartEqupmentData.bind(this);
    this.handleNavClick = this.handleNavClick.bind(this);
    this.handleLinkClick = this.handleLinkClick.bind(this);
  }

  componentDidMount() {
    fetch("http://www.dnd5eapi.co/api/classes/")
      .then(res => {
        return res.json();
      })
      .then(data => {
        // Get list of all classes
        let newClassData = this.state.classData;
        data.results.map(item => {
          newClassData.push({ name: item.name });
          return true;
        });
        ////////////////////////////////////////////
        // Get base class data
        for (let i = 1; i < newClassData.length; i++) {
          let target = "http://www.dnd5eapi.co/api/classes/" + i;
          fetch(target)
            .then(res => {
              return res.json();
            })
            .then(data => {
              // Delete keys we don't want/need
              const cleanedData = this.cleanClassData(data);
              // Clean data more and add data to existing object
              for (let key in cleanedData) {
                let prop = [];
                if (cleanedData.hasOwnProperty(key)) {
                  switch (key) {
                    case "proficiencies":
                    case "saving_throws":
                      cleanedData[key].map(item => {
                        prop.push(item.name);
                        return true;
                      });
                      newClassData[i - 1][key] = prop;
                      break;
                    case "proficiency_choices":
                      cleanedData[key][0].from.map(item => {
                        prop.push(item.name);
                        return true;
                      });
                      prop = ["Choose: " + cleanedData[key][0].choose, ...prop];
                      newClassData[i - 1][key] = prop;
                      break;
                    case "subclasses":
                      newClassData[i - 1][key] = cleanedData[key][0].name;
                      break;
                    default:
                      newClassData[i - 1][key] = cleanedData[key];
                  }
                }
              }
            });
        }
        this.setState({ classData: newClassData });
      });

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
    //TODO GET Class LEVELS
    //TODO GET Proficiencieses
    //TODO GET Sub CLass
    //TODO GET STARTING EQUIPMENT DATA ...
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
          />
        );
        break;
      default:
        console.log(name);
    }
    return page;
  }

  cleanClassData(data) {
    delete data.index;
    delete data.name;
    delete data.url;
    delete data._id;
    return data;
  }

  cleanStartEqupmentData(target) {}

  handleNavClick(e) {
    const pageName = e.target.innerHTML;
    const newComponent = this.changePage(pageName);
    this.setState({ page: pageName, component: newComponent });
  }
  //TODO handle link clicks
  handleLinkClick(e) {
    // const name = e.target.innerHTML;
    // let target;
    switch (this.state.page) {
      case "Classes":
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
