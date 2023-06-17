import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ListingPage.css';

function ListingPageGen4() {
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
            const pokemonId = i + index + 386;
            if (pokemonId > 493) {
                break;
            }
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
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

    const newShade = (type) => {
        const pokeTypes = ['normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'];
        const color = ['silver', 'salmon', 'lightskyblue', 'khaki', 'mediumaquamarine', 'lightblue', 'indianred', 'plum', 'darkkhaki', 'lightsteelblue', 'palevioletred', 'greenyellow', 'tan', 'mediumpurple', 'slateblue', 'peru', 'lavender', 'pink'];
        return color[pokeTypes.indexOf(type)];
    };

    const handleButtonClick = (id) => {
        navigate(`/Details/${id}`);
    };

    return (
        <div className='body'>
            <h1>Pokemon List</h1>
            <ul className='pokemon-all'>
                {pokemonList.map((pokemon) => (
                    <li key={pokemon.id} className='poke-list' style={{ display: 'flex' }}>
                        <button className='card' style={{ background: newShade(pokemon.types[0].type.name) }} onClick={() => handleButtonClick(pokemon.id)} >
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

export default ListingPageGen4;
