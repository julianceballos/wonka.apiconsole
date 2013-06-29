Wonka API Console
=================

This is an easy API Console built with wonka.js.

Just install wonkajs, here you can find more info: http://wonkajs.com

Later download this project, edit the file:

```
stylesheets/apiconsole/apiconsole.less
```

to set the color for your project.

Now set the attribute **api** to the api base url and the **endpoints** attribute the endpoints that you want to call via this api console.

Finally just make:

```sh
$ wonkajs deploy
```

Copy the files on deploy folder and put them into an folder on your server, put on your server this folder as a static files target with an subdomain and your console it's ready.
