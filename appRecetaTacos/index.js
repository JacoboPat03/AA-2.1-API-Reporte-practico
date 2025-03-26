import express from 'express';
import bodyParser from 'body-parser';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

// Configuración de __dirname para módulos ES
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

// a. Constante recetaJSON con el nuevo contenido del JSON
const recetaJSON = `
[
    {
        "id": "0001",
        "tipo": "taco",
        "nombre": "Taco lechon",
        "precio": 20.00,
        "ingredientes": {
            "proteina": {
                "nombre": "Puerco",
                "preparacion": "Horneado"
            },
            "salsa": {
                "nombre": "Tomate verde",
                "picor": "Medio"
            },
            "acompañamientos": [
                {
                    "nombre": "Cebolla",
                    "cantidad": "1 cucharada",
                    "ingredientes": [
                        "Cebolla blanca",
                        "Cilantro",
                        "Naranja",
                        "Sal"
                    ]
                },
                {
                    "nombre": "Guacamole",
                    "cantidad": "2 cucharadas",
                    "ingredientes": [
                        "Aguacate",
                        "Jugo de limon",
                        "Sal",
                        "Cebolla",
                        "Cilantro"
                    ]
                }
            ]
        }
    },
    {
        "id": "0002",
        "tipo": "taco",
        "nombre": "Tacos al pastor",
        "precio": 22.00,
        "ingredientes": {
            "proteina": {
                "nombre": "Cerdo",
                "preparacion": "Trompo (adobado y asado vertical)"
            },
            "salsa": {
                "nombre": "Salsa roja",
                "picor": "Alto"
            },
            "acompañamientos": [
                {
                    "nombre": "Piña",
                    "cantidad": "2 cubos"
                },
                {
                    "nombre": "Cebolla",
                    "cantidad": "1 cucharada",
                    "ingredientes": [
                        "Cebolla morada",
                        "Cilantro",
                        "Limón",
                        "Sal"
                    ]
                }
            ]
        }
    },
    {
        "id": "0003",
        "tipo": "taco",
        "nombre": "Tacos de cabeza de res",
        "precio": 18.00,
        "ingredientes": {
            "proteina": {
                "nombre": "Cabeza de res",
                "preparacion": "Cocida"
            },
            "salsa": {
                "nombre": "Salsa verde cruda",
                "picor": "Bajo"
            },
            "acompañamientos": [
                {
                    "nombre": "Limones",
                    "cantidad": "2 gajos"
                },
                {
                    "nombre": "Salsa borracha",
                    "cantidad": "1 cucharada"
                }
            ]
        }
    },
    {
        "id": "0004",
        "tipo": "taco",
        "nombre": "Tacos de cochinita",
        "precio": 21.00,
        "ingredientes": {
            "proteina": {
                "nombre": "Cerdo (cochinita)",
                "preparacion": "Pibil (achiote y naranja)"
            },
            "salsa": {
                "nombre": "Salsa xnipec",
                "picor": "Muy alto"
            },
            "acompañamientos": [
                {
                    "nombre": "Cebolla morada encurtida",
                    "cantidad": "1 cucharada"
                },
                {
                    "nombre": "Chile habanero",
                    "cantidad": "1 aro (opcional)"
                }
            ]
        }
    }
]
`;

// b. Deserializar el JSON a objeto JavaScript
const recetasTacos = JSON.parse(recetaJSON);

// Middlewares
app.use(bodyParser.urlencoded({ extended: true })); // Para formularios
app.use(bodyParser.json()); // d. Middleware para datos JSON en solicitudes
app.use(express.static(__dirname + '/public')); // c. Servir archivos estáticos desde public

// Ruta para la página principal
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// e. Handler GET para obtener receta de taco específico (ahora busca por ID o nombre)
app.get('/receta/:busqueda', (req, res) => {
  const busqueda = req.params.busqueda.toLowerCase();
  
  const elegirTaco = recetasTacos.find(taco => 
    taco.id.toLowerCase() === busqueda || 
    taco.nombre.toLowerCase().includes(busqueda) ||
    taco.ingredientes.proteina.nombre.toLowerCase().includes(busqueda)
  );
  
  res.json(elegirTaco || { error: "Receta no encontrada" });
});

// Nueva ruta para obtener todas las recetas
app.get('/recetas', (req, res) => {
  res.json(recetasTacos);
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});