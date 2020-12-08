const barPlotHeight = 375;
const barPlotWidth = 1200;
colors=['#7f3b08','#b35806','#e08214','#fdb863','#fee0b6','#d8daeb','#b2abd2','#8073ac','#542788','#2d004b']

var barMargin = { top: 45, bottom: 125, left: 80, right: 20 };

var bplotht = barPlotHeight - barMargin.top - barMargin.bottom;
var bplotwt = barPlotWidth - barMargin.left - barMargin.right;

const bplot = d3version6.select('#bar-plot');
var countryAttr = 'Country';

const createBarPlot = () => {
    var year = document.getElementById("year").value;
    var attr1 = document.getElementById("attribute1").value;
    var reg = document.getElementById("region").value;
    var regionFilter=[];
    var countryArray=[];
    var selectSize=158;
    var displayLen=0;
    var xmin = 10;
    var xmax = 0;

    bplot.append('text')
        .text(countryAttr+' vs ' + attr1 +' in '+ year)
        .style('font-size',20)
        .attr('x', barMargin.left+5)
        .attr('y', barMargin.top-5);

    bplot.append('line')
        .attr('x1', barMargin.left+2)
        .attr('x2', barMargin.left+(attr1.length+countryAttr.length+11)*10)
        .attr('y1', barMargin.top)
        .attr('y2', barMargin.top)
        .style('stroke', 'gray')
        .style('stroke-width', '1');

    d3version6.select('#bar-plot')
        .style('width', `${barPlotWidth}px`)
        .style('height', `${barPlotHeight}px`)
        .append('g')
            .attr("transform", "translate(" + barMargin.left + "," + barMargin.top + ")");;

    //y-axis label
    bplot.append('text')
        .text(attr1)
        .style('font-size',18)
        .style('text-anchor', 'center')
        .attr('transform', 'translate(' + ((barMargin.left / 2)-10) + ',' + (barPlotHeight- barMargin.bottom) + ') rotate(-90)');

    for (x = 0; x < dataHash[year].length; x++) {

        if (dataHash[year][x][attr1] > xmax) {
            xmax = dataHash[year][x][attr1];
        }
        if (dataHash[year][x][attr1] < xmin) {
            xmin = dataHash[year][x][attr1];
        }
    }

    if (reg=='All'){
        for (x = 0; x < dataHash[year].length; x++) {
            regionFilter.push(dataHash[year][x])
        }
    }
    else{
        for (x = 0; x < dataHash[year].length; x++) {
            if (dataHash[year][x]['Region'] == reg) {
                regionFilter.push(dataHash[year][x])
            }
        }
    }
    var selectSize=regionFilter.length;
    var ybarscale = bplotht/Math.ceil(xmax);
    var xbarscale= d3version3.min([bplotwt/selectSize, bplotwt/50]);

    regionFilter.sort(function(a,b){return +b[attr1]-+a[attr1]})
    displayLen=d3version3.min([regionFilter.length, selectSize])

    for (i=0; i<displayLen; i++){
        countryArray.push(regionFilter[i][countryAttr])
        bplot.append('rect')
            .attr('x', barMargin.left+1+i*xbarscale)
            .attr('y', barPlotHeight-barMargin.bottom-regionFilter[i][attr1]*ybarscale-1)
            .attr("width", xbarscale-1)
            .attr("height",regionFilter[i][attr1]*ybarscale)
            .attr("fill", colors[9])
            .attr('opacity', '0.5')
            .attr('id', regionFilter[i]['Country'].toLowerCase().replaceAll(' ', '-'))
            .on("mouseover", function (event, d) {
                temp = d3version6.select(this).attr('id')
                temp2 = d3version6.select(this).attr('height')/ybarscale
                updateOn(temp)
                countryLabelOn(temp, temp2);
            })
            .on("mouseout", function (d) {
                temp = d3version6.select(this).attr('id')
                updateOff(temp)
                countryLabelOff();
            });
    }

    var yAxisScale = d3version3.scale.linear()
        .domain([0, Math.ceil(xmax)])
        .range([bplotht + barMargin.top, barMargin.top]);
    var yAxis = d3version3.svg.axis()
        .scale(yAxisScale)
        .orient("left");
    bplot.append('g')
        .attr('class', 'axis')
        .attr('transform', 'translate(' + (barMargin.left) + ",0)")
        .style('stroke','gray')
        .call(yAxis);

    var xAxisScale = d3version6.scaleBand()
        .domain(countryArray)
        .range([barMargin.left, barMargin.left+selectSize*xbarscale]);

    bplot.append('text')
        .text(countryAttr)
        .style('text-anchor', 'middle')
        .style('font-size',20)
        .attr('x', barMargin.left+(xbarscale*selectSize)/2)
        .attr('y', barPlotHeight-barMargin.bottom+90);

    var countryLabel=bplot.append('text')
        .style('text-anchor', 'start')
        .style('font-size',20)
        .style('opacity',0)
        .attr('x', barMargin.left+(xbarscale*selectSize)/2-150)
        .attr('y', barPlotHeight-barMargin.bottom+30);

    var countryBox=bplot.append('line')
        .attr('x1', barMargin.left+(xbarscale*selectSize)/2-155)
        .attr('x2', barMargin.left+(xbarscale*selectSize)/2)
        .attr('y1', barPlotHeight-barMargin.bottom+35)
        .attr('y2', barPlotHeight-barMargin.bottom+35)
        .style('stroke','none')

    var countryLabelOn = (countryName, height) => {

        if (selectSize>50)
        {
            countryLabel
                .text('Selected Country: '+ countryName.toUpperCase()+ ' ('+d3version3.round(height,3)+')')               
                .style('opacity',1);
            countryBox
                .style('stroke','gray')
                .attr('x2', barMargin.left+(xbarscale*selectSize)/2-155+(countryName.length+21)*12)

        }
    }

    var countryLabelOff = ()=> {

        countryLabel
            .style('opacity',0);
        countryBox
            .style('stroke','none');
    }

    if (selectSize<50)
    {
        var xAxis = d3version3.svg.axis()
            .scale(xAxisScale)
            .orient("bottom");
        bplot.append('g')
            .attr('class', 'axis')
            .attr('transform', 'translate(0,'+(barPlotHeight-barMargin.bottom)+')')
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