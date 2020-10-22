const worldMapHeight = 200;
const worldMapWidth = 200;

// A lot of the map drawing was pull from https://medium.com/swlh/data-visualization-with-d3-world-map-aa03d68eb906
const createWorldMap = (mapData) => {
    const projection = d3version6.geoMercator()
        .fitSize([worldMapWidth, worldMapHeight], mapData)
        .precision(100);
    const pathGenerator = d3version6.geoPath().projection(projection);

    d3version6.select('#world-map')
        .selectAll('.country')
        .data(mapData.features)
        .join('path')
        .attr('class', 'country')
        .attr('d', feature => pathGenerator(feature))
        .style('width', `${worldMapWidth}px`)
        .style('height', `${worldMapHeight}px`)
}

worldMapPromise.then(data => {
    createWorldMap(data);
});

