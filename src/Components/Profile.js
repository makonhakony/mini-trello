import React, { useContext } from "react";
import Styled from "styled-components";
import { AuthContext } from "../App";
import TopNavBar from './TopNavBar';

const Profile = () => {
    const { state } = useContext(AuthContext);
  
    const { avatar_url, name, public_repos, followers, following } = state.user
    console.log(state.user)

    return (
        <div>
            <TopNavBar></TopNavBar>
                <Wrapper>
                <div className="container">
                    <div>
                    <div className="content">
                        <img src={avatar_url} alt="Avatar"/>
                        <span>{name}</span>
                        <span>{public_repos} Repos</span>
                        <span>{followers} Followers</span>
                        <span>{following} Following</span>
                    </div>
                    </div>
                </div>
            </Wrapper>
        </div>
      );
};

const Wrapper = Styled.section`
  .container{
    display: flex;
    flex-direction: column;
    height: 100vh;
    font-family: Arial;
    button{
      all: unset;
      width: 100px;
      height: 35px;
      margin: 10px 10px 0 0;
      align-self: flex-end;
      background-color: #0041C2;
      color: #fff;
      text-align: center;
      border-radius: 3px;
      border: 1px solid #0041C2;
      &:hover{
        background-color: #fff;
        color: #0041C2;
      }
    }
    >div{
      height: 100%;
      width: 100%;
      display: flex;
      font-size: 18px;
      justify-content: center;
      align-items: center;
      .content{
        display: flex;
        flex-direction: column;
        padding: 20px 100px;    
        box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2);
        width: auto;
    
        img{
          height: 150px;
          width: 150px;
          border-radius: 50%;
        }
    
        >span:nth-child(2){
          margin-top: 20px;
          font-weight: bold;
        }
    
        >span:not(:nth-child(2)){
          margin-top: 8px;
          font-size: 14px;
        }
    
      }
    }
  }
  `;

export default Profile;
