// Assuming Chart.js is included in your HTML file
// Visualization for IMDb Top 1000 Dataset
console.log('Loaded logic10.js');
document.addEventListener('DOMContentLoaded', function() {
    // Fetch data from JSON file (assuming it's already converted)
    fetch('imdb_top_1000.json')
        .then(response => response.json())
        .then(data => {
            // Extract required data
            const movieTitles = data.map(movie => movie.Series_Title);
            const imdbRatings = data.map(movie => parseFloat(movie.IMDB_Rating));
            const genres = data.map(movie => movie.Genre.split(',')[0]);

            // Generate unique genres and their counts
            const genreCounts = {};
            genres.forEach(genre => {
                genreCounts[genre] = (genreCounts[genre] || 0) + 1;
            });
            const uniqueGenres = Object.keys(genreCounts);
            const genreValues = Object.values(genreCounts);

            // Create IMDb Ratings Bar Chart
            const ctxBar = document.getElementById('imdbRatingsChart').getContext('2d');
            new Chart(ctxBar, {
                type: 'bar',
                data: {
                    labels: movieTitles.slice(0, 10), // Top 10 movies for simplicity
                    datasets: [{
                        label: 'IMDb Ratings',
                        data: imdbRatings.slice(0, 10),
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: true
                        },
                        tooltip: {
                            enabled: true
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });

            // Create Genre Distribution Pie Chart
            const ctxPie = document.getElementById('genreDistributionChart').getContext('2d');
            new Chart(ctxPie, {
                type: 'pie',
                data: {
                    labels: uniqueGenres,
                    datasets: [{
                        label: 'Genre Distribution',
                        data: genreValues,
                        backgroundColor: uniqueGenres.map(() => `hsl(${Math.random() * 360}, 70%, 70%)`),
                        borderColor: '#fff',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: true,
                            position: 'right'
                        },
                        tooltip: {
                            enabled: true
                        }
                    }
                }
            });
        })
        .catch(error => console.error('Error loading data:', error));
});