# APLICACIÓN DE NOTICIAS

Crear una aplicación real

Consumir APIS para desplegar información

Uso de componentes personalizados y módulos

Uso de componentes de ionic

Uso de plugins

Guardar en el storage del dispositivo nativo

Generar un diseño que funcione en tabletas y escritorio también

Uso de Toasts

Mostrar mensajes cuando no hay información guardada

Uso del infinite-scroll para obtener más información cuando llegamos al final de cada página de noticias

Uso de segmentos con scroll

Este proyecto se ha creado > `ionic start noticias-app tabs`

Vamos a consumir noticias via una API de `https://newsapi.org/`

Nos registramos en `https://newsapi.org/register`

Mi API key es: `bde4234b69e74b388a2e086fe0036318`

## Recolocar los tabs

Vamos a crear una carpeta pages y nos llevamos los tabs ahí. Ahora hay que editar `app-routing.module` y ajustar la ruta al módulo de tabs

Comprobamos que todo funciona > `ionic serve`

Ionic crea por defecto un componente `explore-container` al usar tabs, si queremos usarlo hay que editar las rutas al componente en cada módulo de cada tab.

También podemos desvincular el uso de `app-explore-container` de cada html de cada tab

## Uso de la API KEY

Nos vamos a environment.ts y creamos una propiedad y metemos el API key y lo mismo en el de producción.

## Probar el servicio

En la página principal de https://newsapi.org/ copiamos el GET de `Top business headlines in the US right now`

Abrimos Postman, creamos una nueva petición y pegamos el código y comprobamos

## Creamos servicio

Creamos un servicio > `ionic g s services/noticias --skipTests=true`

Como vamos a hacer peticiones HTTP necesitamos importar en app.module > HttpClientModule

Ahora importamos el HttpClient en noticias.service

Creamos nuestro primer método para obtener los Top Headlines

## Probamos nuestro servicio en Tab1

Inyectamos NoticiasService en el constructor

Queremos que cuando entre en la página haga la petición a ese servicio, necesitamos llamar al servicio
dentro del ciclo de vida ngOnInit().

Si la tab no tiene por defecto importado ngOnInit() al `export` de la clase añadimos `implements OnInit`

y ya podemos usar ngOnInit().

llamamos a getTopHeadlines() como es un observable nos suscribimos a él y así obtenemos una respuesta

Si no funciona, bajar el servidor y levantarlo de nuevo.

## Crear un tipado para la respuesta del servicio

En app creamos carpeta interfaces y dentro creamos un archivo interfaces.ts

En vez de escribir manualmente todo podemos usar un plug in de VS Code llamado JSON to TS

Copiamos toda la respuesta del Postman y > Convert from clipboard (Shift + Ctrl + Alt + V)

Ahora tenemos todos los tipados de las propiedades de forma automática, podemos cambiar el nombre de los Tipos a nuestro gusto.

Añadimos export a cada interface.

## Aplicar el tipado a la respuesta

Podemos especificar el tipo de la respuesta en cada tab pero es mejor y más limpio especificarlo en el servicio, hay que asegurarse de que esté importado

## Creamos dos componentes que muestre las noticias

Podremos reutilizarlo en las tabs. Un componente agrupará las noticias y el otro mostrará las tarjetas

Primero creamos un módulo que tendrá toda la información de los componentes > `ionic g m components` Los módulos no tienen pruebas

Ahora creamos los componentes en la carpeta components
> `ionic g c components/noticias --spec=false`
> `ionic g c components/noticia --spec=false`

En components.module importar IonicModule para poder usar componentes de ionic

En tab1.module importamos components.module para poder usar noticias.component

## Tab 2

Creamos un ion-segment con botones.

En la documentación de la News API vamos a `Top Headlines > category`, copiamos las categorías y creamos un arreglo con ellas.

Queremos que un botón del ion-segment esté activo cuando entramos en tab2, para ello hay que establecer un valor al ion-segment por defecto
usando @ViewChild del ion-segment y estableciendo un valor al iniciar

## Cargar noticias por categoría

Miramos las peticiones HTTP que hay en la documentación de News API en `Top Headlines`

Abrimos nuestro noticias.service y creamos un servicio nuevo

## Infinite scroll

Al llegar al final de la lista de noticias queremos que cargue las 20 siguientes y así sucesivamente

