import { useEffect, useState } from 'react'
import { Post } from './Post/Post';
import { NavLink, useNavigate } from 'react-router-dom';

export const ListPosts = () => {
    const [list, setList] = useState([]);
    const navigate = useNavigate();

    useEffect(()=> {
       async function fetchPosts() {
            try {
                const respone = await fetch('http://localhost:7070/posts');
                const data = await respone.json()
                if(respone.status !== 200) {
                    console.log(respone.statusText)
                }
                setList(data)
            } catch(e) {
                console.log(e)
            }
        }
        fetchPosts()
    }, [])
  return (
    <div>
        {list ? (
            <>
                {list.map((item : {id:number}) => (
                        <NavLink to={`/posts/${item.id}`}><Post post={item}/></NavLink>
                    
                ))}
                <button onClick={() => navigate('/new')}>Новый пост</button>
            </>
        ) : (
            <div>Пусто</div>
        )}
    </div>
  )
}
