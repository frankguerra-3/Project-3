# Movie Industry Analytics

## By Group 8 Team Members:
- **Frank Guerra**
- **Lavenya Mohanasundaram**
- **Mehmet Akif Cingöz**
- **Nicholas Voltin**

The **Movie Industry Analytics** project aims to analyze and visualize key trends and patterns within the movie industry using a comprehensive dataset of IMDb's top 1000 movies. The dataset, sourced from the [Kaggle IMDb Dataset of Top 1000 Movies and TV Shows](https://www.kaggle.com/datasets/harshitshankhdhar/imdb-dataset-of-top-1000-movies-and-tv-shows), includes detailed information such as movie genres, release years, revenue, ratings, and more. This project explores how various factors, such as genres, directors, and actors, influence a movie's financial and critical success, offering valuable insights for filmmakers, producers, and analysts in the entertainment industry.

## Data Flow and Processing

1. **CSV to MongoDB**: 
   - **Data Source**: The primary dataset for the project was sourced from the **Kaggle IMDb Dataset of Top 1000 Movies and TV Shows**, which includes detailed movie attributes such as titles, genres, ratings, earnings, and directors.
   - **Processing**: The dataset, initially provided in CSV format, was processed using **Python scripts**. The data was cleaned, transformed, and injected into a **MongoDB database** to enable efficient querying and data management.
   - **MongoDB Injection**: MongoDB was used for storing the data, ensuring that it could be queried easily for insights such as top-rated movies, most popular genres, or earnings by director.
   - **Export to JSON**: After processing, the data was exported as a **JSON file** (`imdb_top_1000.json`) for use in the front-end visualizations in the project.

2. **Data Visualizations**:
   The data was visualized using a combination of JavaScript libraries (D3.js, Plotly, Chart.js), creating several dynamic charts and graphs that allow users to interact with the data and uncover insights. These visualizations help to explore various aspects of the movie industry, such as:
   - Movie genre distribution.
   - Movie titles by their Number of Votes and IMDb ratings.
   - Top directors by earnings.
   - Word clouds for genre frequency.

   Each visualization is powered by JavaScript and allows for real-time updates and user interaction, providing an engaging experience for users who want to explore the dataset further.

## Data Visualizations & Functions Used

### 1. Genre Distribution (Pie Chart)
- **File**: `logic_genrePie.js`
- **Function**:
  - **`generateColorScale(numColors)`**: Generates a dynamic color scale for the pie chart based on the number of genres.
  - **Visualization**: A **pie chart** is created using **Chart.js** to show the distribution of movie genres. Each slice of the pie represents the frequency of a genre across the top 1000 IMDb movies.

### 2. Word Cloud for Genres
- **File**: `logic_genreWC.js`
- **Functions**:
  - **`generateWordCloud(data)`**: Extracts, splits, and counts movie genres, creating a word cloud.
  - **`sizeScale`**: Scales the font size of each word in the word cloud based on the frequency of its genre using `d3.scaleLinear()`.
  - **Visualization**: A **word cloud** is generated where more frequent genres appear larger, helping users to visually identify the most popular genres in the dataset.

### 3. Movie Title Search and Information Display
- **File**: `logic_titleSearch.js`
- **Functions**:
  - **`updateTextBox()`**: Updates the textboxes with detailed movie information such as the movie's description, release year, genre, IMDb rating, and director.
  - **`resetFields()`**: Resets all fields and clears the movie selection when the reset icon is clicked.
  - **Visualization**: This feature allows users to select a movie from a dropdown, view detailed information, and interact with a word cloud that dynamically updates based on the selected movie's genres.

### 4. Top 10 Movies by IMDb Rating (Bar Chart)
- **File**: `logic_top10IMDB.js`
- **Function**:
  - The top 10 movies are selected based on IMDb ratings, and a **bar chart** is generated using **Chart.js** to display the movies and their respective ratings.
  - **Visualization**: A **bar chart** shows movie titles on the X-axis and their IMDb ratings on the Y-axis.

### 5. Top 10 Movies by Votes (Bar Chart)
- **File**: `logic_top10Votes.js`
- **Function**:
  - Movies are sorted by the number of votes, and the **top 10 movies** are selected for visualization in a **bar chart**.
  - **Visualization**: A **bar chart** is created using **D3.js**, with movie titles on the Y-axis and votes on the X-axis.

