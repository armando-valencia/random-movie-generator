import useFetchMovie from '../hooks/useFetchMovie';

const GenerateMovieButton = ({ url, selectedGenre, selectedGenreId }) => {
    // const fullUrl =
    //     selectedGenreId !== null || selectedGenreId !== ''
    //         ? `${url}&genre=${selectedGenreId}`
    //         : url;

    // const fetchMovie = useFetchMovie(fullUrl);

    return (
        <>
            <button
                className="m-2 p-2 rounded-lg border border-[#31f610] text-[#31f610] hover:bg-[#31f610] hover:text-[#242424] hover:font-semibold"
                // onClick={fetchMovie}
            >
                Generate!
            </button>
        </>
    );
};
export default GenerateMovieButton;
