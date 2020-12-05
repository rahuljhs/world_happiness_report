const legend = d3version6.select('#legend');

legend.style("background-color", "white");
legend.append('circle')
    .attr('cx', 300)
    .attr('cy', 60)
    .attr('r', '10')
    .attr('fill', color[0])
    .attr('opacity', '1')

console.log("legend here");

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
