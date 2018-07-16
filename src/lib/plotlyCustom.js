import Plotly from 'plotly.js/lib/core';
/*import Plot from 'react-plotly.js';*/

Plotly.register([
    require('plotly.js/lib/scatter'),
    require('plotly.js/lib/scatter3d')
]);
import createPlotlyComponent from 'react-plotly.js/factory';
const Plot= createPlotlyComponent(Plotly);

// Load in the trace types for pie, and choropleth
export default Plot;