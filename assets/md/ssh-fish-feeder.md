!!!
ssh-fish-feeder
December 17, 2012
SSH Fish Feeder
It was the day before Winter Break 2012 and I had no more than 30 minutes to finish packing before getting the boot from my dorm room. I had everything packed in the back of my subaru and made my way upstairs for a final look-around, wait-- what was that? The sound of running water?
<!--no banner-->
!!!


It was the day before Winter Break 2012 and I had no more than 30 minutes to finish packing before getting the boot from my dorm room. I had everything packed in the back of my Subaru and made my way upstairs for a final look-around, wait-- what was that? The sound of running water? Could it be that the fish tank my friends and I went in on together somehow ended up in my room? **It could. it was. lame.**

Now, by this time I wasn't the biggest fan of my gilled roommates but letting them die was not an option. I had to keep these fish alive for 25 days of vacation, meaning 25 days of water filtration and food. The electrical outlets in all our rooms were to be shutoff during break so my first step was to move the whole operation downstairs into [the radio station](http://wvtc.net). After clearing a spot on the studio couch I reinstalled the water filter and air pump but was still without a 25-day feed system.

> Then it hit me, my favorite hack. I found salvation in my desktop computer, a pencil, a pen cap, string, magnets, and three seven day feeding triangles.

![the ssh fish feeder](/assets/img/other/ssh-fish-feeder.jpg)

I wish I had more pictures to show, but alas, that and these words will have to do. On the left is my desktop with internet connection via ethernet running Debian and an SSH service. Inside of the CD tray is tucked one seven day feeding triangle. At the corner of the CD tray I taped a magnet inline with the pen cap at the end of my pencil. A string runs from the feeding triangle on the right back to the pen cap and on the left end of the string is another small magnet. It all comes together like this:

## Day One
Drop a seven day feeding triangle into the fish tank and leave campus...

## Day Eight
SSH in and open (**but do not close!**) the CD tray:
```
$ eject -r /mnt/cdrom
```
A single feeding triangle falls into the tank from the CD tray cover where it was lodged. Additionally the magnet taped at the corner of the tray pairs with the magnet tied to the string and held in place by pen cap.

## Day Fifteen
SSH in and close the CD tray:
```
$ eject -t /mnt/cdrom
```
The final feeding triangle is pulled from the edge of the tank into the water by way of the magnet-connected string.

## Day Twenty Two
Fish run out of food and have to rough it out for something like three days.

## Day Twenty Five
I returned from break to find all the fish alive and for this I felt accomplished.
