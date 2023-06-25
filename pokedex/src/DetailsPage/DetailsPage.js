import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './DetailsPage.css'

function DetailsPage() {

    const pokemonType = ['normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'];
    const typeColor = ['#AAAA99', '#FF4422', '#3399FF', '#FFCC33', '#77CC55', '#66CCFF', '#BB5544', '#AA5599', '#DDBB55', '#8899FF', '#FF5599', '#AABB22', '#BBAA66', '#6666BB', '#7766EE', '#775544', '#AAAABB', '#EE99EE'];

    const { id } = useParams();
    const [pokemonDetails, setPokemonDetails] = useState(null);
    const [pokemonSpecies, setPokemonSpecies] = useState(null);
    const [moves, setMoves] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [activeTab, setActiveTab] = useState('about');

    useEffect(() => {
        const fetchPokemonDetails = async () => {
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
                setPokemonDetails(response.data);
                setIsLoading(false);
            } catch (error) {
                setError(error);
                setIsLoading(false);
            }
        };

        fetchPokemonDetails();

        const fetchPokemonSpecies = async () => {
            try {
                const response2 = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
                setPokemonSpecies(await response2.data);
            } catch (error) {
                console.error('Species' + error);
            }
        };

        fetchPokemonSpecies();

        const bookmarkedPokemon = JSON.parse(localStorage.getItem('bookmarkedPokemon')) || [];
        const isBookmarked = bookmarkedPokemon.some((pokemon) => pokemon.id === Number(id));
        setIsBookmarked(isBookmarked);
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

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };

    const handleSpecies = (url) => {
        const fetchSpecies = async () => {
            try {
                const response = await axios.get(url);
                setPokemonDetails(await response.data);
            } catch (error) {
                console.error('Species' + error);
            }
        };

        fetchSpecies();
    }

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
                    {isBookmarked ? <FontAwesomeIcon icon={faHeartSolid} style={{ color: "#f12c09", }} /> : <FontAwesomeIcon icon={faHeart} style={{ color: "#ffffff", }} />}
                </button>
                <div id='details-nameTypeIdImg'>
                    <div id='details-nameTypeId'>
                        <div id='details-nameType'>
                            <h1 id='details-name'>{pokemonDetails.name.split('-').reverse().join(' ')}</h1>
                            <div id='details-type'>
                                {pokemonDetails.types.map((types) => <button className='poke-type' style={{ background: typeColor[pokemonType.indexOf(types.type.name)], }} disabled>{types.type.name}</button>)}
                            </div>
                        </div>
                    </div>
                    <img id='details-img' src={pokemonDetails['sprites']['other']['official-artwork']['front_default']} alt={pokemonDetails.name} />
                </div>
            </div>
            <div id='details-detail'>
                <div className='species'>{pokemonSpecies.varieties.length > 1 ? pokemonSpecies.varieties.map((species) => <button className='poke-variety' onClick={() => handleSpecies(species.pokemon.url)}>{species.pokemon.name.split('-').reverse().join(' ')}</button>) : null}</div>
                <ul id='detail-list'>
                    <li onClick={() => handleTabClick('about')} className={activeTab === 'about' ? 'active' : ''} style={activeTab === 'about' ? { color: 'black' } : {}} > About </li>
                    <li onClick={() => handleTabClick('baseStats')} className={activeTab === 'baseStats' ? 'active' : ''} style={activeTab === 'baseStats' ? { color: 'black' } : {}} > Base Stats </li>
                    <li onClick={() => handleTabClick('evolution')} className={activeTab === 'evolution' ? 'active' : ''} style={activeTab === 'evolution' ? { color: 'black' } : {}} > Evolution </li>
                    <li onClick={() => handleTabClick('moves')} className={activeTab === 'moves' ? 'active' : ''} style={activeTab === 'moves' ? { color: 'black' } : {}} > Moves </li>
                </ul>
                {activeTab === 'about' && <div className='content'>
                    <p>Id : {pokemonDetails.id < 10 ? '#00' + pokemonDetails.id : pokemonDetails.id < 100 ? '#0' + pokemonDetails.id : '#' + pokemonDetails.id}</p>
                    <p>Species : {pokemonSpecies.genera.filter(genus => genus.language.name === 'en').map(genus => genus.genus)}</p>
                    <p>Weight : {pokemonDetails.weight / 10} kg</p>
                    <p>Height : {pokemonDetails.height / 10} m</p>
                    <p>Abilities : {pokemonDetails.abilities.map((abilities) => (
                        <p key={abilities.ability.name} style={{ marginLeft: '80px' }}>{abilities.ability.name} <span style={{ color: 'gray' }}>{abilities.is_hidden ? '(hidden)' : ''}</span></p>
                    ))}</p>
                </div>}
                {activeTab === 'baseStats' && <div className='content-stats'>
                    <div className='stats-name'>
                        <p>HP</p>
                        <p>Attack</p>
                        <p>Defense</p>
                        <p>Sp. Attack</p>
                        <p>Sp. Defense</p>
                        <p>Speed</p>
                    </div>
                    <div className='stats'>
                        {pokemonDetails.stats.map((stats) => (
                            <p>{stats.base_stat}</p>
                        ))}
                    </div>
                    <div className='bar'>
                        {pokemonDetails.stats.map((stats) => (
                            <p style={{ height: '10px', width: stats.base_stat + 'mm', background: stats.base_stat <= 60 ? '#FF7F0F' : stats.base_stat <= 90 ? '#FFDD57' : stats.base_stat <= 120 ? '#A0E515' : stats.base_stat <= 150 ? '#23CD5E' : '#00C2B8' }}></p>
                        ))}
                    </div>
                </div>}
                {activeTab === 'evolution' && <div className='content'>Not Added yet</div>}
                {activeTab === 'moves' && <div className='content'>
                    <h2>Moves</h2>
                    <div className='moves'>
                        <div>
                            <h3>Name</h3>
                            {pokemonDetails.moves.map((moves) =>
                                <p>{moves.move.name.replace('-', ' ')}</p>
                            )}
                        </div>
                        <div>
                            <h3>Learned By</h3>
                            {pokemonDetails.moves.map((moves) => <p>{moves.version_group_details[0].move_learn_method.name === 'level-up' ? 'lvl ' + moves.version_group_details[0].level_learned_at : moves.version_group_details[0].move_learn_method.name}</p>
                            )}
                        </div>
                    </div>
                </div>}
            </div>
        </div>
    );
}


export default DetailsPage;
