function init() {
  console.log('inside init');
  d3.json('imdb_top_1000.json')
  .then(data => {
    // Work with the JSON data here
    console.log(data);
    const dropdown = document.getElementById("movieDropdown");
    data.forEach(movie => {
        const option = document.createElement("option");
        option.value = movie.Series_Title;
        option.text = movie.Series_Title;
        dropdown.appendChild(option);
      });
  })
  .catch(error => {
    console.error('Error loading JSON:', error);
  });

}

// Function to update the textbox with the selected series title
function updateTextBox() {
  console.log('inside updateTextBox');
  const dropdown = document.getElementById("movieDropdown");
  const textBox = document.getElementById("selectedMovie");
  textBox.value = dropdown.value;
}


init();