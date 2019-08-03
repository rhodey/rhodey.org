!!!
twitter-squat
June 5, 2014
Fighting Twitter Squatters
At the time of writing this some bot is squatting [@rhodey](http://twitter.com/rhodey) on Twitter and has been for some time. I don't remember to check the availability of this handle very frequently and would hate to have it open up only to be squatted again so I put together this simple bash script.
<!--no banner-->
!!!


At the time of writing this some bot is squatting [@rhodey](http://twitter.com/rhodey) on Twitter and has been for some time. I don't remember to check the availability of this handle very frequently and would hate to have it open up only to be squatted again so I put together this simple bash script:

```bash
#!/bin/bash
HANDLE="rhodey"
EMAIL="rhodey@anhonesteffort.org"

if curl "https://twitter.com/users/username_available?username=$HANDLE" | grep "\"valid\":true"; then
  echo "grab it quick!" | mail -s "@$HANDLE available :D" $EMAIL
fi
```

I'm running this script on the same box as my mail server, given my use of the linux *mail* utility you'll likely have to do the same to use this. Modify the `HANDLE` and `EMAIL` variables to match your handle of interest and email address, then save as `twitter.sh`.


## Installation
Before we can actually run this script it needs to be marked as executable:

```
$ chmod +x twitter.sh
```

The last step is adding a cron job to run the script repeatedly:

```
$ crontab -e
```

Adding the following task to your crontab file will run the script every 30 minutes:

```
*/30 * * * * /home/rhodey/twitter.sh
```
