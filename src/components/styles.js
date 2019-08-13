import styled, { keyframes } from 'styled-components';

const bounce = keyframes`
  0% {
    transform: translateY(-45px);
  }
  4% {
    opacity: 1;
  }
  5% {
    transform: translateY(0px);
  }
  10% {
    transform: translateY(-24px);
  }
  12% {
    transform: translateY(0px);
  }
  14% {
    transform: translateY(-12px);
  }
  15% {
    transform: translateY(0px);
  }
  17% {
    transform: translateY(-6px);
  }
  19% {
    transform: translateY(0px);
  }
  27% {
    transform: translateY(-4px);
  }
  20% {
    transform: translateY(0px);
    opacity: 1;
  }
  100% {
    transform: translateY(0px);
    opacity: 1;
  }
`

export const LoadingBox = styled.div`
  transform: translateY(50%) translateX(50);
`

export const LoadingText = styled.h2`
  animation: ${bounce} 5s infinite;
  background: black;
  color: white;
  padding: 1rem;
  border-radius: 20px;
  width: 10rem;
  text-align: center;
`
