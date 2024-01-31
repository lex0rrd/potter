import axios from 'axios';
import { useEffect, useState } from 'react';
import './header.scss'
function Header({schools, setCards, cards, filteredCards, setFilteredCards}) {
    // const [filteredCards, setFilteredCards] = useState(cards);

    const [choosedSchool, setChoosedSchool] = useState(0);
    const [name, setName] = useState('');

    const filterByName = () => {
        let newCards = [];

        cards.forEach(card => {
            if(card.name.toLowerCase().includes(name.toLowerCase())){
                newCards.push(card);

            }
            
        })
        setFilteredCards(newCards);
    }

    useEffect(()=>{
        if(name.length > 2){
        filterByName();
        }else{
            
            setFilteredCards(cards);
            
        }
     }, [name])
    

    const handleChoosedSchool = () => {
        axios.get('http://localhost:3001/heroesFilterBySchool/' + choosedSchool).then((data)=>{
            setFilteredCards(data.data);
            setCards(data.data);
          });
    }

    useEffect(()=>{
        if(choosedSchool > 0){
            handleChoosedSchool();
        }else{
            axios.get('http://localhost:3001/heroes').then((data)=>{
                setCards(data.data);
                setFilteredCards(data.data)
              });
        }
            
    }, [choosedSchool])

    return <header>
        <div className="container">
            <h1>Harry Potter</h1>
            <h3>View all characters from the Harry Potter universe</h3>
        </div>

        <div className="inputs">
            <form action="">

            <div className="name">
                <label htmlFor="name">Имя</label>
                <input type="text" placeholder='Гермиона' id='name' value={name}
                onChange={(element)=>(setName(element.target.value))}/>
            </div>

            <div className="school">
                <label htmlFor="school">Школа</label>

             
                <select id='school' onChange={(element)=>{setChoosedSchool(element.target.value)}}>
                    <option value="0">Выберите</option>
                    {
                        schools.map((school)=>{
                            return <option value={school.id}>{school.name}</option>
                        })
                    }

                </select>
                </div>   
            </form>
        </div>
    </header>;
}

export default Header;