const worldMapHeight = 600;
const worldMapWidth = 600;

const noDataCountryColor = 'lightgrey';
const disabledCountryColor = '#808080';
const enabledCountryColor = 'white';

const determine_country_color = (data, color='white') => {
    if (data['properties']['no_data'] === true) {
        color = noDataCountryColor;
    }

    return color;
}
const addClassesToMap = (d) => {
    const name = d['properties']['name'];
    const classifiedName = name.toLowerCase().replaceAll(' ', '-');
    let cssString = `country ${d['properties']['id']} ${classifiedName}`;
    if (d['properties']['region']) {
        const region = d['properties']['region'];
        const classifiedRegion = region.toLowerCase().replaceAll(' ', '-');
        cssString = `${cssString} region-${classifiedRegion}`
    } else {
        cssString = `${cssString} region-disabled`
    }
    return cssString
}
// A lot of the map drawing was pull from https://medium.com/swlh/data-visualization-with-d3-world-map-aa03d68eb906
const createWorldMap = (mapData) => {
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
    let data = [[40, 60], [40, worldMapHeight-60], [worldMapWidth-30, worldMapHeight-60], [worldMapWidth-30, 60]];
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
        // All regions start as enabled
        .attr('class', d => `${addClassesToMap(d)}`)
        .attr('fill', d => determine_country_color(d))
        .style('pointer-events', 'all')
        .style("stroke-width", ".3")
        .style('stroke', 'black')
        .attr('d', feature => pathGenerator(feature))
        .style('width', `${worldMapWidth}px`)
        .style('height', `${worldMapHeight}px`)
        .style('border', 'solid')
        // Things are selected by default
        .style('stroke', d => d['properties']['region'] ? 'yellow' : 'black')
        .style('stroke-width', d => d['properties']['region'] ? '1.5' : '0.3')

        .on('mouseenter', (d) => {
            const target = d3version6.select(d.target);
            if (target.attr('class').includes('region-enabled')) {
                target.style('fill', d => determine_country_color(d, 'purple'));
                updateOn(target.attr('class').split(/[ ,]+/)[2]);
            }
        })
        .on('mouseleave', (d) => {
            const target = d3version6.select(d.target);
            if (target.attr('class').includes('region-enabled')) {
                target.style('fill', d => determine_country_color(d, 'white'))
                updateOff(target.attr('class').split(/[ ,]+/)[2]);
            }
        })
        .on('click', (d) => {
            const target = d3version6.select(d.target);
            const targetClass = target.attr('class');
            if (targetClass.includes('region-enabled')) {
                filterCountries(target);
            }
        })
    filterCountryRegion('All');
}

const filterCountryRegion = (newRegion) => {
    d3version6.selectAll('#world-map .country')
        .attr('class', d => {
            const region = d['properties']['region'];
            let cssString = addClassesToMap(d);
            if (region) {
                if (newRegion === 'All') {
                    if (!cssString.includes('region-enabled')) {
                        cssString = `${cssString} region-enabled selected`
                    }
                } else if (region === newRegion) {
                    cssString = `${cssString} region-enabled selected`

                } else {
                    let classList = cssString.split();
                    if (!classList.indexOf("region-enabled") === -1) {
                        classList.splice(classList.indexOf("region-enabled"), 1);
                    }

                    cssString = classList.join(' ');
                }
            }
            return `${cssString} `;
        })
        .style('fill', d => {
            const region = d['properties']['region'];
            if (region && newRegion === 'All') {
                return enabledCountryColor;
            }
            if (region && region === newRegion) {
                return enabledCountryColor;
            } else if (region) {
                return disabledCountryColor;
            }
        })
        .style('stroke', d => {
            let target = d3version6.select(`#world-map .${d['properties']['name'].toLowerCase().replaceAll(' ', '-')}`)
            if (target.classed('selected')) {
                return 'yellow';
            }
            return 'black';
        })
        .style('stroke-width', d => {
            let target = d3version6.select(`#world-map .${d['properties']['name'].toLowerCase().replaceAll(' ', '-')}`)
            if (target.classed('selected')) {
                return '1.5';
            }
            return '0.3';
        })



};

worldMapPromise.then(data => {
    createWorldMap(data);
});

