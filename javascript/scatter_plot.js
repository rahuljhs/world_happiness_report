const scatterPlotHeight = 500;
const scatterPlotWidth = 600;
const color = ['#7f3b08', '#b35806', '#e08214', '#fdb863', '#fee0b6', '#d8daeb', '#b2abd2', '#8073ac', '#542788', '#2d004b'];

let margin = { top: 50, bottom: 40, left: 70, right: 20 };

let plotht = scatterPlotHeight - margin.top - margin.bottom;
let plotwt = scatterPlotWidth - margin.left - margin.right;

const splot = d3version6.select('#scatter-plot');

const opacityOn = 1;
const opacityOff = .6;


// The color is just there to make sure code is working.  Feel Free to delete when working in this file!
const createScatterPlot = () => {
    let year = document.getElementById("year").value; //this will need to be updated by the filter input: Year
    let attr1 = document.getElementById("attribute1").value; //this will need to be updated by the filter input: Attribute 1
    let attr2 = document.getElementById("attribute2").value; //this will need to be updated by the filter input: Attribute 2
    let reg = document.getElementById("region").value;

    splot.style('width', `${scatterPlotWidth}px`)
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
    let xscale = plotwt/Math.ceil(xmax);
    let yscale = plotht/Math.ceil(ymax);

    //plot the datapoints
    for (let x = 0; x < dataHash[year].length; x++) {
        let color = "#cccccc";
        let selected = selectedCountryHash[dataHash[year][x]['Country'].toLowerCase().replaceAll(' ', '-')];
        if (selected) {
          color = colors[2];
        }

        splot.append('circle')
            .attr('cx', (dataHash[year][x][attr1]) * xscale + margin.left)
            .attr('cy', plotht + margin.top - (dataHash[year][x][attr2] * yscale))
            .attr('r', '4')
            .attr('fill', color)
            .attr('opacity', '0.5')
            .attr('class', d => selected ? 'selected' : '')
            .attr('id', d => {
                let id = dataHash[year][x]['Country'].toLowerCase().replaceAll(' ', '-');
                let existingElement = d3version6.select(`#scatter-plot #${id}`);
                if(!existingElement.empty()) {
                    existingElement.remove();
                }
                return id;
            })
            .on("mouseover", function (event, d) {
                let temp = d3version6.select(this).attr('id');
                updateOn(temp, selectedCountryHash[temp]);
            })
            .on("mouseout", function (d) {
                let temp = d3version6.select(this).attr('id');
                updateOff(temp, selectedCountryHash[temp]);
            });
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
    let xAxisScale = d3version3.scale.linear()
        .domain([0, Math.ceil(xmax)])
        .range([margin.left, margin.left + plotwt]);
    let xAxis = d3version3.svg.axis()
        .scale(xAxisScale)
        .orient("bottom")
        .ticks(10);
    splot.append('g')
        .attr('class', 'axis')
        .attr('transform', 'translate(0, ' + (margin.top + plotht) + ')')
        .call(xAxis);
    //y-axis
    let yAxisScale = d3version3.scale.linear()
        .domain([0, Math.ceil(ymax)])
        .range([plotht + margin.top, margin.top]);
    let yAxis = d3version3.svg.axis()
        .scale(yAxisScale)
        .orient("left")
        .ticks(10);
    splot.append('g')
        .attr('class', 'axis')
        .attr('transform', 'translate(' + (margin.left) + ",0)")
        .call(yAxis);
}

allFilesPromise.then(() => {
    createScatterPlot();
});