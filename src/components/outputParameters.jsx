import React from "react";
import { connect } from "react-redux";
import {updateParameter,updatePlots} from "../actions/outputParametersActions.js";
import Slider, { Rail, Handles, Tracks, Ticks } from 'react-compound-slider';
import {colors} from "../reducers/methodPickerReducer.js";
import {Handle, Track, Tick, VerticalHandle, VerticalTrack, VerticalTick} from './sliderComponents.jsx';
import tasks from "../tasks.js";
import {methods} from "../methods.js";
import {smallMedium,mediumLarge} from "../windowSizes.js";
import MediaQuery from 'react-responsive';
import t from "../localization.js";

const sliderStyle = {
  position: 'relative',
  width: '100%',
}

const railStyle = {
  position: 'absolute',
  width: '100%',
  height: 14,
  borderRadius: 7,
  cursor: 'pointer',
  backgroundColor: 'rgb(155,155,155)',
}
const vericalSliderStyle = {
  position: 'relative',
  height: '400px',
  marginLeft: '45%',
}
const verticalRailStyle = {
  position: 'absolute',
  width: '14px',
  height: '100%',
  cursor: 'pointer',
  marginLeft: '-1px',
  borderRadius: '7px',
  backgroundColor: 'rgb(155,155,155)',
}


const mapStateToProps=function(state)
{
	let taskId=state.selectedTask;
	return {parameters:state.currentSessions[taskId].data.outputParameters,
		methods:state.currentSessions[taskId].data.methods,
		task:tasks[taskId],
		lang:state.lang};
};

const mapDispatchToProps=function(dispatch)
{
	return ({
		updateParameter:function(name,value){dispatch(updateParameter(name,value))},
		updatePlots:function(name,value){dispatch(updatePlots(name,value));}
	});
};


