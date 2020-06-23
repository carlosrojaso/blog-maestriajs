---
layout: post
title: "Principios de CSS"
date: 2020-06-23
categories: css
author: carlosrojas
tags: [css]
cover: "https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2020-06-23-Principios-CSS%2FCover%20Blogs-2.png?alt=media&token=c932ac39-1ced-46f6-8d47-7259014d398a"
editname: 'css/2020-06-23-Principios-CSS.md'
versions:
  - title: 'css'
    number: '3'
---

> `CSS` significa Cascading Style Sheets y permite describir propiedades de los elementos HTML.

<amp-img width="810" height="450" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2020-06-23-Principios-CSS%2FCover%20Blogs-2.png?alt=media&token=c932ac39-1ced-46f6-8d47-7259014d398a"></amp-img>

{% include general/net-promoter-score.html %} 

Continuando con nuestro ejemplo del edificio, pensemos que los cimientos ya fueron construidos y hemos agregado las paredes de nuestro edificio, esto no se ve agradable para que las personas lo habiten, es por esto que debemos agregar detalles a esas paredes como mamposteria, puertas, ventanas y demas detalles que volveran una experiencia agradable usar nuestro edificio.

<amp-img width="720" height="405" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2020-06-23-Principios-CSS%2F2.jpg?alt=media&token=e63d4897-929b-42eb-adb4-520a1300d7c9"></amp-img>

Los estilos en CSS se describén con selectores y propiedades como podemos ver en un ejemplo simple: 

```html
body {
  background-color: lightblue;
}

h1 {
  color: white;
  text-align: center;
}

p {
  font-family: verdana;
  font-size: 20px;
}
```

Los estilos funcionan en forma de cascada y dependiendo de como definamos nuestras propiedades, las propiedades pueden ser sobre escritas por otras mas recientes que tengan la misma prioridad.

<h3>Especificidad</h3>

La especificidad significa el grado de prioridad que una propiedad tiene sobre la descripcio de un elemento, esto tiene una forma de calcularse matemáticamente asignandole 1000 para atributos de estilos en linea, agregando 100 para cada atributo de ID, agregando 10 por cada atributo, clase or seudo clase, y agregando 1 por cada nombre de elemento o seudo elemento.

La jerarquia de la especificidad la podemos organizar así.

* Inline styles 
* IDs 
* Classes, attributes and pseudo-classes -
* Elements and pseudo-elements 

Nota: Evita utilizar Inline styles e !important.

<h3>Selectores en CSS</h3>

Los selectores nos permiten agregar estilos a los elementos HTML. Los selectores que tienen el `#` los llamamos selectores de ID,
Los selectores que tienen el `.` los llamamos selectores de clase y los selectores que tienen el nombre de la etiqueta, selectores de
elementos.

```html
body{
    padding: 0;
    margin: 0;
}

header{
  
}

#presentation{
 background-color: blue;
}

.profile{
  background-color: red;
}

main > section{
   
}

#name, #email, #message{
   
}

.profile-buttons{

}

.profile-buttons a:last-child{
    background-color: blue;
}
```

<h3>Seudoclases en CSS</h3>

Una seudoclase nos permite especificar un estado especial de un elemento. Lo definimos como la etiqueta seguida del `:` y el estado.

```html
/* unvisited link */
a:link {
  color: #FF0000;
}

/* visited link */
a:visited {
  color: #00FF00;
}

/* mouse over link */
a:hover {
  color: #FF00FF;
}

/* selected link */
a:active {
  color: #0000FF;
}
```

<h3>Seudoelementos en CSS</h3>

Los Seudoelementos se utilizan para especificar los estilos para partes especificas de un elemento. Lo definimos con el elemento seguido
por `::` y la acción.

```html
p::first-letter {
  color: #ff0000;
  font-size: xx-large;
}

p::first-line {
  color: #0000ff;
  font-variant: small-caps;
}
```

<h3>Modelo de Caja</h3>

Los elementos HTML pueden ser considerados como cajas con Margen, Borde, Padding y Contenido.

<amp-img width="1281" height="415" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2020-06-23-Principios-CSS%2FScreen%2520Shot%25202020-06-19%2520at%25209.41.59%2520PM.png?alt=media&token=23db7c42-79f6-41d9-a9e2-ed2a024eb2bb"></amp-img>

La Margen es la distancia entre un elemento y otro.

El borde, define los limites del elemento.

El Padding es la distancia entre el borde y el contenido.

Con esta información espero puedas entender mejor los CSS que encuentras, o definir tus propios CSS para tus proyectos.

Si este contenido te parece útil y me quieres ayudar a hacer mas, considera apoyarme en [Patreon](https://www.patreon.com/carlosrojas_o).

Bueno eso es todo por ahora. Espero sea de utilidad :)