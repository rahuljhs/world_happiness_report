const scatterPlotHeight = 200;
const scatterPlotWidth = 200;

// The color is just there to make sure code is working.  Feel Free to delete when working in this file!
d3version6.select('#scatter-plot')
    .style('width', `${scatterPlotWidth}px`)
    .style('height', `${scatterPlotHeight}px`)
    .style('background-color', 'red')
    .append('g')
