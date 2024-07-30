import React from "react";
import TopNavBar from "./TopNavBar";
import Styled from "styled-components";

export default function Home() {
  
    
    return (
      <div>
        <TopNavBar></TopNavBar>
        <Wrapper>
        <section className="container">
          <div>
            <h1>Welcome</h1>
            <span>Mini Trello</span>
            <h3>Made by An Pham</h3>
            <h2>
              This is made for SKIPLI Online Coding Chalenge
              <br/>
              I was doing this for around 24 hours, Thank you!
              <br/>
              This challenge is cool, love it 😂
            </h2>
            
      
          </div>
        </section>
      </Wrapper>
      </div>
      
    );
  }

  const Wrapper = Styled.section`
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-family: Arial;
    
    > div:nth-child(1) {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2);
      transition: 0.3s;
      width: 80%;
      height: 80%;
      > h1 {
        font-size: 2rem;
        margin-bottom: 20px;
      }
      > h2   {
        font-size: 1rem;
        margin: 20px;
      }
      > span:nth-child(2) {
        font-size: 1.1rem;
        color: #808080;
        margin-bottom: 70px;
      }
      > span:nth-child(3) {
        margin: 10px 0 20px;
        color: red;
      }
    }
  }
`;