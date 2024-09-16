import logo from './logo.svg'; // Importation du logo
import './App.css'; // Importation du fichier de style CSS

import { useState } from 'react';

function App() {
    const [notes, setNotes] = useState([]); // Liste des pense-bêtes
    const [newNote, setNewNote] = useState(''); // Pour la nouvelle note
    const [editingIndex, setEditingIndex] = useState(null); // Indice de la note en cours d'édition

    // Fonction pour ajouter ou mettre à jour une note
    function AddNote() {
        if (newNote.trim() === '') return; // Ne rien faire si la note est vide

        if (editingIndex !== null) {
            // Mise à jour d'une note existante
            const updatedNotes = notes.map((note, index) =>
                index === editingIndex ? newNote : note
            );
            setNotes(updatedNotes);
            setEditingIndex(null); // Réinitialiser l'indice de l'édition
        } else {
            // Ajout d'une nouvelle note
            setNotes([...notes, newNote]);
        }

        setNewNote(''); // Réinitialise le champ de saisie
    }

    // Fonction pour supprimer une note
    function DeleteNote(index) {
        const updatedNotes = notes.filter((note, i) => i !== index); // Filtre la note à supprimer
        setNotes(updatedNotes);
        if (index === editingIndex) {
            setEditingIndex(null); // Annuler l'édition si on supprime la note en cours d'édition
            setNewNote(''); // Réinitialiser le champ de saisie
        }
    }

    // Fonction pour lancer l'édition d'une note
    function EditNote(index) {
        setNewNote(notes[index]); // Met la note sélectionnée dans le champ d'édition
        setEditingIndex(index); // Enregistre l'indice de la note en cours d'édition
    }

    return (
        <div style={{ padding: '20px' }}>
            <h1>Pense-bêtes</h1>
            <div>
                <input
                    type="text"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)} // Met à jour la nouvelle note
                    placeholder="Écris ton pense-bête ici..."
                    style={{ padding: '10px', fontSize: '16px', width: '300px' }}
                />
                <button
                    onClick={AddNote}
                    style={{ padding: '10px', fontSize: '16px', marginLeft: '10px' }}
                >
                    {editingIndex !== null ? 'Modifier' : 'Ajouter'}
                </button>
            </div>

            <ul style={{ padding: '20px 0', listStyleType: 'none' }}>
                {notes.map((note, index) => (
                    <li
                        key={index}
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '10px',
                            backgroundColor: '#f9f9f9',
                            padding: '10px',
                            borderRadius: '5px',
                        }}
                    >
                        {note}
                        <div>
                            <button
                                onClick={() => EditNote(index)} // Lance l'édition
                                style={{
                                    backgroundColor: 'blue',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '3px',
                                    padding: '5px 10px',
                                    marginRight: '10px',
                                    cursor: 'pointer',
                                }}
                            >
                                Modifier
                            </button>
                            <button
                                onClick={() => DeleteNote(index)} // Supprime la note
                                style={{
                                    backgroundColor: 'red',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '3px',
                                    padding: '5px 10px',
                                    cursor: 'pointer',
                                }}
                            >
                                Supprimer
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;