import React from "react";
import HelpResults from '../components/helpComponents/helpResults.jsx';
import HelpTasks from '../components/helpComponents/helpTasks.jsx';
import HelpMethods from '../components/helpComponents/helpMethods.jsx';
import HelpPresets from '../components/helpComponents/helpPresets.jsx';
import HelpPlots from '../components/helpComponents/helpPlots.jsx';

import { NavLink, Route, Switch } from 'react-router-dom';
import t from "../localization.js";



class Help extends React.Component
{
	constructor(props)
	{
		super(props);
		this.props=props;
	}
	render()
	{
		const {lang,show,switchHelp}=this.props;
		return (<div>
					<a onClick={switchHelp} className={"helpIconContainer noSelect"+(show?" bg-danger":" bg-primary")}>
						<svg className="helpIcon" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 8 8" width="8" height="8">
                  			<use href="#question-mark"></use>
                		</svg>
					</a>
					<div id="helpRoutes" className={"helpRoutes"+(show?" show":" hide")}>
		                <Route exact path='/' render={(props)=><HelpTasks lang={lang} {...props}/>} />
		                <Route path='/taskList' render={(props)=><HelpTasks lang={lang} {...props}/>} />
		                <Route path='/methodPicker' render={(props)=><HelpMethods lang={lang} {...props}/>} />
		                <Route path='/outputParameters' render={(props)=><HelpPlots lang={lang} {...props}/>} />
		                <Route path='/results' render={(props)=><HelpResults lang={lang} {...props}/>} />
		                <Route path='/presets' render={(props)=><HelpPresets lang={lang} {...props}/>} />
					</div>
				</div>
			);

	}
}



export default Help;