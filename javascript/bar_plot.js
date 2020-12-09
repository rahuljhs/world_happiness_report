const barPlotHeight = 375;
const barPlotWidth = 1200;
colors = ['#7f3b08', '#b35806', '#e08214', '#fdb863', '#fee0b6', '#d8daeb', '#b2abd2', '#8073ac', '#542788', '#2d004b']

let barMargin = {top: 45, bottom: 125, left: 80, right: 20};

let bplotht = barPlotHeight - barMargin.top - barMargin.bottom;
let bplotwt = barPlotWidth - barMargin.left - barMargin.right;

const bplot = d3version6.select('#bar-plot');
let countryAttr = 'Country';

const createBarPlot = () => {
    let year = document.getElementById("year").value;
    let attr1 = document.getElementById("attribute1").value;
    let reg = document.getElementById("region").value;
    let regionFilter = [];
    let countryArray = [];
    let displayLen = 0;
    let xmin = 10;
    let xmax = 0;

    bplot.append('text')
        .text(countryAttr + ' vs ' + attr1 + ' in ' + year)
        .style('font-size', 20)
        .attr('x', barMargin.left + 5)
        .attr('y', barMargin.top - 5);

    d3version6.select('#bar-plot')
        .style('width', `${barPlotWidth}px`)
        .style('height', `${barPlotHeight}px`)
        .append('g')
        .attr("transform", "translate(" + barMargin.left + "," + barMargin.top + ")");
    ;

    //y-axis label
    bplot.append('text')
        .text(attr1)
        .style('font-size', '16px')
        .style('text-anchor', 'center')
        .attr('transform', 'translate(' + ((barMargin.left / 2) - 10) + ',' + (barPlotHeight - barMargin.bottom) + ') rotate(-90)');

    for (let x = 0; x < dataHash[year].length; x++) {

        if (dataHash[year][x][attr1] > xmax) {
            xmax = dataHash[year][x][attr1];
        }
        if (dataHash[year][x][attr1] < xmin) {
            xmin = dataHash[year][x][attr1];
        }
    }
    console.log(xmax)

    if (reg === 'All') {
        for (let x = 0; x < dataHash[year].length; x++) {
            regionFilter.push(dataHash[year][x])
        }
    } else {
        for (let x = 0; x < dataHash[year].length; x++) {
            if (dataHash[year][x]['Region'] === reg) {
                regionFilter.push(dataHash[year][x])
            }
        }
    }
    let selectSize = regionFilter.length;
    let ybarscale = bplotht / Math.ceil(xmax);
    let xbarscale = d3version3.min([bplotwt / selectSize, bplotwt / 50]);

    regionFilter.sort(function (a, b) {
        return +b[attr1] - +a[attr1]
    })
    displayLen = d3version3.min([regionFilter.length, selectSize])

    for (let i = 0; i < displayLen; i++) {
        countryArray.push(regionFilter[i][countryAttr])
        bplot.append('rect')
            .attr('x', barMargin.left + 1 + i * xbarscale)
            .attr('y', barPlotHeight - barMargin.bottom - regionFilter[i][attr1] * ybarscale - 1)
            .attr("width", xbarscale - 1)
            .attr("height", regionFilter[i][attr1] * ybarscale)
            .attr("fill", colors[9])
            .attr('opacity', '0.5')
            .attr('id', `bp-${regionFilter[i]['Country'].toLowerCase().replaceAll(' ', '-')}`)
            .on("mouseover", function (event, d) {
                let temp = d3version6.select(this).attr('id').substring(3);
                let temp2 = d3version6.select(this).attr('height') / ybarscale
                updateOn(temp)
                countryLabelOn(temp, temp2);
            })
            .on("mouseout", function (d) {
                let temp = d3version6.select(this).attr('id').substring(3);
                updateOff(temp)
                countryLabelOff();
            });
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
        .style('stroke', 'gray')
        .call(yAxis);

    let xAxisScale = d3version6.scaleBand()
        .domain(countryArray)
        .range([barMargin.left, barMargin.left + selectSize * xbarscale]);

    bplot.append('text')
        .text(countryAttr)
        .style('text-anchor', 'middle')
        .style('font-size', '16px')
        .attr('x', barMargin.left + (xbarscale * selectSize) / 2)
        .attr('y', barPlotHeight - barMargin.bottom + 90);

    let countryLabel = bplot.append('text')
        .style('text-anchor', 'start')
        .style('font-size', 20)
        .style('opacity', 0)
        .attr('x', barMargin.left + (xbarscale * selectSize) / 2 - 150)
        .attr('y', barPlotHeight - barMargin.bottom + 30);

    let countryLabelOn = (countryName, height) => {
        if (selectSize > 50) {
            countryLabel
                .text('Selected Country: ' + countryName.toUpperCase() + ' (' + d3version3.round(height, 3) + ')')
                .style('opacity', 1);
        }
    }

    let countryLabelOff = () => {
        countryLabel
            .style('opacity', 0);
    }

    if (selectSize < 50) {
        let xAxis = d3version3.svg.axis()
            .scale(xAxisScale)
            .orient("bottom");
        bplot.append('g')
            .attr('class', 'axis')
            .attr('transform', 'translate(0,' + (barPlotHeight - barMargin.bottom) + ')')
            .style('stroke', 'gray')
            .call(xAxis)
            .selectAll('text')
            .attr("transform", "translate(0,0)rotate(-30)")
            .style('font-size', '12px')
            .style('text-anchor', 'end');
    }
}

allFilesPromise.then(() => {
    createBarPlot();
});