import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

export const PostInfo = () => {
    const params = useParams();
    const {id} = params;
    const navigate = useNavigate();
    const [isEdit, setIsEdit] = useState(false);
    const [post, setPost] = useState<{id:number, content: string}>({
        id: 0,
        content: ''
    });
    const [form, setForm] = useState({
        content: ''
    });

    function hadlForm({target}:  React.ChangeEvent<HTMLInputElement>) {
        const { value} = target;
        setForm(prevForm => ({...prevForm, content: value}))
    }

    useEffect(() => {
        async function fetchPost() {
            try {
                const response = await fetch(`http://localhost:7070/posts/${id}`);
                const data = await response.json();
                setPost(data.post)    

            } catch (e) {
                console.log(e);
            }
        }
        fetchPost()
    }, [isEdit])

    const editPost = async (post: {  content: string }) => {
        const data = {
            id: id,
            content: post.content
        }
        fetch(`http://localhost:7070/posts/${id}`, {
            method: 'PUT', 
            body: JSON.stringify(data)
        })
        setForm(prevForm => ({...prevForm, content: ''}))
    }

    function hadlBtnDelete() {
        fetch(`http://localhost:7070/posts/${id}`, {method: 'DELETE'});
        navigate(-1)
    }

    function hadlBtn(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault()
        editPost(form)
    }
    function EditPost() {
        setIsEdit(!isEdit)
    }

  return (
    <>
        {isEdit ? (
               <form>
               <button 
                   onClick={() => EditPost()}
                   type="button"
               >
                   Назад
               </button>
               <input 
                   type='text'
                   value={form.content}
                   onChange={hadlForm}
               />
               <button type="submit" onClick={(e) => hadlBtn(e)}>Сохранить</button>
           </form>
        ) : (
            <>
                <button onClick={() => navigate(-1)}>Назад</button>
                <button onClick={() => hadlBtnDelete()}>Удалить</button>
                <button onClick={() => EditPost()}>Редактировать</button>
                {post && (
                    <div>{post?.content}</div>
                )}
            </>
        )}
    </>
  )
}
