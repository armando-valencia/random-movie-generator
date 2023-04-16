# Streaming Service Movie Generator
This project is a random movie generator that selects a movie based on the platform you select. Currently, this project only supports HBO Max, Hulu, and Netflix.

### Technology:
This is a **React** app built with **Tailwind** for styling and **ChakraUI** for components. To get movie data, I'm using the [fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) which calls an endpoint from [rapid API](https://rapidapi.com/).

### Todo:
- **Problem**: Too vague of a generator. Filtering by genre should be an option.
   - **Solution**: Add genre filtering
- **Problem**: API calls return 8 results at a time. There are more than 8 movies in the API.
   - **Solution**: Add pagniation
