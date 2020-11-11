const scatterPlotHeight = 400;
const scatterPlotWidth = 400;

var margin = { top: 20, bottom: 40, left: 50, right: 20 };

var plotht = scatterPlotHeight - margin.top - margin.bottom;
var plotwt = scatterPlotWidth - margin.left - margin.right;

const splot = d3version6.select('#scatter-plot');


// The color is just there to make sure code is working.  Feel Free to delete when working in this file!
const createScatterPlot = () => {
    var year = document.getElementById("year").value; //this will need to be updated by the filter input: Year
    console.log(year);
    var attr1 = document.getElementById("attribute1").value; //this will need to be updated by the filter input: Attribute 1
    console.log(attr1);
    var attr2 = document.getElementById("attribute2").value; //this will need to be updated by the filter input: Attribute 2
    console.log(attr2);

    d3version6.select('#scatter-plot')
        .style('width', `${scatterPlotWidth}px`)
        .style('height', `${scatterPlotHeight}px`)
        .style('background-color', 'white')
        .append('g');

    //Plot x-axis
    splot.append('line')
        .attr('x1', margin.left)
        .attr('x2', scatterPlotWidth - margin.right)
        .attr('y1', scatterPlotHeight - margin.bottom)
        .attr('y2', scatterPlotHeight - margin.bottom)
        .style('stroke', 'black')
        .style('stroke-width', '1');

    //plot y-axis
    splot.append('line')
        .attr('x1', margin.left)
        .attr('x2', margin.left)
        .attr('y1', margin.top)
        .attr('y2', scatterPlotHeight - margin.bottom)
        .style('stroke', 'black')
        .style('stroke-width', '1');

    //get min & max of x & y values
    var xmin = 100; //attr 1
    var xmax = 0; //attr 1
    var ymin = 100; //attr 2
    var ymax = 0; //attr 2
    for (x = 0; x < dataHash[year].length; x++) {
        if (dataHash[year][x][attr1] > xmax) {
            xmax = dataHash[year][x][attr1];
        }
        if (dataHash[year][x][attr1] < xmin) {
            xmin = dataHash[year][x][attr1];
        }
        if (dataHash[year][x][attr2] > ymax) {
            ymax = dataHash[year][x][attr2];
        }
        if (dataHash[year][x][attr2] < ymin) {
            ymin = dataHash[year][x][attr2];
        }
    }

    //define div for tooltip: example code used: https://bl.ocks.org/d3noob/a22c42db65eb00d4e369
    var div = d3version6.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    //set whole number scales
    //figure out the scale of x & y axe
    var xscale = plotwt/Math.ceil(xmax);
    var yscale = plotht/Math.ceil(ymax);

    //plot the datapoints
    for (x = 0; x < dataHash[year].length; x++) {
        splot.append('circle')
            .attr('cx', (dataHash[year][x][attr1]) * xscale + margin.left)
            .attr('cy', plotht + margin.top - (dataHash[year][x][attr2] * yscale))
            .attr('r', '3')
            .attr('fill', 'black')
            .attr('id', dataHash[year][x]['Country'].toLowerCase().replaceAll(' ','-')
            .on("mouseover", function (event, d) {
                console.log("mouseover");
                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div.html("country")
                    .style("left", "30px")
                    .style("top", "20px");
            })
            .on("mouseout", function (d) {
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
            });
        //should add tooltip on this
    }

    //axes labels & title
    //x-axis label
    splot.append('text')
        .text(attr1)
        .style('text-anchor', 'middle')
        .attr('x', scatterPlotWidth / 2)
        .attr('y', scatterPlotHeight - 5);
    //y-axis label
    splot.append('text')
        .text(attr2)
        .style('text-anchor', 'middle')
        .attr('transform', 'translate(' + (margin.left / 3) + ',' + ((plotht) / 2 + margin.top) + ') rotate(-90)');
    //scatter plot title
    splot.append('text')
        .text(attr2 + " vs. " + attr1 + " in " + year)
        .attr('x', margin.left + plotwt/2)
        .attr('y', 30)
        .style('font-size', "16px")
        .style('text-anchor', 'middle');


    //axes ticks
    //x-axis
    var xAxisScale = d3version3.scale.linear()
        .domain([0, Math.ceil(xmax)])
        .range([margin.left, margin.left + plotwt]);
    var xAxis = d3version3.svg.axis()
        .scale(xAxisScale)
        .orient("bottom")
        .ticks(10);
    splot.append('g')
        .attr('class', 'axis')
        .attr('transform', 'translate(0, ' + (margin.top + plotht) + ')')
        .call(xAxis);
    //y-axis
    var yAxisScale = d3version3.scale.linear()
        .domain([0, Math.ceil(ymax)])
        .range([plotht + margin.top, margin.top]);
    var yAxis = d3version3.svg.axis()
        .scale(yAxisScale)
        .orient("left")
        .ticks(10);
    splot.append('g')
        .attr('class', 'axis')
        .attr('transform', 'translate(' + (margin.left) + ",0)")
        .call(yAxis);

    //console.log("Axis: " + d3version3.select(".axis path").style("stroke-width"))

}

allFilesPromise.then(() => {
    createScatterPlot();
});

document.getElementById("year").onchange = function () {
    //console.log("year update");
    d3version3.selectAll("#scatter-plot > *").remove(); 
    allFilesPromise.then(() => {
        createScatterPlot();
    });
}
document.getElementById("attribute1").onchange = function () {
    //console.log("attr1 update");
    d3version3.selectAll("#scatter-plot > *").remove(); 
    allFilesPromise.then(() => {
        createScatterPlot();
    });
}
document.getElementById("attribute2").onchange = function () {
    //console.log("attr2 update");
    d3version3.selectAll("#scatter-plot > *").remove(); 
    allFilesPromise.then(() => {
        createScatterPlot();
    });
}