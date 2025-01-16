// Assuming Chart.js is included in your HTML file
// Visualization for IMDb Top 1000 Dataset
console.log('Loaded logic_top10IMDB.js');
document.addEventListener('DOMContentLoaded', function() {
    // Fetch data from JSON file (assuming it's already converted)
    fetch('static/db/imdb_top_1000.json')
        .then(response => response.json())
        .then(data => {
            // Extract required data
            const movieTitles = data.map(movie => movie.Series_Title);
            const imdbRatings = data.map(movie => parseFloat(movie.IMDB_Rating));
            const genres = data.map(movie => movie.Genre.split(',')[0]);

            // Create IMDb Ratings Bar Chart
            const ctxBar = document.getElementById('imdbRatingsChart').getContext('2d');
            new Chart(ctxBar, {
                type: 'bar',
                data: {
                    labels: movieTitles.slice(0, 10), // Top 10 movies for simplicity
                    datasets: [{
                        label: 'IMDb Ratings',
                        data: imdbRatings.slice(0, 10),
                        backgroundColor: 'rgba(255, 200, 0, 1)',
                        borderColor: 'rgba(255, 255, 255, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: true,
                            labels: {
                                font: {
                                    color: 'white'
                                }
                            }
                        },
                        tooltip: {
                            enabled: true
                        }
                    },
                    scales: {
                        x: {
                            ticks: {
                                color: 'white'
                            }
                        },
                        y: {
                            beginAtZero: true,
                            ticks: {
                                color: 'white'
                            }
                        }
                    }
                }
            });
        })
        .catch(error => console.error('Error loading data:', error));
});