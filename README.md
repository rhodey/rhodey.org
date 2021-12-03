# (choo.)rhodey.org
This git repo is the source code for my personal blog and my third adaption of essentially templating engines for Markdown. I organize all my blog posts as Markdown within directory [assets/md/](https://github.com/rhodey/rhodey.org/tree/master/assets/md) then build and publish the Markdown as HTML plus JavaScript using the following instructions.

## Build
```
$ npm install -g browserify && \
    npm install && \
      npm run dist
```

## Deploy
This is approximately how I cut distributions and deploy to production (to a Linode debian VPS):
```
$ cd /etc/sites/rhodey.org
$ npm run dist
$ sudo certbot certonly --standalone
> ...\n
> ...
>
$ docker run --name nginx -d --restart unless-stopped \
    -v $(pwd)/nginx/example.conf:/etc/nginx/nginx.conf:ro \
    -v $(pwd)/dist:/usr/share/nginx/sites/rhodey.org:ro \
    -v /etc/letsencrypt/live/rhodey.org/fullchain.pem:/certs/fullchain.pem:ro \
    -v /etc/letsencrypt/live/rhodey.org/privkey.pem:/certs/privkey.pem:ro \
    -p 80:80 -p 443:443 nginx
```

## Develop
Spawn [watchify](https://npmjs.com/package/watchify) plus the `python` standard library http server using TCP port `8080`:
```
$ npm run dist && \
    npm install -g watchify && \
      watchify index.js -v -o dist/bundle.js | python -m http.server 8080 --directory dist/
```

## License
```
Copyright 2021 - Rhodey <mike@rhodey.org>
Creative Commons Attribution-NonCommercial
https://creativecommons.org/licenses/by-nc/4.0
```
