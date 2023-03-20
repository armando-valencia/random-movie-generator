import useFetchMovie from '../hooks/useFetchMovie';
let fullUrl;

const GenerateMovieButton = ({ url, selectedGenre }) => {
    if (selectedGenre) {
        let fullUrl = `${url}&genre=${selectedGenre}`;
    }

    const fetchMovie = useFetchMovie(fullUrl);

    return (
        <>
            <button
                className="m-2 p-2 rounded-lg border border-white text-white hover:border-[#31f610]  hover:text-[#31f610]"
                onClick={fetchMovie}
            >
                Generate {selectedGenre}
            </button>
        </>
    );
};
export default GenerateMovieButton;
