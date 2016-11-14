---
layout: post
title: "Testing en Angular 2 / Ionic 2"
date: 2016-10-30
tags: [testing, ionic2]
categories: tips
comments: true
author: nicobytes
cover: "https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Ftdd%2Ftdd.jpg?alt=media"
---

> Crear grandes productos que agreguen valor y mantener un producto de calidad para los clientes es un gran reto, las **pruebas unitarias** aseguran que esto sea más fácil y una de las mejores estrategias es aplicando Desarrollo guiado por pruebas, más conocido por sus siglas en inglés **TDD (Test Driven Development)**

<img class="img-responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Ftdd%2Ftdd.jpg?alt=media" alt="pouchdb">

Mantener la calidad del código y más aún asegurar la entrega de un gran producto no es cosa fácil, aparte de estar preocupado porque el producto resuelva un problema, debemos asegurar que en la entrega continua de valor no se presenten errores o se pasen ciertos bugs a producción y que el usuario final no llegue a experimentar fallas en el producto.

## Desarrollo guiado por pruebas (TDD)

Todos queremos evitar que los problemas y bugs aparezcan, lo cual es **IMPOSIBLE**, los problemas son parte de nuestra condición humana, pero lo que si está en nuestro completo dominio es la gestión del riesgo, con esto podemos evitar que aparezcan problemas de forma inesperada, detectar problemas a tiempo o mitigar su impacto.

Y precisamente es lo que queremos a la hora de desarrollar un producto, queremos evitar que los usuarios experimenten errores en nuestro producto o que al menos tengamos las herramientas necesarias para detectar a tiempo un posible problema, por eso existen varios ambientes de desarrollo como por ejemplo: *production*, *staging*, *tests* y *develop*.

<img class="img-responsive center-block" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Ftdd%2F1-TeKrkWmFnrz84EnYxyD7VA.png?alt=media" alt="tdd">

Aquí es donde viene la puesta en marcha de TDD (Desarrollo guiado por pruebas) lo que va permitir mejorar la calidad de nuestro producto y nuestro código (y por consecuencia ser mejores profesionales).

Aplicando TDD vas a obtener beneficios para ti (*podrás irte un fin de semana tranquilo sin que algo pueda estallar*) y para el producto. Algunas de las ventajas principales:

- Sabes que tu código funciona
- Refactorización
- Un gran producto ❤

<img class="img-responsive center-block"  src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Ftdd%2F1-SY2qSO11sdH11x9d5dweug.gif?alt=media" alt="tdd">

TDD se basa en un círculo de iteraciones en el cual primero escribimos las pruebas, luego construimos el código que cumpla con todas las pruebas escritas, por último refactorizamos (eliminando la redundancia).

**Pruebas unitarias** es probar partes aisladas de nuestro código para asegurar que el producto funcione correctamente. Pero hay muchas más pruebas a las que debemos someter el producto.

<img class="img-responsive center-block"  src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Ftdd%2F1-tresTrQ81DKVI7bZL2pugw.png?alt=media" alt="tdd">

Pero algo aún más importante, todo este trabajo es tiempo y esfuerzo por lo cual se debe manejar en paralelo al desarrollo del producto y por ende a la construcción de la propuesta de valor hacia los clientes. No se puede dejar la parte de testing para lo último, tiene que ser parte del desarrollo.

Para lograr gestionar todo este esfuerzo y tener un gran producto que los clientes amen, existe el método de Agile Testing que se basa en cuatro cuadrantes:

<img class="img-responsive center-block" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Ftdd%2F1-QFNCtd8fmnm2BFKs9s7o7A.png?alt=media" alt="tdd">

1. **Acceptance Testing** ¿Estamos construyendo el producto correcto?
2. **Usability Testing** ¿Construimos el producto correcto?
3. **Unit Testing** ¿Lo estamos construyendo correctamente?
4. **Performance Testing** ¿Lo construimos de manera correcta?

En cada uno de los cuatro cuadrantes hay más tipos de pruebas pero éstas son las más usadas para cada cuadrante. Esto nos permitirá crear un producto de manera ágil y validando en cada paso qué es lo qué nuestros clientes quieren.

Puedes ver el #devHangout donde Stephanie Frias nos habla más sobre esta matriz.

<iframe width="560" height="315" class="center-block" src="https://www.youtube.com/embed/wzSk6lSdTtg" frameborder="0" allowfullscreen></iframe>

## Pruebas Unitarias 

Se trata de probar cada función o métodos de manera aislada e inyectando las dependencias que se necesiten en la prueba o simulando estas dependencias con objetos simulados, a esto se la llama Mocking.

Por ejemplo, si queremos probar una característica del producto, primero escribimos una prueba la cual contempla la forma correcta en la cual esa característica debería funcionar.

{% highlight js linenos%}
function multipleTest1() {
	// Test
	let result = calculator.multiply( 3, 3 );
	//Assert Result is expected
	if( result === 9 ){
		console.log( "Test Passed" );
	}else{
		console.log( "Test Failed" );
	}
}
{% endhighlight %}

Ya teniendo la prueba podemos escribir el código que cumpla con los requerimientos de la prueba.

{% highlight js linenos%}
var calculator = {
	multiply: function( numberA, numberB ){
		return numberA * numberB;
	}
};
multipleTest1();
{% endhighlight %}

Con esto hemos probado que nuestra función cumple su propósito, para lo que fue diseñada. Otra ventaja es que podemos mejorar nuestro código con la refactorización, gracias al proceso entre escribir pruebas y construir código que cumpla esas pruebas podemos llegar a reducir el código de manera significativa y controlar ciertos escenarios.

{% highlight js linenos%}
/* Avoid */
var abc = function(z) {
	let x = false;
	if( z > 10 ){
		return true;
	}
	return x;
};
/* Recommend */
var isTenOrGreater = function( value ){
	if( value > 10 ) return true;
	return false;
};
/* More Recommend */
// Why does this method exist in the first place?
var isTenOrGreater = function( value ){
	return value > 10;
}
{% endhighlight %}

Resolviendo el requerimiento de forma más explícita y simple (Clean Code).

Si todos pusiéramos en práctica que el rol de testing no es un departamento aparte o un rol diferente, no tendríamos tantos problemas y estaríamos seguros que el producto se está construyendo correctamente.
Por último, algo que me ha sido de gran ayuda como mantra personal es lo siguiente:

> Siempre deja el código mejor de lo que lo encontraste

En la parte 2 vamos a entrar en materia y vamos a mirar frameworks como **Jasmine** o **Mocha** y la preparación del entorno con **Karma** para hacer testing con Angular2 / Ionic 2.