
import {setParameters} from "./methodPickerReducer.js";
import {setPlotInterval} from "./outputParametersReducer.js";

var taskReducer=function(state,action)
{
	let taskInfo=state.currentSessions[state.selectedTask].data.taskParameters;
	switch(action.type)
	{
		case "SELECT_TASK":
			if(state.selectedTask!=action.id)
				{
					state.selectedTask=action.id;
					state.selectedMethod=-1;
					state=setPlotInterval(setParameters(state));
				}
			break;
		case "UPDATE_PARAMETER":
			taskInfo.parameters[action.name]=action.value;
			break;
		case "UPDATE_VARIABLE":
			taskInfo.variables[action.name]=action.value;
			break;
		case "UPDATE_ARGUMENT":
			taskInfo[action.name]=action.value;
			state=setPlotInterval(state);
			break;
	}
	return state;
}



export default taskReducer;