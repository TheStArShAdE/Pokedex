import React, { useEffect, useState } from 'react';
import './ListingPage.css';

function ListingPageGen2() {
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pageIndex, setPageIndex] = useState(1);

    const pokemonType = ['normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'];
    const typeColor = ['#AAAA99', '#FF4422', '#3399FF', '#FFCC33', '#77CC55', '#66CCFF', '#BB5544', '#AA5599', '#DDBB55', '#8899FF', '#FF5599', '#AABB22', '#BBAA66', '#6666BB', '#7766EE', '#775544', '#AAAABB', '#EE99EE'];

    var index = 151;

    useEffect(() => {
        fetchEntries();
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const fetchEntries = async () => {
        if (index < 252) {
            setLoading(true);
            // Simulating an API call to fetch entries with the index parameter
            const fetchedEntries = [];
            let i;
            for (i = 1; i <= 10; i++) {
                try {
                    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i + index}`);
                    const data = await response.json();
                    fetchedEntries.push(data);
                    setLoading(false);
                    setPageIndex(prevIndex => prevIndex + 1);
                } catch (error) {
                    console.log(error);
                }
            }
            index += i-1;
            setEntries(prevEntries => [...prevEntries, ...fetchedEntries]);
            setLoading(false);
        }
    };

    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight
        ) {
            // Scroll reached the bottom
            fetchEntries();
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

    return (
        <div>
            {entries.length > 0 ? (
                <ul className='pokemon-all'>
                    {entries.map(entry => (
                        entry.id < 252 ?
                            <li key={entry.id} className='poke-list' style={{ display: 'flex' }}>
                                <div className='card' style={{ background: (newShade((typeColor[pokemonType.indexOf(entry.types[0].type.name)]), 40)) }}>
                                    <img src={entry['sprites']['other']['official-artwork']['front_default']} alt='Pokemon_Image' className='poke-img' />
                                    <div className='poke-details'>
                                        <p className='poke-name'>{entry.name}</p>
                                        <input type='button' value={entry.types[0].type.name} className='poke-type' style={{ background: (typeColor[pokemonType.indexOf(entry.types[0].type.name)]) }} disabled />
                                        {entry.types.length > 1 ? <input type='button' value={entry.types[1].type.name} className='poke-type' style={{ background: (typeColor[pokemonType.indexOf(entry.types[1].type.name)]) }} disabled /> : <></>}
                                    </div>
                                </div>
                            </li> : <p>You have Reached the end of this generation.</p>
                    ))}
                </ul>
            ) : (
                <p>No entries available.</p>
            )}
            {loading && <p>Loading...</p>}
        </div>
    );
}

export default ListingPageGen2;
