const filterCountries = (target) => {
    const selectSize = Object.values(selectedCountryHash).filter(selected => selected).length;
    console.log(selectSize === d3version6.selectAll('#world-map .region-enabled').size());
    console.log('selectionSize', selectSize);
    console.log('d3 selected countries', d3version6.selectAll('#world-map .region-enabled').size());
    console.log('selected hash countries', Object.entries(selectedCountryHash).filter(selected => selected[1]));

    if (selectSize === 158 || selectSize === d3version6.selectAll('#world-map .region-enabled').size()) {
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
        applyUnselectedStyles(target);
        // target.style('stroke', 'black').style('stroke-width', '.3')
        // selectedCountryHash[classList[2]] = false;
    } else {
        target.attr('class', `${targetClass} selected`);
        applySelectedStyles(target);
        // target.style('stroke', 'yellow').style('stroke-width', '1.5')
        // selectedCountryHash[classList[2]] = true;
    }
    selectedCountryHash[classList[2]] = !selectedCountryHash[classList[2]];

    if (Object.values(selectedCountryHash).filter(selected => selected).length === 0) {
        Object.entries(selectedCountryHash).forEach((keyValArr) => selectedCountryHash[keyValArr[0]] = true);
        d3version6.selectAll('#world-map .region-enabled').classed('selected', true);
        d3version6.selectAll('#scatter-plot circle').classed('selected', true);
        d3version6.selectAll('#bar-plot rect').classed('selected', true);
        d3version6.selectAll('#scatter-plot circle').style('fill', color[2]);
        d3version6.selectAll('#bar-plot rect').style('fill', color[9]);
    } else {
        let splotCountry = splot.select(`#${classList[2]}`)
        let bplotCountry = bplot.select(`#bp-${classList[2]}`)

        splotCountry.classed('selected', !splotCountry.classed('selected')).style('fill', color[2]);
        splot.selectAll(`circle:not(.selected)`).style('fill', "#cccccc");

        // if (!bplotCountry.empty()) {
        bplotCountry.classed('selected', !bplotCountry.classed('selected')).style('fill', color[9]);
        bplot.selectAll(`rect:not(.selected)`).style('fill', 'grey');
        // }
    }
    // if all (158) countries are not selected then make all visible
    // if(splot.selectAll(`circle:not(.selected)`).size() === 158) {
    //     bplot.selectAll(`rect`).style('visibility', 'visible');
    //     splot.selectAll(`circle`).style('visibility', 'visible');
    // }
}

const applySelectedStyles = (target) => {
    // target.style('stroke', 'black').style('stroke-width', '0.8')
}

const applyUnselectedStyles = (target) => {
    // target.style('stroke', 'lightgrey').style('stroke-width', '0.3')
}