class OutputParameters extends React.Component
{
	constructor(props)
	{
		super(props);
		this.props=props;
		this._updateParameter=this._updateParameter.bind(this);
		this._updatePlots=this._updatePlots.bind(this);
		this._updateSlider=this._updateSlider.bind(this);
	}
	_updateParameter(e)
	{
		this.props.updateParameter(e.target.name,(e.target.type === 'checkbox' ? e.target.checked : e.target.value));
	}
	_updatePlots(e)
	{
		this.props.updatePlots(e.target.name,e.target.checked);
	}
	_updateSlider(e)
	{
		this.props.updateParameter('plotInterval',e);
	}
	render()
	{
		const {lang,parameters,task}=this.props;
		let methodList=[];
		let methods_t=this.props.methods.map(function(data,index){
			return methods[data.parameters.selectedMethod].attributes.name;
		})
		methods_t.forEach(function(data,index)
		{
			methodList.push(<option key={index+"errorMethodList"} value={index}>{"Использовать решение "+(index+1) +'. '+ t(data,lang)}</option>);
		});
		let checkboxes=[];
		let self=this;
		parameters.plots.forEach(function(data,index)
		{
			checkboxes.push(<div className="table_row" key={index+"_plotDiv"}>
				<label key={index+"_plotLabel"} className="table_label" htmlFor={index+"_input"}>{t(task.plotInfo[index].description,lang)}</label>
				<input  className="table_input" type="checkbox" name={index} key={index+"_input"} id={index+"_input"} onChange={self._updatePlots} checked={data} />
					</div>);
		});
		let domain=[parameters.plotDomain.t0, parameters.plotDomain.t1], reversed=false;
		let values=parameters.plotInterval;

		let ticks=20;
		let modeFunction=function(values,update,count,smthing)
				          	{
				          		if(values[0].val<update[0].val)
				          		{
				          			let u1=update[0].val+parameters.plotDomain.dt;
				          			update[1].val=Math.min(Math.max(update[0].val,Math.floor(u1/step)*step)
				          			,update[1].val);
				          		}
				          		else
				          		{
				          			let u1=update[1].val-parameters.plotDomain.dt;
				          			update[0].val=Math.max(Math.min(update[1].val,Math.ceil(u1/step)*step)
				          			,update[0].val);
				          		}
				          		return update;
				          	};
		let step=(domain[1]-domain[0])/ticks;
		return (
			<div id="outputParametersBlock">
			<div id="outputParametersLabel" className="componentLabel bg-dark text-white">
				{t({ru:"Выбор графиков",eng:"Choice of plots"},lang)}
			</div>
			<div id="outputParametersContent">
				<div id="outputParametersTable">
					<div className="table_row">		
					<label className="table_label">
					{t({ru:"Расчёт ошибки",eng:"Error calculation"},lang)}
					</label>
				 	<select id="outputMainMethod" name="errorMethod" onChange={this._updateParameter} value={parameters.errorMethod}>
				 		<option value="-1">
							{t({ru:"Не производить",eng:"Is not needed"},lang)}
				 		</option>
				 		{methodList}
				 	</select>
					</div>
					<div className="table_row">						
						<label className="table_label" htmlFor="errors_input">
							{t({ru:"Графики локальной и глобальной ошибок",eng:"Plots of local and global errors"},lang)}
						</label>
						<input  className="table_input" type="checkbox" name="errorPlot" id="errors_input" onChange={self._updateParameter} checked={parameters.errorPlot} />

					</div>
					<div className="table_row">
						<label className="table_label" htmlFor="eigenvalue_input">
							{t({ru:"График максимальных по модулю собственных чисел",eng:"Plot of eigenvalues"},lang)}
						</label>
						<input  className="table_input" type="checkbox" name="eigenvaluePlot" id="eigenvalue_input" onChange={self._updateParameter} checked={parameters.eigenvaluePlot} />
					</div>
					{checkboxes}
			 	</div>
			 </div>
			 	<div>
			 		<div className="componentLabel bg-dark text-white" id="outputPlotIntervalLabel">
							{t({ru:"Интервал построения графиков",eng:"Plotting interval"},lang)}
			 		</div>
				 	<div id="plotSlider" style={{padding:"20px "+50/ticks+"%",marginBottom:"20px"}}>
				 	<MediaQuery maxWidth={smallMedium}>
				 	<Slider
				          mode={modeFunction}
				          step={step}
				          domain={domain}
				          reversed={reversed}
				          rootStyle={vericalSliderStyle}
				          onChange={this._updateSlider}
				          values={values}
				          vertical
				        >
				        	<Rail>
					            {({ getRailProps }) => (
					              <div style={verticalRailStyle} {...getRailProps()} />
					            )}
				          	</Rail>
					        <Handles>
					            {({ handles, getHandleProps }) => (
					              	<div className="slider-handles">
						                {
						                	handles.map(handle => (
						                  <VerticalHandle
						                    key={handle.id}
						                    handle={handle}
						                    domain={domain}
						                    getHandleProps={getHandleProps}
						                  />
						                	))
						            	}
					              	</div>
					            )}
					        </Handles>
					        <Tracks left={false} right={false}>
					            {({ tracks, getTrackProps }) => (
					              <div className="slider-tracks">
					                {tracks.map(({ id, source, target }) => (
					                  <VerticalTrack
					                    key={id}
					                    source={source}
					                    target={target}
					                    getTrackProps={getTrackProps}
					                  />
					                ))}
					              </div>
					            )}
					        </Tracks>
					        <Ticks count={ticks}>
					            {({ ticks }) => (
					              <div className="slider-ticks">
					                {ticks.map(tick => (
					                  <VerticalTick key={tick.id} tick={tick} count={ticks.length} />
					                ))}
					              </div>
					            )}
					        </Ticks>
				        </Slider>
				    </MediaQuery>
			      	<MediaQuery minWidth={smallMedium+1}>
			      		<Slider
				          mode={modeFunction}
				          step={step}
				          domain={domain}
				          reversed={reversed}
				          rootStyle={sliderStyle}
				          onChange={this._updateSlider}
				          values={values}
				          vertical={false}
				        >
				        	<Rail>
					            {({ getRailProps }) => (
					              <div style={railStyle} {...getRailProps()} />
					            )}
				          	</Rail>
					        <Handles>
					            {({ handles, getHandleProps }) => (
					              	<div className="slider-handles">
						                {
						                	handles.map(handle => (
						                  <Handle
						                    key={handle.id}
						                    handle={handle}
						                    domain={domain}
						                    getHandleProps={getHandleProps}
						                  />
						                	))
						            	}
					              	</div>
					            )}
					        </Handles>
					        <Tracks left={false} right={false}>
					            {({ tracks, getTrackProps }) => (
					              <div className="slider-tracks">
					                {tracks.map(({ id, source, target }) => (
					                  <Track
					                    key={id}
					                    source={source}
					                    target={target}
					                    getTrackProps={getTrackProps}
					                  />
					                ))}
					              </div>
					            )}
					        </Tracks>
					        <Ticks count={ticks}>
					            {({ ticks }) => (
					              <div className="slider-ticks">
					                {ticks.map(tick => (
					                  <Tick key={tick.id} tick={tick} count={ticks.length} />
					                ))}
					              </div>
					            )}
					        </Ticks>
				        </Slider>
				    </MediaQuery>

				 	</div>
				 </div>
			</div>
			);
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(OutputParameters);