import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchMovies, getGenres } from '../store/index';
import { firebaseAuth } from '../utils/firebase-config';
import styled from 'styled-components';
import { onAuthStateChanged } from 'firebase/auth';
import Navbar from '../components/Navbar';
import Slider from '../components/Slider';
import NotAvailable from '../components/NotAvailable';
import SelectGenres from '../components/SelectGenres';

export default function Movies() {
  const [isScrolled, setIsScrolled] = useState(false);

  const navigate = useNavigate();

  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
  const movies = useSelector((state) => state.netflix.movies);
  const genres = useSelector((state) => state.netflix.genres);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (genresLoaded) dispatch(fetchMovies({ type: "movies" }));
  }, [genresLoaded]);

  const handleScroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) {
      // Handle authenticated user
      // Example: navigate("/");
    } else {
      // Handle unauthenticated user
    }
  });

  return (
    <Container>
      <div className="navbar">
        <Navbar isScrolled={isScrolled}/>
      </div>
      <div className="data">
        <SelectGenres genres={genres} type="movie"/>
        {movies.length ? <Slider movies={movies}/> : <NotAvailable />}
      </div>
    </Container>
  );
}

const Container = styled.div`
  .data {
    margin-top: 8rem;
    .not-available {
      text-align: center;
      color: white;
      margin-top: 4rem;
    }
  }
`;
