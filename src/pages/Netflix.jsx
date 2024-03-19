import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import backgroundImage from '../assets/berlin1.jpg';
import MovieLogo from "../assets/berlin2.png";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, getGenres } from '../store';
import Slider from '../components/Slider';

export default function Netflix() {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const genresLoaded = useSelector((state)=>state.netflix.genresLoaded); 
  const movies = useSelector((state)=>state.netflix.movies);
  const dispatch = useDispatch();

  useEffect(()=>{
      dispatch(getGenres());
  },[]);

  useEffect(()=>{
    if(genresLoaded) dispatch(fetchMovies({type:"all"}));
  },[genresLoaded]);

  useEffect(() => {
    window.onscroll = () => {
      setIsScrolled(window.pageYOffset === 0 ? false : true);
    };
    return () => {
      window.onscroll = null;
    };
  }, []);

  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className="hero">
        <img src={backgroundImage} alt="background" className='background-image' />
        <div className="container">
          <div className="logo">
            <img src={MovieLogo} alt="Movie-logo" />
          </div>
          <div className="buttons flex">
            <button className='play-button' onClick={()=>navigate('/Player')}>
              <FaPlay /> Play
            </button>
            <button className='info-button'>
              <AiOutlineInfoCircle /> More Info
            </button>
          </div>
        </div>
      </div>
      <Slider movies={movies}/>
    </Container>
  );
}

const Container = styled.div`
  background-color:black;
  .hero{
    position:relative;
    .background-image{
      filter:brightness(60%);
      height:100vh;
      width:100vw;
    }
    .container{
      position:absolute;
      bottom:5rem;
      .logo{
        img{
          width:70%;
          height:70%;
          margin-left:5rem;
        }
      }
      .buttons{
        margin:5rem;
        gap:2rem;
        button{
          font-size:1.4rem;
          gap:1rem;
          border-radius:0.2rem;
          padding:0.5rem;
          padding-left:2rem;
          padding-right:2.4rem;
          border:none;
          cursor:pointer;
          transition:0.3s ease-in-out;
          &:hover{
            opacity:0.8;
          }
        }
        .play-button{
          background-color:#e50914;
          color:white;
          svg{
            font-size:1rem;
          }
        }
        .info-button{
          background-color:rgba(109,109,110,0.7);
          color:white;
          svg{
            font-size:1.5rem;
          }
        }
      }
    }
  }
`;
