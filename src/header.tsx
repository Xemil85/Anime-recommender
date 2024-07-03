import React from "react";
import styled from "styled-components";

interface HeaderProps {
  title: string
}

const Title = styled.h1`
    font-size: 2.5em;
    color: #333;
    margin-bottom: 20px;
`;

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header>
      <Title>{title}</Title>
    </header>
  );
};

export default Header