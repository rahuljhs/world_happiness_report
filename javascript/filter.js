document.getElementById("year").onchange = function () {
    //console.log("year update");
    d3version3.selectAll("#scatter-plot > *").remove();
    d3version3.selectAll("#bar-plot > *").remove();
    createScatterPlot();
    createBarPlot();
}
document.getElementById("attribute1").onchange = function () {
    //console.log("attr1 update");
    d3version3.selectAll("#scatter-plot > *").remove();
    d3version3.selectAll("#bar-plot > *").remove();
    createScatterPlot();
    createBarPlot();
    updateScoreboard();
}
document.getElementById("attribute2").onchange = function () {
    d3version3.selectAll("#scatter-plot > *").remove();
    createScatterPlot();
    updateScoreboard();
}
document.getElementById("region").onchange = function (changeEvent) {
    const newRegion = changeEvent.target.value;
    d3version3.selectAll("#scatter-plot > *").remove();
    let region = newRegion.toLowerCase().replaceAll(' ', '-');
    if (newRegion === 'All') {
        Object.keys(selectedCountryHash).forEach(selectedCountry => {
            selectedCountryHash[selectedCountry] = true;
        });
        console.log('hi')
        applySelectedStyles(d3version6.selectAll('#world-map .country.region-enabled'));
        console.log('bye')
    } else {
        regionCountryHash[region].forEach(country => {
            selectedCountryHash[country] = true;
            applySelectedStyles(d3version6.selectAll(`#world-map .${country}`));
            console.log(country);
        });

        // keys will get all of the countries
        Object.keys(selectedCountryHash).forEach(selectedCountry => {
            if (!regionCountryHash[region].includes(selectedCountry)) {
                selectedCountryHash[selectedCountry] = false;
                applyUnselectedStyles(d3version6.selectAll(`#world-map .${selectedCountry}`));
            }
        })
    }

    createScatterPlot();
    createBarPlot();
    updateScoreboard();
    filterCountryRegion(newRegion);
}