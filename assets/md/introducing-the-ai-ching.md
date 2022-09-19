!!!
introducing-the-ai-ching
September 18, 2022
Introducing The AI Ching
Over the last few months I've been working part time to author a new adaption of the I Ching co-authored by GPT-J. Working with LibreOffice I first put together a PDF then thought to publish the work as an app with an integrated random coin toss feature. Unfortunately my app was rejected by Apple for "insufficient content or features" but not all is lost.
<!--no banner-->
!!!


Over the last few months I've been working part time to author a new adaption of the [I Ching](https://en.wikipedia.org/wiki/I_Ching) co-authored by GPT-J. Working with LibreOffice I first put together a PDF then thought to publish the work as an app with an integrated random coin toss feature. Unfortunately my app was rejected by Apple for "insufficient content or features" but not all is lost. Here I present the AI Ching as PDF, as React Native source code, and as an Android app available on Google Play, but first an introduction to the AI Ching.

## The AI Ching
Divination is another way to write fortune telling and The I Ching is a Chinese divination system approximately three thousand years old. In the Spring of 2022CE an AI model demonstration arrived [online](https://textsynth.com/playground.html) with the name "GPT-J 6B" and the more I interacted with this AI the more I became determined to somehow co-author a book with assistance from the AI. I thought to myself what form of AI writing could possibly have mass appeal and then the idea came to me to create and publish an I Ching.

Consider each I Ching to be a collection of 64 chapters plus a procedure for determining which chapter to read. For example one I Ching will include different details for chapter 20 versus another I Ching however both I Ching are supposed to be elaborating upon the same general situation to the reader.

The total of 64 chapters is arrived upon by combining eight elements pairwise, these elements are: Heaven, Thunder, Water, Mountain, Earth, Wind, Fire, and Lake. By following the procedures of the I Ching you end up with always two elements and always one is thought of as being "above" or "atop" the other.

For each chapter the AI is prompted with a sentence in the form of "ElementA above ElementB represents SituationC, it is important to" ... and then the model takes over from there. Notice that this prompt is always asking the AI what it has learned that is most important.

## A Work in Progress
Unfortunately Apple's app store rejection kinda took the wind out of my sails so I'm publishing this work as open source in progress with two caveats, first: the AI Ching PDF has no table of contents and second: the AI Ching Android build has some intermittent bug around use of `setInterval()` which affects the random coin toss feature causing the animation to run faster than desired. I'm publishing both the PDF and React Native app open source and maybe a collaborator will want to pick up where I've left off.

## PDF
Here is a link to the [FREE PDF](https://rhodey.org/assets/ai-ching.pdf).

## React Native
Here is a link to the [FREE React Native project](https://github.com/rhodey/AI-Ching-Mobile).

## Google Play
Here ia a link to the [$7 Google Play Store download](https://play.google.com/store/apps/details?id=com.aiching).
