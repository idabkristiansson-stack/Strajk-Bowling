import { Link } from 'react-router-dom';

function Error() {
    return (
        <section>
            <h1>404 - Page Not Found</h1>
            <Link to="/">Go back to Home page</Link>
        </section>
    )
}

export default Error;