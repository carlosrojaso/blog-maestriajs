---
layout: post
title: "ChatQL con Appsync."
keywords: "AWS Appsync, Angular, Material"
date: 2019-11-15
tags: [angular]
categories: angular
author: carlosrojas
repo: https://github.com/aws-samples/aws-mobile-appsync-chat-starter-angular
cover: "https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2019-11-15-angular-chatql-appsync%2Fcover-chatql.png?alt=media&token=5fb1af99-f524-4b3e-aebf-4c0f8fea6bbb"
editname: "angular/2019-11-15-angular-chatql-appsync.md"
video: true
versions:
  - title: 'angular/core'
    number: '7.0.0'
  - title: 'aws-appsync'
    number: '1.0.12'
---

> Existén ocasiones en que queremos desarrollar Web Apps sin necesidad de preocuparnos por el `API`, el `Offline` y la `autenticación`. Adicionalmente, hay nuevas tecnologias como `GraphQL` que nos dan una capa extra de control en nuestro App, `aws-appsync` y `amplify` nos ayuda con esto sin necesidad de mucho desarrollo en el `servidor`.

<!--summary-->

<img width="820" height="312" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2019-11-15-angular-chatql-appsync%2Fcover-chatql.png?alt=media&token=5fb1af99-f524-4b3e-aebf-4c0f8fea6bbb">



## ¿ Que es ChatQL ?

`ChatQL` es una App de ejemplo en Angular realizada por el equipo de `AWS Appsync` la cual es el `starter` para un chat en tiempo real que podemos utilizar como adaptarla a nuestras necesidades utilizando la infraestructura de `Amazon`.

<amp-youtube width="560" 
            height="315"
            class="responsive"
            data-videoid="F2Oc_8R73Ao"></amp-youtube>

Algunas de sus caracteristicas son:

- Service Worker (PWA).
- GraphQL.
- Offline.
- Auth.

## Arquitectura.

La arquitectura global de la app es como podemos en la grafica.

<img width="1024" height="634" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2019-11-15-angular-chatql-appsync%2F1.png?alt=media&token=ac57604d-192d-4d5b-ab81-aedadde16906">

Vemos que esta utilizando `cognito` un sistema de autenticación de `AWS` el cual envia un token y nos permite empezar poder realizar operaciones a través de `GraphQL` con `AWS Appsync` y los almacena en su sistema `DynamoDB`.

## Instalando el demo.

