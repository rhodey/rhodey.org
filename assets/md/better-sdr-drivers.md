!!!
better-sdr-drivers
August 6, 2019
Better Software Defined Radio Drivers
It seems that every couple months now a new Software Defined Radio (SDR) is announced. The real cost of an SDR includes not only the dollar amount but a time commitment to refactoring the new hardware driver into your codebase. We can do better than this, using `stdin, stdout, & stderr` we can create language-agnostic drivers that save us time and complexity.
<!--no banner-->
!!!


It seems that every couple months now a new [Software Defined Radio (SDR)](https://en.wikipedia.org/wiki/Software-defined_radio) is announced. The real cost of an SDR includes not only the dollar amount but a time commitment to refactoring the new hardware driver into your codebase. We can do better than this, using `stdin, stdout, & stderr` we can create language-agnostic drivers that save us time and complexity.

## Lay of the Land
By no means am I the first to think *"hey you know these SDR drivers are getting out of control"*, notably there has been [Universal Hardware Driver (UHD)](https://github.com/EttusResearch/uhd) from Ettus and [SoapySDR](https://github.com/pothosware/SoapySDR/wiki) from Pothos. Both UHD and SoapySDR are written in C++ and provide configuration of and streaming from a growing family of SDRs. If you want to use UHD outside of C you'll need to find or create your own language bindings like I did for [uhd-java](https://github.com/radiowitness/uhd-java). If you want to use SoapySDR outside of C your options are language bindings or binding to a network socket and implementing the [SoapyRemote Protocol](https://github.com/pothosware/SoapyRemote/wiki) in your language of choice.

## What is Wrong with That
In my experience the first problem with language bindings is that building the underlying project always adds a significant amount of complexity and bloat to your build. The second problem is that the language the driver is written in tends to force its own conventions on the language of the bindings. As for networked drivers like SoapyRemote my complaint is that they add significant runtime complexity. When talking about a network socket we need to keep in mind and provide configuration for all of the following:
  + protocol (tcp or udp)
  + network address
  + network port
  + send buffer size
  + receive buffer size
  + flags like [TCP_NODELAY](https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_MRG/1.2/html/Realtime_Tuning_Guide/sect-Realtime_Tuning_Guide-Application_Tuning_and_Deployment-TCP_NODELAY_and_Small_Buffer_Writes.html)

## Trying Something Else
Recently I completed a large rethink and rewrite of [RadioWitness](https://radiowitness.org) from Java to JavaScript and Rust. One of the many things I changed along the way was how to interface with [rtl-sdr](https://sdr.osmocom.org/trac/wiki/rtl-sdr). Earlier I was using the networked driver `rtl_tcp` and with that came all the runtime complexity above. Having spent a lot of time with JavaScript streams I put forth the intention of using streams as often as possible in RadioWitness, then my attention turned to `stdin, stdout, & stderr`. Every process on linux has these three streams and they require no runtime configuration. What I have found is that `stdin` works well for passing configuration parameters, `stderr` works well for acknowleding configuration parameters, and `stdout` can be used as your sample stream.

## A New rtl-sdr Driver
Using the insights gleamed above I set out to write a new SDR driver for the rtl-sdr, the idea is very simple really: every argument supported by the command line is also supported through `stdin`. In practice it looks like this:

```
$ rtl_rs -d 0 -g 0 -s 230400 -f 94700000
stdin> -g 62, -p 18
stderr> ok: -g 62
stderr> ok: -p 18
stdin> -f 100300000
stderr> ok: -f 100300000
```

I named this hardware driver `rtl_rs` and you can [find it here](https://github.com/radiowitness/rtl_rs). I have found programming with this driver to be a joy. Notice that this approach is language agnostic and the "protocol" is none other than the command line arguments. To make use of this driver all you need is the `rtl_rs` binary and the ability to spawn a child process in your language of choice.

## Going Further
`rtl_rs` is really just a prototype of this idea specific to the rtl-sdr, bigger more expensive SRDs are more complicated because they have multiple receivers and they allow transmission not just reception of signals. The trick here is that three streams is not enough to model more complicated SDRs, however this is not a problem because we can model as many streams as we like using [linux named pipes](https://www.linuxjournal.com/article/2156). So, for example, I could request a transmit stream using `stdin` and then receive the path for a linux named pipe at `stderr`.

