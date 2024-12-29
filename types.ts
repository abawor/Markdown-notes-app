export type Note = {
  id: string;
  body: string;
  favourite: boolean;
  createdAt: number;
  updatedAt: number;
};

export type SidebarProps = {
    notes: Note[];
    currentNote: Note;
    setCurrentNoteId: React.Dispatch<React.SetStateAction<string>>;
    newNote: () => Promise<boolean>;
    toggleFavourite: (noteId: Note["id"]) => Promise<boolean>;
    deleteNote: (noteId: Note["id"]) => Promise<boolean>;
};
