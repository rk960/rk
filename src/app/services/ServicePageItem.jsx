'use client';

import React, { useMemo } from 'react';
import styled, { keyframes, createGlobalStyle } from 'styled-components';
import { servicesData } from '../Components/myservices/apis';
import Link from 'next/link';


const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    color: #fff;
    font-family: 'Poppins', sans-serif;
    overflow-x: hidden;
    scroll-behavior: smooth;
  }
`;

const fadeInUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.div`
  padding: 4rem 2rem;
  overflow-x: hidden;
  width: 100vw;
  height: max-content;
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  animation: ${fadeInUp} 1s ease forwards;
`;

const SectionLabel = styled.div`
  background: #ff6b35;
  display: inline-block;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  animation: ${fadeInUp} 1s ease forwards;
`;

const Heading = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  color: #ccc;
`;

const Subheading = styled.p`
  font-size: 1rem;
  color: #aaa;
  margin-bottom: 3rem;
`;

const Grid = styled.div`
  width: 100%;
  height: max-content;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  align-items: center;
  text-align: left;
  overflow: hidden;
`;

const Card = styled.div`
  width: 300px;
  height: 300px;
  background: #fff;
  overflow: hidden;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  animation: ${fadeInUp} 0.8s ease forwards;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 25px rgba(0, 0, 0, 0.1);
  }
`;

const IconWrap = styled.div`
  font-size: 2rem;
  color: #ff6b35;
  margin-bottom: 1rem;
  text-align: center;
`;

const Title = styled.h3`
  font-size: 1.25rem;
  color: #111;
  margin-bottom: 0.5rem;
`;

const Desc = styled.p`
  font-size: 0.95rem;
  color: #444;
  margin-bottom: 1rem;
`;

const Button = styled(Link)`
  display: inline-block;
  margin-top: 0.5rem;
  padding: 10px 20px;
  background-color: #ff6b35;
  color: white;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  border-radius: 8px;
  transition: background 0.3s ease;

  &:hover {
    background-color: #e85c2e;
  }
`;

export default function ServicesSection() {


  return (
    <Container>
    <GlobalStyle />
    <SectionLabel>Our Services</SectionLabel>
    <Heading>What We Offer</Heading>
    <Subheading>
      We provide smart digital solutions to grow your business—effortlessly and efficiently.
    </Subheading>
    <Grid>
      {servicesData.map((service, index) => (
        <Card
          key={service.id}
          style={{
            animationDelay: `${index * 0.2}s`,
            animationFillMode: 'both',
          }}
        >
          <IconWrap>{service.icon}</IconWrap>
          <Title>{service.title}</Title>
          <Desc>{service.desc}</Desc>
          <Button href={service.link} target="_blank" rel="noopener noreferrer">
            Learn More
          </Button>
        </Card>
      ))}
    </Grid>
  </Container>
  );
}