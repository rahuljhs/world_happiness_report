const scatterPlotHeight = 400;
const scatterPlotWidth = 400;
const color = ['#d73027', '#fc8d59', '#fee090', '#e0f3f8', '#91bfdb', '#4575b4'];

var margin = { top: 40, bottom: 40, left: 50, right: 20 };

var plotht = scatterPlotHeight - margin.top - margin.bottom;
var plotwt = scatterPlotWidth - margin.left - margin.right;

    const splot = d3version6.select('#scatter-plot');

const opacityOn = 1;
const opacityOff = .5;


// The color is just there to make sure code is working.  Feel Free to delete when working in this file!
const createScatterPlot = () => {
    var year = document.getElementById("year").value; //this will need to be updated by the filter input: Year
    var attr1 = document.getElementById("attribute1").value; //this will need to be updated by the filter input: Attribute 1
    var attr2 = document.getElementById("attribute2").value; //this will need to be updated by the filter input: Attribute 2
    var reg = document.getElementById("region").value; 

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
    let xmin = 100; //attr 1
    let xmax = 0; //attr 1
    let ymin = 100; //attr 2
    let ymax = 0; //attr 2
    for (let x = 0; x < dataHash[year].length; x++) {
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

    //set whole number scales
    //figure out the scale of x & y axe
    var xscale = plotwt/Math.ceil(xmax);
    var yscale = plotht/Math.ceil(ymax);

    //plot the datapoints
    for (let x = 0; x < dataHash[year].length; x++) {
        if (reg === "All") {
            splot.append('circle')
                .attr('cx', (dataHash[year][x][attr1]) * xscale + margin.left)
                .attr('cy', plotht + margin.top - (dataHash[year][x][attr2] * yscale))
                .attr('r', '3')
                .attr('fill', color[0])
                .attr('opacity', '0.5')
                .attr('id', dataHash[year][x]['Country'].toLowerCase().replaceAll(' ', '-'))
                .on("mouseover", function (event, d) {
                    temp = d3version6.select(this).attr('id');
                    updateOn(temp);
                })
                .on("mouseout", function (d) {
                    temp = d3version6.select(this).attr('id');
                    updateOff(temp);
                });
        }
        else {
            if (dataHash[year][x]['Region'] === reg) {
                splot.append('circle')
                    .attr('cx', (dataHash[year][x][attr1]) * xscale + margin.left)
                    .attr('cy', plotht + margin.top - (dataHash[year][x][attr2] * yscale))
                    .attr('r', '3')
                    .attr('fill', color[0])
                    .attr('opacity', '0.5')
                    .attr('id', dataHash[year][x]['Country'].toLowerCase().replaceAll(' ', '-'))
                    .on("mouseover", function (event, d) {
                        temp = d3version6.select(this).attr('id');
                        updateOn(temp);
                    })
                    .on("mouseout", function (d) {
                        temp = d3version6.select(this).attr('id');
                        updateOff(temp);
                    });
            }
        }
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