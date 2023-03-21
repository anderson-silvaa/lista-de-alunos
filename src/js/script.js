const form = document.getElementById('myForm');

let id = 0;

function generateId() {
  return id++;
}

function exibirAlunos() {
  const students = JSON.parse(localStorage.getItem('saveStudent')) || [];
  const tableBody = document.querySelector('#studentsTable tbody');
  tableBody.innerHTML = '';

  for (let student of students) {
    const row =
      `<tr>
        <td>${student.id}</td>
        <td>${student.name}</td>
        <td>${student.email}</td>
        <td>${student.age}</td>
        <td><span id="nota_${student.id}">${student.nota || 0}</span></td>
        <td><button onclick="alterarNota(${student.id})">Alterar Nota</button></td>
        <td><button onclick="excluirAluno(${student.id})">Excluir</button></td>
      </tr>`;
    tableBody.insertAdjacentHTML('beforeend', row);
  }
}

function filtrarAlunos() {
  const termo = document.getElementById('filtro').value.toLowerCase();
  const filteredStudents = JSON.parse(localStorage.getItem('saveStudent')).filter(student => {
    return student.name.toLowerCase().includes(termo) || student.email.toLowerCase().includes(termo) || student.age.toString().includes(termo) || student.nota.toString().includes(termo);
  });
  const tableBody = document.querySelector('#studentsTable tbody');
  tableBody.innerHTML = '';

  for (let student of filteredStudents) {
    const row = `
      <tr>
        <td>${student.id}</td>
        <td>${student.name}</td>
        <td>${student.email}</td>
        <td>${student.age}</td>
        <td><span id="nota_${student.id}">${student.nota || 0}</span></td>
        <td><button onclick="alterarNota(${student.id})">Alterar Nota</button></td>
      </tr>
    `;
    tableBody.insertAdjacentHTML('beforeend', row);
  }
}

function excluirAluno(id) {
  const students = JSON.parse(localStorage.getItem('saveStudent')) || [];
  const filteredStudents = students.filter(student => student.id !== id);
  localStorage.setItem('saveStudent', JSON.stringify(filteredStudents));
  exibirAlunos();
}

function alterarNota(studentId) {
  const novaNota = prompt('Digite a nova nota:');
  if (novaNota !== null) {
    let saveStudent = localStorage.getItem('saveStudent');
    saveStudent = saveStudent ? JSON.parse(saveStudent) : [];
    for (let student of saveStudent) {
      if (student.id === studentId) {
        student.nota = novaNota;
        localStorage.setItem('saveStudent', JSON.stringify(saveStudent));
        const notaSpan = document.querySelector(`#nota_${student.id}`);
        notaSpan.textContent = novaNota;
        break;
      }
    }
  }
}

document.getElementById('filtro').addEventListener('keyup', filtrarAlunos);

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const age = document.getElementById('age').value;

  const data = {
    id: generateId(),
    name: name,
    email: email,
    age: age,
    nota: 0,
  };

  let saveStudent = localStorage.getItem('saveStudent');
  saveStudent = saveStudent ? JSON.parse(saveStudent) : [];

  saveStudent.push(data);
  localStorage.setItem('saveStudent', JSON.stringify(saveStudent));

  alert('Dados salvos com sucesso!');
  exibirAlunos();
});

exibirAlunos();
