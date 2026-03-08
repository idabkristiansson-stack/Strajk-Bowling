import {NavLink, Outlet} from 'react-router-dom';

function Layout() {
    return (
        <div>
            <header>
            <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/booking">Booking</NavLink>
            </nav>
           </header>

              <main>
                <Outlet />
                </main>
        </div>
    )
}

export default Layout;