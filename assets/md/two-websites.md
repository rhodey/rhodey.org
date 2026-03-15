!!!
two-websites
March 15, 2026
Two Websites
Its been awhile since I had an update here. I've been busy with more than a few things and I will share two now. Last year I published [bizcardz.ai](https://bizcardz.ai/) and just yesterday I published [hecate.video](https://hecate.video/). Bizcardz.ai does custom PCB business cards and Hecate is a VR AI chatbot that lives inside Signal voice and video calls.
<!--no banner-->
!!!


Its been awhile since I had an update here. I've been busy with more than a few things and I will share two now. Last year I published [bizcardz.ai](https://bizcardz.ai/) and just yesterday I published [hecate.video](https://hecate.video/). Bizcardz.ai does custom PCB business cards and Hecate is a VR AI chatbot that lives inside Signal voice and video calls.

## Bizcardz.ai
[Bizcardz.ai](https://bizcardz.ai/) started when I spent a lot of time learning [KiCad](https://www.kicad.org/) to try to manufacture an electronic. That electronic did not make it to the finish line and I wanted to recover some of my time so I thought what could be done with KiCad. Circuit boards are something where its expensive to make 1 but cheap to make 100. Also circuit boars need to be small. Those 2 constraints together => business cards.

Bizcardz.ai is free to use. The end result is a ZIP file with your card as a KiCad design. The ZIP contains README to guide through the process of sending to [Elecrow](https://www.elecrow.com/) to be manufactured. You can expect to pay about $1 per pcb in quantities of 50 and $0.80 in quantities of 100.

The models used are gemini-2.0-flash-lite, gemini-2.5-flash-lite, and ideogram-v2a-turbo. As with all things I write here [sources are on GitHub](https://github.com/rhodey/bizcardz.ai). Check out [FAQ](https://bizcardz.ai/faq) page for more pictures. 

<img src="/assets/img/other/cardz.jpg" height="300">

## Hecate.video
[Hecate.video](https://hecate.video/) started when I found a blogpost by [Tinfoil.sh](https://tinfoil.sh/blog) explaining their AI inference infra. Tinfoil uses [Trusted execution environments](https://en.wikipedia.org/wiki/Trusted_execution_environment) AKA "TEEs" which I became familiar with around 2015 while at Signal. Signal was the first real user of Intel SGX. Years later I have started working with AWS Nitro TEEs to make [Lock.host](https://lock.host/) which I will write more about another time.

The Tinfoil blogpost convinced me they were legit and so immediately I wanted to build on it. I started with a small cli voice assistant named ["aifren"](https://github.com/rhodey/aifren) and this was fun but I had to be at my laptop to use it. I am a big fan of Signal for many reasons and the app is on my phone and so I wanted to do this all from my phone.

Hecate.video works by installing (unmodified) Signal Android into an Android emulator and controlling the camera and microphone streams. This was not too too easy but if you think about the work to code this as a cli and to work with the signal protocol directly, and to keep with updates, the emulator was an obvious choice for me.

I love Blade Runner and Blade Runner 2049 and I think this is one of the more Cypherpunk things I have done. [Sources on GitHub](https://github.com/rhodey/hecate).

<img src="/assets/img/hecate/pic1.jpg" height="300"> <img src="/assets/img/hecate/pic2.jpg" height="300"> <img src="/assets/img/hecate/pic3.jpg" height="300">
