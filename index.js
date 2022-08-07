const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

async function main() {

    var artists_all = [];
    var all_pokemons = [];
    var response = await axios.get('https://pt.wikipedia.org/wiki/Especial:Aleat%C3%B3ria');
    var $ = cheerio.load(response.data);
    var title = $('#firstHeading').text();
    var link = $('#ca-nstab-main').find('a').attr('href');
    console.log(link);
}

async function getLyric(href) {

}


main();