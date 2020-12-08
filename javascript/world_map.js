const worldMapHeight = 600;
const worldMapWidth = 600;

const noDataCountryColor = 'lightgrey';
const disabledCountryColor = '#808080';
const enabledCountryColor = 'white';

const heatmap_colors = ['#7f3b08','#b35806','#e08214','#fdb863','#fee0b6','#d8daeb','#b2abd2','#8073ac','#542788','#2d004b'];

const get_range = (year, attr1) => {
    var min_attr = 0;
    var max_attr = 0;
    for (let x = 0; x < dataHash[year].length; x++) {
        let attribute_value = Number(dataHash[year][x][attr1]);
        if (x == 0){
            min_attr = attribute_value;
            max_attr = attribute_value;
        }
        else{
            if (attribute_value < min_attr){
                min_attr = attribute_value;
            }
            if (attribute_value > max_attr){
                max_attr = attribute_value;
        }}
    }
    return [min_attr, max_attr - min_attr];
}

const get_color = (attribute_value, min_attr, attr_range) => {
    if (attribute_value < min_attr+0.1*attr_range) {
        return heatmap_colors[0];
    }
    else if (attribute_value >= min_attr+0.1*attr_range && attribute_value < min_attr+0.2*attr_range) {
        return heatmap_colors[1];
    }
    else if (attribute_value >= min_attr+0.2*attr_range && attribute_value < min_attr+0.3*attr_range) {
        return heatmap_colors[2];
    }
    else if (attribute_value >= min_attr+0.3*attr_range && attribute_value < min_attr+0.4*attr_range) {
        return heatmap_colors[3];
    }
    else if (attribute_value >= min_attr+0.4*attr_range && attribute_value < min_attr+0.5*attr_range) {
        return heatmap_colors[4];
    }
    else if (attribute_value >= min_attr+0.5*attr_range && attribute_value < min_attr+0.6*attr_range) {
        return heatmap_colors[5];
    }
    else if (attribute_value >= min_attr+0.6*attr_range && attribute_value < min_attr+0.7*attr_range) {
        return heatmap_colors[6];
    }
    else if (attribute_value >= min_attr+0.7*attr_range && attribute_value < min_attr+0.8*attr_range) {
        return heatmap_colors[7];
    }
    else if (attribute_value >= min_attr+0.8*attr_range && attribute_value < min_attr+0.9*attr_range) {
        return heatmap_colors[8];
    }
    else if (attribute_value >= min_attr+0.9*attr_range) {
        return heatmap_colors[9];
    }
}

const update_heatmap = () => {
    let attr1 = document.getElementById("attribute1").value;
    let year = document.getElementById("year").value;
    var range_values = get_range(year, attr1);

    for (let x = 0; x < dataHash[year].length; x++) {
        let country_name = dataHash[year][x]['Country'].toLowerCase().replaceAll(' ', '-')
        if (selectedCountryHash[country_name]){
            let attribute_value = Number(dataHash[year][x][attr1]);
            let color = get_color(attribute_value, range_values[0], range_values[1]);
            map.select(`.${country_name}`).style('fill', color);
        }
        }
}

const get_attr1_for_country = (country_name_from_data, year, attr1) =>{
    for (let x = 0; x < dataHash[year].length; x++) {
        let attribute_value = Number(dataHash[year][x][attr1]);
        let country_name = dataHash[year][x]['Country'].toLowerCase().replaceAll(' ', '-')
        if (country_name == country_name_from_data) {
            return attribute_value;
        }
    }
}

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
                target.style('opacity', '0.5');
                updateOn(target.attr('class').split(/[ ,]+/)[2]);
            }
        })
        .on('mouseleave', (d) => {
            const target = d3version6.select(d.target);
            if (target.attr('class').includes('region-enabled')) {
                target.style('opacity', '1')
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
                return 'black';
            }
            return 'lightgrey';
        })
        .style('stroke-width', d => {
            let target = d3version6.select(`#world-map .${d['properties']['name'].toLowerCase().replaceAll(' ', '-')}`)
            if (target.classed('selected')) {
                return '0.8';
            }
            return '0.3';
        })
        Object.entries(selectedCountryHash).forEach((keyValArr) => selectedCountryHash[keyValArr[0]] = false);
        d3version6.selectAll('#world-map .selected').each(d => {
            let countryName = d['properties']['name'].toLowerCase().replaceAll(' ', '-');
            selectedCountryHash[countryName] = true;
        })
};

worldMapPromise.then(data => {
    allFilesPromise.then(() => {
        createWorldMap(data);
        update_heatmap();
    })
});

