Wonka API Console
=================

This is an easy API Console built with wonka.js.

Just install wonkajs, here you can find more info: http://wonkajs.com

Later download this project, edit the file:

```
stylesheets/apiconsole/apiconsole.less
```

to set the color for your project.

Now set the attribute **api** with the url to your api base url.

Then specify the endpoints for your projects, for example:

```json
{
  "settings": {
    "api": "...",
    "endpoints": [{
      "id": "update-user",
      "description": "Update user info",
      "method": "PUT",
      "endpoint": "users/{USER}",
      "params": {
        "is_developer": true
      }
    }]
  }
}
```

Finally just generate the deploy for your project:

```sh
$ wonkajs deploy
```

Copy the files on deploy folder and put them into an folder on your server, put on your server this folder as a static files target with an subdomain and your console it's ready.
