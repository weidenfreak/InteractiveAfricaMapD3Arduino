//D3 Charts stuff
var width = 960,
height = 600;

var projection = d3.geo.albers()
.center([0, 8.5])
.rotate([-40.4, 0])
.parallels([20, 50])
.scale(2000)
.translate([width / 2, height / 2]);;

var path = d3.geo.path()
.projection(projection);

var svg = d3.select("#map").append("svg")
.attr("width", width)
.attr("height", height);

d3.json("country_data/ethiopia.json", function(error, ethiopia) {
  var subunits = topojson.feature(ethiopia, ethiopia.objects.subunits);

  svg.selectAll(".subunit")
  .data(subunits.features)
  .enter().append("path")
  .attr("class", function(d) { return "subunit " + d.id; })
  .attr("d", path);
});
