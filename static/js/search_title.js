let movieData = [];

function init() {
  d3.json('static/db/imdb_top_1000.json').then(data => {
    movieData = data; // Store the data in a global variable

    const dropdown = document.getElementById("movieDropdown");

    // Loop through the data and create an option for each movie title
    data.forEach(movie => {
      const option = document.createElement("option");
      option.value = movie.Series_Title;
      option.text = movie.Series_Title;
      dropdown.appendChild(option);
    });

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



// Initialize and populate the dropdown on page load
init();
