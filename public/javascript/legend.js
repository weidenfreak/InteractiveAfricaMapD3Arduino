var legendRectSize = 20;
var legendSpacing = 4;

var legend = svg.selectAll('.legend')
  .data(color.range())
  .enter()
  .append('g')
  .attr('class', 'legend')
  .attr('transform', function(d, i) {
    var height = legendRectSize + legendSpacing;
    var horz = 2 * legendRectSize;
    var vert = i * height + 380;
    return 'translate(' + horz + ',' + vert + ')';
  });

legend.append('rect')
  .attr('width', legendRectSize)
  .attr('height', legendRectSize)
  .style("fill", function(d) {
    return d;
})

legend.append('text')
  .attr('x', legendRectSize + legendSpacing)
  .attr('y', legendRectSize - legendSpacing)
  .text(function(d) {
    var range = color.invertExtent(d)
    return range[0] + "% - " + range[1] + "%";
});
