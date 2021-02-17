// załadowanie modułów dodatkowych i plików aplikacji
const express = require('express');
const handleErrors = require('./utils/HandleErrors');
const cookieParser = require('cookie-parser');

// moduł do obsługi routingu
const bodyParser = require('body-parser');

// nasz plik definiujący odpowiedzi dla ścieżek
const routes = require('./routes/index');

const app = express();

// konfiguracja parserów
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());

// konfiguracja routera dla wszystkich ścieżek
app.use('/', routes);

// obsługa wyjątków
app.use(handleErrors);

module.exports = app;
