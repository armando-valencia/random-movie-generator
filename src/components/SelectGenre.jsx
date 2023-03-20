import { useState } from 'react';
import { Switch } from 'antd';

const genres = [
    // { id: 1, genre: 'Biography' },
    // { id: 2, genre: 'Film Noir' },
    // { id: 3, genre: 'Game Show' },
    // { id: 4, genre: 'Musical' },
    // { id: 5, genre: 'Sport' },
    // { id: 6, genre: 'Short' },
    // { id: 7, genre: 'Adult' },
    { id: 12, genre: 'Adventure' },
    // { id: 14, genre: 'Fantasy' },
    // { id: 16, genre: 'Animation' },
    { id: 18, genre: 'Drama' },
    { id: 27, genre: 'Horror' },
    { id: 28, genre: 'Action' },
    // { id: 35, genre: 'Comedy' },
    // { id: 36, genre: 'History' },
    // { id: 37, genre: 'Western' },
    // { id: 53, genre: 'Thriller' },
    // { id: 80, genre: 'Crime' },
    // { id: 99, genre: 'Documentary' },
    { id: 878, genre: 'Science Fiction' },
    { id: 9648, genre: 'Mystery' },
];

const SelectGenre = ({ genreChanger, idChanger }) => {
    const [showGenres, setShowGenres] = useState(false);

    const handleSwitchChange = () => {
        setShowGenres(!showGenres);
        console.log(showGenres);
        if (showGenres !== false) {
            genreChanger(null);
        }
    };

    const clearGenre = () => {
        genreChanger(null);
        idChanger(null);
    };

    return (
        <div className="text-center">
            <h2>Want to select by genre?</h2>
            <Switch
                checkedChildren="Yes"
                unCheckedChildren="No"
                onChange={() => handleSwitchChange()}
            />

            {showGenres &&
                genres.map((genre) => (
                    <p
                        key={genre.genre}
                        className={`hover:text-white cursor-pointer ${
                            genreChanger == genre.genre ? 'text-gray' : ''
                        }`}
                        onClick={() => {
                            genreChanger(genre.genre);
                            idChanger(genre.id);
                        }}
                    >
                        {genre.genre}
                    </p>
                ))}

            {/* <button onClick={clearGenre}>Clear</button> */}
        </div>
    );
};
export default SelectGenre;
