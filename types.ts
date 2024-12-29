export type Note = {
  id: string;
  body: string;
  createdAt: number;
  updatedAt: number;
};

export type SidebarProps = {
    notes: Note[];
    currentNote: Note;
    setCurrentNoteId: React.Dispatch<React.SetStateAction<string>>;
    newNote: () => Promise<boolean>;
    deleteNote: (noteId: Note["id"]) => Promise<boolean>;
};
