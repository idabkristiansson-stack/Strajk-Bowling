import {useState} from 'react';

export default function LikeButton() {
    const [likes, setLikes] = useState(0);

function handleLike() {
    setLikes(likes + 1);
}
    return (

     <section>
        <h2>Like Button</h2>
        <p>Likes: {likes}</p>
        <button onClick={() => setLikes(likes + 1)}>Make a like!</button>
     </section>
    )

}
