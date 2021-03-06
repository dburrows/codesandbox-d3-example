import * as d3 from "d3";

var updatePie = function () {
  var width = 480,
    height = 480,
    radius = Math.min(width, height) / 2;

  var color = d3.scale.category10(),
    svg;

  function graph(_selection) {
    _selection.each(function (_data) {
      var pie = d3.layout
        .pie()
        .value(function (d) {
          return d[1];
        })
        .sort(null);

      var arc = d3.svg
        .arc()
        .innerRadius(radius - 100)
        .outerRadius(radius - 50);

      if (!svg) {
        svg = d3
          .select(this)
          .append("svg")
          .attr("width", width)
          .attr("height", height)
          .append("g")
          .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
      }
      var path = svg.selectAll("path").data(pie(_data));

      path
        .enter()
        .append("path")
        .attr("fill", function (d, i) {
          return color(i);
        })
        .attr("d", arc)
        .each(function (d) {
          this._current = d;
        });

      path.transition().attrTween("d", arcTween);

      path.exit().remove();

      function arcTween(a) {
        var i = d3.interpolate(this._current, a);
        this._current = i(0);
        return function (t) {
          return arc(i(t));
        };
      }
    });
  }
  return graph;
};

var updateFunction = updatePie();
var container = d3.select("body");

function update(data) {
  container.datum(data).call(updateFunction);
}

var firstDataset = [
  ["blog 1", "6"],
  ["blog 2", "7"],
  ["blog 3", "8"]
];

update(firstDataset);

document.getElementById("reDrawButton").addEventListener("click", reDrawChart);

function reDrawChart() {
  var secondDataset = [
    ["foobar", "1"],
    ["barfoo", "2"]
  ];
  update(secondDataset);
}
