
export var updateParameter=function(name,value)
{
	return {type:"UPDATE_OUTPUT_PARAMETER",name,value};
};
export var updatePlots=function(name,value)
{
	return {type:"UPDATE_PLOTS",name,value};
};
export var updateResults=function(results)
{
	return {type:"UPDATE_RESULTS",results};
};