### 6. Top 20 Directors by Gross Earnings
- **File**: `logic_top20Directors.js`
- **Functions**:
  - **`createDropdown(data)`**: Creates a dropdown menu for users to select directors based on their total gross earnings.
  - **`updateChart(director, movies)`**: Updates a **bar chart** to show the movies and earnings of the selected director.
  - **Visualization**: A **bar chart** is created using **Plotly**, showing the movies of the selected director along with their gross earnings.

### User-Driven Interaction:
The project offers a high level of **user-driven interaction**:
- **Movie Title Search**: Users can select a movie from a dropdown menu to view its details such as the release year, genre, IMDb rating, and more. The word cloud updates dynamically based on the selected movie’s genre, providing an engaging experience.
- **Top 20 Directors by Earnings**: A dropdown menu allows users to choose a director, and the chart is updated to show their movies and earnings, enhancing the personalized experience.
- **Interactive Visualizations**: All charts and visualizations (pie chart, bar charts, word cloud) are interactive, providing users with an engaging way to explore the data and understand movie industry trends.


### Ethical Considerations:
Ethical considerations were a key part of the project’s development to ensure that the data was presented fairly and transparently:
- **Data Integrity**: The data was sourced from a reputable source (Kaggle) and processed in a way that ensured its accuracy. The visualization models did not introduce bias towards any specific genre, director, or other movie attributes.
- **Transparency**: The project clearly acknowledges the data source from **Kaggle** and provides links to the dataset and proposal. This ensures that the data’s origins are transparent and that users understand how the insights were derived.
- **No Manipulation of Data**: No movie genre or director was favored in the analysis. The visualizations accurately reflect the frequency and earnings as presented in the dataset.


## Instructions on How to Use and Interact with the Project

To interact with and explore the visualizations in the **Movie Industry Analytics** project, follow these steps:

1. **Start Exploring**:
   - When you open the webpage, you will see the main dashboard, which contains sections for:
     - **Top 10 Movies by IMDb Rating** (Bar chart)
     - **Top 10 Movies by Votes** (Bar chart)
     - **Top 20 Directors by Gross Earnings** (Dropdown and bar chart)
     - **Genre Word Cloud** (Interactive word cloud based on genre frequency)
     - **Genre Distribution** (Pie chart showing the distribution of genres)

2. **Search for a Movie**:
   - In the **Movie Information** section, you can select a movie from the dropdown menu. This will trigger the display of detailed movie information such as the release year, genre, IMDb rating, runtime, and director. Additionally, the **word cloud** will update based on the selected movie’s genre.

3. **Explore Top 20 Directors**:
   - In the **Top 20 Directors by Gross Earnings** section, use the dropdown menu to select a director. The chart will update dynamically to show the selected director's movies and their respective gross earnings.

4. **Interactive Visualizations**:
   - All visualizations are interactive. For example, you can hover over bars in the **Top 10 Movies by IMDb Rating** bar chart to see more details or click on segments in the **Genre Distribution** pie chart to filter and explore the data.

5. **Reset and Explore Further**:
   - You can reset the displayed movie details by clicking the reset icon in the **Movie Title Search** section. You can also interact with other visualizations to dive deeper into the data.

## Conclusion

The **Movie Industry Analytics** project combines **data processing**, **ethical considerations**, and **interactive visualizations** to provide meaningful insights into the movie industry. Using the Kaggle dataset as the source, the project enables users to explore trends related to movie genres, directors, ratings, and more. The interactive features, including dropdown menus and search functionality, allow users to filter and explore the data in ways that suit their interests. This project is a comprehensive data-driven tool for analyzing the entertainment industry and gaining valuable insights into movie success factors.

---

### Data Source
The dataset used in this project is the **IMDb Dataset of Top 1000 Movies and TV Shows** from Kaggle. You can access the dataset here: [IMDb Dataset on Kaggle](https://www.kaggle.com/datasets/harshitshankhdhar/imdb-dataset-of-top-1000-movies-and-tv-shows).

### References for Code Used:
All the code used in this project is **original** and developed by the team. No external code libraries were used beyond the following libraries:
- **Chart.js** for creating pie charts and bar charts.
- **D3.js** for the word cloud and bar charts.
- **Plotly** for interactive charts related to directors and earnings.
