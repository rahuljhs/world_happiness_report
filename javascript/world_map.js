const worldMapHeight = 600;
const worldMapWidth = 600;

// A lot of the map drawing was pull from https://medium.com/swlh/data-visualization-with-d3-world-map-aa03d68eb906
const createWorldMap = (mapData) => {
    console.log(mapData);

    // https://www.geeksforgeeks.org/d3-js-geomercator-function/
    const projection = d3version6.geoMercator()
        .scale(worldMapWidth / 2.5 / Math.PI)
        .rotate([0, 0])
        .center([0, 0])
        .translate([worldMapWidth / 2, worldMapHeight / 2]);
        // TODO: remove, this was for the other data drawing file
        // .fitSize([worldMapWidth, worldMapHeight], mapData)
        // .precision(100);
    const pathGenerator = d3version6.geoPath().projection(projection);

    function handleZoom(event) {
        d3version6.select('#world-map g').attr("transform", `${event.transform}`);
    }

    let zoom = d3version6.zoom()
        .scaleExtent([1, 10])
        .on("zoom", handleZoom)

    // This is my hacky way around the oceans not being paths.  Since they aren't defined (just empty space) zoom/pan won't
    // work when your mouse is pointed on the oceans.  This bounding box fixes that.
    let data = [[0, 0], [0, worldMapHeight-12], [worldMapWidth, worldMapHeight-12], [worldMapWidth, 0]];
    let lineGenerator = d3version6.line();
    let pathString = lineGenerator(data);

    let map = d3version6.select('#world-map')
        .append('g')
        .call(zoom)
    map
        .append("path")
        .attr('d', pathString)
        .attr('fill', 'lightblue')
        .style('pointer-events', 'all')
    map
        .selectAll('.country')
        .data(mapData.features)
        .join('path')
        .attr('class', d => {
            const name = d['properties']['name']
            const classifiedName = name.toLowerCase().replaceAll(' ', '-')
            return `country ${d['properties']['id']} ${classifiedName}`
        })
        .attr('fill', 'white')
        .style('pointer-events', 'all')
        .style("stroke-width", ".3")
        .style('stroke', 'black')
        .attr('d', feature => pathGenerator(feature))
        .style('width', `${worldMapWidth}px`)
        .style('height', `${worldMapHeight}px`)
        .style('border', 'solid black')
}

worldMapPromise.then(data => {
    createWorldMap(data);
});

