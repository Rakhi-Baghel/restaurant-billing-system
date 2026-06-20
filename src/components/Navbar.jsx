import { Link } from "react-router-dom";

function Navbar({ shop }) {

  return (

    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">

        <span className="navbar-brand d-flex align-items-center gap-2">

          <img
          src="https://cdn-icons-png.flaticon.com/512/1046/1046784.png"
          width="35"
          />

          {shop.name}

          </span>

        <ul className="navbar-nav d-flex flex-row gap-3">

          <li className="nav-item">
            <Link className="nav-link text-white" to="/">Dashboard</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link text-white" to="/menu">Menu</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link text-white" to="/billing">Billing</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link text-white" to="/history">History</Link>
          </li>

        </ul>

      </div>
    </nav>

  );

}

export default Navbar;