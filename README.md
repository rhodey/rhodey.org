# choo.rhodey.org
personal blog.

## Build
```
$ npm install
$ npm run index
$ npm run build
```

## Deploy
```
$ docker run --name rhodey.org \
    -d --restart unless-stopped \
    -v /host/path/rhodey.org/dist:/usr/share/nginx/html:ro \
    -p 8080:80 \
    nginx
```
