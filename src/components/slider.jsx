import React from "react";
import {smallMedium,mediumLarge} from "../windowSizes.js";
import MediaQuery from 'react-responsive';

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

export default class Slider extends React.Component
{


	
}