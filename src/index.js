import * as d3 from "d3";
window.d3 = d3;

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const graphData = [
  { key: makeid(3), value: 4 },
  { key: makeid(3), value: 8 },
  { key: makeid(3), value: 15 },
  { key: makeid(3), value: 16 },
  { key: makeid(3), value: 23 },
  { key: makeid(3), value: 42 }
];

const svg = d3.select("#graph");

function draw(data) {
  const bars = svg.selectAll("rect").data(data, (d) => d.key);
  console.log(bars);

  bars.join(
    (enter) =>
      enter
        .append("rect")
        .attr("x", (d, i) => i * 20)
        .attr("width", (d) => 10)
        .style("fill", "blue")
        .attr("y", 0)
        .call((g) =>
          g
            .transition()
            .duration(2000)
            .attr("height", (d) => d.value * 4)
        ),
    (update) =>
      update.call((g) =>
        g
          .transition()
          .duration(2000)
          .attr("height", (d) => d.value * 4)
      ),
    (exit) =>
      exit.call((g) =>
        g
          .transition()
          .duration(1000)
          .attr("transform", (d, i) => `translate(${10},${350})`)
          .style("opacity", 0)
          .remove()
      )
  );
}

window.draw = function () {
  draw(graphData);
};

window.append = function append() {
  graphData.push({ key: makeid(3), value: Math.floor(Math.random() * 70) });
  console.log(graphData);
  draw(graphData);
};

window.remove = function append() {
  graphData.pop();
  console.log(graphData);
  draw(graphData);
};

// ===============
//
// const svg = d3.select("#graph");

// const bars = svg.selectAll(".bar");

// const barUpdate = bars.data(data);

// const barDraw = barUpdate
//   .enter()
//   .append("rect")
//   .attr("x", function (d, i) {
//     return i * 20;
//   })
//   .attr("width", (d) => 10)
//   .style("fill", "blue");

// // enter animation
// barDraw
//   .transition()
//   .delay(function (d, i) {
//     return i * 100;
//   })
//   .duration(1000)
//   .attr("y", function (d) {
//     return 0;
//   })
//   .attr("height", (d) => d * 4);

// window.append = function append() {
//   data.push(76);
//   console.log(data);
// };

// ===================

// svg.append(() => bar.node());

// // Create an empty (detached) chart container.
// const div = d3.create("div");

// // Apply some styles to the chart container.
// div.style("font", "10px sans-serif");
// div.style("text-align", "right");
// div.style("color", "white");

// // Define the initial (empty) selection for the bars.
// const bar = div.selectAll("div");

// // Bind this selection to the data (computing enter, update and exit).
// const barUpdate = bar.data(data);

// // Join the selection and the data, appending the entering bars.
// const barNew = barUpdate.join("div");

// // Apply some styles to the bars.
// barNew.style("background", "steelblue");
// barNew.style("padding", "3px");
// barNew.style("margin", "1px");
// // Set the width as a function of data.
// barNew.style("width", (d) => `${d * 10}px`);
// // Set the text of each bar as the data.
// barNew.text((d) => d);

// container.append(() => div.node());
