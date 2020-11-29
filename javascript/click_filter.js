const filterCountries = (target) => {
    const targetClass = target.attr('class');
    const classList = targetClass.split(/[ ,]+/)
    if (targetClass.includes('selected')) {
        classList.splice(classList.indexOf("selected"), 1);
        target.attr('class', classList.join(' '));
        target.style('stroke', 'black')
        target.style('stroke-width', '.3')
    } else {
        target.attr('class', `${targetClass} selected`);
        target.style('stroke', 'yellow')
        target.style('stroke-width', '1.5')
    }

    let splotCountry = splot.select(`#${classList[2]}`)
    let bplotCountry = bplot.select(`#bp-${classList[2]}`)

    splotCountry.classed('selected', !splotCountry.classed('selected')).style('visibility', 'visible');
    splot.selectAll(`circle:not(.selected)`).style('visibility', 'hidden');

    if (!bplotCountry.empty()) {
        bplotCountry.classed('selected', !bplotCountry.classed('selected')).style('visibility', 'visible');
        bplot.selectAll(`rect:not(.selected)`).style('visibility', 'hidden');
    }

    // if all (158) countries are not selected then make all visible
    if(splot.selectAll(`circle:not(.selected)`).size() === 158) {
        bplot.selectAll(`rect`).style('visibility', 'visible');
        splot.selectAll(`circle`).style('visibility', 'visible');
    }
}