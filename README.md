# rhodey.org
This is the code for my blog and my third adaption of essentially templating engines for Markdown. I organize all my blog posts as Markdown within directory [assets/md/](https://github.com/rhodey/rhodey.org/tree/master/assets/md) then build using the following instructions.

## Build
```
npm install
npm run build
```

## Deploy
This is approximately how I deploy to my debian VPS
```
git pull
npm run build
docker run --name nginx -d --restart unless-stopped \
    -v $(pwd)/nginx.conf:/etc/nginx/nginx.conf:ro \
    -v $(pwd)/dist:/usr/share/nginx/html:ro \
    -v /etc/letsencrypt/live/rhodey.org/fullchain.pem:/etc/nginx/fullchain.pem:ro \
    -v /etc/letsencrypt/live/rhodey.org/privkey.pem:/etc/nginx/privkey.pem:ro \
    -p 80:80 -p 443:443 nginx
```

## Dev
[http://localhost:8080](http://localhost:8080)
```
npm run dev
```

## License
Copyright 2025 - mike@rhodey.org

MIT
