const map = d3version6.select('#world-map');
const updateOn = (countryId) => {
    var year = document.getElementById("year").value; //this will need to be updated by the filter input: Year
    var attr1 = document.getElementById("attribute1").value; //this will need to be updated by the filter input: Attribute 1
    var attr2 = document.getElementById("attribute2").value; //this will need to be updated by the filter input: Attribute 2
    for (let x = 0; x < dataHash[year].length; x++) {
        if (dataHash[year][x]['Country'].toLowerCase().replaceAll(' ', '-') === countryId) {
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

    splot.select(`#${countryId}`)
        .attr("opacity", opacityOn)
        .attr('r', '5');
   
    map.select(`.${countryId}`).style('fill', d => determine_country_color(d, 'purple'));
}

const updateOff = (countryId) => {
    var year = document.getElementById("year").value; //this will need to be updated by the filter input: Year
    var attr1 = document.getElementById("attribute1").value; //this will need to be updated by the filter input: Attribute 1
    var attr2 = document.getElementById("attribute2").value; //this will need to be updated by the filter input: Attribute 2
    splot.select(`#${countryId}`)
        .attr("opacity", opacityOff)
        .attr('r', '3');
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
    map.select(`.${countryId}`).style('fill', d => determine_country_color(d, 'white'))
}

const updateScoreboard = () => {
    var year = document.getElementById("year").value; //this will need to be updated by the filter input: Year
    var attr1 = document.getElementById("attribute1").value; //this will need to be updated by the filter input: Attribute 1
    var attr2 = document.getElementById("attribute2").value; //this will need to be updated by the filter input: Attribute 2
    d3version6.select('#sb-attr-1')
        .text(`${attr1}:`);
    d3version6.select('#sb-attr-2')
        .text(`${attr2}:`);
    console.log('scoreboard update');
}

const updateData = () => {

}