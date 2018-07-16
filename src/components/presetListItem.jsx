import React from "react";
import t from "../localization.js";

class PresetListItem extends React.Component
{
	constructor(props)
	{
		super(props);
		this._load=this._load.bind(this);
		this._delete=this._delete.bind(this);
	}
	_load()
	{
		this.props.load(this.props.id);
	}
	_delete()
	{
		this.props.delete(this.props.id);
	}
	render(){
		const {sessionName,lang} = this.props;
		return (
			<div id="preset1" className="presetBlock">
				<div className="presetName">
					{sessionName}
				</div>
				<div className="presetButtonContainer">
					<button type="button" className="btn btn-primary presetButton" onClick={this._load}>
					{t({ru:"Применить",eng:"Apply"},lang)}
					</button>
					<button type="button" className="btn btn-danger presetButton" onClick={this._delete}>
					{t({ru:"Удалить",eng:"Delete"},lang)}
					</button>
				</div>
			</div>
			);
	}
}

module.exports=PresetListItem;



