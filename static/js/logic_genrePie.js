// Assuming Chart.js is included in your HTML file
// Visualization for IMDb Top 1000 Dataset
console.log('Loaded logic_genrePie.js');
document.addEventListener('DOMContentLoaded', function() {
    // Fetch data from JSON file (assuming it's already converted)
    fetch('static/db/imdb_top_1000.json')
        .then(response => response.json())
        .then(data => {
            // Generate unique genres and their counts
            const genres = data.map(movie => movie.Genre.split(',')[0]);
            
            const genreCounts = {};
            genres.forEach(genre => {
                genreCounts[genre] = (genreCounts[genre] || 0) + 1;
            });
            const uniqueGenres = Object.keys(genreCounts);
            const genreValues = Object.values(genreCounts);

            // Function to generate a color scale based on base color #ffc800
            function generateColorScale(numColors) {
                const baseHue = 45; // HSL hue for #ffc800
                const baseSaturation = 100; // Saturation for base color
                const baseLightness = 0; // Lightness for base color
                
                return Array.from({ length: numColors }, (_, index) => {
                    const lightness = baseLightness + (index * 10); // Adjust lightness
                    return `hsl(${baseHue}, ${baseSaturation}%, ${Math.min(100, lightness)}%)`;
                });
            }

            // Create Genre Distribution Pie Chart
            const ctxPie = document.getElementById('genreDistributionChart').getContext('2d');
            new Chart(ctxPie, {
                type: 'pie',
                data: {
                    labels: uniqueGenres,
                    datasets: [{
                        label: 'Genre Distribution',
                        data: genreValues,
                        backgroundColor: generateColorScale(uniqueGenres.length),
                        borderColor: '#fff',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: true,
                            position: 'right',
                            labels: {
                                font: {
                                    color: 'white'
                                }
                            }
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