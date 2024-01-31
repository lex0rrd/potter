import {useEffect, useState} from 'react';
import './App.css';
import CardList from './components/cardList/cardList';
import Header from './components/header/header';

import Hermiona from './assets/img/card-img.png';
import Malfoy from './assets/img/card-img2.png'
import Potter from './assets/img/card-img3.jpg.crdownload'
import axios from 'axios';




function App() {
  const[cards, setCards] = useState([])
  const [filteredCards, setFilteredCards] = useState(cards);


const[schools, setSchool] = useState([
  { name: 'Грифиндор'},
  {  name: 'Слизерин'},
  {  name: 'Когтевран'},
  { name: 'Пуфендуй'},
  
])

useEffect(()=>{
  axios.get('http://localhost:3001/schools').then((data)=>{
    setSchool(data.data);
  });

  axios.get('http://localhost:3001/heroes').then((data)=>{
    setCards(data.data);
    setFilteredCards(data.data)
  });
}, [])

  return (
    <div className="App">
      <Header schools={schools} 
      setCards={setCards}
      cards={cards}
      filteredCards={filteredCards}
      setFilteredCards={setFilteredCards}/>
      <hr/>
      <CardList cards={filteredCards}/>
    </div>
  );
}

export default App;