El proceso de instalación esta bien descrito [acá](https://github.com/aws-samples/aws-mobile-appsync-chat-starter-angular#getting-started) por lo tanto me saltare este paso.

También te puedes ayudar con este [post](/blog/angular/angular-material-appsync/) y [este](/blog/angular/angular-aws-appsync-graphql/).

## Entendiendo la App.

Inicialmente puedes ver la App dividida en 4 grandes bloques `home`, `nav`, `footer` y el modulo `chat-app`.

<img width="713" height="390" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2019-11-15-angular-chatql-appsync%2F4.png?alt=media&token=08a43be5-e042-4b44-8d19-a6e40c200440">

Inicialmente se carga el componente `home` el cual permite realizar la autenticación con el componente

```html
<amplify-authenticator></amplify-authenticator>
```

El cual lo hace parte de `Amplify`, y permite crear, autenticar y resetear usuarios.

El componente `nav` basicamente es un pequeño componente de navegacion que nos permite loguearnos o desloguearnos.

```html
{% raw %}
  <ul class="nav navbar-nav">
    <li *ngIf="isLoggedIn" class="nav-item">
        <button class="btn btn-primary" (click)="signOut()">Sign Out <i class="ion-log-in" data-pack="default" data-tags="sign in"></i></button>
    </li>
  </ul>
{% endraw %}
```

El componente `footer` es simplemente un componente que muestra la información de píe de pagina.

```html
{% raw %}
  <nav class="navbar fixed-bottom navbar-light bg-light">
    <div class="container">
      <span class="text-muted mx-auto">
          Powered by <img class="awslogo mx-1" width='35px' src="../assets/img/AWS_logo_RGB.png">AppSync
      </span>
    </div>
  </nav>
{% endraw %}
```

y por último tenemos el bloque de `chat-app` que es un modulo con distintos bloques en su interior.

<img width="1024" height="392" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2019-11-15-angular-chatql-appsync%2F3.png?alt=media&token=ace2387b-60a1-4905-9762-9f3f35158df3">

Con `./src/app/chat-app/chat-user-list` se genera una lista de usuarios que los demas pueden ver para comenzar una nueva conversación. Con `./src/app/chat-app/chat-convo-list` puede retornar a una conversacion existente. Con `./src/app/chat-app/chat-message-view/` tienes una suscripción de los mensajes de una conversación.



Lo importante en fijarse en la implementación es como hacen las mutaciones y como realizan los queries para que funcionen `offline`.

Por ejemplo en `./src/app/chat-app/chat-message-view/` traén la informacion de los mensajes de esta manera.

```ts
loadMessages(event = null, fetchPolicy = 'cache-and-network') {
    if (event) { event.stopPropagation(); }
    const innerObserable = this.appsync.hc().then(client => {
      console.log('chat-message-view: loadMessages', this._conversation.id, fetchPolicy);
      const options = {
        query: getConversationMessages,
        fetchPolicy: fetchPolicy,
        variables: {
          conversationId: this._conversation.id,
          first: constants.messageFirst
        }
      };

      const observable: ObservableQuery<MessagesQuery> = client.watchQuery(options);

      observable.subscribe(({data}) => {
        console.log('chat-message-view: subscribe', data);
        if (!data) { return console.log('getConversationMessages - no data'); }
        const newMessages = data.allMessageConnection.messages;
        this.messages = [...newMessages].reverse();
        this.nextToken = data.allMessageConnection.nextToken;
        console.log('chat-message-view: nextToken is now', this.nextToken ? 'set' : 'null');
      });

      this.subscription = observable.subscribeToMore({
        document: subscribeToNewMessages,
        variables: { 'conversationId': this._conversation.id },
        updateQuery: (prev: MessagesQuery, {subscriptionData: {data: {subscribeToNewMessage: message }}}) => {
          console.log('subscribeToMore - updateQuery:', message);
          return unshiftMessage(prev, message);
        }
      });
      this.observedQuery = observable;
      return observable;
    });
    return from(innerObserable);
  }
```

basicamente hidratan el `client` con `this.appsync.hc().then()` y luego realizan el query que obtiene un `ObservableQuery` que luego podemos utilizar en nuestra UI.

También en `./src/app/chat-app/chat-input/chat-input.component.ts` realizan la creación de un mensajes que soporta el `offline`.

```ts
createNewMessage() {
    if (!this.message || this.message.trim().length === 0) {
      this.message = '';
      return;
    }
    const id = `${new Date().toISOString()}_${uuid()}`;
    const message: Message = {
      conversationId: this.conversation.id,
      content: this.message,
      createdAt: id,
      sender: this.senderId,
      isSent: false,
      id : id
    };
    console.log('new message', message);
    this.message = '';
    this.appsync.hc().then(client => {
      client.mutate({
        mutation: createMessage,
        variables: message,

        optimisticResponse: () => ({
          createMessage: {
            ...message,
            __typename: 'Message'
          }
        }),

        update: (proxy, {data: { createMessage: _message }}) => {

          const options = {
            query: getConversationMessages,
            variables: { conversationId: this.conversation.id, first: constants.messageFirst }
          };

          const data = proxy.readQuery(options);
          const _tmp = unshiftMessage(data, _message);
          proxy.writeQuery({...options, data: _tmp});
        }
      }).then(({data}) => {
        console.log('mutation complete', data);
      }).catch(err => console.log('Error creating message', err));
    });
    Analytics.record('Chat MSG Sent');
  }
```

Acá podemos observar que igual hidratan el `client` y luego realizan la mutación realizando una respuesta `optimista` y realizando las actualizaciones que deberia hacer esa mutación en nuestro local.

Creo que con este entendimiento basico puedes comenzar a explorar este ejemplo que creo es de los pocos que pude encontrar para Angular con gran complejidad.

## Referencias
[https://aws-amplify.github.io/docs/js/api#offline-mutations](https://aws-amplify.github.io/docs/js/api#offline-mutations)

[https://aws.amazon.com/es/blogs/mobile/building-a-serverless-real-time-chat-application-with-aws-appsync/](https://aws.amazon.com/es/blogs/mobile/building-a-serverless-real-time-chat-application-with-aws-appsync/)

[https://github.com/aws-samples/aws-mobile-appsync-chat-starter-angular](https://github.com/aws-samples/aws-mobile-appsync-chat-starter-angular)

Si este contenido te parece útil y me quieres ayudar a hacer mas considera apoyarme en [Patreon](https://www.patreon.com/carlosrojas_o).

Bueno eso es todo por ahora. Espero sea de utilidad :)