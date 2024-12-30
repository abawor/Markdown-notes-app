import React from "react"
import Sidebar from "../components/Sidebar"
import Editor from "../components/Editor"
import Split from "react-split"
import { onSnapshot, addDoc, doc, getDoc, deleteDoc, setDoc } from "firebase/firestore"
import { notesCollection, db } from "../firebase"
import { Note } from "../types"

export default function App() {
  const [notes, setNotes] = React.useState<Note[]>([])
  const [currentNoteId, setCurrentNoteId] = React.useState<Note["id"]>("")
  const [tempNoteText, setTempNoteText] = React.useState<Note["body"]>("")

  const currentNote = notes.find(note => note.id === currentNoteId) || notes[0]
  const sortedNotes = notes.sort((a, b) => b.updatedAt - a.updatedAt)

  React.useEffect(() => {
    const unsubscribe = onSnapshot(notesCollection, function(snapshot) {
      const notesArr: Note[] = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      })) as Note[]
      setNotes(notesArr)
    })
    return unsubscribe
  }, [])
  
  React.useEffect(() => {
    if (!currentNoteId) {
      setCurrentNoteId(notes[0]?.id)
    }
  }, [notes])

  React.useEffect(() => {
    if(currentNote) {
      setTempNoteText(currentNote.body)
    }
  }, [currentNote])

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (tempNoteText !== currentNote.body) {
        updateNote(tempNoteText)
      }
    }, 500)
    return () => clearTimeout(timeoutId)
  }, [tempNoteText])

  async function createNewNote(): Promise<boolean> {
    try {
      const newNote = {
        body: "# Type your markdown note's title here",
        createdAt: Date.now(),
        updatedAt: Date.now()
      }
      const newNoteRef = await addDoc(notesCollection, newNote)
      setCurrentNoteId(newNoteRef.id)
      return true
    } catch (error) {
      alert("Failed to delete note: " + error)
      return false
    }
  }

  async function updateNote(text: Note["body"]): Promise<boolean> {
    try {
      const docRef = doc(db, "notes", currentNoteId)
      await setDoc(docRef,
        { body: text, updatedAt: Date.now() },
        { merge: true }
      )
      return true
    } catch (error) {
      alert("Failed to update note body: " + error)
      return false
    } 
  }

  async function toggleFavourite(noteId: Note["id"]): Promise<boolean> {
    try {
      const docRef = doc(db, "notes", noteId)
      const noteDoc = await getDoc(docRef)
      const noteData = noteDoc.data()
     
      if (noteData) {
        await setDoc(docRef,
          { favourite: !noteData.favourite },
          { merge: true }
        )
      } else {
        alert("Cannot access note details.")
        return false
      }
      
      return true
    } catch (error) {
      alert("Failed to add note to favourites: " + error)
      return false
    } 
  }
  
  async function deleteNote(noteId: Note["id"]): Promise<boolean> {
    if(!confirm("Are you sure you want to delete this note?\nYou will not be able to undo this action")) {
      return false
    }
    try {
      const docRef = doc(db, "notes", noteId)
      await deleteDoc(docRef)
      return true
    } catch (error) {
      alert("Failed to delete note: " + error)
      return false
    }
  }
      
  return (
    <main>
    {
      notes.length > 0 
      ?
      <Split 
        sizes={[30, 70]} 
        direction="horizontal" 
        className="split"
      >
        <Sidebar
          notes={sortedNotes}
          currentNote={currentNote}
          setCurrentNoteId={setCurrentNoteId}
          newNote={createNewNote}
          toggleFavourite={toggleFavourite}
          deleteNote={deleteNote}
        />
        <Editor 
          tempNoteText={tempNoteText} 
          setTempNoteText={setTempNoteText} 
        />
      </Split>
      :
      <div className="no-notes">
        <h1>You have no notes</h1>
        <button 
          className="first-note" 
          onClick={createNewNote}
        >
          Create one now
        </button>
      </div>
    }
    </main>
  )
}
