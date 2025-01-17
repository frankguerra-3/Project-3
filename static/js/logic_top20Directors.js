// Load the JSON data
fetch('static/db/imdb_top_1000.json')
    .then(response => response.json())
    .then(data => {
        createDropdown(data);
    })
    .catch(error => console.error('Error loading data:', error));

// Function to create the dropdown menu
function createDropdown(data) {
    const directorEarnings = {};

    // Calculate total gross earnings per director
    data.forEach(movie => {
        const director = movie.Director;
        const gross = parseFloat(movie.Gross.replace(/[^0-9.-]+/g, '')) || 0;

        if (!directorEarnings[director]) {
            directorEarnings[director] = 0;
        }
        directorEarnings[director] += gross;
    });

    // Sort directors by earnings and get the top 20
    const sortedDirectors = Object.entries(directorEarnings)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 20) // Limit to top 20 directors
        .map(entry => ({ name: entry[0], earnings: entry[1] }));

    // Populate the dropdown
    const dropdown = document.getElementById('director-select');
    sortedDirectors.forEach(director => {
        const option = document.createElement('option');
        option.value = director.name;
        option.textContent = `${director.name} ($${director.earnings.toLocaleString()})`;
        dropdown.appendChild(option);
    });

    // Add event listener to update the chart
    dropdown.addEventListener('change', () => {
        const selectedDirector = dropdown.value;
        const movies = data.filter(movie => movie.Director === selectedDirector);
        updateChart(selectedDirector, movies);
    });

    // Default selection
    dropdown.value = sortedDirectors[0].name;
    updateChart(sortedDirectors[0].name, data.filter(movie => movie.Director === sortedDirectors[0].name));
}

// Function to update the chart
function updateChart(director, movies) {
    const titles = movies.map(movie => movie.Series_Title);
    const grossEarnings = movies.map(movie => parseFloat(movie.Gross.replace(/[^0-9.-]+/g, '')) || 0);

    const data = [{
        x: titles,
        y: grossEarnings,
        type: 'bar',
        marker: {
            color: '#ffc800',
        }
    }];

    const layout = {
        title: {
            text: `Movies by ${director}`,
            font: {
                color: '#ffc800',
                size: 16,
            },
        },
        xaxis: {
            title: {
                text: 'Movies',
                font: {
                    color: 'ffc800'
                },
                standoff: 100
            },
            tickfont: {
                color: 'white'
            }
        },
        yaxis: {
            title: {
                text: 'Gross Earnings ($)',
                font: {
                    color: 'ffc800'
                },
                standoff: 20
            },
            tickfont: {
                color: 'white'
            }
        },
        margin: {
            b: 200 // Increase bottom margin to adjust spacing for the x-axis
        },
        paper_bgcolor: 'black',
        plot_bgcolor: 'black',
        width: 420
    };

    Plotly.newPlot('chart', data, layout);
}

