export default async function useFetchMovie(url, options) {
    try {
        let response = await fetch(url, options);
        let data = await response.json();
        console.log(`data: `, data.result);
        return data.result;
    } catch (err) {
        console.log(err);
    }
}
