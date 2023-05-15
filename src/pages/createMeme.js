import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { BsArrowLeftShort } from 'react-icons/bs';

import * as Constants from '../Constants';

const Create = () => {

    const location = useLocation();
    const memeData = location.state;
    const [buttonText, setButtonText] = useState("Generate Meme");
    const [downloadMemeBtn, setDownloadLink] = useState("");
    const buttonClasses = "flex bg-teal-500 w-full text-xl cursor-pointer hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-3 px-3 rounded";

    const Inputs = [];
    for (let i = 0; i < memeData.box_count; i++) {
        Inputs.push(
            <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                    Text {i+1}
                </label>
                <input onChange={(e) => handle(e)} id={`text${i}`} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder={`Put Text ${i+1} Here`} />
            </div>
        )
    }

    useEffect( () => {
        document.title = memeData.name + "| Create Your own Meme | Meme Maker";
    });

    const CaptionImageUrl = Constants.captionImage;
    const [MemeTexts, setData] = useState([]);

    async function CreateMeme(e){

        e.preventDefault();

        setButtonText( "Loading..." );

        var GenerateMemePostBody = {
            template_id: memeData.id,
            username: Constants.ImageflipUsername,
            password: Constants.ImageflipPassword,
        };

        Object.entries(MemeTexts).map(([key, value]) => (
            GenerateMemePostBody[key]= value
        ));

        var formBody = [];

        for (var property in GenerateMemePostBody) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(GenerateMemePostBody[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        let res = await fetch( CaptionImageUrl, {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: formBody,
        });
        let resJson = await res.json();
        
        if( resJson.success === true ){
            setButtonText( "Done!" );
            setDownloadLink(
                <Link to={resJson.data.url} target='_blank' download>
                    <button type="button" className={buttonClasses}>
                        Click to Download
                    </button>
                </Link>
            );
        }else{
            setButtonText( "Something went wrong! Try again." );
        }
    
    }

    function handle(e){
        const InputText = {...MemeTexts}
        InputText[e.target.id] = e.target.value
        setData( InputText );
    }

    return(
        <div className="meme-maker-body pt-5 pb-5 max-w-5xl m-0 m-auto">
            <h3 className='uppercase text-3xl font-bold p-5 m-5 ml-0 pl-0'>Create Your Own Meme</h3>
            <div className="flex meme-maker-back-btn p-2">
                <Link to={'/'} className='font-bold text-sky-700'><BsArrowLeftShort className='inline text-2xl'/>
                    <span className='ml-2'>Back</span>
                </Link>
            </div>
            <div className='place-content-center grid grid-cols-2 gap-4'>
                <div className='meme-template'>
                    <img src={memeData.url} alt={memeData.name} className='outline outline-2' />
                </div>
                <div className='meme-maker-form'>
                    <form onSubmit={ (e) => CreateMeme(e)} className="w-full max-w-lg">
                        <h3 className='font-bold text-xl'>Your Content, Your Meme</h3>
                        <p className='pb-5'>Put your content here</p>
                        <div className="flex flex-wrap -mx-3 mb-12">
                            { Inputs }
                            <div className="flex flex-col items-center justify-center w-full px-3 pt-5">
                                { downloadMemeBtn ? downloadMemeBtn : <input className={buttonClasses} id="generate-meme-btn" type="submit" value={ buttonText } /> }
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Create;