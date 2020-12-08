const legend = d3version6.select('#legend');
const legMargin = { top: 10, bottom: 10, left: 40, right: 40 };

const legColors = ['#7f3b08', '#b35806', '#e08214', '#fdb863', '#fee0b6', '#d8daeb', '#b2abd2', '#8073ac', '#542788', '#2d004b'];
const legLabels = ['<10%', '10-20%', '20-30%', '30-40%', '40-50%', '50-60%', '60-70%', '70-80%', '80-90%', '90-100%']
const cirRad = 15;

const legHeight = 120;
const legWidth = 600;

legend.style("background-color", "white").attr('height', legHeight).attr('width', legWidth);

let legPad = (legWidth - legMargin.right - legMargin.left - legColors.length * (2 * cirRad))/ (legColors.length -1 );

for (let x = 0; x < legColors.length; x++) {
    legend.append('circle')
        .attr('cx', legMargin.right + cirRad + x * (2 * cirRad + legPad))
        .attr('cy', cirRad + legMargin.top)
        .attr('r', cirRad)
        .attr('fill', legColors[x])
        .attr('opacity', '1');
}


//x-axis
var legendScale = d3version3.scale.ordinal()
    .domain(legLabels)
    .rangePoints([legMargin.left + cirRad, legWidth - legMargin.right - cirRad]);
var legAxis = d3version3.svg.axis()
    .scale(legendScale)
    .orient("bottom")
    .ticks(10);
legend.append('g')
    .attr('class', 'axis')
    .attr('transform', 'translate(0, ' + (2 * cirRad + legMargin.top + 10) + ')')
    .call(legAxis)
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", "rotate(-45)");


//legend.append('circle')
//    .attr('cx', 300)
//    .attr('cy', 60)
//    .attr('r', '10')
//    .attr('fill', color[0])
//    .attr('opacity', '1')

//console.log("legend here");

//first attempt
//var colorScale = d3version6.scaleLinear()
//    .domain([0, 10])
//    .range(['#d73027', '#4575b4']);

//legend.append("g")
//    .attr("class", "legendLinear")
//    .attr("transform", "translate(20, 20)");

//var colorLegend = d3.legendColor()
//    .shapeWidth(30)
//    .cells(10)
//    .orient('horizontal')
//    .scale(colorScale);

//legend.select(".colorLegend")
//    .call(colorLegend);


//second attempt
//var linear = d3version6.scaleLinear()
//    .domain([0, 10])
//    .range(["rgb(46, 73, 123)", "rgb(71, 187, 94)"]);

//var svg = d3.select("#legend");

//svg.append("g")
//    .attr("class", "legendLinear")
//    .attr("transform", "translate(20,20)");

//var legendLinear = d3.legendColor()
//    .shapeWidth(30)
//    .cells(10)
//    .orient('horizontal')
//    .scale(linear);

//svg.select(".legendLinear")
//    .call(legendLinear);
