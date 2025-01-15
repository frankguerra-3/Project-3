// Read the JSON file using D3.js
d3.json("imdb_top_1000.json").then(function(data) {
    // Sort the movies by the number of votes
    data.sort((a, b) => b.No_of_Votes - a.No_of_Votes);
    
    // Take the top 10 movies
    const topMovies = data.slice(0, 10);

    // Set the dimensions of the chart
    const margin = { top: 20, right: 30, bottom: 40, left: 90 };
    const width = 800 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    // Append the svg object to the chart div
    const svg = d3.select("#chart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Set the scales
    const x = d3.scaleLinear()
        .domain([0, d3.max(topMovies, d => d.No_of_Votes)])
        .range([0, width]);

    const y = d3.scaleBand()
        .domain(topMovies.map(d => d.Series_Title))
        .range([0, height])
        .padding(0.1);

    // Add bars to the chart
    svg.selectAll(".bar")
        .data(topMovies)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", 0)
        .attr("y", d => y(d.Series_Title))
        .attr("width", d => x(d.No_of_Votes))
        .attr("height", y.bandwidth());

    // Add the x-axis
    svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).ticks(6));

    // Add the y-axis
    svg.append("g")
        .attr("class", "y-axis")
        .call(d3.axisLeft(y));

    // Add the x-axis label
    svg.append("text")
        .attr("transform", "translate(" + (width / 2) + " ," + (height + margin.bottom - 10) + ")")
        .style("text-anchor", "middle")
        .text("Number of Votes");

    // Add the y-axis label
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 10)
        .attr("x", 0 - (height / 2))
        .style("text-anchor", "middle")
        .text("Movies");
});
