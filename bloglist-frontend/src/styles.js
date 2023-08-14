/* eslint-disable indent *//* eslint-disable linebreak-style */
import styled from 'styled-components'

const Nav = styled.nav`
    background: #BF4F74;
    color: white;
    padding: 0em 1em, 1em, 0.25em;
    position: absolute;
    top: 0;
    width: 100%;
    height: auto%;
    font-size: 1em;
    font-family: 'Ubuntu', sans-serif;
    `

const Button = styled.button`
    background: white;        
    border-radius: 3px;
    border: 2px solid #003366;
    color: #BF4F74;
    margin: 0.5em 1em;
    padding: 0.25em 1em
    cursor: pointer;

    &:hover {
        background-color: red;
        color: black
    };

    &:active {
        background-color: #003366;
        color: white
      }
`

const Container = styled.div`
  text-align: center;
  align-items: center;
`

const FooterDiv = styled.div`
    background: #BF4F74;
    color: white;
    font-family: 'Ubuntu', sans-serif;
    margin: 0;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: auto;   
`

const Warning = styled.div`
    background: #003366;
    color: white;
    font-family: 'Ubuntu', sans-serif;   
    position: static;
    width: 100%;
    height: auto;
    font-size: 20px;
    border-style: dotted;
    border-radius: 5px;
    padding: 10px;
    margin-top: 70px;
`

const Title = styled.h2`
    font-family: 'Ubuntu', sans-serif;  
    color: #003366;
    margin-top: 70px;

`
const BlogText = styled.h3`
    font-family: 'Ubuntu', sans-serif;
    color: green;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    text-decoration: none;
    &:visited {
        color: none; 
      }   

    &:hover {
        background-color: #BF4F74;
        color: white       
    };

`

export {
    Nav,
    Button,
    Container,
    FooterDiv,
    Warning,
    Title,
    BlogText
}


