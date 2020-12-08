const map = d3version6.select('#world-map');
const updateOn = (countryName, selected= true) => {
    let year = document.getElementById("year").value; //this will need to be updated by the filter input: Year
    let attr1 = document.getElementById("attribute1").value; //this will need to be updated by the filter input: Attribute 1
    let attr2 = document.getElementById("attribute2").value; //this will need to be updated by the filter input: Attribute 2
    for (let x = 0; x < dataHash[year].length; x++) {
        if (dataHash[year][x]['Country'].toLowerCase().replaceAll(' ', '-') === countryName) {
            d3version6.select('#scoreboardTitle')
                .text(dataHash[year][x]['Country']);
            d3version6.select('#sb-happiness-rank')
                .text(`Happiness Rank: ${dataHash[year][x]['Happiness Rank']}`);
            d3version6.select('#sb-happiness-score')
                .text(`Happiness Score: ${dataHash[year][x]['Happiness Score']}`);
            d3version6.select('#sb-attr-1')
                .text(`${attr1}: ${dataHash[year][x][attr1]}`);
            d3version6.select('#sb-attr-2')
                .text(`${attr2}: ${dataHash[year][x][attr2]}`);
        }
    }
    splot.select(`#${countryName}`)
        .attr("opacity", opacityOn)
        .attr('r', '6');

    bplot.select(`#bp-${countryName}`)
        .attr('opacity','1');

    if (selected) {
        map.select(`.${countryName}`).style('opacity', '0.5');
    }
}

const updateOff = (countryName, selected= true) => {
    let attr1 = document.getElementById("attribute1").value; //this will need to be updated by the filter input: Attribute 1
    let attr2 = document.getElementById("attribute2").value; //this will need to be updated by the filter input: Attribute 2
    splot.select(`#${countryName}`)
        .attr("opacity", opacityOff)
        .attr('r', '4');
    bplot.select(`#bp-${countryName}`)
        .attr('opacity','0.5')
    d3version6.select('#scoreboardTitle')
        .text('Select a Country');
    d3version6.select('#sb-happiness-rank')
        .text(`Happiness Rank:`);
    d3version6.select('#sb-happiness-score')
        .text(`Happiness Score: `);
    d3version6.select('#sb-attr-1')
        .text(`${attr1}:`);
    d3version6.select('#sb-attr-2')
        .text(`${attr2}:`);
    if (selected) {
        map.select(`.${countryName}`).style('opacity', '1');
    }
}

const updateScoreboard = () => {
    let attr1 = document.getElementById("attribute1").value; //this will need to be updated by the filter input: Attribute 1
    let attr2 = document.getElementById("attribute2").value; //this will need to be updated by the filter input: Attribute 2
    d3version6.select('#sb-attr-1')
        .text(`${attr1}:`);
    d3version6.select('#sb-attr-2')
        .text(`${attr2}:`);
}

const updateData = () => {

}