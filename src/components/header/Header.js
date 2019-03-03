import React from 'react';

import './Header.css';

class Header extends React.Component{
    render(){
        return(
            <div className="header alert alert-info" role="alert">
                Know about Crypto!
            </div>
        );
    }
}

export default Header;