import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import './SearchPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const SearchPage = () => {

    const [query, setQuery] = useState('');
    const [data, setData] = useState({});
    const [imgSource, setImgSource] = useState(``);

    const handleInputChange = (event) => {
        setQuery(event.target.value)
    };

    useEffect(() => {}, [query]);

    const handleSearch = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`);
            setData(await response.json());
            const id = data.id;
            setImgSource(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`);
            console.log(data);
        } catch (error) {
            console.error(error);
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
                <div className='card'>
                    <img src={imgSource} alt='Pokemon_Image' className='poke-img' />
                    <div className='poke-details'>
                        <p className='poke-name'>{data.name}</p>
                        <input type='button' value={data.types[0].type.name} disabled />
                        {data.types.length > 1 ? <input type='button' value={data.types[1].type.name} disabled /> : <></>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchPage;