document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const notesContainer = document.getElementById('notes-container');
    const noteTitle = document.getElementById('note-title');
    const noteContent = document.getElementById('note-content');
    const saveButton = document.getElementById('save-note');
    const cancelButton = document.getElementById('cancel-edit');
    const editIdInput = document.getElementById('edit-id');
    const searchInput = document.getElementById('search');
    const darkModeToggle = document.getElementById('dark-mode-toggle');

    // State
    let isEditing = false;

    // Initialize
    loadNotes();
    setupEventListeners();

    function setupEventListeners() {
        saveButton.addEventListener('click', saveNote);
        cancelButton.addEventListener('click', cancelEdit);
        searchInput.addEventListener('input', () => loadNotes(searchInput.value));
        darkModeToggle.addEventListener('click', toggleDarkMode);
        
        // Initialize dark mode
        if (localStorage.getItem('darkMode') === 'enabled') {
            document.body.classList.add('dark-mode');
        }
    }

    async function loadNotes(searchTerm = '') {
    try {
        // Use query parameters instead of request body
        const url = `/get/notes?search=${encodeURIComponent(searchTerm)}`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Failed to load notes');
        }
        
        const notes = await response.json();
        renderNotes(notes);
    } catch (error) {
        console.error('Error loading notes:', error);
        alert('Failed to load notes. Please try again.');
    }
    }


    function renderNotes(notes) {
        notesContainer.innerHTML = '';
        
        if (!notes || notes.length === 0) {
            notesContainer.innerHTML = '<tr><td colspan="4" class="no-notes">No notes found</td></tr>';
            return;
        }
        
        notes.forEach(note => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${note.title || 'Untitled'}</td>
                <td>${note.content}</td>
                <td>${formatDate(note.created_at)}</td>
                <td>${formatDate(note.updated_at)}</td>
                <td><button class="action-btn edit-btn" data-id="${note.id}">Edit</button></td>
                <td><button class="action-btn delete-btn" data-id="${note.id}">Delete</button></td>
            `;
            
            notesContainer.appendChild(row);
        });
        
        // Add event listeners to action buttons
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', () => editNote(btn.dataset.id));
        });
        
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', () => deleteNote(btn.dataset.id));
        });
    }

    function formatDate(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleString();
    }

    async function saveNote() {
        const title = noteTitle.value.trim();
        const content = noteContent.value.trim();
        
        if (!title || !content) {
            alert('Both title and content are required!');
            return;
        }
        
        const noteData = { title, content };
        
        try {
            if (isEditing) {
                await fetch(`/update/notes/${editIdInput.value}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(noteData)
                });
            } else {
                await fetch('/add/notes', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(noteData)
                });
            }
            
            resetForm();
            loadNotes(searchInput.value);
        } catch (error) {
            console.error('Error saving note:', error);
            alert('Failed to save note. Please try again.');
        }
    }

    async function editNote(id) {
        try {
            // First try to find the note in the existing DOM
            const editBtn = document.querySelector(`.edit-btn[data-id="${id}"]`);
            if (editBtn) {
                const row = editBtn.closest('tr');
                const title = row.cells[0].textContent;
                // For content, we need to fetch from server since it's not in the table
                const response = await fetch(`/get/notes`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });
                
                if (!response.ok) {
                    throw new Error('Failed to fetch note details');
                }
                
                const notes = await response.json();
                const note = notes.find(n => n.id == id);
                
                if (note) {
                    noteTitle.value = note.title || '';
                    noteContent.value = note.content || '';
                    editIdInput.value = id;
                    
                    isEditing = true;
                    saveButton.textContent = 'Update Note';
                    cancelButton.style.display = 'inline-block';
                    
                    noteTitle.focus();
                }
            }
        } catch (error) {
            console.error('Error editing note:', error);
            alert('Failed to load note for editing. Please try again.');
        }
    }

    async function deleteNote(id) {
        if (!confirm('Are you sure you want to delete this note?')) return;
        
        try {
            const response = await fetch(`/delete/notes/${id}`, {
                method: 'POST'
            });
            
            if (!response.ok) {
                throw new Error('Failed to delete note');
            }
            
            loadNotes(searchInput.value);
        } catch (error) {
            console.error('Error deleting note:', error);
            alert('Failed to delete note. Please try again.');
        }
    }

    function cancelEdit() {
        resetForm();
    }

    function resetForm() {
        noteTitle.value = '';
        noteContent.value = '';
        editIdInput.value = '';
        isEditing = false;
        saveButton.textContent = 'Save Note';
        cancelButton.style.display = 'none';
    }

    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
        } else {
            localStorage.setItem('darkMode', 'disabled');
        }
    }
});