# SERVIDOR - CleanAirly
## Índice
- Descripción
- Instalación
- Instrucciones de uso
- Test automático
- Advertencias
- Vínculos

## Descipción
Repositorio para el Software del Servidor API REST y Base de Datos desarrollado por CleanAirly.
## Instalación
- Descargar el .zip del repositorio y extraer los archivos.
- Descargar e instalar XAMP (si no se tiene instalado).
- Descargar e instalar Node.js (si no se tiene instalado).
## Instrucciones de uso
1. Averiguar la IPv4 de nuestro equipo en la red.
2. Acceder al archivo **server.js** situado dentro de **src** y reemplazar la IPv4 que aparece por la nuestra.
3. Acceder a un terminal dentro del directorio y ejecutar **npm run server** para inicializarlo.
4. Instalar XAMPP, inizializar Apache y MySQL y acceder al panel de administración de MySQL.
5. Crear una nueva base de datos con nombre **ozono** y importar el contenido de **ozone_data.sql** situado dentro de **docs**.

Si todo ha ido bien el servidor y la base de datos deberían de estar funcionando correctamente.

_En caso de problemas contactar con algún miembro del proyecto._
## Test automático
- Para arrancar los tests de la lógica de la base de datos utilizaremos el siguiente comando:

npx mocha test.js
- Para arrancar los tests de la API REST utilizaremos el siguiente comando:

npx mocha testAPI.js
## Advertencias
Para el funcionamiento correcto de cualquier comando deberas situarte el directorio del package de cada modulo.
## Vínculos
Más respositorios del proyecto:
- [Android](https://github.com/CleanAirly/Android)
- [Arduino](https://github.com/CleanAirly/Arduino)
- [Servidor](https://github.com/CleanAirly/Servidor)
- [Web](https://github.com/CleanAirly/Web)
