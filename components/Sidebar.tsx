import React from "react"
import { SidebarProps } from "../types"
import { FaHeart } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";

export default function Sidebar(props: SidebarProps) {
    const noteElements = props.notes.map((note) => (
        <div key={note.id}>
            <div
                className={`title ${
                    note.id === props.currentNote.id ? "selected-note" : ""
                }`}
                onClick={() => props.setCurrentNoteId(note.id)}
            >
                <h4 className="text-snippet">{note.body.split("\n")[0]}</h4>
                <div className="btns-div">
                    <button 
                        className="delete-btn"
                        onClick={() => props.deleteNote(note.id)}
                        >
                        <FaRegTrashAlt />
                    </button>
                    <button 
                        className={note.favourite ? "fav-note" : "fav-btn"}
                        onClick={() => props.toggleFavourite(note.id)}
                        >
                        <FaHeart />
                    </button>
                </div>
            </div>
        </div>
    ))

    return (
        <section className="pane sidebar">
            <div className="sidebar--header">
                <h3>Notes</h3>
                <button className="new-note" onClick={props.newNote}>+</button>
            </div>
            {noteElements}
        </section>
    )
}
