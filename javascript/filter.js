document.getElementById("year").onchange = function () {
    d3version3.selectAll("#scatter-plot > *").remove();
    d3version3.selectAll("#bar-plot > *").remove();
    createScatterPlot();
    createBarPlot();
    update_heatmap();
}
document.getElementById("attribute1").onchange = function () {
    d3version3.selectAll("#scatter-plot > *").remove();
    d3version3.selectAll("#bar-plot > *").remove();
    createScatterPlot();
    createBarPlot();
    updateScoreboard();
    update_heatmap();
}
document.getElementById("attribute2").onchange = function () {
    d3version3.selectAll("#scatter-plot > *").remove();
    createScatterPlot();
    updateScoreboard();
}
document.getElementById("region").onchange = function (changeEvent) {
    const newRegion = changeEvent.target.value;
    d3version3.selectAll("#scatter-plot > *").remove();
    d3version3.selectAll("#bar-plot > *").remove();
    let region = newRegion.toLowerCase().replaceAll(' ', '-');
    if (newRegion === 'All') {
        Object.keys(selectedCountryHash).forEach(selectedCountry => {
            selectedCountryHash[selectedCountry] = true;
        });
    } else {
        regionCountryHash[region].forEach(country => {
            selectedCountryHash[country] = true;
        });

        // keys will get all of the countries
        Object.keys(selectedCountryHash).forEach(selectedCountry => {
            if (!regionCountryHash[region].includes(selectedCountry)) {
                selectedCountryHash[selectedCountry] = false;
            }
        })
    }

    createScatterPlot();
    createBarPlot();
    updateScoreboard();
    filterCountryRegion(newRegion);
    update_heatmap();
}