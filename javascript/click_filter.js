const filterCountries = (target) => {
    const selectSize = Object.values(selectedCountryHash).filter(selected => selected).length;

    if (selectSize === 159 || selectSize === d3version6.selectAll('#world-map .region-enabled').size()) {
        Object.entries(selectedCountryHash).forEach((keyValArr) => selectedCountryHash[keyValArr[0]] = false);
        d3version6.selectAll('#world-map .selected').classed('selected', false)
        d3version6.selectAll('#scatter-plot circle').classed('selected', false)
        d3version6.selectAll('#bar-plot rect').classed('selected', false)
        d3version6.selectAll('#bar-plot rect').style('fill', 'gray')
    }

    const targetClass = target.attr('class');
    const classList = targetClass.split(/[ ,]+/)
    if (targetClass.includes('selected')) {
        classList.splice(classList.indexOf("selected"), 1);
        target.attr('class', classList.join(' '));
    } else {
        target.attr('class', `${targetClass} selected`);
    }
    selectedCountryHash[classList[2]] = !selectedCountryHash[classList[2]];

    if (Object.values(selectedCountryHash).filter(selected => selected).length === 0) {
        Object.entries(selectedCountryHash).forEach((keyValArr) => selectedCountryHash[keyValArr[0]] = true);
        d3version6.selectAll('#world-map .region-enabled').classed('selected', true);
        createScatterPlot()
        // d3version6.selectAll('#scatter-plot circle').classed('selected', true);
        d3version6.selectAll('#bar-plot rect').classed('selected', true);
        // d3version6.selectAll('#scatter-plot circle').style('fill', color[2]);
        d3version6.selectAll('#bar-plot rect').style('fill', color[9]);
    } else {
        let splotCountry = splot.select(`#${classList[2]}`)
        let bplotCountry = bplot.select(`#bp-${classList[2]}`)

        splotCountry.classed('selected', !splotCountry.classed('selected')).style('fill', color[2]);
        splot.selectAll(`circle:not(.selected)`).style('fill', "#cccccc");

        bplotCountry.classed('selected', !bplotCountry.classed('selected')).style('fill', color[9]);
        bplot.selectAll(`rect:not(.selected)`).style('fill', 'grey');
    }

}