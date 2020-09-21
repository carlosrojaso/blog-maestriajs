---
layout: post
title: "Principios de HTML"
date: 2020-06-22
categories: html
author: carlosrojas
tags: [html]
cover: "https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2020-06-22-Principios-HTML%2FCover%20Blogs.png?alt=media&token=12a617e8-bd8e-4c0c-801e-7c44ceaef383"
editname: 'html/2020-06-22-Principios-HTML.md'
versions:
  - title: 'html'
    number: '5'
---

> `HTML` significa Hyper Text Markup Language y funciona con algo llamada etiquetas HTML.

<amp-img width="810" height="450" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2020-06-22-Principios-HTML%2FCover%20Blogs.png?alt=media&token=12a617e8-bd8e-4c0c-801e-7c44ceaef383"></amp-img>

{% include general/net-promoter-score.html %} 

Para entender un poco en la importancia del HTML, pensemos por un momento en la realización de un edificio, cuando se esta construyendo uno nuevo se comienza por la estructura o los cimientos.

<amp-img width="720" height="405" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2020-06-22-Principios-HTML%2F1.png?alt=media&token=e3262c0e-be48-40d0-8276-332f011901da"></amp-img>

De la misma forma utilizamos el HTML en nuestros proyectos, nos va a permitir dar los lineamientos sobre los que se construira todo nuestro sitio Web.

Usualmente las etiquetas se abren con <tagname> y se cierran con </tagname>. 

```html
<tagname>Contenido...</tagname>
```

El DOCTYPE es la primera linea en nuestro documento HTML y le dice al navegador que especificación vamos a utilizar. Miremos el siguiente ejemplo sencillo.

```html
<!DOCTYPE html>
<html>
<head>
    <title>Page Title</title>
</head>
<body>

    <h1>My First Heading</h1>
    <p>My first paragraph.</p>

</body>
</html>
```

Esto seria todo lo que necesitarias para crear un documento HTML simple y el navegador lo entenderia. Graficamente lo podemos ver asi:

<amp-img width="1255" height="521" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2020-06-22-Principios-HTML%2FScreen%2520Shot%25202020-06-19%2520at%25205.06.23%2520PM.png?alt=media&token=3ff64cde-db3d-4020-b918-7ce4e2b50532"></amp-img>

Podemos ver que `<html></html>` contiene todo nuestro documento y existén dos grandes bloques `<head></head>` y `<body></body>`.

El `<head></head>` es un elemento que nos permite brindar información sobre la metadata (información sobre lo que contiene) de nuestro documento.

`<head>` es un contenedor para los elementos <title>, <meta>, <style>, <script> y <base>.

```html
<head>
  <title>Page Title</title>
  <meta charset="UTF-8">
  <meta name="description" content="Free Web tutorials">  
  <meta name="keywords" content="HTML,CSS,XML,JavaScript">  
  <meta name="author" content="John Doe">
  <link rel="stylesheet" href="mystyle.css">
</head>
```

{% include blog/subscribe.html %}

En el `<body>` definimos los elementos que van a ser visibles en nuestro documento tales como headings, paragraphs, images, hyperlinks, tables, lists, etc. Los elementos que se encuentrén aqui son los elementos visibles en el navegador.

```html
<body>  
    <heade>
        <nav>About | Resume | Works | Blog | Contact </nav>  
    </header>  
    <main>
        <section>
            <div></div>
            <div></div>
            <div></div>
        </section>    
        <section>
            <article></article>  
            <article></article>  
            <article></article>
            <article></article>
            <article></article>
        </section>
        <section>
            <article>
                <section>
                    <article></article>
                    <article></article>
                    <article></article>
                </section>
                <section>
                    <article></article>
                    <article></article>
                    <article></article>
                </section>
            </article>    
            <article></article>    
        </section>
        <section>
            <article></article>
        </section>
        <section>
            <article></article>
        </section>
        <section>
            <article></article>
            <article></article>
        </section>
    </main> 
</body>
```

Con esta información ya puedes crear un documento simple en HTML y debe ser visible en cualquier navegador.

Si este contenido te parece útil y me quieres ayudar a hacer mas, considera apoyarme en [Patreon](https://www.patreon.com/carlosrojas_o).

Bueno eso es todo por ahora. Espero sea de utilidad :)