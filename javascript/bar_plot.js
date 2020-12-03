const barPlotHeight = 500;
const barPlotWidth = 1000;
let selectSize=30;
let xIndex=0;
let drag=d3version3.behavior.drag();

let barMargin = { top: 20, bottom: 240, left: 80, right: 20 };

let bplotht = barPlotHeight - barMargin.top - barMargin.bottom;
let bplotwt = barPlotWidth - barMargin.left - barMargin.right;

const bplot = d3version6.select('#bar-plot');

let countryAttr = 'Country';
let countryArray=[];


// function move(d) {
//     var bar = d3version3.select(this);
//     bar.attr('x', parseInt(bar.attr('x'), 10) + d3version3.event.dx);
// }

// drag.origin(Object)
//     .on('drag', move);

// bplot.append('rect')
//     .attr("transform", "translate("+(barMargin.left)+", " + (barPlotHeight-140) + ")")
//     .attr('x',0)
//     .attr('y',0)
//     .attr('width', 130)
//     .attr('height',80)
//     .style('opacity',0.1)
//     .attr("pointer-events", "all")
//     .attr("cursor", "ew-resize")
//     .call(drag);

// const selectBar=()=>{
//     var year = document.getElementById("year").value;

//     function move(d) {
//         var bar = d3version3.select(this);
//         // Update the position of the bar by adding the drag distance in each coordinate
//         bar.attr('x', parseInt(bar.attr('x'), 10) + d3version3.event.dx);
//     }
 
//     drag.origin(Object)
//         .on('drag', move);

//     bar=bplot.append('rect')
//         .attr("transform", "translate("+(barMargin.left)+", " + (barPlotHeight-140) + ")")
//         .attr('x',0)
//         .attr('y',0)
//         .attr('width', (selectSize/dataHash[year].length)*bplotwt)
//         .attr('height',80)
//         .style('opacity',0.1)
//         .attr("pointer-events", "all")
//         .attr("cursor", "ew-resize")
//         .call(drag);
// }

