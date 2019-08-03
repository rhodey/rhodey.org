!!!
dillinger-daemon
September 16, 2016
A Daemon for the Dillinger Markdown Editor
I use Vim as my one, true text editor and generally do a great job of abstaining from other GUI-based editors and IDEs. However, time and time again I lose this battle when it comes to editting markdown. It's embarassing to admit, but I used to rely on [GitHub Gists](https://gist.github.com/) to edit markdown before spending a few months with the [Vim Markdown Plugin](https://github.com/plasticboy/vim-markdown). All that changed today when I discovered [Dillinger](https://github.com/joemccann/dillinger).
<!--no banner-->
!!!


I use Vim as my one, true text editor and generally do a great job of abstaining from other GUI-based editors and IDEs. However, time and time again I lose this battle when it comes to editting markdown. It's embarassing to admit, but I used to rely on [GitHub Gists](https://gist.github.com/) to edit markdown before spending a few months with the [Vim Markdown Plugin](https://github.com/plasticboy/vim-markdown). All that changed today when I discovered [Dillinger](https://github.com/joemccann/dillinger).

> Dillinger is a cloud-enabled, mobile-ready, offline-storage, AngularJS powered HTML5 Markdown editor.

The editor is beautiful, you really should check out the cloud-hosted online demo [here](http://dillinger.io/). Installing Dillinger locally is as easy as:

```
$ wget https://github.com/joemccann/dillinger/archive/3.5.1.zip -O dillinger-3.5.1.zip
$ unzip dillinger-3.5.1.zip
$ cd dillinger-3.5.1
$ npm install -d
```

Then to launch the app run `node app` in the install directory and visit [http://localhost:8080](http://localhost:8080) in your browser. Having to `cd` into the install directory everytime you want to start Dillinger is a bother and killing the app via `CTRL+C` in an active terminal is no fun either, so I made this bash script:

```bash
#!/bin/bash
DILL_DIR=/home/rhodey/software/dillinger-3.5.1
DILL_PORT=8080
PID=""

function get_pid {
   PID=`pidof node app`
}

function stop {
   get_pid
   if [ -z $PID ]; then
      echo "daemon is not running."
      exit 1
   else
      kill -9 $PID
   fi
}

function start {
   get_pid
   if [ -z $PID ]; then
      node app >> /tmp/dillinger 2>&1 &
      get_pid
   else
      echo "daemon is already running, pid -> $PID"
   fi
}

function restart {
   get_pid
   if [ -z $PID ]; then
      start
   else
      stop
      sleep 5
      start
   fi
}

function status {
   get_pid
   if [ -z  $PID ]; then
      echo "deamon is not running."
      exit 1
   else
      echo "daemon is running, pid -> $PID"
   fi
}

ORIGIN=`pwd`
export PORT=$DILL_PORT
cd $DILL_DIR

case "$1" in
   start)
      start
   ;;
   stop)
      stop
   ;;
   restart)
      restart
   ;;
   status)
      status
   ;;
   *)
      echo "usage: $0 {start|stop|restart|status}"
esac

cd $ORIGIN
```

Edit the second and third lines to match your Dillinger install location and optionally override the TCP port, then save as `dillinger.sh`. This bash script supports four arguments `[start, stop, restart, & status]` and they do pretty much what you'd expect. Finally, add `dillinger.sh` to your `$PATH` environment variable for maximum convenience. If for whatever reason you want to keep an eye on Dillinger's debug output simply `tail -f /tmp/dillinger`.
