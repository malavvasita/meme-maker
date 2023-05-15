import React from "react";

const Header = () => {
    return(
        <header className="meme-maker-header">
            <div className="row">
                <a href="/">
                    <h1 className="header--logo text-4xl text-gray-900 font-bold">Meme Maker</h1>
                </a>
            </div>
        </header>
    );
};

export default Header;