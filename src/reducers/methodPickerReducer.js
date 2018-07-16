import tasks from "../tasks.js";
import {setPlotInterval} from "./outputParametersReducer.js";
export const colors=["#E600CE","#0014AF","#00C13A","#F6D444"];
export const dependOnTask=
{
	errorMax:0.01,
	stepMin:1,
	stepMax:1000,
	jacobianAnalythicEnabled:false

};
export const dependOnMethod=
{
	autoStepEnabled:false,
	chooseOrderEnabled:false,
	jacobianMatrixEnabled:false
};

export const defaultParameters=
{
	errorValue:0.01,
	maxstepValue:20,
	stepValue:20,
	selectedMethod:0,
	selectedOrder:0,
	jacobianSelected:1,
	useConstMatrix:false,
	iterationsCount:10,
	maxAbsSolution:0.01,
	maxAbsDifference:0.01,
	maxRelDifference:0.01
};

export function setParameters(state)
{
	state.dependOnTask=Object.assign({},dependOnTask);
	state.defaultParameters=Object.assign({},defaultParameters);
	let mA=tasks[state.selectedTask].methodsAttributes;
	if(mA!==undefined)
	{
		for(var propertyName in state.dependOnTask) {
			if(mA[propertyName]!==undefined)
			{
				state.dependOnTask[propertyName]=mA[propertyName];
			}
		}

		for(var propertyName in state.defaultParameters) {
			if(mA[propertyName]!==undefined)
			{
				state.defaultParameters[propertyName]=mA[propertyName];
			}
		}
		state.defaultParameters.maxstepValue=state.defaultParameters.stepValue;
	}
	return state;
}

function addMethod(state,methods)
{
	if(methods.length==4)
		return;
	state.selectedMethod=methods.length;
	let taskId=state.selectedTask;
	state.currentSessions[taskId].data.methods=methods.concat({colorId:0,parameters:Object.assign({}, defaultParameters)});
	return state;
}

function removeMethod(state,methods,id)
{
	if(id==state.selectedMethod)
		state.selectedMethod=-1;
	else if(id<state.selectedMethod)
	{
		state.selectedMethod=state.selectedMethod-1;
	}
	//this.colorPool.push(this.methods[id].colorId);
	let taskId=state.selectedTask;
	state.currentSessions[taskId].data.methods=methods.filter(function(item,index){return index!=id;});
	return state;
}

export var methodPickerReducer=function(state,action)
{
	let taskId=state.selectedTask;
	let methods=state.currentSessions[taskId].data.methods;
	switch(action.type)
	{
		case "SELECT_METHOD":
			if(state.selectedMethod==action.id)
				state.selectedMethod=-1;
			else
				state.selectedMethod=action.id;
			break;
		case "ADD_METHOD":
			state=setPlotInterval(addMethod(state,methods));
			break;
		case "REMOVE_METHOD":
			state=setPlotInterval(removeMethod(state,methods,action.id));
			break;
		case "UPDATE_METHOD":
		 	if(action.name=="selectedMethod"&&methods[action.id].parameters[action.name]!=action.value)
		 	{
		 		methods[action.id].parameters["selectedOrder"]=0;
		 	}
			methods[action.id].parameters[action.name]=action.value;
			state.currentSessions[taskId].data.methods=methods.slice();
			//methods[action.id].parameters=Object.assign(methods[action.id].parameters,{[action.name]:action.value});
			state=setPlotInterval(state);
			break;
	}

	return state;
}

