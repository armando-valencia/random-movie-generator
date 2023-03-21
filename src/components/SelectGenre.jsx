import { useState } from 'react';
import { FaChevronCircleDown } from 'react-icons/fa';
import { Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react';

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
    const [showGenres, setShowGenres] = useState(null);

    return (
        <div className="text-center p-2">
            <h2 className="text-xl text-white p-2">Want to select a genre?</h2>
            <div className="p-2">
                <Button
                    variant="custom"
                    colorScheme="brand"
                    onClick={e => setShowGenres(true)}
                    className="m-1"
                >
                    Yes
                </Button>
                <Button
                    variant="custom"
                    colorScheme="brand"
                    onClick={e => {
                        setShowGenres(false);
                        genreChanger(null);
                        idChanger(null);
                    }}
                    className="m-1"
                >
                    No
                </Button>
            </div>

            {showGenres && (
                <Menu>
                    <MenuButton
                        as={Button}
                        rightIcon={<FaChevronCircleDown />}
                        colorScheme="brand"
                    >
                        Select Genre
                    </MenuButton>
                    <MenuList>
                        {genres.map(genre => (
                            <MenuItem
                                key={genre.genre}
                                onClick={() => {
                                    genreChanger(genre.genre);
                                    idChanger(genre.id);
                                }}
                            >
                                {genre.genre}
                            </MenuItem>
                        ))}
                    </MenuList>
                </Menu>
            )}
        </div>
    );
};
export default SelectGenre;
