!!!
4chan-regex
January 1, 2007
4chan Regex Practice
**Many, many years ago** I decided that I needed some regex practice, and background aside I'd like to think that any survey is a survey worth sharing. What follows is a quick survey of the sex and age of 4chan commenters using exclusively shell commands. This is the bottom of the barrell my friends.
<!--no banner-->
!!!


**Many, many years ago** I decided that I needed some regex practice, and background aside I'd like to think that any survey is a survey worth sharing so here we go! Download an *[a/s/l](http://www.urbandictionary.com/define.php?term=asl)* thread from 4chan:
```
$ wget http://boards.4chan.org/b/res/496308962
```

Search the downloaded file for everything that resembles *a/s/l* data, `grep -oh` options to only display matched text:
```
$ cat 496308962 | grep -oh -E "[> ]([1-9]{2})[\\/,]?\\s*([mfMF]{1})" > as.txt
```

Count the number of matches we have found:
```
$ cat as.txt | grep -E "([mMfF])" | wc
121    121    363
^ number of lines, aka matches
```

Count the number of male-identifying *a/s/l* posters:
```
$ cat as.txt | grep -E "([mM])" | wc
107    132    637
^ male count
````

Count the number of female-identifying *a/s/l* posters:
```
$ cat as.txt | grep -E "([fF])" | wc
14    17    84
^ female count
```

Calculate the average poster age:
```
$ cat as.txt | grep -oh -E "([1-9]{2})" | awk ''{SUM += $1; COUNT+=1} END {print SUM " / " COUNT " = " SUM/COUNT}''
2381 / 121 = 19.6777
```

So there you have it, `88.4%` of surveyed 4chan users identify as male, `11.6%` identify as female, and the average age out of `121 samples` is `~20 years old`. *awk* is wild, huh?
