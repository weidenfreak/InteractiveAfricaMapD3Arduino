var widthMap = 960,
heightMap = 600;

var widthScale = 900,
heightScale = 20;

var minYear = 1990,
maxYear = 2012;

//set min and max year for slider dynamically
$("#yearRange")
.attr({min: minYear})
.attr({max: maxYear})
.val(minYear);

// create year scale svg
var svg = d3.select('div.scale').append('svg')
.attr("width", widthScale)
.attr("height", heightScale);

var scale = d3.scale.linear().domain([minYear, maxYear]).range([20, 860]);
// remove commas from numbers
var formatAsYear = d3.format(".");

var axis = d3.svg.axis()
.scale(scale)
.ticks(maxYear-minYear)
.tickFormat(formatAsYear);

// add a new `<g>` tag to the `<svg>`, then add the axis component to the `<g>`
svg.append('g').call(axis).attr('class', 'x axis')

//define color mapping for map
var color = d3.scale.quantize()
.range([
  "rgb(255,255,217)",
  "rgb(237,248,177)",
  "rgb(199,233,180)",
  "rgb(127,205,187)",
  "rgb(65,182,196)",
  "rgb(29,145,192)",
  "rgb(34,94,168)",
  "rgb(12,44,132)"]);

  // color domain is static because even the country that has the best
  // water or sanitation for their inhabitants might not provide a 100 percent
  color.domain([0, 100]);

  var projection = d3.geo.albers()
  .center([0, 8.5])
  .rotate([-40.4, 0])
  .parallels([20, 50])
  .scale(2000)
  .translate([widthMap / 2, heightMap / 2]);;

  var path = d3.geo.path()
  .projection(projection);

  var svg = d3.select("div.map").append("svg")
  .attr("width", widthMap)
  .attr("height", heightMap);

  d3.csv("country_data/ethiopia.csv", function(data) {

    //d3.json("subunits.json", function(error, ethiopia) {
    //  var subunits = topojson.feature(ethiopia, ethiopia.objects.subunits);
    d3.json("country_data/subunits.json", function(json) {
      //var subunits = json.objects.subunits;
      //Merge the ag. data and GeoJSON
      //Loop through once for each ag. data value

      for (var i = 0; i < data.length; i++) {
        //Grab state name
        var dataState = data[i].state;
        //Grab data value, and convert from string to float
        var dataValue = data[i];
        //Find the corresponding state inside the GeoJSON
        for (var j = 0; j < json.features.length; j++) {
          var jsonState = json.features[j].properties.NAME;
          if (dataState == jsonState) {
            //Copy the data value into the JSON
            json.features[j].properties.value = dataValue;
            //Stop looking through the JSON
            break;
          }
        }
      }

      svg.selectAll("path")
      .data(json.features)
      .enter()
      .append("path")
      .attr("d", path)
      .style("fill", function(d) {
        return fillColor(d, minYear);
      });
    })
  });

  $(document).ready(
    // change color of map depending on slider position
    $('#yearRange').on('change', function() {
      var year = $(this).val();
      svg.selectAll("path")
      .transition()
      .style("fill", function(d) {
        return fillColor(d, year);
      });
    })
  );

  // find color for value of a certain year
  function fillColor(d, colorValue) {
    var value = parseFloat(d.properties.value[colorValue]);
    if (value) {
      return color(value);
    } else {
      return "#ccc";
    }
  }
