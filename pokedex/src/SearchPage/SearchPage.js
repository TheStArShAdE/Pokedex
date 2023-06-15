import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import './SearchPage.css'

function SearchPage() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = async (event) => {
        event.preventDefault();
        if (!searchTerm) return;

        setIsLoading(true);
        setError('');

        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`);
            const pokemonData = await response.data;
            setIsLoading(false);
            navigate(`/Details/${pokemonData.id}`);
        } catch (error) {
            setError('Error occurred while fetching data. Please try again.');
            setIsLoading(false);
        }
    };

    return (
        <div className='search-pokemon'>
            <p className='title'> Gotta Search 'Em All! </p>
            <form className='search-bar' onSubmit={handleSearch}>
                <button className="search-button" type="submit"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className='search' placeholder="Enter Pokemon name" />
                <button className='reset-button' type='reset'><FontAwesomeIcon icon={faXmark} /></button>
            </form>
            {isLoading && <p>Loading...</p>}
            {error && <p>{error}</p>}
        </div>
    );
}

export default SearchPage;
