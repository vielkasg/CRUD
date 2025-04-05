(() => {
    'use strict';

    // Seleccionamos el formulario con la clase "needs-validation"
    const forms = document.querySelectorAll('.needs-validation');

    // Iteramos sobre los input y evitamos el envio si no son validos
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        } else {
          event.preventDefault(); // Esto evita que la pagina se recargue

          // Utiliza la funcion 'agregarEstudiante' a la tabla si todo es valido
          agregarEstudiante();
          form.reset(); // Limpiamos el formulario
          form.classList.remove('was-validated'); 
        }
        form.classList.add('was-validated');
      }, false);
    });

    // Funcion para agregar un estudiante a la tabla
    function agregarEstudiante() {
      const nombre = document.getElementById('nombre').value;
      const apellido = document.getElementById('apellido').value;
      const matricula = document.getElementById('matricula').value;
      const nota = document.getElementById('nota').value;

      const listaEstudiantes = document.getElementById('ListaEstudiantes');
      const nuevaFila = document.createElement('tr');
      nuevaFila.innerHTML = `
        <td>${nombre}</td>
        <td>${apellido}</td>
        <td>${matricula}</td>
        <td>${nota}</td>
        <td><button 
        type="button" 
        class="btn btn-outline-info btn-sm rounded-3 ver-detalles" 
        data-bs-toggle="modal" 
        data-bs-target="#staticBackdrop"
        data-nombre="${nombre}" 
        data-apellido="${apellido}" 
        data-matricula="${matricula}" 
        data-nota="${nota}">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0.5 1 16 16">
          <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
          <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
        </svg> Ver
      </button>
    </td>
  `;
      listaEstudiantes.appendChild(nuevaFila);}

      // Eventos para capturar los clics en los botones "Ver"
    document.getElementById('ListaEstudiantes').addEventListener('click', function (e) {
    if (e.target.closest('.ver-detalles')) {
        const button = e.target.closest('.ver-detalles');
        const nombre = button.getAttribute('data-nombre');
        const apellido = button.getAttribute('data-apellido');
        const matricula = button.getAttribute('data-matricula');
        const nota = button.getAttribute('data-nota');
        const fila = button.closest('tr'); // Para obtener la fila correspondiente


        // Actualizar contenido del modal
        document.getElementById('staticBackdropLabel').textContent = `Detalles de ${nombre} ${apellido}`;
        document.querySelector('.modal-body').innerHTML = `
         <form id="formEditar">
                <div class="mb-3">
                    <label for="editNombre" class="form-label"><strong>Nombre</strong></label>
                    <input type="text" class="form-control" id="editNombre" value="${nombre}">
                </div>
                <div class="mb-3">
                    <label for="editApellido" class="form-label"><strong>Apellido</strong></label>
                    <input type="text" class="form-control" id="editApellido" value="${apellido}">
                </div>
                <div class="mb-3">
                    <label for="editMatricula" class="form-label"><strong>Matrícula</strong></label>
                    <input type="text" class="form-control" id="editMatricula" value="${matricula}" maxlength="8">
                </div>
                <div class="mb-3">
                    <label for="editNota" class="form-label"><strong>Nota</strong></label>
                    <input type="number" class="form-control" id="editNota" value="${nota}" min="0" max="100">
                </div>
            </form>
        `;

      //Evento para guardar los cambios 
      const actualizar = document.getElementById('btnActualizar');
      actualizar.onclick = () => actualizarFila(fila, button);

      //Evento para el boton eliminar 
      const eliminar = document.getElementById('btnEliminar');
      eliminar.onclick = () => eliminarFila(fila);
   
    }
  });

      // Funcion para actualizar la fila en la tabla
        function actualizarFila(fila, button) {
        const nuevoNombre = document.getElementById('editNombre').value;
        const nuevoApellido = document.getElementById('editApellido').value;
        const nuevaMatricula = document.getElementById('editMatricula').value;
        const nuevaNota = document.getElementById('editNota').value;

      // Actualizar los valores en la tabla
        fila.children[0].textContent = nuevoNombre;
        fila.children[1].textContent = nuevoApellido;
        fila.children[2].textContent = nuevaMatricula;
        fila.children[3].textContent = nuevaNota;

      // Actualizar los atributos del boton
        button.setAttribute('data-nombre', nuevoNombre);
        button.setAttribute('data-apellido', nuevoApellido);
        button.setAttribute('data-matricula', nuevaMatricula);
        button.setAttribute('data-nota', nuevaNota);

      // Se cierra el modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('staticBackdrop'));
        modal.hide();
    }

      // Funcion para eliminar la fila de la tabla
        function eliminarFila(fila) {
        fila.remove(); // Se elimina la fila de la tabla

      // Se cierra el modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('staticBackdrop'));
        modal.hide();
    }
  })();