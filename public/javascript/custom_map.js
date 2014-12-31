var widthMap = 960,
    heightMap = 600;

var widthScale = 900,
    heightScale = 20;

var minYear = 1990,
    maxYear = 2012;

//-------------------------------
// create year slider and axis
//-------------------------------

$(".slider")
  .attr({min: minYear})
  .attr({max: maxYear})
  .val(minYear);

var svg = d3.select('div.scale').append('svg')
  .attr("width", widthScale)
  .attr("height", heightScale);

var scale = d3.scale.linear().
  domain([minYear, maxYear]).
  range([20, 860]);

var formatAsYear = d3.format(".");

var axis = d3.svg.axis()
  .scale(scale)
  .ticks(maxYear-minYear)
  .tickFormat(formatAsYear);

svg.append('g').call(axis).attr('class', 'x axis')

//-------------------------------
//define color mapping for map
//-------------------------------

var color = d3.scale.quantize()
  .domain([0, 100])
  .range([
    "rgb(255,255,217)",
    "rgb(237,248,177)",
    "rgb(199,233,180)",
    "rgb(127,205,187)",
    "rgb(65,182,196)",
    "rgb(29,145,192)",
    "rgb(34,94,168)",
    "rgb(12,44,132)"]);

//-------------------------------
//create svg map
//-------------------------------

var projection = d3.geo.mercator()
  .scale(400)
  .center([20, 8.5]);

var path = d3.geo.path()
  .projection(projection);

var svg = d3.select("figure.map").append("svg")
  .attr("width", widthMap)
  .attr("height", heightMap);

//Merge Worldbank data and GeoJSON
d3.csv("data/water_access_rural.csv", function(data) {
  d3.json("data/countries.json", function(json) {
    for (var i = 0; i < data.length; i++) {
      var dataValue = data[i];
      //Find the corresponding state inside the GeoJSON
      for (var j = 0; j < json.features.length; j++) {
        var jsonState = json.features[j].properties.ADM0_A3; //ADM03_A3 = ISOCountryCode 3
        var dataState = dataValue["Country Code"];

        if (dataState == jsonState) {
          json.features[j].properties.value = dataValue;
          //For whatever reasons are some countries twice in the geojson file
          //Because of that all states need to be filled with data.
        }
      }
    }

    svg.selectAll("path")
      .data(json.features)
      .enter()
      .append("path")
      .attr("d", path)
      .attr("class", "countries")
      .style("fill", function(d) {
        return mapValueToColor(d, minYear);
      })
      .append("title")
      .text(function(d) {
        return tooltip(d, minYear);
      })
    })
});

//-------------------------------
//dynamic updates when slider is moved
//-------------------------------

d3.select('.slider').on('change', function() {
  var year = $(this).val();

  updateMap(year);
})

//-------------------------------
//helper
//-------------------------------

function updateMap(year) {
  var map = svg.selectAll("path");

  d3.selectAll('title').remove();

  //set current year in headline according to chosen year in slider
  $(".currentYear").text("in " + year);

  //add tooltip in two step process:
  //because after a transition it is not possible to append elements
  map
  .append("title")
  .text(function(d) {
    return tooltip(d, year);
  })

  map
  .transition()
  .style("fill", function(d) {
    return mapValueToColor(d, year);
  })
}

function tooltip(d, year) {
  return d.properties.NAME + ": " + getValueForYear(d, year) + "%";
}

//value: e.g. % of people with access to water
function mapValueToColor(d, year) {
  var value = getValueForYear(d, year);
  if (value) {
    return color(value);
  } else {
    return "#ccc";
  }
}

//value: e.g. % of people with access to water
function getValueForYear(d, year) {
  //not all countries have values for every year
  try {
    return parseFloat(d.properties.value[year]);
  } catch(err) {
    //console.log("Country: " + d.properties.ADM0_A3 + " Year: " + year);
    //console.log("Error getValueForYear: " + err);
    return "";
  }
}
