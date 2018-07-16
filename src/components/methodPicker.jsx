import React from "react";
import { connect } from "react-redux";
import {select,add,remove,update} from "../actions/methodPickerActions.js";
import MethodPickerListItem from "./methodPickerListItem.jsx";
import MethodParameters from "./methodParameters.jsx";
import {colors,defaultParameters} from "../reducers/methodPickerReducer.js";
import {methods} from "../methods.js";
import {smallMedium,mediumLarge} from "../windowSizes.js";
import MediaQuery from 'react-responsive';
import t from "../localization.js";

const mapStateToProps=function(state)
{
	let taskId=state.selectedTask;
	return {methods:state.currentSessions[taskId].data.methods,selectedMethod:state.selectedMethod,dependOnTask:state.dependOnTask,lang:state.lang};
};

const mapDispatchToProps=function(dispatch)
{
	return ({
		select:function(id){dispatch(select(id));},
		add:function(){dispatch(add());},
		remove:function(id){dispatch(remove(id));},
		update:function(id,name,value){dispatch(update(id,name,value));}
	});
};

class MethodPicker extends React.Component
{
	constructor(props)
	{
		super(props);
		this.props=props;

		this._methodUpdate=this._methodUpdate.bind(this);
	}
	componentWillMount()
	{
	}
	_methodUpdate(name,value)
	{
		this.props.update(this.props.selectedMethod,name,value);
	}
	render()
	{
		const {lang,selectedMethod,dependOnTask}=this.props;
		var self=this;
		var items=this.props.methods.map(function(data,index)
		{
			//var color={backgroundColor:colors[index]};
			return (<MethodPickerListItem key={index+"_pickerListItem"} select={self.props.select} remove={self.props.remove} methodName={t(methods[data.parameters.selectedMethod].attributes.name,lang)} number={index} selected={(selectedMethod==index)} colorStyle={"methodColor"+index}/>);
		});
		var mobileItems=items.slice();
		if(selectedMethod!==-1)
		{
			mobileItems.splice(selectedMethod+1,0,(<MethodParameters key="MethodParametersKey" lang={lang} onUpdate={self._methodUpdate} taskDependent={dependOnTask} parameters={selectedMethod==-1?defaultParameters:this.props.methods[selectedMethod].parameters} show={selectedMethod!=-1}/>));
		}
		return (
		<div id="methodsBlock" >
			<div id="methodsBlockLabel" className="componentLabel bg-dark text-white">
				{t({ru:"Выбор методов",eng:"Methods"},lang)}
			</div>
			<div id="methodsListBlock">
				<MediaQuery maxWidth={smallMedium}>
							<div id="methodsList">
								<button id="methodAddButton"className="btn btn-primary" onClick={this.props.add} disabled={this.props.methods.length==4?true:false}>
									<svg className="addButtonIcon" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 8 8" width="8" height="8">
										<use href="#plusSign"></use>
									</svg>
								</button>
								{mobileItems}
							</div>
			    </MediaQuery>
		      	<MediaQuery minWidth={smallMedium+1}>
							<div id="methodsList">
								<button id="methodAddButton" className="btn btn-primary" onClick={this.props.add} disabled={this.props.methods.length==4?true:false}>
									<svg className="addButtonIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8" width="8" height="8">
										<use href="#plusSign"></use>
									</svg>
								</button>
								{items}
							</div>
							<MethodParameters key={selectedMethod+"_methodParameters"} lang={lang} onUpdate={self._methodUpdate} taskDependent={dependOnTask} parameters={selectedMethod==-1?defaultParameters:this.props.methods[selectedMethod].parameters} show={selectedMethod!=-1}/>
			    </MediaQuery>
			</div>
		</div>
			);

	}
}

export default connect(mapStateToProps,mapDispatchToProps)(MethodPicker);