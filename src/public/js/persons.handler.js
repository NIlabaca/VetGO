const token = localStorage.getItem('token');

if (!token) { /* <- SIN EL TOKEN NO SE PUEDE AVANZAR */
    window.location.href = '/login';
}

const tableBody = document.getElementById('personsTableBody');
const personForm = document.getElementById('personForm');
const personModal = new bootstrap.Modal(document.getElementById('personModal'));
const personModalTitle = document.getElementById('personModalTitle');

// HEADER para peticiones
const authHeaders = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
};

// Cargar las tablas
async function loadPersons() {
    const response = await fetch('/api/persons', { headers: authHeaders });
    
    if (response.status === 401) {
        localStorage.clear();
        window.location.href = '/login';
        return;
    }
    const persons = await response.json();

    tableBody.innerHTML = persons.map((person) =>
    `   <tr>
            <td>${person.full_name}</td>
            <td>${person.email}</td>
            <td>${person.phone_number}</td>
            <td>
                <button class="btn btn-sm btn-warning" onclick="editPerson('${person.id}', '${person.full_name}', '${person.email}', '${person.phone_number}')">Editar</button>
                <button class="btn btn-sm btn-danger" onclick="deletePerson('${person.id}')">Eliminar</button>
            </td>
        </tr>`
    ).join('');

};

// Abrir el modal de nueva persona
document.getElementById('btnNewPerson').addEventListener('click', () => {
    personForm.reset();
    document.getElementById('personId').value = '';
    personModalTitle.textContent = 'Nueva persona';
});

// Abrir modal para Editar
window.editPerson = (id, fullName, email, phoneNumber) => {
    document.getElementById('personId').value = id;
    document.getElementById('fullName').value = fullName;
    document.getElementById('email').value = email;
    document.getElementById('phoneNumber').value = phoneNumber;
    personModalTitle.textContent = 'Editar persona';
    personModal.show(); // <- LA PGIAN MARCA EL ERROR AQUI
};

// Eliminar
window.deletePerson = async (id) => {
    if (!confirm('Eliminar Persona')) return;

    const response = await fetch(`/api/persons/${id}`, {
        method: 'DELETE',
        headers: authHeaders,
    });

    if (response.ok) {
        loadPersons();
    } else {
        const data = await response.json();
        alert(data.message || 'Error al eliminar');
    }
};

// Crear y actualizar
personForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const id = document.getElementById('personId').value;
    console.log(id)
    const body = JSON.stringify({
        full_name: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone_number: document.getElementById('phoneNumber').value
    });

    const url = id ? `/api/persons/${id}` : `/api/persons`; /** Si recibe un ID se edita, si no se crea*/
    const method = id ? 'PUT' : 'POST'; /** Si recibe un ID se us metodo PUT, si no el post*/

    const response = await fetch(url, { method, headers: authHeaders, body });

    if (response) {
       
        personModal.hide();
        loadPersons();
    } else {
        const data = await response.json();
        alert(data.message || 'Error al guardar');
    }
});

// --- Logout ---
document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.clear();
    window.location.href = '/login';
});

loadPersons();