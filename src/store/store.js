import { createStore } from "redux"; 
import tasks from "../tasks.js";
import rootReducer from "../reducers/rootReducer.js";
import {dependOnTask,defaultParameters,setParameters} from "../reducers/methodPickerReducer.js";


function defineLanguage()
{
	let lang="eng";
	let checkArray=[navigator.language,
	navigator.browserLanguage,
	navigator.systemLanguage,
	navigator.userLanguage];
	let counter=0;
	while(counter<checkArray.length)
	{
		if(checkArray[counter]!==undefined)
		{
			if(checkArray[counter].slice(0,2)=="ru")
			{
				lang="ru";
				break;
			}
		}
		counter++;
	}
	return lang;
}


const initialState=(function(){

		function initSessions(sessions)
		{
			currentSessions=new Array(sessions.length);
			for(var i=0;i<sessions.length;i++)
			{
				currentSessions[i]=newSession(i);
			}
			return currentSessions;
		}
		function newSession(taskID)
		{
			let session={sessionName:'Новая сессия'};
			let data={};
			let i=taskID;
			let k=0;
			let taskParameters={};
			taskParameters.argument=tasks[i].argument.default;
			taskParameters.argumentInterval=tasks[i].argumentInterval.default;
			taskParameters.parameters=tasks[i].parameters.map(function(data)
			{
				return data.default;
			});
			taskParameters.variables=tasks[i].variables.map(function(data)
			{
				return data.default;
			});
			let outputParameters={};
			outputParameters.errorMethod=-1;
			outputParameters.plotInterval=[0, 0];
			outputParameters.plotDomain={t0:0,t1:1,dt:0};
			outputParameters.errorPlot=false;
			outputParameters.eigenvaluePlot=false;
			outputParameters.plots=[
			];
			tasks[i].plotInfo.forEach(function(data)
			{
				outputParameters.plots.push(false)
			});
			data={methods:[],taskParameters:taskParameters,outputParameters:outputParameters};
			session.data=data;
			return session;
		}

		let sessions=tasks.map(function(el,index){
			return {taskID:el.taskID,sessionArray:[]};
		});
		let currentSessions=initSessions(sessions);

		let state={sessions:sessions,currentSessions:currentSessions,selectedMethod:-1,selectedTask:0,dependOnTask:dependOnTask,defaultParameters:defaultParameters
			,results:{data:undefined,task:undefined},lang:defineLanguage()};
		state=setParameters(state);
		return state;
})();


const store = createStore(rootReducer,initialState);  


export default store;