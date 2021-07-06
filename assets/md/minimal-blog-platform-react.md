!!!
minimal-blog-platform-react
September 19, 2016
Building A Minimal Blogging Platform with React.js
Everyone does blogging differently, this site is my second shot at coding myself a blogging platform (update: did it again, this time using choo.js). This is largely an exercise in getting more familiar with React.
<!--no banner-->
!!!


Everyone does blogging differently, this site is my second shot at coding myself a blogging platform (update: did it again, this time [using choo.js](https://github.com/rhodey/rhodey.org)). This is largely an exercise in getting more familiar with React. Last time I attempted this I used the Java HTTP Server framework [Dropwizard](http://www.dropwizard.io/1.0.0/docs/) for API & static assets, [PostgreSQL](https://www.postgresql.org/) for content & metadata storage, [FreeMarker](http://freemarker.org/) as a server-side templating engine, and some obscure JavaScript Markdown parser. In retrospect the first attempt was, ***errrrrrr...*** pretty bad; sometimes my appreciation of *Dropwizard* shows in the wrong ways. This second attempt feels much more appropriate, what do ya think?

+ `100%` Static Assets
+ [Nginx](https://nginx.org/) HTTP Server
+ [React.js](https://facebook.github.io/react/) Client-side Templating
+ [React Helmet](https://github.com/nfl/react-helmet) Tag Management
+ [Marked](https://www.npmjs.com/package/marked) Markdown Parsing
+ [Highlight.js](https://highlightjs.org) Syntax Highlighting

## Static Assets
First off browse over to the [GitHub repo](https://github.com/rhodey/react.rhodey.org/tree/ed7b1af8feab645622639cf6bae76157686c9c88) for this site, all of the code **and** content is hosted in this repo. The full text of every blog entry can be found in the [md/](https://github.com/rhodey/react.rhodey.org/blob/ed7b1af8feab645622639cf6bae76157686c9c88/js/gen-blog-index.js) directory and if you view the *"raw"* Markdown source you'll see that the first six lines of every file are a header, the form of which is:

```
!!!
<url path>
<date published>
<title>
<summary>
!!!
```

The exclamation marks are only visual guides but the `<url path>` param is a bit confusing, really this is just the URL I want to have the blog entry served from, for example `ethereum-wallet-exploit` will be served from `/blog/ethereum-wallet-exploit`. The metadata in these headers is super minimal but right now it is sufficient, in the future I can imagine adding some stuff for HTML `<meta>` tags. All headers in the `md/` directory are extracted and used to generate a content index, this is done by [js/gen-blog-index.js](https://github.com/rhodey/react.rhodey.org/blob/ed7b1af8feab645622639cf6bae76157686c9c88/js/gen-blog-index.js):

```JavaScript
etc...

function headerFor(filename) {
  return new Promise(
    function(resolve, reject) {
      var lineCount = 0;
      var header    = [];

      readerFor(filename).on('line', function (line) {
        if (++lineCount > 1 && lineCount < 6) {
          header.push(line);
        } else if (lineCount === 6) {
          resolve({
            filename : "/" + filename,
            path     : header[0],
            date     : header[1],
            title    : header[2],
            summary  : header[3]
          });
        }
      });
    }
  );
}

function writeToIndex(headers) {
  headers = headers.sort(function(a, b) {
    return (new Date(b.date).getTime() - new Date(a.date).getTime());
  });

  var index  = "var index = [];\n";
      index += "\n\n";

  headers.forEach(function(header) {
    index += "index['" + header.path + "'] = " + JSON.stringify(header) + ";\n";
    index += "\n";
  });

  index += "\n";
  index += "module.exports = index;\n";

  fs.writeFile('js/blog-index.js', index, function(err) {
    if (err) { console.log("err -> " + err); }
  });
}

etc...
```

Writing JavaScript to write JavaScript feels like a dirty, filthy hack but it also works perfectly fine ¯\\_(ツ)_/¯. I added a *"run script"* to my [package.json](https://github.com/rhodey/react.rhodey.org/blob/ed7b1af8feab645622639cf6bae76157686c9c88/package.json) so now I can do `npm run index` to generate the content index. Additionally I bundle and minify all JavaScript and CSS with  `npm run bundle` and this step includes content index generation too. I think the content index (*blog-index.js*) is technically a build artifact so I exclude it with `.gitignore` but the result looks like this:

```JavaScript
var index = [];

index['ethereum-wallet-exploit'] = {"filename":"/md/ethereum-exploit.md","path":"ethereum-wallet-exploit","date":"July 6, 2016","title":"Walking Past Same-origin Policy, NAT, and Firewall for Ethereum Wallet Control","summary":"This vulnerability was originally reported to the Etherum Bug Bounty on June 12th, 2016. As far as I can tell no clients have been patched and any developer made aware of this has since forgotten. At the core of this attack is a *DNS Rebinding* vulnerability, in this post I explain the vulnerability, suggest an exploit, and leave you with a complete proof-of-concept exploit solution."};

etc...

module.exports = index;
```

## React.js
[React.js](https://facebook.github.io/react/) is the new hotness *blah blahh blahhh*, many people are probably sick of hearing about it but honestly the release of *React.js* was a big deal for me. I've been toying with JavaScript since 8th grade but until *React* came along I was never able to move past small scripting experiments, whenever a project exceeded a certain size it'd just begin to fall apart. Now thanks to *React* I've published three webapps in the past five months and am excited for the fourth.

### Main Class
The root of my app is [js/app.js](https://github.com/rhodey/react.rhodey.org/blob/ed7b1af8feab645622639cf6bae76157686c9c88/js/app.js) with main class `App`, all this class really does is make sure that a header is included at the top of every page:

```JavaScript
var App = React.createClass({
  render: function() {
    return (
      <div className="app">
        <Header/>
        {this.props.children}
      </div>
    );
  }
});
```

### Header
My `Header` class is defined in [js/header.js](https://github.com/rhodey/react.rhodey.org/blob/ed7b1af8feab645622639cf6bae76157686c9c88/js/header.js) and is mostly there to link you back to the homepage, my GitHub, my email address, and [The Radio Witness Project](https://radiowitness.io/). But `Header` also uses one awesome new tool I picked up while building this site, [React Helmet](https://github.com/nfl/react-helmet):

> This reusable React component will manage all of your changes to the document head with support for document title, meta, link, script, and base tags. Inspired by react-document-title

I use *React Helmet* to set the page title and also include a few common HTML `<meta>` tags defined in [js/meta-tags.js](https://github.com/rhodey/react.rhodey.org/blob/ed7b1af8feab645622639cf6bae76157686c9c88/js/meta-tags.js), anyways here's `Header`:

```JavaScript
var Header = React.createClass({
  render: function() {
    return (
      <div className="header">
        <Helmet title="# rhodey.org" meta={metatags} />
        <h1><Link to="/"># rhodey.org</Link>
          <span className="headerLinks">
            <a href="https://github.com/rhodey"> github</a>
            <a href="mailto:rhodey@anhonesteffort.org"> email</a>
            <a href="https://radiowitness.io/"> radiowitness</a>
          </span>
        </h1>
        <div className="headerBorder"/>
      </div>
    );
  }
});
```

### Routes
All the routes for my app are defined alongside `App` in [js/app.js](https://github.com/rhodey/react.rhodey.org/blob/ed7b1af8feab645622639cf6bae76157686c9c88/js/app.js), pretty simple for now, `BlogList` is the landing page and `BlogEntry`'s will be served from `/blog/:entryId`:

```JavaScript
ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={BlogList} />
      <Route path="/blog/:entryId" component={BlogEntry} />
    </Route>
  </Router>
), document.getElementById("root"));
```

### BlogList
`BlogList` can be found in [js/blog-list.js](https://github.com/rhodey/react.rhodey.org/blob/ed7b1af8feab645622639cf6bae76157686c9c88/js/blog-list.js), its core functionality is to render the content index I explained previously in the *"Static Assets"* section. The blog entry summaries in the content index are Markdown, notice how they're rendered in `BlogEntryGist` using [Marked](https://www.npmjs.com/package/marked). I've stripped out the undeniably beautiful [emoticon](https://en.wikipedia.org/wiki/List_of_emoticons) code, CSS transition animation, and fancy AJAX prefetching to keep the focus on the core blogging platform design.

```JavaScript
var BlogEntryMeta = React.createClass({
  render: function() {
    return (
      <div className="blogEntryMeta"><p>
        <span className="blogEntryDate row">
          {this.props.entry.date}
        </span>
      </p></div>
    );
  }
});

var BlogEntryGist = React.createClass({
  getSummaryHtml: function() {
    return { __html : marked(this.props.entry.summary) };
  },
  render: function() {
    return (
      <div className="blogEntryGist">
        <h2 className="row">
          <Link to={"/blog/" + this.props.entry.path}>{this.props.entry.title}</Link>
        </h2>
        <div className="row">
          <p className="col-xs-12">
            <span dangerouslySetInnerHTML={this.getSummaryHtml()}/>
          </p>
        </div>
      </div>
    );
  }
});

var BlogListItem = React.createClass({
  render: function() {
    return (
      <div className="blogListItem">
        <div className="row">
          <div className="col-xs-3">
            <BlogEntryMeta entry={this.props.entry} />
          </div>
          <div className="col-xs-9">
            <BlogEntryGist entry={this.props.entry} />
          </div>
        </div>
      </div>
    );
  }
});

var BlogList = React.createClass({
  render: function() {
    var items = Object.keys(blogidx).map(function(key, idx) {
      return <BlogListItem key={key} entry={blogidx[key]} />;
    }.bind(this));

    return (
      <div className="blogList">
        {items}
      </div>
    );
  }
});
```

### BlogEntry
`BlogEntry` can be found in [js/blog-entry.js](https://github.com/rhodey/react.rhodey.org/blob/ed7b1af8feab645622639cf6bae76157686c9c88/js/blog-entry.js), all it does is fetch the Markdown file referenced in the content index and then render it using *Marked*, *React Header*, and [Highlight.js](https://highlightjs.org). Once again I'm stripping out the fancy CSS transition for focus:

```JavaScript
var BlogEntry = React.createClass({
  chopHeader: function(markdown) {
    return markdown.split('\n').slice(6).join('\n');
  },
  loadMarkdown: function() {
    Ajax.get(
      this.state.entry.filename,
      function(markdown) {
        this.setState({ __html : marked(this.chopHeader(markdown)) });
      }.bind(this)
    );
  },
  getInitialState: function() {
    return {
      entry  : blogidx[this.props.params.entryId],
      __html : ""
    };
  },
  componentWillMount: function() {
    marked.setOptions({highlight: function (code) { return highlight.highlightAuto(code).value; }});
    this.loadMarkdown();
  },
  render: function() {
    return (
      <div className="blogEntryBox">
        <Helmet title={this.state.entry.title} />
        <h1>{this.state.entry.title}</h1>
        <div className="blogEntryMarkdown" dangerouslySetInnerHTML={this.state} />
      </div>
    );
  }
});
```

## Nginx
My use of [nginx](https://nginx.org/) is pretty standard, not a lot to say here. I run *nginx* under a non-privileged user so port `80` and `443` are re-routed to `8080` and `8443` respectively using [iptables](https://en.wikipedia.org/wiki/Iptables):

```bash
# iptables -A PREROUTING -t nat -p tcp --dport 80 -j REDIRECT --to-port 8080
# iptables -A PREROUTING -t nat -p tcp --dport 443 -j REDIRECT --to-port 8443
```

The HTTPS certificate for `rhodey.org` was acquired for free from [Let's Encrypt](https://letsencrypt.org/):

```bash
$ wget https://dl.eff.org/certbot-auto
$ chmod a+x certbot-auto
$ ./certbot-auto
$ ./certbot-auto certonly --standalone --standalone-supported-challenges http-01 -d rhodey.org
```

The only thing possibly interesting about my *nginx* config is the forced HTTP-to-HTTPS redirect:

```
server {
  listen 8080;
  server_name .rhodey.org;
  return 301 https://rhodey.org$request_uri;
}

server {
  listen 8443;
  server_name .rhodey.org;
  ssl on;
  ssl_certificate /home/nginx/letsencrypt/live/rhodey.org/fullchain.pem;
  ssl_certificate_key /home/nginx/letsencrypt/live/rhodey.org/privkey.pem;

  location / {
    root /home/nginx/src/rhodey.org;
    index index.html;
    try_files $uri /index.html;
  }
}
```

## Deploying to Production
Nowadays I deploy everything using Docker but I've decided to keep these old bash scripts published online as interesting bash references. Server-side I had this script named `pull-rhodey.org` which was owned by the user `nginx`:

```bash
#!/bin/bash
REPOS=("rhodey.org")
cd /home/nginx/src

for REPO in "${REPOS[@]}"
do
  :
  cd $REPO
  git checkout production
  git pull
  npm install
  npm run bundle
  cd ..
done
```

Then client-side on my laptop I had the following script `deploy-rhodey.org`:

```bash
#!/bin/bash
CMD="sudo su nginx --login -c 'pull-rhodey.org' &&
sudo service nginx reload"
ssh -t rhodey.org "$CMD"
```

This script was setup in my `$PATH` so deploying to production used to be:

```bash
$ git checkout production
$ git rebase master
$ git push -u origin production
$ deploy-rhodey.org
```

## That's it!
It took me four days [from start](https://github.com/rhodey/react.rhodey.org/commit/a4361a069166a75d869ff0988cebb7f358b4a78f) to get this blog iteration online and I spent a good portion of that time restoring old blog posts and writing new content. All in all at the time of this writing the repo totals `348` lines of JavaScript and `124` lines of CSS, if I wasn't such an indentation & spacing freak it'd probably be significantly less. After filling this blog in with some more writing I think my next move will be to migrate to [Bootstrap 4](https://v4-alpha.getbootstrap.com/) for the sake of experience. So far I'm very satisfied with my new blogging platform, already I've written a lot more content than last time around, hope to keep it up!
