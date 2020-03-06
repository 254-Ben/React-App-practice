import React, { useState, useEffect, useReducer } from 'react';
import AddNoteForm from './components/AddNotesForm'
import './App.css';
//import { addComment } from '@babel/types';

const notesReducer = (state, action) => {
  switch (action.type) {
    case 'POPULATE_NOTES':
    return action.notes;
    case 'ADD_NOTES':
      return [
        ...state,
        {title: action.title, body: action.body}
      ]
      case 'REMOVE_NOTE':
        return state.filter((note) => note.title !== action.title)
        default:
          return state;
  }
}

const App = () => {
  const [notes, dispacth] = useReducer(notesReducer, []);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("")


  

  const removeNote = (title) => {
    dispacth({
      type: 'REMOVE_NOTE',
      title
    })
  }

  useEffect(() => {
    const notesData = JSON.parse(localStorage.getItem('notes'));
    if (notes) {
      dispacth({ type: 'POPULATE_NOTES', notes})
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  return (
    <div>
      <h1>Notes</h1>
      {notes.map((note) => {
        return (
          <div>
            <h3>{note.title}</h3>
            <p>{note.body}</p>
            <button onClick={() => removeNote(note.title)}>x</button>
          </div>
        )
      })}
      <AddNoteForm dispacth={dispacth} />
    </div>
  )
}
export default App;
