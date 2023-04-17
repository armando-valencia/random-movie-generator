# Streaming Service Movie Generator
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) ![Chakra](https://img.shields.io/badge/chakra-%234ED1C5.svg?style=for-the-badge&logo=chakraui&logoColor=white) ![Netlify](https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7)

This is a random movie generator that selects a movie based on the platform you select. Currently, this project only supports HBO Max, Hulu, and Netflix.


### How it use it
1. Select a platform.
2. Click generate to fetch data from [rapid API](https://rapidapi.com/).
3. A movie is generated. 
4. Click close and repeat step 2 to generate another movie, or click "back" to select a different platform.

### Todo:
- **Problem**: Too vague of a generator. Filtering by genre should be an option.
   - **Solution**: Add genre filtering
- **Problem**: API calls return 8 results at a time. There are more than 8 movies in the API.
   - **Solution**: Add pagination
