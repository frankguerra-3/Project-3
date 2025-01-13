let movieData = [];

function init() {
  d3.json('imdb_top_1000.json').then(data => {
    movieData = data; // Store the data in a global variable

    const dropdown = document.getElementById("movieDropdown");

    // Loop through the data and create an option for each movie title
    data.forEach(movie => {
      const option = document.createElement("option");
      option.value = movie.Series_Title;
      option.text = movie.Series_Title;
      dropdown.appendChild(option);
    });

    // Generate the word cloud on initial load
    generateWordCloud(data);  // Generate the word cloud once data is loaded
  }).catch(error => {
    console.error('Error loading the data:', error);
  });
}

// Function to update the textbox with the selected movie's details
function updateTextBox() {
  const dropdown = document.getElementById("movieDropdown");
  const textBox = document.getElementById("selectedMovie");

  const selectedMovieTitle = dropdown.value;

  // Find the selected movie from the movieData array
  const selectedMovie = movieData.find(movie => movie.Series_Title === selectedMovieTitle);

  if (selectedMovie) {
    textBox.value = selectedMovie.Overview; // Display the overview (Description) in the text box

    // Update additional fields
    document.getElementById("releasedYear").value = selectedMovie.Released_Year;
    document.getElementById("runtime").value = selectedMovie.Runtime;
    document.getElementById("imdbRating").value = selectedMovie.IMDB_Rating;
    document.getElementById("genre").value = selectedMovie.Genre;
    document.getElementById("director").value = selectedMovie.Director;
    
    // Re-render the word cloud based on the selected movie data
    generateWordCloud(movieData);
  } else {
    textBox.value = ""; // If no movie is selected, clear the text box
    // Clear the additional fields
    document.getElementById("releasedYear").value = "";
    document.getElementById("runtime").value = "";
    document.getElementById("imdbRating").value = "";
    document.getElementById("genre").value = "";
    document.getElementById("director").value = "";
  }
}

// Function to reset fields when search icon is clicked, excluding word cloud
function resetFields() {
  const dropdown = document.getElementById("movieDropdown");
  dropdown.value = ""; // Reset to --Select a Movie--

  const textBox = document.getElementById("selectedMovie");
  textBox.value = ""; // Clear the description field

  // Clear the additional fields
  document.getElementById("releasedYear").value = "";
  document.getElementById("runtime").value = "";
  document.getElementById("imdbRating").value = "";
  document.getElementById("genre").value = "";
  document.getElementById("director").value = "";
}

// Function to generate the word cloud for genres
function generateWordCloud(data) {
  console.log("Generating word cloud...");

  // Extract genres from the movie data
  const genres = data.map(movie => movie.Genre).join(' ').split(',').map(d => d.trim());

  // Count the frequency of each genre
  const genreCounts = d3.rollup(genres, v => v.length, d => d);

  // Prepare the data for the word cloud
  const wordCloudData = Array.from(genreCounts, ([text, size]) => ({
    text,
    size: size * 10 // Adjust the size multiplier as needed
  }));

  // Set up the word cloud layout
  const width = 800;
  const height = 400;

  // Clear the existing word cloud before re-rendering
  const wordCloudContainer = document.getElementById("wordcloud");
  wordCloudContainer.innerHTML = "";

  // Ensure d3.layout.cloud is correctly called
  d3.layout.cloud()
    .size([width, height])
    .words(wordCloudData.map(d => ({ text: d.text, size: d.size })))
    .padding(5) // Space between words
    .rotate(0)  // Set to 0 for horizontal words
    .font("Impact") // Choose your preferred font
    .fontSize(d => d.size) // Set word size based on frequency
    .on("end", draw) // Call the draw function after layout is computed
    .start();

  // Function to render the word cloud
  function draw(words) {
    const svg = d3.select("#wordcloud").append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    svg.selectAll("text")
      .data(words)
      .enter().append("text")
      .style("font-size", d => d.size + "px")
      .style("font-family", "Impact")
      .style("fill", "lightblue") // Change word color to light blue
      .attr("text-anchor", "middle")
      .attr("transform", d => "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")")
      .text(d => d.text);
  }
}

// Initialize and populate the dropdown on page load
init();
