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
    -v /host/path/rhodey.org/nginx.conf:/etc/nginx/nginx.conf:ro \
    -v /etc/letsencrypt:/etc/letsencrypt:ro \
    -v /host/path/rhodey.org/dist:/usr/share/nginx/html:ro \
    -p 80:80 \
    -p 443:443 \
    --restart unless-stopped \
    -d nginx
```
