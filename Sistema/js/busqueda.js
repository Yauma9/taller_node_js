window.onload = init;
var headers = {};
var url = "http://localhost:3000";

function init() {
    document.querySelector('.btn-secondary').addEventListener('click', function() {
        window.location.href = "sistema.html"
    });

    document.querySelector('.btn-primary').addEventListener('click', search); 
    }      

function search() {
    var id_empleado = document.getElementById('input-id').value;
    var nombre = document.getElementById('input-name').value;

    if(id_empleado) {
        axios({
        method: 'get',
        url: `http://localhost:3000/sistema/${id_empleado}`,
        data: {
            id_empleado:id_empleado
        }
    }).then(function(res) {
        console.log(res);
        displayEmpleados(res.data.message);
        alert("Busqueda exitosa");
        }).catch(function(err) {
        console.log(err);
    })
} else {
    axios({
        method: 'get',
        url: `http://localhost:3000/sistema/${nombre}`,
        data: {
            nombre:nombre
        }
    }).then(function(res) {
        console.log(res);
        displayEmpleados(res.data.message);
        alert("Busqueda exitosa");
        }).catch(function(err) {
        console.log(err);
    })
}

function displayEmpleados(empleados) {
    var body = document.querySelector("body");
    body.innerHTML += `

    <table>
    <tr>
      <th>Nombre</th>
      <th>Apellidos</th>
      <th>Telefono</th>
      <th>Correo</th>
      <th>Direccion</th>
    </tr>`
    for(var i = 0; i < empleados.length; i++) {


        body.innerHTML +=  
        `<table>
        <tr>
        <h3>
          <td>${empleados[i].nombre}</td>
          <td>${empleados[i].apellidos}</td>
          <td>${empleados[i].telefono}</td>
          <td>${empleados[i].correo}</td>
          <td>${empleados[i].direccion}</td>
        </h3>
        </tr>
        </table>`
    } 
}

}