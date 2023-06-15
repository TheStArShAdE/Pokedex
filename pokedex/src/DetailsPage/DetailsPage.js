import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './DetailsPage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

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

    const newShade = (type) => {
        const pokeTypes = ['normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'];
        const color = ['silver', 'salmon', 'lightskyblue', 'khaki', 'mediumaquamarine', 'lightblue', 'indianred', 'plum', 'darkkhaki', 'lightsteelblue', 'palevioletred', 'greenyellow', 'tan', 'mediumpurple', 'slateblue', 'peru', 'lavender', 'pink'];
        return color[pokeTypes.indexOf(type)];
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <div id='body-details' style={{ background: newShade(pokemonDetails.types[0].type.name), }}>
                <button id='back-btn'><FontAwesomeIcon icon={faArrowLeft} style={{ color: "#ffffff", }} /></button>
                <button onClick={handleBookmark} id='bookmark' >
                    {isBookmarked ? <FontAwesomeIcon icon={faHeart} style={{ color: "#ffffff", }} /> : <FontAwesomeIcon icon={faHeartSolid} style={{ color: "#f12c09", }} />}
                </button>
                <div id='details-nameTypeIdImg'>
                    <div id='details-nameTypeId'>
                        <div id='details-nameType'>
                            <h1 id='details-name'>{pokemonDetails.name}</h1>
                            <div id='details-type'>
                                {pokemonDetails.types && pokemonDetails.types.length > 0 ? (<input type='button' value={pokemonDetails.types[0].type.name} className='poke-type' style={{ background: typeColor[pokemonType.indexOf(pokemonDetails.types[0].type.name)], }} disabled />) : null}
                                {pokemonDetails.types && pokemonDetails.types.length > 1 ? (<input type='button' value={pokemonDetails.types[1].type.name} className='poke-type' style={{ background: typeColor[pokemonType.indexOf(pokemonDetails.types[1].type.name)], }} disabled />) : null}
                            </div>
                        </div>
                        <p id='details-id'>{pokemonDetails.id < 10 ? '#00' + pokemonDetails.id : pokemonDetails.id < 100 ? '#0' + pokemonDetails.id : '#' + pokemonDetails.id}</p>
                    </div>
                    <img id='details-img' src={pokemonDetails['sprites']['other']['official-artwork']['front_default']} alt={pokemonDetails.name} />
                </div>
            </div>
            <div id='details-detail'>
                <ul id='detail-list'>
                    <li>About</li>
                    <li>Base Stats</li>
                    <li>Evolution</li>
                    <li>Moves</li>
                </ul>
            </div>
        </div>
    );
}

export default DetailsPage;
