document.getElementById("year").onchange = function () {
    //console.log("year update");
    d3version3.selectAll("#scatter-plot > *").remove();
    createScatterPlot();
}
document.getElementById("attribute1").onchange = function () {
    //console.log("attr1 update");
    d3version3.selectAll("#scatter-plot > *").remove();
    createScatterPlot();
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
    createScatterPlot();
    updateScoreboard();
    filterCountryRegion(newRegion);
}