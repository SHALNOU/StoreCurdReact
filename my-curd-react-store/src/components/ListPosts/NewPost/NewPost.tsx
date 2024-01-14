import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const NewPost = () => {
    const [form, setForm] = useState({
        id: 0,
        content: ''
    });
    const navigate = useNavigate();
    
    const addPost = async (post: { id: number; content: string }) => {
        const data = {
            id: post.id, 
            content: post.content
        }
        fetch('http://localhost:7070/posts', {
            method: 'POST', 
            body: JSON.stringify(data)
        })
        setForm(prevForm => ({...prevForm, content: ''}))
    }

    function hadlForm({target}:  React.ChangeEvent<HTMLInputElement>) {
        const { value} = target;
        setForm(prevForm => ({...prevForm, content: value}))
    }

    function hadlBtn(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault()
        addPost(form)
    }

    function hadlBtnClose() {
        navigate('/')
    }
    

  return (
    <form>
        <button 
            onClick={hadlBtnClose}
            type="button"
        >
            X
        </button>
        <input 
            type='text'
            value={form.content}
            onChange={hadlForm}
        />
        <button type="submit" onClick={(e) => hadlBtn(e)}>Создать</button>
    </form>
  )
}
