import {useState,useEffect} from 'react'

import "./UsersItems.css"
import Avatar from '../../shared/components/UIElements/Avatar'
import { Link } from 'react-router-dom'
import Card from '../../shared/components/UIElements/Card'
import { getUserPlaces } from '../../shared/api/users-api'
const UserItems = (props) => {
  const [placeCount, setPlaceCount] = useState(0);

  useEffect(()=>{
const fetchUserPlaces = async ()=>{
  try {
    
    console.log('Fetching places for user ID:', props.id);
    const userPlaces = await getUserPlaces(props.id)
    setPlaceCount(userPlaces.length);

    
  } catch (error) {
    console.error('Error fetching user places:', error);
    setPlaceCount(0);
  }
}
fetchUserPlaces();
  },[props.id])
  return (
   <li className='user-item'>
   
        <Card className='user-item__content'>

        <Link to={`/${props.id}/places`}>
        <div className='user-item__image'>
           <Avatar image={props.image} alt={props.name}/>
        </div>
        <div className='user-item__info'>
            <h2>{props.name}</h2>
            <h3>{placeCount} {placeCount===1?"place":"places"}</h3>
        </div>
        </Link>
        </Card>
   

   </li>
  )
}

export default UserItems