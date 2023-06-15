import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './DetailsPage.css'

function DetailsPage() {

    const pokemonType = [
        'normal',
        'fire',
        'water',
        'electric',
        'grass',
        'ice',
        'fighting',
        'poison',
        'ground',
        'flying',
        'psychic',
        'bug',
        'rock',
        'ghost',
        'dragon',
        'dark',
        'steel',
        'fairy',
    ];
    const typeColor = [
        '#AAAA99',
        '#FF4422',
        '#3399FF',
        '#FFCC33',
        '#77CC55',
        '#66CCFF',
        '#BB5544',
        '#AA5599',
        '#DDBB55',
        '#8899FF',
        '#FF5599',
        '#AABB22',
        '#BBAA66',
        '#6666BB',
        '#7766EE',
        '#775544',
        '#AAAABB',
        '#EE99EE',
    ];

    const navigate = useNavigate();
    const { id } = useParams();
    const [pokemonDetails, setPokemonDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [isBookmarked, setIsBookmarked] = useState(false);

    useEffect(() => {
        const fetchPokemonDetails = async () => {
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
                setPokemonDetails(response.data);
                setIsLoading(false);
            } catch (error) {
                setError('Error occurred while fetching data. Please try again.');
                setIsLoading(false);
            }
        };

        fetchPokemonDetails();
    }, [id]);

    const handleBookmark = () => {
        const bookmarkedPokemon = JSON.parse(localStorage.getItem('bookmarkedPokemon')) || [];
        const isBookmarked = bookmarkedPokemon.some((pokemon) => pokemon.id === pokemonDetails.id);

        if (isBookmarked) {
            // Remove bookmark
            const updatedBookmarks = bookmarkedPokemon.filter((pokemon) => pokemon.id !== pokemonDetails.id);
            localStorage.setItem('bookmarkedPokemon', JSON.stringify(updatedBookmarks));
            setIsBookmarked(false);
        } else {
            // Add bookmark
            bookmarkedPokemon.push({
                id: pokemonDetails.id,
                name: pokemonDetails.name,
                image: pokemonDetails['sprites']['other']['official-artwork']['front_default'],
            });
            localStorage.setItem('bookmarkedPokemon', JSON.stringify(bookmarkedPokemon));
            setIsBookmarked(true);
        }
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h1>Pokemon Details</h1>
            <div>
                <img src={pokemonDetails['sprites']['other']['official-artwork']['front_default']} alt={pokemonDetails.name} />
                <div className='poke-details'>
                    <p className='poke-name'>{pokemonDetails.name}</p>
                    {pokemonDetails.types && pokemonDetails.types.length > 0 ? (<input type='button' value={pokemonDetails.types[0].type.name} className='poke-type' style={{ background: typeColor[pokemonType.indexOf(pokemonDetails.types[0].type.name)], }} disabled />) : null}
                    {pokemonDetails.types && pokemonDetails.types.length > 1 ? (<input type='button' value={pokemonDetails.types[1].type.name} className='poke-type' style={{ background: typeColor[pokemonType.indexOf(pokemonDetails.types[1].type.name)], }} disabled />) : null}
                </div>
                <button
                    onClick={handleBookmark}
                    style={{ backgroundColor: isBookmarked ? 'red' : 'transparent' }}
                >
                    ❤️
                </button>
            </div>
        </div>
    );
}

export default DetailsPage;