const createBarPlot = () => {
    var year = document.getElementById("year").value;
    var attr1 = document.getElementById("attribute1").value;

    bplot.append('text')
        .text(countryAttr+' vs ' + attr1 +' in '+ year)
        .style('font-size',20)
        .attr('x', barMargin.left+5)
        .attr('y', barMargin.top-5);

    bplot.append('line')
        .attr('x1', barMargin.left-6)
        .attr('x2', barMargin.left+(attr1.length+countryAttr.length+11)*9.25)
        .attr('y1', barMargin.top)
        .attr('y2', barMargin.top)
        .style('stroke', 'black')
        .style('stroke-width', '2.5');

    d3version6.select('#bar-plot')
        .style('width', `${barPlotWidth}px`)
        .style('height', `${barPlotHeight}px`)
        .append('g')
            .attr("transform", "translate(" + barMargin.left + "," + barMargin.top + ")");;

    //Plot x-axis
    bplot.append('line')
        .attr('x1', barMargin.left)
        .attr('x2', barPlotWidth - barMargin.right)
        .attr('y1', barPlotHeight - barMargin.bottom)
        .attr('y2', barPlotHeight - barMargin.bottom)
        .style('stroke', 'black')
        .style('stroke-width', '2.5');

    //plot y-axis
    bplot.append('line')
        .attr('x1', barMargin.left)
        .attr('x2', barMargin.left)
        .attr('y1', barMargin.top)
        .attr('y2', barPlotHeight - barMargin.bottom)
        .style('stroke', 'black')
        .style('stroke-width', '2.5');

    bplot.append('text')
        .text(countryAttr)
        .style('text-anchor', 'center')
        .style('font-size',20)
        .attr('x', barPlotWidth / 2)
        .attr('y', barPlotHeight-barMargin.bottom+90);
    //y-axis label
    bplot.append('text')
        .text(attr1)
        .style('font-size',20)
        .style('text-anchor', 'center')
        .attr('transform', 'translate(' + (barMargin.left / 2) + ',' + (barPlotHeight- barMargin.bottom) + ') rotate(-90)');

    //get min & max of x & y values
    var xmin = 10; //attr 1
    var xmax = 0; //attr 1

    for (let x = 0; x < selectSize+xIndex; x++) {
    	countryArray.push(dataHash[year][x][countryAttr])

        if (dataHash[year][x][attr1] > xmax) {
            xmax = dataHash[year][x][attr1];
        }
        if (dataHash[year][x][attr1] < xmin) {
            xmin = dataHash[year][x][attr1];
        }
    }

    var ybarscale = bplotht/Math.ceil(xmax);
    var xbarscale= bplotwt/selectSize


    //plot the datapoints
    for (let x = xIndex; x < selectSize+xIndex; x++) {
        if (selectedCountryHash[dataHash[year][x]['Country'].toLowerCase().replaceAll(' ', '-')]) {

            bplot.append('rect')
                .attr('x', barMargin.left + 1 + (x - xIndex) * xbarscale)
                .attr('y', barPlotHeight - barMargin.bottom - dataHash[year][x][attr1] * ybarscale - 1)
                .attr("width", xbarscale - 1)
                .attr("height", dataHash[year][x][attr1] * ybarscale)
                //.attr('fill', color[0])
                .attr("fill", "#69b3a2")
                .attr('opacity', '0.5')
                .attr('class', 'selected')
                .attr('id', `bp-${dataHash[year][x]['Country'].toLowerCase().replaceAll(' ', '-')}`)
                .on("mouseover", function (event, d) {
                    let temp = d3version6.select(this).attr('id')
                    updateOn(temp.substring(3, temp.length));
                })
                .on("mouseout", function (d) {
                    let temp = d3version6.select(d.target).attr('id')
                    updateOff(temp.substring(3, temp.length));
                });
        }
    }
    for (let i = 0; i < dataHash[year].length; i++) {
        bplot.append('rect')
            .attr('x', barMargin.left+(i*bplotwt/dataHash[year].length))
            .attr('y', barPlotHeight-70-dataHash[year][i][attr1]*ybarscale*.3)
            .attr("width", (bplotwt/dataHash[year].length)-0.2)
            .attr("height",dataHash[year][i][attr1]*ybarscale*.3)
            .attr("fill", "gray");
        }

    let yAxisScale = d3version3.scale.linear()
        .domain([0, Math.ceil(xmax)])
        .range([bplotht + barMargin.top, barMargin.top]);
    let yAxis = d3version3.svg.axis()
        .scale(yAxisScale)
        .orient("left");
    bplot.append('g')
        .attr('class', 'axis')
        .attr('transform', 'translate(' + (barMargin.left) + ",0)")
        .call(yAxis);

    let xAxisScale = d3version6.scaleBand()
        .domain(countryArray)
        .range([barMargin.left-1, barPlotWidth-barMargin.right]);
    let xAxis = d3version3.svg.axis()
        .scale(xAxisScale)
        .orient("bottom")
        .ticks(selectSize);
    bplot.append('g')
        .attr('class', 'axis')
        .attr('transform', 'translate(0,'+(barPlotHeight-barMargin.bottom)+')')
        .call(xAxis)
        .selectAll('text')
        	.attr("transform", "translate(0,0)rotate(-30)")
        	.style('font-size', '12px')
        	.style('text-anchor', 'end');

    // function move(d) {
    //     var bar = d3version3.select(this);
    //     bar.attr('x', parseInt(bar.attr('x'), 10) + d3version3.event.dx);
    // }

    // drag.origin(Object)
    //     .on('drag', move);

    // bplot.append('rect')
    //     .attr("transform", "translate("+(barMargin.left)+", " + (barPlotHeight-150) + ")")
    //     .attr('x',0)
    //     .attr('y',0)
    //     .attr('width', 130)
    //     .attr('height',90)
    //     .style('fill-opacity','0.2')
    //     .style("stroke-width",'2.5')
    //     .style('stroke-opacity','0.3')
    //     .style('stroke','black')
    //     .attr('pointer-events', 'all')
    //     .attr('cursor', 'ew-resize')
    //     .call(drag);
        //Reference: http://bl.ocks.org/cse4qf/95c335c73af588ce48646ac5125416c6

}

allFilesPromise.then(() => {
    createBarPlot();
    //selectBar();
});

// function move(d) {
//     var bar = d3version3.select(this);
//     bar.attr('x', parseInt(bar.attr('x'), 10) + d3version3.event.dx);
// }

// drag.origin(Object)
//     .on('drag', move);

// bplot.append('rect')
//     .attr("transform", "translate("+(barMargin.left)+", " + (barPlotHeight-140) + ")")
//     .attr('x',0)
//     .attr('y',0)
//     .attr('width', 130)
//     .attr('height',80)
//     .style('opacity',0.1)
//     .attr("pointer-events", "all")
//     .attr("cursor", "ew-resize")
//     .call(drag);
