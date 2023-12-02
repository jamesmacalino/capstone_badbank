import { Link, useLocation } from "react-router-dom";

export function NavBar({ user, isLoggedIn, signOut }) {
  const location = useLocation();
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-warning">
        <a className="navbar-brand" href="#">BadBank</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/CreateAccount/' ? 'active' : ''}`} to="/CreateAccount/">Create Account</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/balance/' ? 'active' : ''}`} to="/balance/">Account Balance</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/deposit/' ? 'active' : ''}`} to="/deposit/">Deposit</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/withdraw' ? 'active' : ''}`} to="/withdraw/">Withdraw</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/alldata/' ? 'active' : ''}`} to="/alldata/">AllData</Link>
            </li>
            <div className="text-light"> <p className="nav-link px-3 m-0">{user.name}</p></div>
            <div className="nav navbar-nav navbar-right">
              {!isLoggedIn ? (
                <Link className={`btn btn-warning navbar-btn ${location.pathname === "/login" ? "active" : ''}`} aria-current="page" to="/login" data-toggle="tooltip" title="Click here to login to your account.">Login</Link>
              ) : (
                <button type="button" className="btn btn-warning navbar-btn" onClick={() => signOut()}>Log Out</button>)
              }</div>
          </ul>
        </div>
      </nav>
    </>
  );
}