import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchMovies, getGenres, getUserLikedMovies } from '../store/index';
import { firebaseAuth } from '../utils/firebase-config';
import styled from 'styled-components';
import { onAuthStateChanged } from 'firebase/auth';
import Navbar from '../components/Navbar';
import Card from '../components/Card';

export default function UserLiked() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState(undefined);
  const movies = useSelector((state) => state.netflix.movies);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (currentUser) {
          setEmail(currentUser.email);
        } else {
          navigate("/login");
        }
      });

      if (email) {
        await dispatch(getUserLikedMovies(email));
        setIsLoading(false);
      }
    };

    fetchData();
  }, [email, dispatch, navigate]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.pageYOffset === 0 ? false : true);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Container>
      <Navbar isScrolled={isScrolled}/>
      <div className="content flex column">
        <h1>My List</h1>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid flex">
            {movies.map((movie, index) => (
              <Card movieData={movie} index={index} key={movie.id} isLiked={true}/>
            ))}
          </div>
        )}
      </div>
    </Container>
  );
}

const Container = styled.div`
  .content {
    margin: 2.3rem;
    margin-top: 8rem;
    gap: 3rem;
    h1 {
      margin-left: 3rem;
    }
    .grid {
      flex-wrap: wrap;
      gap: 1rem;
    }
  }
`;
