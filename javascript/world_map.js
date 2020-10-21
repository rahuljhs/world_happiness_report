const worldMapHeight = 200;
const worldMapWidth = 200;

// The color is just there to make sure code is working.  Feel Free to delete when working in this file!
d3version6.select('#world-map')
    .style('width', `${worldMapWidth}px`)
    .style('height', `${worldMapHeight}px`)
    .style('background-color', 'purple')
    .append('g')
