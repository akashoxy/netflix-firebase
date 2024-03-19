import React from 'react';
import styled from 'styled-components';
import { BsArrowLeft } from "react-icons/bs";
import video from "../assets/stranger.mp4";
import { useNavigate } from 'react-router-dom';

export default function Player() {
  const navigate = useNavigate();

  return (
    <Container>
      <div className="player">
        <div className="back" onClick={() => navigate(-1)}>
          <BsArrowLeft />
        </div>
        <video src={video} autoPlay loop controls muted></video>
      </div>
    </Container>
  );
}

const Container = styled.div`
  .player {
    width: 100vw;
    height: 100vh;
    position: relative;

    .back {
      position: absolute;
      padding: 2rem;
      z-index: 1;
      top: 0;
      left: 0;
      svg {
        font-size: 3rem;
        cursor: pointer;
      }
    }

    video {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
`;
