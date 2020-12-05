const filterCountries = (target) => {
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

    let splotCountry = splot.select(`#${classList[2]}`)
    let bplotCountry = bplot.select(`#bp-${classList[2]}`)

    splotCountry.classed('selected', !splotCountry.classed('selected')).style('fill', color[0]);
    splot.selectAll(`circle:not(.selected)`).style('fill', "#cccccc");

    if (!bplotCountry.empty()) {
        bplotCountry.classed('selected', !bplotCountry.classed('selected')).style('visibility', 'visible');
        bplot.selectAll(`rect:not(.selected)`).style('visibility', 'hidden');
    }

    // if all (158) countries are not selected then make all visible
    // if(splot.selectAll(`circle:not(.selected)`).size() === 158) {
    //     bplot.selectAll(`rect`).style('visibility', 'visible');
    //     splot.selectAll(`circle`).style('visibility', 'visible');
    // }
}

const applySelectedStyles = (target) => {
    console.log(target);
    target.style('stroke', 'yellow').style('stroke-width', '1.5')
}

const applyUnselectedStyles = (target) => {
    target.style('stroke', 'black').style('stroke-width', '.3')
}