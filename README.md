# moviplay

![movieapp-screenshots_big_iphone_](https://github.com/damoviz/moviplay/blob/master/capture.png)

### Download APK file
 - [Download from Google Drive - v1.0.0](https://drive.google.com/file/d/17tAlMFMA7r6HOHXcj2j63w4bxsB58TVN/view?usp=sharing)

## Funcionalidades de la App.
<li>En el Home veras las Secciones de Popular, Upcoming y Toprated de peliculas</li>
<li>Ver el detallé de cada película</li>
<li>Ver el trailer de la película si la api la tiene cargada.</li>
<li>Buscador de películas por nombre o elegir la categoría</li>


## Vistas
La App se compone de 4 vistas principales:
<br>
<li><strong>app/screens/HomeScreen</strong> :Contiene la pantalla principal de la app, mostrando las 3 secciones Popular, Upcoming y Toprated(se deslizan Horizontalmente cada una), un Header y un Tabbar.</li>
<li><strong>app/screens/MovieDetailsScreen</strong> :Muestra todo el detalle de la película, para ver todas las imagenes dar clic en la principal y se puede ver el trailer de la película dando clic en el icono de play.</li>
<li><strong>app/screens/MovieListScreen</strong> :Para ver todas las películas de una categoría de una forma mas amplia, dar clic en ver todas.</li>
<li><strong>app/screens/SearchScreen</strong> :Buscador de películas por nombre o elegir la categoría.</li>

##Negocio
<br>
<li><strong>app/services/Api</strong> :Se configura la url, el key y el idioma y gestiona todos los request hacia la Api.</li>

## Capa Persistencia
<br>
<li><strong>React</strong> guarda automaticamente en su estado todo lo que hayas cargado al momento de tener conexion, luego puedes entrar sin conexion y hará una especie de offline automático.</li>

--------------------------------------

# Preguntas Realizadas
<strong>1. En qué consiste el principio de responsabilidad única? Cuál es su propósito?</strong>
<br>
Garantizar que cada clase o modulo haga una única función o una sola responsabilidad, esto hace que tu aplicación sea de calidad, haciéndola legible y mantenible en el tiempo.
<br>
<strong>2. Qué características tiene, según su opinión, un “buen” código o código limpio? </strong>
<br>
- Fácil de leer.
- Fácil de mantener.
- Hacer un buen testeo.


--------------------------------------

# Desarrollado por
<p>Edgar Daniel Mogollón - 14 Mayo 2019</p>
