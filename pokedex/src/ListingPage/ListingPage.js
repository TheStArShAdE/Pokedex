import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ListingPage.css';

function ListingPage() {
    const [pokemonList, setPokemonList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

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

    let index = 0;

    useEffect(() => {
        fetchPokemonList();
    }, []);
    
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const fetchPokemonList = async () => {
        setIsLoading(true);
        const fetchedEntries = [];
        let i;
        const start = pokemonList.length + 1;
        const end = start + 9;
        for (i = start; i <= end; i++) {
            try {
                const response = await axios.get(
                    `https://pokeapi.co/api/v2/pokemon/${i + index}`
                );
                const data = await response.data;
                fetchedEntries.push(data);
            } catch (error) {
                console.log(error);
            }
        }
        index += i - start;
        setPokemonList(prevList => [...prevList, ...fetchedEntries]);
        setIsLoading(false);
    };

    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight
        )
            fetchPokemonList();
    };


    const newShade = (hexColor, magnitude) => {
        hexColor = hexColor.replace(`#`, ``);
        if (hexColor.length === 6) {
            const decimalColor = parseInt(hexColor, 16);
            let r = (decimalColor >> 16) + magnitude;
            r > 255 && (r = 255);
            r < 0 && (r = 0);
            let g = (decimalColor & 0x0000ff) + magnitude;
            g > 255 && (g = 255);
            g < 0 && (g = 0);
            let b = ((decimalColor >> 8) & 0x00ff) + magnitude;
            b > 255 && (b = 255);
            b < 0 && (b = 0);
            return `#${(g | (b << 8) | (r << 16)).toString(16)}`;
        } else {
            return hexColor;
        }
    };

    const handleButtonClick = (id) => {
        navigate(`/Details/${id}`);
    };

    return (
        <div className='body'>
            <ul className='pokemon-all'>
                {pokemonList.map((pokemon) => (
                    <li key={pokemon.id} className='poke-list' style={{ display: 'flex' }}>
                        <button className='card' style={{ background: newShade(typeColor[pokemonType.indexOf(pokemon.types[0].type.name)], 40), }} onClick={() => handleButtonClick(pokemon.id)} >
                            <div className='poke-details'>
                                <p className='poke-name'>{pokemon.name}</p>
                                {pokemon.types && pokemon.types.length > 0 ? (<input type='button' value={pokemon.types[0].type.name} className='poke-type' style={{ background: typeColor[pokemonType.indexOf(pokemon.types[0].type.name)], }} disabled />) : null}
                                {pokemon.types && pokemon.types.length > 1 ? (<input type='button' value={pokemon.types[1].type.name} className='poke-type' style={{ background: typeColor[pokemonType.indexOf(pokemon.types[1].type.name)], }} disabled />) : null}
                            </div>
                            <img src={pokemon.sprites.other['official-artwork'].front_default} alt='Pokemon_Image' className='poke-img' />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ListingPage;
