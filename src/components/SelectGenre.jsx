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
        <div className="text-center p-2">
            <h2 className="text-xl p-2">Want to select a genre?</h2>
            <div className="p-2">
                <Button
                    bg={showGenres === true ? 'brand.600' : `brand.700`}
                    textColor={showGenres === true ? 'brand.700' : `brand.600`}
                    onClick={(e) => setShowGenres(true)}
                    className="m-2"
                >
                    Yes
                </Button>
                <Button
                    bg={showGenres === true ? 'brand.700' : `brand.600`}
                    textColor={showGenres === true ? 'brand.600' : `brand.700`}
                    onClick={(e) => {
                        setShowGenres(false);
                        genreChanger(null);
                        idChanger(null);
                    }}
                    className="m-2"
                >
                    No
                </Button>
            </div>

            {showGenres && (
                <Menu>
                    <MenuButton
                        as={Button}
                        rightIcon={<FaChevronCircleDown />}
                        bg="brand.700"
                        textColor="brand.600"
                        className="hover:text-black p-2"
                    >
                        Select Genre
                    </MenuButton>
                    <MenuList bg="brand.700">
                        {genres.map((genre) => (
                            <MenuItem
                                key={genre.genre}
                                onClick={() => {
                                    genreChanger(genre.genre);
                                    idChanger(genre.id);
                                }}
                                bg="brand.700"
                                // _hover={(bg = '#fff')}
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
