const express = require('express');
const empleado = express.Router();
const db = require('../config/database');


empleado.post("/", async (req, res, next) => {
    const { nombre, apellidos, telefono, correo, direccion} = req.body;

    if(nombre && apellidos && telefono && correo && direccion) {
        let query = "INSERT INTO empleados(nombre, apellidos, telefono, correo, direccion)";
        query += ` VALUES ('${nombre}', '${apellidos}', '${telefono}', '${correo}', '${direccion}')`;
    
        const rows = await db.query(query);
        
        if(rows.affectedRows == 1) {
            return res.status(201).json({code: 201, message: "Empleado insertado correctamente"});
        }
        return res.status(500).json({code: 500, message: "Ocurrió un error"});
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"});
});

empleado.delete("/:id([0-9]{1,3})", async (req, res, next) => {
    const query = `DELETE FROM empleados WHERE id_empleado=${req.params.id}`;
    const rows = await db.query(query);

    if (rows.affectedRows == 1) {
            return res.status(200).json({ code: 200, message: "Empleado borrado correctamente"});
    }
    return res.status(404).json({code: 404, message: "Empleado no encontrado"});
});

empleado.put("/:id([0-9]{1,3})", async (req, res, next) => {
    const { nombre, apellidos, telefono, correo, direccion } = req.body;

    if(nombre && apellidos && telefono && correo && direccion) {
        let query = `UPDATE empleados SET nombre='${nombre}',apellidos='${apellidos}',
        telefono='${telefono}',correo='${correo}',direccion='${direccion}' WHERE id_empleado=${req.params.id};`;
    
        const rows = await db.query(query);
        
        if(rows.affectedRows == 1) {
            return res.status(200).json({code: 200, message: "Empleado actualizado correctamente"});
        }
        return res.status(500).json({code: 500, message: "Ocurrió un error"});
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"});
    
});

empleado.patch("/:id([0-9]{1,3})", async (req, res, next) => {
   
    if (req.body.nombre) {
        let query = `UPDATE empleados SET nombre='${req.body.nombre}' WHERE id_empleado=${req.params.id};`;
        const rows = await db.query(query);
        
        if(rows.affectedRows == 1) {
            return res.status(200).json({code: 200, message: "Empleado actualizado correctamente"});
        }
        return res.status(500).json({code: 500, message: "Ocurrió un error"});
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"});
});

empleado.get("/", async (req, res, next) => {
    const pkmn = await db.query("SELECT * FROM empleados");;
    return res.status(200).json({ code: 200, message: pkmn});
});

empleado.get('/:id([0-9]{1,3})', async (req, res, next) => {
    const id = req.params.id - 1;
    if (id >= 1 && id <= 1000) {
        const pkmn = await db.query("SELECT * FROM empleados WHERE id_empleado="+id+";");
        return res.status(200).json({ code: 200, message: pkmn});
    }
        return res.status(404).send({ code: 404, message: "Empleado no encontrado"});
}); 

empleado.get('/:name([A-Za-z]+)', async (req, res, next) => {
    const name = req.params.name;

    const pkmn = await db.query(`SELECT * FROM empleados WHERE nombre='${name}'`);
    if (name.length > 0) {
        return res.status(200).json(pkmn);
    }
        return res.status(404).send({ code: 404, message: "Empleado no encontrado"});

});

module.exports = empleado;