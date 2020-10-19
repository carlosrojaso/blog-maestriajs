---
layout: post
title: "Web Components Nativos"
date: 2020-10-19
categories: javascript
author: carlosrojas
tags: [ecmascript, js]
cover: "https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2020-10-18-native-web-components%2FCover%20Blogs.png?alt=media&token=19b0c67c-6051-4cc4-a49a-1ff83c89c32b"
editname: 'javascript/2020-10-19-native-web-components.md'
versions:
  - title: 'EcmaScript'
    number: '6'
---
> Estos dias los Web Components son una forma natural de construir aplicaciones en la Web. Los tres frameworks más populares (Angular, React, Vuejs) usan este concepto como una pieza arquitectonica en sus Apps. Sabias que podemos usar este patron solo utilizando APIs de la Web Platform y el resultado son piezas que podemos utilizar en todos los proyectos de Frontend? En este articulo veremos como hacer tu primer Web Componente nativo y como utilizarlo.

<img width="1024" height="450" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2020-10-18-native-web-components%2FCover%20Blogs.png?alt=media&token=19b0c67c-6051-4cc4-a49a-1ff83c89c32b">

# Que son los Web Components ? 

Los Web Components son piezas aisladas para la interfaz del usuario (UI) que se pueden comunicar con otros elementos a través de **propiedades** y **eventos**. Pensemos por un momento en la etiqueta `<video>`, este elemento lo podemos agregar a cualquier proyecto solo agregandolo en nuestro `html`, podemos pasarle parametros como `width` o `height` y escuchar por eventos como `click`. En palabras más estrictas, podemos definir que los Web Components son un conjunto de Web Platform APIs que nos permitén construir etiquetas `HTML` que van a funcionar en los Web Browsers modernos y pueden ser usados con cualquier tecnologia en JavaScript.

Los Web Components se componen de cuatro especificaciones principalmente.

1 - <a href="https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements" target="_blank">Custom Elements.</a>

2 - <a href="https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM" target="_blank">Shadow DOM.</a>

3 - <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules" target="_blank">ES Modules.</a>

4 - <a href="https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_templates_and_slots" target="_blank">HTML Templates.</a>


## Por que usar Web Components ?

En la actualidad, todos los proyectos en el Frontend nos enfrentamos a dos grandes problemas que se pueden convertir en un agujero de **energia**, **tiempo** y **dinero** para las empresas. Estas son:

### Legado.

El legado es un problema bien conocido en el desarrollo de Software. Legado significa codigo antiguo que necesita ser actualizado para interoperar con proyectos modernos o herramientas de JavaScript.

### Framework Churn.

Las herramientas y frameworks en JavaScript cambián bastante rapido. Es usualmente estresante y agotador elegir el framework correcto nuestro nuevo proyecto porque no podemos adivinar cuanto tiempo permanecera relevante; Cuanto tiempo contaremos con el soporte de la comunidad y herramientas detras de esa relevancia. Entonces, **Framework Churn** significa ese problema de relevancia y como va a afectar nuestra inversión en entrenamiento y desarrollo sobre un conjunto de herramientas que se pueden convertir **codigo legado** rapidamente. Con Web Components estamos usando que probablemente va a estar por largo tiempo en Web Browsers y nos da muchos beneficios, como por ejemplo:

1 - Web Components son reusables y trabajan entre frameworks de JavaScript.

2 - Web Components pueden correr en todos los Web Browsers modernos.

3 - Web Components son facilmente mantenibles y estan preparados para el futuro principalmente porque son basados en especificaciones de la Web Platform.

## Como crear un Web Component ?

Para aprender sobre Web Components, empezaremos construyendo un componente que hace facil mostrar mensajes `errors/warnings`.  Este componente lo nombraremos `error-component` y recibira el mensaje en el contenido del elemento y el atributo `kind` que recibira si es un `error` o un `warning`.

Primero, vamos a crear un archivo `index.html` y agregaremos una estructura basica de HTML.

```
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Demo - error-component</title>
    </head>
    <body>
        <script>
        </script>
    </body>
</html>
```

Luego crearemos la clase `ErrorComponent` que extendera de `HTMLElement`, y usando el objeto `CustomElements`, vamos a definir el elemento `<error-component>`.

```
<!DOCTYPE html>
<html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Demo - error-component</title>
  </head>
  <body>
    <script>
    class ErrorComponent extends HTMLElement {
    }
    customElements.define('error-component', ErrorComponent);
    </script>
  </body>
</html>
```

