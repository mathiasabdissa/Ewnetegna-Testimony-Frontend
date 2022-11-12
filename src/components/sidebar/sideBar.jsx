import axios from 'axios';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import './sideBar.css';


export default function SideBar() {
    const [cats, setCats] = useState([]);
    const [hashtags, setHashtags] = useState([]);

    useEffect(() => {
        const getCats = async () => {
            const res = await axios.get("/categories");
            setCats(res.data);
        };
        const getHashtags = async () => {
            const res = await axios.get("/hashtag");

            setHashtags(res.data);
        }
        getCats();
        getHashtags();
    }, []);

    return (
        <div className="sidebar">
            <div className='sidebarItem'>
                <span className='sidebarTitle'>ABOUT ME</span>
                <img src="https://images.pexels.com/photos/6711867/pexels-photo-6711867.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt='' />
                <p>
                    Laboris sunt aute cupidatat velit magna velit ullamco dolore mollit
                    amet ex esse.Sunt eu ut nostrud id quis proident.
                </p>
            </div>
            <div className='sidebarItem'>
                <span className='sidebarTitle'>CATEGORIES</span>
                <ul className="sidebarList">

                    {cats.map((c) => (
                        <Link to={`/?cat=${c.name}`} className="link">
                            <li className="sidebarListItem">{c.name}</li>
                        </Link>
                    ))}


                </ul>
            </div>
            <div className='sidebarItem'>
                <span className='sidebarTitle'>HASH TAGS</span>
                <ul className="sidebarList">

                    {hashtags.map((c) => (
                        <Link to={`/?hash=${c.name}`} className="link">
                            <li className="sidebarListItem">{c.name}</li>
                        </Link>
                    ))}


                </ul>
            </div>
            <div className='sidebarItem'>
                <span className='sidebarTitle'>Follow us</span>
            </div>
            <div className='sidebarSocial'>
                <i className="sidebarIcon fab fa-facebook-square"></i>
                <i className="sidebarIcon fab fa-instagram-square"></i>
                <i className="sidebarIcon fab fa-pinterest-square"></i>
                <i className="sidebarIcon fab fa-twitter-square"></i>
            </div>
        </div>
    )
}
