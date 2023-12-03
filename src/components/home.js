import React from 'react';
import Card from './context';
// import { Link } from 'react-router-dom';
import '../App.css';

export function Home({ isLoggedIn, onLogout }) {
  return (
    <Card
      bgcolor="warning"
      txtcolor="black"
      header="Home"
      title="Welcome To The Bad Bank"
      text="Don't Forget To Triple Check Your Transaction!"
      body={(
        <div style={{ Width: "30px", margin: "auto" }}>
          <img src="./badbankimage.jpg" className="img-fluid" alt="Responsive image" width="700px" height="500px" />
          <br />
          {/* <div className="btn-group" role="group" aria-label="Basic Example">
            {isLoggedIn ?
              (<button type="button" className="btn btn-dark" width="100px" height="50px" align="right" onClick={onLogout}>Logout</button>) :
              (<button type="button" className="btn btn-light" width="100px" height="50px" align="left">
                <Link className="nav-link" to="/login/">
                  Login
                </Link>
              </button>)
            }
          </div> */}

        </div>
      )}
    />
  );
}