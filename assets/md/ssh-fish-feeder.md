!!!
ssh-fish-feeder
December 17, 2012
SSH Fish Feeder
It was the day before Winter Break 2012 and I had no more than 30 minutes to finish packing before getting the boot from my dorm room. I had everything packed in the back of my Subaru and made my way upstairs for a final look-around, wait-- what was that? The sound of running water?
<!--no banner-->
!!!


It was the day before Winter Break 2012 and I had no more than 30 minutes to finish packing before getting the boot from my dorm room. I had everything packed in the back of my Subaru and made my way upstairs for a final look-around, wait-- what was that? The sound of running water? Could it be that the fish tank my friends and I went in on together somehow ended up in my room? **It could. it was. lame.**

Now, by this time I wasn't the biggest fan of my gilled roommates but letting them die was not an option. I had to keep these fish alive for 25 days of vacation, meaning 25 days of water filtration and food. The electrical outlets in all our rooms were to be shutoff during break so my first step was to move the whole operation downstairs into the radio station. After clearing a spot on the studio couch I reinstalled the water filter and air pump but was still without a 25-day feed system.

> Then it hit me, my favorite hack. I found salvation in my desktop computer, a pencil, a pen cap, string, magnets, and three seven day feeding triangles.

![the ssh fish feeder](/assets/img/other/ssh-fish-feeder.jpg)

I wish I had more pictures to show, but alas, that and these words will have to do. On the left is my desktop hooked up to the local network via Ethernet, running Debian and an SSH service. Inside of the CD tray is tucked one seven day feeding triangle, on the end of the tray I taped a pair of magnets. A pencil is taped to the side of the desktop and to that a pen cap holding another pair of magnets taped to a string. The string runs the length of the fish tank and is tied to yet another seven day feeding triangle. It all comes together like this...

## Day One
Drop a seven day feeding triangle into the fish tank, leave campus.

## Day Eight
SSH in and open (**but do not close!**) the CD tray. A single feeding triangle falls into the tank from the CD tray cover where it was lodged. Additionally magnets taped to the end of the tray pair with the other set held in place by the pen cap.
```
$ eject -r /mnt/cdrom
```

## Day Fifteen
SSH in and close the CD tray. The final feeding triangle is pulled from the edge of the tank into the water by way of the magnet-connected string.
```
$ eject -t /mnt/cdrom
```

## Day Twenty Two
Fish run out of food and have to rough it out for something like three days.

## Day Twenty Five
I returned from break to find all the fish alive and for this I felt accomplished.
