import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
*{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    overscroll-behavior: none 
  }
  :root{
    --dark-bg: #1A1A1D;
    --gray-1: ${({ theme }) => theme.text};
    --deep-dark: #1E1E1E;
    --white : white;
    --black: black;
    --red-1: #C3073F;
    --red-2: #950740;
    --cyan : #66FCF1;
    --blue-1: #3500D3;
    --blue-2: #240090;
    --green-1: #88C232;
    --green-2: #61892F;
    --background:${({ theme }) => theme.background};
    --primary:${({ theme }) => theme.primary};
    --secondary:${({ theme }) => theme.secondary};
    --text:${({ theme }) => theme.text};
    --text-s:${({ theme }) => theme.selectText};
    --background-s:${({ theme }) => theme.selectBackground};
  }
  html{
    font-size: 10px;
    font-family: 'Roboto Mono';
    background-color: var(--background);
  }
  ul,li{
    list-style: none;
  }
  a{
    text-decoration: none;
  }
  img, svg{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  button{
    outline: none
  }
  .container {
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
  }
  label {
     font-size: 2.2rem;
   }
  input{
     text-align: center;
     width: 100%;
     font-size: 2rem;
     padding: 1.2rem;
     color: var(--text);
     background-color: var(--background-s);
     outline: none;
     border: none;
     border-radius: 8px;
     margin-top: 1rem;
     &:focus{
       border:2px solid var(--primary);
     }
   }
   input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
    }
/* Smooth Scroll  */
  [data-scrollbar] {
    height: 100vh;
    overflow: hidden;
    background-color: var(--text);
    .scroll-content {
      background-color: var(--background);
    }
    .scrollbar-track.scrollbar-track-y {
      background: var(--background-s);
      .scrollbar-thumb-y {
        background: var(--text);
      }
    }
  }
  body{
    transition: all 0.25s linear;
  }

  input[type='color'] {
    -webkit-appearance: none;
    border: none;
    padding: 0;
  }
  input[type='color']::-webkit-color-swatch-wrapper {
    padding: 0;
  }
  input[type='color']::-webkit-color-swatch {
    border: none;
  }

`;
export default GlobalStyles;
