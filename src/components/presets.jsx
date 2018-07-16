import React from "react";
import { connect } from "react-redux";
import {saveSession,resetSession,deleteSession,loadSession,loadFile} from "../actions/sessionActions.js";
import PresetListItem from "./presetListItem.jsx";
import MediaQuery from 'react-responsive';
import {smallMedium,mediumLarge} from "../windowSizes.js";
import t from "../localization.js";

const mapStateToProps=function(state)
{
	let taskId=state.selectedTask;
	return {presets:state.sessions[taskId].sessionArray,sessions:state.sessions,lang:state.lang};
};

const mapDispatchToProps=function(dispatch)
{
	return ({
		delete:function(id){dispatch(deleteSession(id));},
		save:function(name){dispatch(saveSession(name));},
		load:function(id){dispatch(loadSession(id));},
		reset:function(){dispatch(resetSession());},
		loadFromFile:function(content,callback){dispatch(loadFile(content,callback));}
	});
};

class Presets extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state={sessionName:'',loading:false,showModal:false,modalText:{ru:"",eng:""}};
		this.props=props;
		this._saveSession=this._saveSession.bind(this);
		this._changeName=this._changeName.bind(this);
		this._newSession=this._newSession.bind(this);
		this._loadFile=this._loadFile.bind(this);
		this._saveFile=this._saveFile.bind(this);
	}
	_newSession()
	{
		this.setState({sessionName:""});
		this.props.reset();
	}
	_changeName(e)
	{
		this.setState({sessionName:e.target.value});
	}
	_saveSession()
	{
		this.props.save(this.state.sessionName);
	}
	_saveFile()
	{
		var data=this.props.sessions;
		var blob = new Blob([JSON.stringify(data)], { type: 'text/plain' });
		var anchor = document.createElement('a');
		anchor.download = "VirtLabsSave.txt";
		anchor.href = (window.webkitURL || window.URL).createObjectURL(blob);
		anchor.dataset.downloadurl = ['text/plain', anchor.download, anchor.href].join(':');
        let url = URL.createObjectURL(blob);
        document.body.appendChild(anchor);
        anchor.click();
        setTimeout(function() {
            document.body.removeChild(anchor);
            window.URL.revokeObjectURL(url);  
        }, 0); 
	}
	_loadFile(e)
	{
		e.stopPropagation();
   		e.preventDefault();
   		var file = e.target.files[0];
   		e.target.value = "";
		if (!file) {
			return;
		}
		this.setState({loading:true});
		var reader = new FileReader();
		let self=this;
		reader.onload = function(e) {
		    var contents = e.target.result;
			self.props.loadFromFile(contents,function(success){
				if(success)
				{
					self.setState({loading:false,showModal:true,modalText:{ru:"Файл "+file.name+" был успешно загружен.",eng:"File "+file.name+" was successfully loaded."}});
				}else
				{
					self.setState({loading:false,showModal:true,modalText:{ru:"Не удалось загрузить файл "+file.name+".",eng:"Could not load file "+file.name+"."}});
				}

			});
		};
		reader.readAsText(file);
	}
	render()
	{
		const {presets,lang} = this.props;
		let self=this;
		let list=presets.map(function(data,index)
		{
			return <PresetListItem lang={lang} key={index+"sessionsList"} sessionName={data.sessionName} id={index} load={self.props.load} delete={self.props.delete}/>;
		});
		return (
		<div id="sessionBlock">
			<div className={"modal fade"+(this.state.showModal?" show":"")} id="modalDialog" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
			  <div className="modal-dialog modal-dialog-centered" role="document">
			    <div className="modal-content">
			      <div className="modal-header">
			        <h5 className="modal-title" id="exampleModalLongTitle">
			        {t({ru:"Загрузка",eng:"Loading"},lang)}
			        </h5>
			        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={function(){self.setState({showModal:false})}}>
			          <span aria-hidden="true">&times;</span>
			        </button>
			      </div>
			      <div className="modal-body">
			        {t(this.state.modalText,lang)}
			      </div>
			      <div className="modal-footer">
			        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={function(){self.setState({showModal:false})}}>OK</button>
			      </div>
			    </div>
			  </div>
			</div>
			<div id="sessionBlockLabel" className="componentLabel bg-dark text-white">
			        {t({ru:"Наборы параметров",eng:"Presets"},lang)}
			</div>
			<div className={"loaderBackground"+(this.state.loading?" show":" hide")}>
				 <div className="loader"></div> 
			</div>
			<div id="sessionListBlock">
				<div className="sessionListControls">
					<div className="sessionCreationBlock">
						<div className="noSelect" style={{textAlign:'center'}}>
						{t({ru:"Название набора",eng:"Preset name"},lang)}
						</div>
						<input type="text" value={this.state.sessionName} onChange={this._changeName}/>
						<button className="btn btn-primary presetButton" onClick={this._saveSession}>
						{t({ru:"Сохранить параметры",eng:"Save parameters"},lang)}
						</button>
						<button className="btn btn-primary presetButton" onClick={this._newSession}>
						{t({ru:"Сбросить параметры",eng:"Reset parameters"},lang)}
						</button>
						<label className="btn btn-primary presetButton" htmlFor="fileField">
						{t({ru:"Загрузить из файла",eng:"Load from file"},lang)}
						
						</label>
						<input id="fileField" type="file" onChange={this._loadFile}/>
						<button className="btn btn-primary presetButton" onClick={this._saveFile}>
						{t({ru:"Сохранить в файл",eng:"Save as file"},lang)}
						</button>
					</div>
				</div>
				<div id="sessionList">
					{list}
				</div>
			</div>
		</div>
			);
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(Presets);