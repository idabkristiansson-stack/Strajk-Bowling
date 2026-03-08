import {useState} from "react";

const movies = [
    {id: 1, title: 'The Matrix'},
    {id: 2, title: 'Inception'},
    {id: 3, title: 'Interstellar'}
];

function Favorites() {
    const [favorites, setFavorites] = useState([]);

function toggleFavorite(movie) {
    const exists = favorites.find((f) => f.id === movie.id)
    if (exists) {
        setFavorites(favorites.filter((f) => f.id !== movie.id))
    } else {
        setFavorites([...favorites, movie])
    }
}

function isFavorite(id) {
    return favorites.some((f) => f.id === id)
}

        return (
            <section>
                <h2>Favorites</h2>
                <ul>
                    {movies.map((movie) => {
                       return <li key={movie.id}>{movie.title}
                       <button onClick={() => toggleFavorite(movie)}>
                           {isFavorite(movie.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                       </button>
                       </li>
                    })}
                </ul>

                <p>You have {favorites.length} favorite movies.</p>

                {favorites.length > 0 && (
                    <>
                    <p>My favorites movies</p>
                    <ul>
                        {favorites.map((favorite) => {
                            return <li key={favorite.id}>{favorite.title}</li>
                        })}
                    </ul>
                    </>
                )}
    </section>
    ) 
}

export default Favorites