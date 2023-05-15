import React, { useState, useEffect } from 'react';
import * as Constants from '../Constants.js';
import { Link } from 'react-router-dom';
import { BsArrowUpRight } from 'react-icons/bs';

const Memes = () => {

    const [memes, setMemes] = useState([]);

    useEffect(() => {

        document.title = "Create Your own Meme | Meme Maker | Home";

        // fetch data
        const getMemesTemplates = async () => {
            const response = await (
                await fetch(
                Constants.getMemesUrl
                )
            ).json();

            // set state when the data received
            setMemes(response.data.memes);
        };

        getMemesTemplates();
    }, []);

    return(
        <div className="meme-maker-body pt-5 pb-5 max-w-5xl m-0 m-auto">
            <div className="meme-templates grid grid-cols-4 gap-4 max-h-full">
                {memes.map(meme => (  
                    <Link 
                        to={ `/create` }
                        state={ meme }
                        >
                        <article className="overflow-hidden rounded-lg shadow-lg">
                            
                            <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                                <h3 className='font-bold'>{ meme.name }</h3>
                                <BsArrowUpRight />
                            </header>
                            <img alt={meme.name} className="block h-auto w-full" src={ meme.url } />

                        </article>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Memes;