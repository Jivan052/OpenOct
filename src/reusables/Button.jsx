import React from 'react';
import styled from 'styled-components';

const Button = ({ children, ...props }) => {
  return (
    <StyledButton {...props}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  position: relative;
  transition: all 0.3s ease-in-out;
  padding: 0.5rem 1.25rem;
  background-color: rgb(37, 112, 162);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  gap: 10px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  outline: none;
  overflow: hidden;
  font-size: 15px;
  cursor: pointer;

  .icon {
    width: 24px;
    height: 24px;
    transition: all 0.3s ease-in-out;
  }

  &:hover {
    transform: scale(1.05);
    border-color: #fff9;
  }

  &:hover .icon {
    transform: translate(4px);
  }

  &:hover::before {
    animation: shine 1.5s ease-out infinite;
  }

  &::before {
    content: "";
    position: absolute;
    width: 100px;
    height: 100%;
    background-image: linear-gradient(
      120deg,
      rgba(255, 255, 255, 0) 30%,
      rgba(255, 255, 255, 0.8),
      rgba(255, 255, 255, 0) 70%
    );
    top: 0;
    left: -100px;
    opacity: 0.6;
  }

  @keyframes shine {
    0% {
      left: -100px;
    }
    60% {
      left: 100%;
    }
    100% {
      left: 100%;
    }
  }
`;

export default Button;