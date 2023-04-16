// import { useState } from 'react';

// export default function useFetchByGenre(url) {
//     const [data, setData] = useState(null);
//     const options = {
//         method: 'GET',
//         headers: {
//             'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
//             'X-RapidAPI-Host': import.meta.env.VITE_API_HOST,
//         },
//     };

//     if (url) {
//         let ignore = false;
//         fetch(url, options)
//             .then(response => response.json())
//             .then(json => {
//                 if (!ignore) {
//                     console.log(json);
//                     setData(json);
//                 }
//             });
//         return () => {
//             ignore = true;
//         };
//     }
//     return data;
// }