En la API vemos que tenemos la propiedad page, si pasamos page = 2 estaremos cargando los 20 siguientes a la page 1

Toda la lógica la metemos en el servicio y usaremos un contador para las páginas

Ahora implementamos infinite scroll a las categorías de tab2, necesitamos saber la categoría actual

## Ver detalle de noticia

Cada noticia trae una URL a la página web de la noticia.

Queremos que se muestre la página en nuestra app. Vamos a la documentación de `Ionic Framework > Native`

Aquí es donde tenemos una colección de plugins que nos dan acceso a las funciones nativas como el giroscopio, cámara, push notifications

Buscamos `In App Browser`

> `ionic cordova plugin add cordova-plugin-inappbrowser`

Y después para usarlo en Typescript

> `npm install @ionic-native/in-app-browser`

Estos plugins son servicios de Angular que hay que importar a app.module

`import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';`

También lo importamos en `noticia.component` y lo inyectamos en el constructor

El plugin va a abrir la noticia en el navegador por defecto del dispositivo, en desktop abre una pestaña nueva del navegador

## Action Sheet en las noticias

Creamos un botón en noticia.component que dispara un método.

El método abre un Action Sheet que tenemos que importar e inyectar

## Compartir noticia en redes sociales y Whatsapp

Vamos a utilizar el plugin Social Sharing

> `ionic cordova plugin add cordova-plugin-x-socialsharing`

Y después para usarlo en Typescript

> `npm install @ionic-native/social-sharing`

Estos plugins son servicios de Angular que hay que importar a app.module

También lo importamos en `noticia.component` y lo inyectamos en el constructor

## Guardar noticia en el dispositivo localmente

Vamos a la Documentación > Guide > Storage

Aunque se puede guardar en el local storage, no es recomendable pues si Andriod o Ios necesita espacio lo primero que hace es
borrar el local storage.

Este plugin tiene la ventaja de que también funciona en desktop y no hace falta escribir dos códigos

> `ionic cordova plugin add cordova-sqlite-storage`

Y después para usarlo en Typescript

> `npm install --save @ionic/storage`

Estos plugins son servicios de Angular que hay que importar a `app.module` con `forRoot()`

Ahora creamos un servicio para guardar datos, creamos un componente de servicios nuevo para separarlo del otro componente de
servicios que se encarga de traer información

> `ionic g s services/localData --skipTests=true`

Después importamos en `local-data.service` Storage y lo inyectamos en el constructor

## Cargar noticias guardadas localmente

Trabajamos en tab3. Lo hacemos de manera diferente, los favoritos de cargan en el constructor del servicio y se almacenan
en el arreglo de favoritos. Ya los tenemos de entrada. Cuando vamos a tab3 podemos llamar al servicio y obtener la propiedad
favoritos directamente en el HTML, la inyección del servicio debe de hacerse public para poder acceder a ella desde HTML.

## Poder borrar favoritos desde tab3

Necesitamos detectar que estamos en el tab3 de favoritos y en ese caso cambiar el texto y el método de guardarFavorito a borrarFavorito

Creamos el método borrarFavorito en el servicio.

En `noticias.component` creamos un booleano `estoyEnFavoritos` que vendrá por input y hacemos lo mismo para `noticia.component`

En tab3 mandamos al `app-noticias` `estoyEnFavoritos` = true

En `noticias.component` mandamos el valor de `estoyEnFavoritos` a `app-noticia`

En `noticia.component` modificamos el objeto favoritos dependiendo de `estoyEnFavoritos`

## Añadir un toast que nos informe de si hemos añadido o borrado un favorito

Lo implementamos en el servicio.

## GIT
Añadimos los cambios a GIT> git add .
Commit > git commit -m "Primer commit"

Si en este punto borro accidentalmente algo puedo recuperarlo con > git checkout -- .

Que nos recontruye los archivos tal y como estaban en el último commit.

Enlazamos el repositorio local con un repositorio externo en GitHub donde tenemos cuenta y hemos creado un repositorio
git remote add origin https://github.com/Awandor/ionic-noticias.git

Situarnos en la rama master > git branch -M master

Subir todos los cambios a la rama master remota > git push -u origin master

Para reconstruir en local el código de GitHub nos bajamos el código y ejecutamos `npm install` que instala todas las dependencias