Con esto, el Web Browser sabe que un nuevo elemento existe y que la clase `ErrorComponent` describe su comportamiento. Entonces, Podemos utilizar este nuevo elemento en nuestro `HTML`.

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Demo - error-component</title>
</head>
<body>
  <error-component>Default Message</error-component>
  <error-component kind="warning">Warning Message</error-component>
  <error-component kind="error">Error Message</error-component>
<script>
class ErrorComponent extends HTMLElement {
    constructor() {
        super();
    }
}
customElements.define('error-component', ErrorComponent);
</script>
</body>
</html>
```

Ahora en nuestro constructor() vamos a agregar el `Shadow DOM` con `this.attachShadow()`, y vamos a agregar los elementos `templates` y `container` a nuestro componente. También estamos usando un metodo estatico `template()` para obtener el markup y los estilos. Si tu recuerdas, nuestro componente recibe el atributo `kind` el cual puede ser `error` o `warning`, estamos obteniendo este valor con el `this.getAttribute()` y usando esto para activar el `<template>` que queremos mostrar usando `this.templates.querySelector()` y el metodo `template.content.cloneNode(true)`.

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Demo - error-component</title>
</head>
<body>
  <error-component>Default Message</error-component>
  <error-component kind="warning">Warning Message</error-component>
  <error-component kind="error">Error Message</error-component>
<script>
class ErrorComponent extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({mode: 'open'});
        this.templates = document.createElement('div');
        this.container = document.createElement('div');
        this.root.appendChild(this.templates);
        this.root.appendChild(this.container);
        this.templates.innerHTML = ErrorComponent.template();
        const kind = this.getAttribute(`kind`) || `none`;

        const template = this.templates.querySelector(`template.${kind}-type`);
        if (template) {
            const clone = template.content.cloneNode(true);
            this.container.innerHTML = '';
            this.container.appendChild(clone);
        }
    }

}
customElements.define('error-component', ErrorComponent);
</script>
</body>
</html>
```

`<template>` nos deja definir placeholders en nuestro componente que no se van a renderizar hasta que lo activemos. Entonces, vamos a definir el metodo `template()` utilizando tres `template` y sus estilos.

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Demo - error-component</title>
</head>
<body>
  <error-component>Default Message</error-component>
  <error-component kind="warning">Warning Message</error-component>
  <error-component kind="error">Error Message</error-component>
<script>
class ErrorComponent extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({mode: 'open'});
        this.templates = document.createElement('div');
        this.container = document.createElement('div');
        this.root.appendChild(this.templates);
        this.root.appendChild(this.container);
        this.templates.innerHTML = ErrorComponent.template();
        const kind = this.getAttribute(`kind`) || `none`;

        const template = this.templates.querySelector(`template.${kind}-type`);
        if (template) {
            const clone = template.content.cloneNode(true);
            this.container.innerHTML = '';
            this.container.appendChild(clone);
        }
    }

   static template () {
        return `
        <template class="warning-type">
            <style>
                .warning {
                    background-color: yellow;
                    padding: 15px;
                    color: black;
                }
            </style>
            <div class="warning">
                <slot>Error component<slot>
            </div>
        </template> 
        <template class="error-type">
            <style>
                .error {
                    background-color: red;
                    padding: 15px;
                    color: black;
                }
            </style>
            <div class="error">
                <slot>Error component<slot>
            </div>
        </template> 
        <template class="none-type">
            <style>
                .none {
                    background-color: gray;
                    padding: 15px;
                    color: black;
                }
            </style>
            <div class="none">
                <slot>Error component<slot>
            </div>
        </template>    
        `;
    }

}
customElements.define('error-component', ErrorComponent);
</script>
</body>
</html>
```

Si abrimos el archivo `index.html` que acabamos de crear veremos el resultado con los estilos asociados dependiendo del tipo de mensaje que pasamos con `kind`.


<img width="700" height="209" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2020-10-18-native-web-components%2F1_OvmszxCqHzK23ogOHHo-HQ.png?alt=media&token=9f534a60-04f9-47b8-b4cd-9e997c8b2577"/>

Si este contenido te parece útil y me quieres ayudar a hacer mas, considera apoyarme en [Patreon](https://www.patreon.com/carlosrojas_o).

Bueno eso es todo por ahora. Espero sea de utilidad :)