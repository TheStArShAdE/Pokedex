import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faCircleChevronDown } from '@fortawesome/free-solid-svg-icons';
import './Nav.css';

const Nav = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const isDetailsPage = location.pathname.includes('/Details');

    function w3_open() {
        document.getElementById("mySidebar").style.display = "block";
    }

    function w3_close() {
        document.getElementById("mySidebar").style.display = "none";
    }

    function myAccFunc() {
        var x = document.getElementById("demoAcc");
        if (x.className.indexOf("w3-show") === -1) {
            x.className += " w3-show";
            x.previousElementSibling.className += " w3-green";
        } else {
            x.className = x.className.replace(" w3-show", "");
            x.previousElementSibling.className =
                x.previousElementSibling.className.replace(" w3-green", "");
        }
    }

    if (isDetailsPage) {
        return null;
    }

    return (<div>
        <div className='w3-sidebar w3-bar-block' id="mySidebar">
            <button onClick={w3_close} className="w3-bar-item w3-button">
                <FontAwesomeIcon icon={faXmark} />
            </button>
            <button className="w3-bar-item w3-button" onClick={() => navigate("/")}>Home</button>
            <button className="w3-bar-item w3-button" onClick={() => navigate("/PokemonList")}>All Pokemons</button>
            <button className="w3-button w3-block w3-left-align" onClick={myAccFunc}>
                List By Generation <FontAwesomeIcon icon={faCircleChevronDown} />
            </button>
            <div className="w3-hide w3-white w3-card" id='demoAcc'>
                <button className="w3-bar-item w3-button" onClick={() => navigate("/ListGen1")}>Generation I</button>
                <button className="w3-bar-item w3-button" onClick={() => navigate("/ListGen2")}>Generation II</button>
                <button className="w3-bar-item w3-button" onClick={() => navigate("/ListGen3")}>Generation III</button>
                <button className="w3-bar-item w3-button" onClick={() => navigate("/ListGen4")}>Generation IV</button>
                <button className="w3-bar-item w3-button" onClick={() => navigate("/ListGen5")}>Generation V</button>
                <button className="w3-bar-item w3-button" onClick={() => navigate("/ListGen6")}>Generation VI</button>
                <button className="w3-bar-item w3-button" onClick={() => navigate("/ListGen7")}>Generation VII</button>
                <button className="w3-bar-item w3-button" onClick={() => navigate("/ListGen8")}>Generation VIII</button>
                <button className="w3-bar-item w3-button" onClick={() => navigate("/ListGen9")}>Generation IX</button>
            </div>
            <button className="w3-bar-item w3-button" onClick={() => navigate("/Bookmarks")}>Bookmarks</button>
        </div>
        <button onClick={w3_open} className="w3-button side-nav w3-right">
            <FontAwesomeIcon icon={faBars} />
        </button>
    </div>
    );
};

export default Nav;