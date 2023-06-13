import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import './SearchPage.css';

const SearchPage = () => {

    const [query, setQuery] = useState('');
    const [data, setData] = useState({});
    const [imgSource, setImgSource] = useState(``);
    const [isVisible, setVisible] = useState(false);

    const pokemonType = ['normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'];
    const typeColor = ['#AAAA99','#FF4422', '#3399FF', '#FFCC33', '#77CC55', '#66CCFF', '#BB5544', '#AA5599', '#DDBB55', '#8899FF', '#FF5599', '#AABB22', '#BBAA66', '#6666BB', '#7766EE', '#775544', '#AAAABB', 'EE99EE'];

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    useEffect(() => {}, [query]);

    const handleSearch = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`);
            setData(await response.json());
            setVisible(true);
            setImgSource( await data['sprites']['other']['official-artwork']['front_default']);
        } catch (error) {
            console.error(error);
        }
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

    return(
        <div className="search-pokemon">
            <div className="search-box">
                <p className="title"> Gotta Search 'Em All! </p>
                <form className="search-bar" onSubmit={handleSearch}>
                    <button className="search-button" type="submit"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                    <input className='search' type='text' onChange={handleInputChange} placeholder='Search Pokemon' required />
                    <button className='reset-button' type='reset'><FontAwesomeIcon icon={faXmark} /></button>
                </form>
            </div>
            <br /><br />
            <div className='searched-pokemon'>
                {isVisible ? <div className='card' style={{background: (newShade((typeColor[pokemonType.indexOf(data.types[0].type.name)]), 40))}}>
                    <img src={imgSource} alt='Pokemon_Image' className='poke-img' />
                    <div className='poke-details'>
                        <p className='poke-name'>{data.name}</p>
                        <input type='button' value={data.types[0].type.name} className='poke-type' style={{background: (typeColor[pokemonType.indexOf(data.types[0].type.name)])}} disabled />
                        {data.types.length > 1 ? <input type='button' value={data.types[1].type.name} className='poke-type' style={{background: (typeColor[pokemonType.indexOf(data.types[1].type.name)])}} disabled /> : <></>}
                    </div>
                </div> : <></>}
            </div>
        </div>
    );
};

export default SearchPage;