import { useState, useEffect } from 'react';
import { UserList } from '../components/UserList'
import { getUsers } from '../../shared/api/users-api';

export const Users = () => {

 const [users,setUsers] =useState([])
 const [isLoading,setIsLoading]= useState(true)
 const [error, setError] = useState(null);
  

  useEffect(()=>{

const fetchUsers = async()=>{
  try {
     const fetchedUsers = await getUsers()
     console.log('Fetched users:', fetchedUsers);
  setUsers(fetchedUsers)
  } catch (error) {
    setError("Error fetching users:");
  }finally {
    setIsLoading(false);
  }
 
}
fetchUsers()
  }, [])

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }
  return (
    <UserList items= {users}/>
  )
}
