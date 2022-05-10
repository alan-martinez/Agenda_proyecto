const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/add', isLoggedIn, (req, res) => {
    res.render('links/add');
});

router.post('/add', isLoggedIn, async (req, res) => {
    const { nombre_actividad, descripcion, fechainicio, fechafin, prioridad } = req.body;
    const newLink = {
        nombre_actividad,
        descripcion,
        fechainicio,
        fechafin,
        prioridad,
        user_id: req.user.id
    };
    await pool.query('INSERT INTO actividades set ?', [newLink]);
    req.flash('success', 'Actividad guardada!');
    res.redirect('/links');
});

router.get('/', isLoggedIn, async (req, res) => {
    const actis = await pool.query('SELECT * FROM actividades WHERE user_id = ?', [req.user.id]);
    res.render('links/list', { actis });
});

router.get('/delete/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM actividades WHERE ID = ?', [id]);
    req.flash('success', 'Actividad eliminada!');
    res.redirect('/links');
});

router.get('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const acti = await pool.query('SELECT * FROM actividades WHERE id = ?', [id]);
    res.render('links/edit', {acti: acti[0]});
});

router.post('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const { nombre_actividad, descripcion, fechainicio, fechafin, prioridad} = req.body; 
    const newLink = {
        nombre_actividad,
        descripcion,
        fechainicio,
        fechafin,
        prioridad
    };
    await pool.query('UPDATE actividades set ? WHERE id = ?', [newLink, id]);
    req.flash('success', 'Actividad actualizada!');
    res.redirect('/links');
});


module.exports = router;