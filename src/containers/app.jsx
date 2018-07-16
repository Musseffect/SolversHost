import React, { Component } from 'react';
import { connect } from "react-redux";
import { NavLink, Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
import MediaQuery from 'react-responsive';
import Results from '../components/results.jsx';
import Help from '../components/help.jsx';
import TaskList from '../components/taskList.jsx';
import MethodPicker from '../components/methodPicker.jsx';
import Presets from '../components/presets.jsx';
import OutputParameters from '../components/outputParameters.jsx';
import {smallMedium,mediumLarge} from "../windowSizes.js";
import t from "../localization.js";
import {switchLanguage} from "../actions/localizationActions.js";

const mapStateToProps=function(state)
{
  return {lang:state.lang};
};

const mapDispatchToProps=function(dispatch)
{
  return ({
    switchLanguage:function(){dispatch(switchLanguage());}
  });
};

class App extends Component {
  constructor(props)
  {
      super(props);
      this.state={menu:false,showHelp:false};
      this.toogleMenu=this.toogleMenu.bind(this);
      this.closeMenu=this.closeMenu.bind(this);
      this.switchLanguage=this.switchLanguage.bind(this);
      this.switchHelp=this.switchHelp.bind(this);
  }
  toogleMenu()
  {
    this.setState({menu:!this.state.menu});
  }
  closeMenu()
  {
    this.setState({menu:false});
  }
  switchHelp()
  {
    this.setState({showHelp:(!this.state.showHelp)});
  }
  switchLanguage()
  {
    this.props.switchLanguage();
  }
  render() {
    const {lang}=this.props;
    let header={ru:"Решение систем ОДУ",eng:"ODE systems solving"};
    let links=[];
    links.push(<NavLink key="link_1" to='/taskList' className="nav-link nav-item link" activeClassName="active" onClick={this.closeMenu}>{t({ru:"Задачи",eng:"Systems"},lang)}</NavLink>);
    links.push(<NavLink key="link_2" to='/methodPicker' className="nav-link nav-item link" activeClassName="active" onClick={this.closeMenu}>{t({ru:"Выбор методов",eng:"Methods"},lang)}</NavLink>);
    links.push(<NavLink key="link_3" to='/outputParameters' className="nav-link nav-item link" activeClassName="active" onClick={this.closeMenu}>{t({ru:"Выбор графиков",eng:"Choice of plots"},lang)}</NavLink>);
    links.push(<NavLink key="link_4" to='/results' className="nav-link nav-item link" activeClassName="active" onClick={this.closeMenu}>{t({ru:"Получение результатов",eng:"Results and plots"},lang)}</NavLink>);
    links.push(<NavLink key="link_5" to='/presets' className="nav-link nav-item link" activeClassName="active" onClick={this.closeMenu}>{t({ru:"Сохранение и загрузка параметров",eng:"Save and load presets"},lang)}</NavLink>);
    
    return (
      <div className='containerMain'>
      <MediaQuery maxWidth={smallMedium}>
        <div id="menuBackground" style={this.state.menu?{display:'block',position:'fixed',left:0,right:0,top:0,bottom:0,opacity:0.5,zIndex:6,backgroundColor:"black"}:{display:'none'}} onClick={this.toogleMenu}>
        </div>
        <div style={{display:"flex",height:"100%",flexDirection:"row"}}>
          <div id="menuMobile" className={this.state.menu?"show":"hide"}>
            <div className="navbar navbar-dark bg-primary" style={{display:'flex',flexDirection:'column',width:"100%"}}>
              <div className="navbar-nav">
              <div style={{width:"100%",height:"40px"}}>
              </div>
              {links}
              <a onClick={this.switchLanguage} className="nav-link nav-item link" href="#">{t({ru:"Переключить на англ.",eng:"Switch to RU"},lang)}</a>
              </div>
            </div>
          </div>
          <div id="rootLayout" style={{display:"flex",flexDirection:"column",height:"100%",width:"100%"}} className={this.state.menu?"shifted":"normal"}>
            <div style={{display:"flex",flexDirection:"row",flexShrink:'0'}}>
              <div  className="bg-primary" id="menuButton" onClick={this.toogleMenu}>
                <svg className="menuIcon" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 8 8" width="8" height="8">
                  <use href="#menuSign"></use>
                </svg>
              </div>
              <div className="headerTitle noSelect">
                <h4>
                {t(header,lang)}
                </h4>
              </div>
            </div>
            <div id="content">
                <Help show={this.state.showHelp} switchHelp={this.switchHelp}  lang={lang}/>
                <Route exact path='/' component={TaskList} />
                <Route path='/taskList' component={TaskList} />
                <Route path='/methodPicker' component={MethodPicker} />
                <Route path='/outputParameters' component={OutputParameters} />
                <Route path='/results' component={Results} />
                <Route path='/presets' component={Presets} />
            </div>
          </div>
        </div>
      </MediaQuery>
      <MediaQuery minWidth={smallMedium+1}>
        <div onClick={this.switchLanguage} className="bg-primary text-white switchLanguageIcon noSelect">
        {t({ru:"ENG",eng:"RU"},lang)}
        </div>
        <div id="rootLayout" style={{display:"flex",flexDirection:"column",height:"100%",width:"100%"}}>
          <div id="header" className="noSelect" style={{width:"100%"}}>
                <h4>
                {t(header,lang)}
                </h4>
          </div>
          <div id="menu" className="navbar navbar-expand navbar-dark bg-primary" style={{width:"100%",display:"flex",flexDirection:"row"}} >
          <div className="navbar-nav mr-auto">
              {links}
              </div>
          </div>
          <div id="content">
            <Help show={this.state.showHelp} switchHelp={this.switchHelp} lang={lang}/>
            <Route exact path='/' component={TaskList} />
            <Route path='/taskList' component={TaskList} />
            <Route path='/methodPicker' component={MethodPicker} />
            <Route path='/outputParameters' component={OutputParameters} />
            <Route path='/results' component={Results} />
            <Route path='/presets' component={Presets} />
          </div>
        </div>
      </MediaQuery>
      </div>
    )
  }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));