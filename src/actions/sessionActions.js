export var saveSession=function(sessionName)
{
	return {type:'SAVE_SESSION',sessionName};
};
export var resetSession=function()
{
	return {type:'RESET_SESSION'};
};
export var deleteSession=function(id)
{
	return {type:'DELETE_SESSION',id};
};
export var loadSession=function(id)
{
	return {type:"LOAD_SESSION",id};
}
export var loadFile=function(content,callback)
{
	return {type:"LOAD_FILE",content,callback};
}