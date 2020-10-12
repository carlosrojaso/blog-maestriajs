---
layout: post
title: "Testing en Angular/Ionic"
date: 2017-10-17
tags: [testing, ionic2]
categories: tips
author: nicobytes
video: true
cover: "https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-10-17-testing-with-ionic-angular%2Fcover.jpg?alt=media&token=13d19c79-7044-48c9-b94a-d7422d8dd4a6"
editname: "ionic2/2017-10-17-testing-with-ionic-angular.md"
---

> Crear grandes productos que agreguen valor y mantener un producto de calidad para los clientes es un gran reto, las **pruebas unitarias** aseguran que esto sea más fácil y una de las mejores estrategias es aplicando Desarrollo guiado por pruebas, más conocido por sus siglas en inglés **TDD (Test Driven Development)**
<!--summary-->

<img width="1024" height="512" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-10-17-testing-with-ionic-angular%2Fcover.jpg?alt=media&token=13d19c79-7044-48c9-b94a-d7422d8dd4a6">

 

Mantener la calidad del código y más aún asegurar la entrega de un gran producto no es cosa fácil, aparte de estar preocupado porque el producto resuelva un problema, debemos asegurar que en la entrega continua de valor no se presenten errores o se pasen ciertos bugs a producción y que el usuario final no llegue a experimentar fallas en el producto.

## Desarrollo guiado por pruebas (TDD)

Todos queremos evitar que los problemas y bugs aparezcan, lo cual es **IMPOSIBLE**, los problemas son parte de nuestra condición humana, pero lo que si está en nuestro completo dominio es la gestión del riesgo, con esto podemos evitar que aparezcan problemas de forma inesperada, detectar problemas a tiempo o mitigar su impacto.

Y precisamente es lo que queremos a la hora de desarrollar un producto, queremos evitar que los usuarios experimenten errores en nuestro producto o que al menos tengamos las herramientas necesarias para detectar a tiempo un posible problema, por eso existen varios ambientes de desarrollo como por ejemplo: *production*, *staging*, *tests* y *develop*.


<div class="row">
  <div class="col col-100 col-md-80 col-lg-80">
    <img width="600" height="447" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Ftdd%2F1-TeKrkWmFnrz84EnYxyD7VA.png?alt=media">
  </div>
</div>


Aquí es donde viene la puesta en marcha de TDD (Desarrollo guiado por pruebas) lo que va permitir mejorar la calidad de nuestro producto y nuestro código (y por consecuencia ser mejores profesionales).

Aplicando TDD vas a obtener beneficios para ti (*podrás irte un fin de semana tranquilo sin que algo pueda estallar*) y para el producto. Algunas de las ventajas principales:

- Sabes que tu código funciona
- Refactorización
- Un gran producto ❤

<div class="row">
  <div class="col col-100 col-md-50 col-lg-50">
    <img width="371" height="343" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Ftdd%2F1-SY2qSO11sdH11x9d5dweug.gif?alt=media">
  </div>
</div>

TDD se basa en un círculo de iteraciones en el cual primero escribimos las pruebas, luego construimos el código que cumpla con todas las pruebas escritas, por último refactorizamos (eliminando la redundancia).

**Pruebas unitarias** es probar partes aisladas de nuestro código para asegurar que el producto funcione correctamente. Pero hay muchas más pruebas a las que debemos someter el producto.

<div class="row">
  <div class="col col-100 col-md-80 col-lg-80">
    <img width="619" height="160" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Ftdd%2F1-tresTrQ81DKVI7bZL2pugw.png?alt=media">
  </div>
</div>

Pero algo aún más importante, todo este trabajo es tiempo y esfuerzo por lo cual se debe manejar en paralelo al desarrollo del producto y por ende a la construcción de la propuesta de valor hacia los clientes. No se puede dejar la parte de testing para lo último, tiene que ser parte del desarrollo.

Para lograr gestionar todo este esfuerzo y tener un gran producto que los clientes amen, existe el método de Agile Testing que se basa en cuatro cuadrantes:

<div class="row">
  <div class="col col-100 col-md-50 col-lg-50">
    <img width="722" height="543" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Ftdd%2F1-QFNCtd8fmnm2BFKs9s7o7A.png?alt=media">
  </div>
</div>


1. **Acceptance Testing** ¿Estamos construyendo el producto correcto?
2. **Usability Testing** ¿Construimos el producto correcto?
3. **Unit Testing** ¿Lo estamos construyendo correctamente?
4. **Performance Testing** ¿Lo construimos de manera correcta?

En cada uno de los cuatro cuadrantes hay más tipos de pruebas pero éstas son las más usadas para cada cuadrante. Esto nos permitirá crear un producto de manera ágil y validando en cada paso qué es lo qué nuestros clientes quieren.

Puedes ver el #devHangout donde Stephanie Frias nos habla más sobre esta matriz.

<amp-youtube width="560" 
            height="315"
            class="responsive"
            data-videoid="wzSk6lSdTtg"></amp-youtube>

## Pruebas Unitarias 

Se trata de probar cada función o métodos de manera aislada e inyectando las dependencias que se necesiten en la prueba o simulando estas dependencias con objetos simulados, a esto se la llama Mocking.

Por ejemplo, si queremos probar una característica del producto, primero escribimos una prueba la cual contempla la forma correcta en la cual esa característica debería funcionar.

```js
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
```

Ya teniendo la prueba podemos escribir el código que cumpla con los requerimientos de la prueba.

```js
var calculator = {
	multiply: function( numberA, numberB ){
		return numberA * numberB;
	}
};
multipleTest1();
```

Con esto hemos probado que nuestra función cumple su propósito, para lo que fue diseñada. Otra ventaja es que podemos mejorar nuestro código con la refactorización, gracias al proceso entre escribir pruebas y construir código que cumpla esas pruebas podemos llegar a reducir el código de manera significativa y controlar ciertos escenarios.

```js
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
```

Resolviendo el requerimiento de forma más explícita y simple (Clean Code).

Si todos pusiéramos en práctica que el rol de testing no es un departamento aparte o un rol diferente, no tendríamos tantos problemas y estaríamos seguros que el producto se está construyendo correctamente.
Por último, algo que me ha sido de gran ayuda como mantra personal es lo siguiente:

> Siempre deja el código mejor de lo que lo encontraste

Recuerda ver nuestros artículos sobre testing:

- [Configuración de entorno](https://www.ion-book.com/blog/ionic2/unit-test-config-ionic/){:target="_blank"}
- [Introducción a Jasmine](https://www.ion-book.com/blog/ionic2/intro-jasmine/){:target="_blank"}
- [Providers](https://www.ion-book.com/blog/ionic2/uni-test-provider/){:target="_blank"}