window.onload = init;
var headers = {};
var url = "http://localhost:3000";

function init() {
    document.querySelector('.btn-secondary').addEventListener('click', function() {
        window.location.href = "sistema.html"
    });

    document.querySelector('.btn-primary').addEventListener('click', borrar);    
}

function borrar() {
    var id_empleado = document.getElementById('input-id').value;

    axios({
        method: 'delete',
        url: `http://localhost:3000/sistema/${id_empleado}`
    }).then(function(res) {
        console.log(res);
        alert("Eliminado exitoso");
        }).catch(function(err) {
        console.log(err);
    })
}