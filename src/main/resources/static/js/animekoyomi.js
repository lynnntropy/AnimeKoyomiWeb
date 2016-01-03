var GOOGLE_CALENDAR_CLIENT_ID = '92861593872-j6vjdjh4cjrpg67u0hgrdpvtl5cm1t7a.apps.googleusercontent.com';
var GOOGLE_CALENDAR_SCOPES = ["https://www.googleapis.com/auth/calendar"];

var weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

function weekdayNameToMomentId(name)
{
    if (name.toLowerCase() == "monday") return 1;
    if (name.toLowerCase() == "tuesday") return 2;
    if (name.toLowerCase() == "wednesday") return 3;
    if (name.toLowerCase() == "thursday") return 4;
    if (name.toLowerCase() == "friday") return 5;
    if (name.toLowerCase() == "saturday") return 6;
    if (name.toLowerCase() == "sunday") return 0;
}

angular.module('AnimeKoyomi', ['ngMaterial'])

    .controller('HorribleSubsController', ['$scope', '$rootScope', '$log', '$http', function($scope, $rootScope, $log, $http)
    {
        $log.log("HorribleSubs Controller started.");

        $scope.timezone = "America/Los_Angeles";

        $scope.items = [];
        $rootScope.horribleSubsItems = $scope.items;

        $scope.nextWeekday = function(weekdayId)
        {
            var day = moment().day(weekdayId);

            // make sure the first day isn't before today
            if (day.unix() < moment().unix())
            {
                day.add(7, 'days');
            }

            return day;
        };

        $scope.getRemoteItems = function()
        {
            $http({
                url: "/schedule/horriblesubs",
                method: "GET"
            }).success(function(data, status, headers, config) {

                for (var i = 0; i < data.length; i++)
                {
                    var item = data[i];

                    var weekdayId = weekdayNameToMomentId(item.weekday);
                    var nextWeekday = $scope.nextWeekday(weekdayId);

                    var originalTime = moment.tz(
                        {
                            year: nextWeekday.year(),
                            month: nextWeekday.month(),
                            day: nextWeekday.date(),
                            hour: item.time.hour,
                            minute: item.time.minute
                        },
                        $scope.timezone);

                    var localTime = originalTime.tz($rootScope.userTimezone);

                    var localTimeToday = moment.tz({
                        hour: localTime.hour(),
                        minute: localTime.minute()
                    }, $rootScope.userTimezone);


                    var localItem =
                    {
                        weekday: localTime.day(),
                        title: item.seriesName,
                        id: item.seriesId,
                        time: originalTime,
                        convertedTime: localTime,
                        selected: false,
                        timestamp: localTimeToday.unix()
                    };

                    $scope.items.push(localItem);
                }

            }).error(function(data, status, headers, config) {
                $scope.status = status;
            });

            console.log($scope.items);
        };

        $scope.recalculateTimes = function(timezoneString)
        {
            for (var i = 0; i < $scope.items.length; i++)
            {
                var localTime = $scope.items[i].time.tz($rootScope.userTimezone);

                var localTimeToday = moment.tz({
                    hour: localTime.hour(),
                    minute: localTime.minute()
                    }, $rootScope.userTimezone);

                $scope.items[i].convertedTime = localTime;
                $scope.items[i].weekday = localTime.day();
                $scope.items[i].timestamp = localTimeToday.unix();
            }
        };

        $scope.getRemoteItems();

        $scope.$watch('userTimezone', function() {
            $scope.recalculateTimes($rootScope.userTimezone);
        });
    }])

    .controller('SenpaiController', ['$scope', '$rootScope', '$log', '$http', function($scope, $rootScope, $log, $http)
    {
        $log.log("Senpai Controller started.");

        $scope.timezone = "Europe/London";

        $scope.items = [];
        $rootScope.senpaiItems = $scope.items;

        $scope.nextWeekday = function(weekdayId)
        {
            var day = moment().day(weekdayId);

            // make sure the first day isn't before today
            if (day.unix() < moment().unix())
            {
                day.add(7, 'days');
            }

            return day;
        };

        $scope.getRemoteItems = function()
        {
            $http({
                url: "/schedule/senpai",
                method: "GET"
            }).success(function(data, status, headers, config) {

                for (var i = 0; i < data.length; i++)
                {
                    var item = data[i];

                    var weekdayId = weekdayNameToMomentId(item.weekday);
                    var nextWeekday = $scope.nextWeekday(weekdayId);

                    var originalTime = moment.tz(
                        {
                            year: nextWeekday.year(),
                            month: nextWeekday.month(),
                            day: nextWeekday.date(),
                            hour: item.time.hour,
                            minute: item.time.minute
                        },
                        $scope.timezone);

                    var localTime = originalTime.tz($rootScope.userTimezone);

                    var localTimeToday = moment.tz({
                        hour: localTime.hour(),
                        minute: localTime.minute()
                    }, $rootScope.userTimezone);


                    var localItem =
                    {
                        weekday: localTime.day(),
                        title: item.seriesName,
                        id: item.seriesId,
                        time: originalTime,
                        convertedTime: localTime,
                        selected: false,
                        timestamp: localTimeToday.unix()
                    };

                    $scope.items.push(localItem);
                }

            }).error(function(data, status, headers, config) {
                $scope.status = status;
            });

            console.log($scope.items);
        };

        $scope.recalculateTimes = function(timezoneString)
        {
            for (var i = 0; i < $scope.items.length; i++)
            {
                var localTime = $scope.items[i].time.tz($rootScope.userTimezone);

                var localTimeToday = moment.tz({
                    hour: localTime.hour(),
                    minute: localTime.minute()
                }, $rootScope.userTimezone);


                $scope.items[i].convertedTime = localTime;
                $scope.items[i].weekday = localTime.day();
                $scope.items[i].timestamp = localTimeToday.unix();
            }
        };

        $scope.getRemoteItems();

        $scope.$watch('userTimezone', function() {
            $scope.recalculateTimes($rootScope.userTimezone);
        });
    }])

    .controller('CrunchyrollController', ['$scope', '$rootScope', '$log', '$http', function($scope, $rootScope, $log, $http)
    {
        $log.log("Crunchyroll Controller started.");

        $scope.timezone = "US/Pacific";

        $scope.items = [];
        $rootScope.crunchyrollItems = $scope.items;

        $scope.nextWeekday = function(weekdayId)
        {
            var day = moment().day(weekdayId);

            // make sure the first day isn't before today
            if (day.unix() < moment().unix())
            {
                day.add(7, 'days');
            }

            return day;
        };

        $scope.getRemoteItems = function()
        {
            $http({
                url: "/schedule/crunchyroll",
                method: "GET"
            }).success(function(data, status, headers, config) {

                for (var i = 0; i < data.length; i++)
                {
                    var item = data[i];

                    var weekdayId = weekdayNameToMomentId(item.weekday);
                    var nextWeekday = $scope.nextWeekday(weekdayId);

                    var originalTime = moment.tz(
                        {
                            year: nextWeekday.year(),
                            month: nextWeekday.month(),
                            day: nextWeekday.date(),
                            hour: item.time.hour,
                            minute: item.time.minute
                        },
                        $scope.timezone);

                    var localTime = originalTime.tz($rootScope.userTimezone);

                    var localTimeToday = moment.tz({
                        hour: localTime.hour(),
                        minute: localTime.minute()
                    }, $rootScope.userTimezone);

                    var localItem =
                    {
                        weekday: localTime.day(),
                        title: item.seriesName,
                        id: item.seriesId,
                        time: originalTime,
                        convertedTime: localTime,
                        selected: false,
                        timestamp: localTimeToday.unix()
                    };

                    $scope.items.push(localItem);
                }

            }).error(function(data, status, headers, config) {
                $scope.status = status;
            });

            console.log($scope.items);
        };

        $scope.recalculateTimes = function(timezoneString)
        {
            for (var i = 0; i < $scope.items.length; i++)
            {
                var localTime = $scope.items[i].time.tz($rootScope.userTimezone);

                var localTimeToday = moment.tz({
                    hour: localTime.hour(),
                    minute: localTime.minute()
                }, $rootScope.userTimezone);

                $scope.items[i].convertedTime = localTime;
                $scope.items[i].weekday = localTime.day();
                $scope.items[i].timestamp = localTimeToday.unix();
            }
        };

        $scope.getRemoteItems();

        $scope.$watch('userTimezone', function() {
            $scope.recalculateTimes($rootScope.userTimezone);
        });
    }])

    .controller('ConfigPanelController', ['$scope', '$rootScope', '$log', '$timeout', '$mdDialog', function($scope, $rootScope, $log, $timeout, $mdDialog)
    {
        $scope.googleAuthorized = false;
        $scope.calendarList = [];
        $scope.newCalendar = false;

        $scope.allTimezones = moment.tz.names();

        $rootScope.userTimezone = moment.tz.guess();
        console.log("Guessed timezone: " + $rootScope.userTimezone);

        $scope.customTimezone = "";
        $scope.$watch('customTimezone', function()
        {
            if ($scope.customTimezone != "")
            {
                console.log("User selected custom timezone: " + $scope.customTimezone.trim());
                $rootScope.userTimezone = $scope.customTimezone.trim();
            }
        });

        $scope.googleLoginClick = function()
        {
            $scope.handleAuthClick();
        };

        $scope.handleAuthClick = function()
        {
            $timeout(function()
            {
                gapi.auth.authorize(
                    {
                        client_id: GOOGLE_CALENDAR_CLIENT_ID,
                        scope: GOOGLE_CALENDAR_SCOPES,
                        immediate: false
                    },

                    function(authResult)
                    {
                        $timeout(function()
                        {
                            $scope.handleAuthResult(authResult)
                        }, 0)
                    });
            }, 0);

            return false;
        };

        $scope.handleAuthResult = function(authResult)
        {
            if (authResult && !authResult.error)
            {
                $scope.loadCalendarApi();
                console.log("User successfuly authorized.");
            }
            else
            {
                console.log("User isn't authorized.");
                $scope.googleAuthorized = false;
            }
        };
        $scope.loadCalendarApi = function()
        {
            gapi.client.load('calendar', 'v3', function(){$timeout(function(){$scope.onApiLoaded()}, 0)});
        };

        $scope.onApiLoaded = function()
        {
            $scope.googleAuthorized = true;

            $log.log("Calendar API loaded!");

            $scope.getCalendars();
        };

        $scope.getCalendars = function()
        {
            var request = gapi.client.calendar.calendarList.list();

            request.execute(function(resp){

                $timeout(function()
                {
                    var calendars = resp.items;
                    calendars.unshift({summary: "[New Calendar]"});

                    console.log(calendars);

                    $scope.calendarList = calendars;
                }, 0);

            });
        };

        $scope.clearCalendar = function(calendarId)
        {
            console.log("Clearing calendar with id " + calendarId);

            var request = gapi.client.calendar.events.list({
                'calendarId': calendarId
            });

            request.execute(function(resp)
            {
                $timeout(function()
                {
                    console.log(resp);

                    var events = resp.items;

                    for(var i = 0; i < events.length; i++)
                    {
                        var eventId = events[i].id;

                        var deleteRequest = gapi.client.calendar.events.delete({
                            'calendarId': calendarId,
                            'eventId': eventId
                        });

                        deleteRequest.execute();
                    }

                }, 0);
            });
        };

        $scope.addCalendarItem = function(scheduleItem, calendarId)
        {
            var startTime = scheduleItem.convertedTime;

            var endTime = startTime.clone().add(30, 'minutes');

            var request = gapi.client.calendar.events.insert(
                {
                    'start':
                    {
                        'dateTime': startTime.format(),
                        'timeZone': $rootScope.userTimezone
                    },

                    'end':
                    {
                        'dateTime': endTime.format(),
                        'timeZone': $rootScope.userTimezone
                    },

                    'calendarId': calendarId,
                    'summary': scheduleItem.title,
                    'recurrence': ["RRULE:FREQ=WEEKLY"]
                }
            );

            request.execute();
        };

        $scope.createEvents = function()
        {
            console.log($scope.selectedCalendar);

            var selectedCalendarName = $scope.selectedCalendar.trim();
            var calendarId = "";

            console.log("HorribleSubs array:");
            console.log($rootScope.horribleSubsItems);
            console.log("Senpai array:");
            console.log($rootScope.senpaiItems);
            console.log("CR array:");
            console.log($rootScope.crunchyrollItems);

            if (!$scope.newCalendar)
            {
                for (var i = 0; i < $scope.calendarList.length; i++)
                {
                    console.log("Checking " + $scope.calendarList[i].summary + " against " + selectedCalendarName);
                    if ($scope.calendarList[i].summary == selectedCalendarName)
                    {
                        calendarId = $scope.calendarList[i].id;
                        break;
                    }
                }
            }
            else
            {
                if ($scope.newCalendarTitle.trim() != "")
                {
                    calendarId = $scope.createCalendar($scope.newCalendarTitle);
                }
                else
                {
                    calendarId = $scope.createCalendar("Anime Koyomi");
                }
            }

            $scope.clearCalendar(calendarId);

            var showsToAdd = [];

            for (var i = 0; i < $rootScope.horribleSubsItems.length; i++)
            {
                if ($rootScope.horribleSubsItems[i].selected)
                {
                    showsToAdd.push($rootScope.horribleSubsItems[i]);
                }
            }

            for (var i = 0; i < $rootScope.senpaiItems.length; i++)
            {
                if ($rootScope.senpaiItems[i].selected)
                {
                    showsToAdd.push($rootScope.senpaiItems[i]);
                }
            }

            for (var i = 0; i < $rootScope.crunchyrollItems.length; i++)
            {
                if ($rootScope.crunchyrollItems[i].selected)
                {
                    showsToAdd.push($rootScope.crunchyrollItems[i]);
                }
            }

            console.log(showsToAdd);

            for (var i = 0; i < showsToAdd.length; i++)
            {
                $scope.addCalendarItem(showsToAdd[i], calendarId);
            }

            $timeout(function()
            {
                $scope.showFinalDialog(true);
            }, 1000);

        };

        $scope.createCalendar = function(calendarName)
        {
            var request = gapi.client.calendar.calendars.insert(
            {
                "summary": calendarName,
                "description": "Calendar created by Anime Koyomi."
            });

            request.execute(function (resp){
                $timeout(function()
                {
                    var calendarId = resp.id;
                }, 0);
            });
        };

        $scope.showFinalDialog = function(success)
        {
            var successDialog = $mdDialog.alert()
                .title('Events created!')
                .textContent('Visit Google Calendar to see your new events: <br/><br/>http://calendar.google.com/')
                .clickOutsideToClose(true);
                //.ok('Go to Calendar')
                //.cancel('Go back');

            var failureDialog = $mdDialog.alert()
                .title('Error')
                .textContent('Something went wrong.')
                .clickOutsideToClose(true)
                .ok('Got it!');

            if (success)
            {
                $mdDialog.show({
                    clickOutsideToClose: true,
                    template:
                    '<md-dialog>' +
                    '  <md-dialog-content>' +
                    '   <h2 class="md-title ng-binding">Events created successfully!</h2>' +
                    '   You can visit Google Calendar now to see the new events.' +
                    '  </md-dialog-content>' +
                    '  <md-dialog-actions>' +
                    //'    <md-button ng-click="closeDialog()" class="md-primary">' +
                    //'      Close' +
                    //'    </md-button>' +
                    '    <md-button href="http://calendar.google.com/" class="md-primary">' +
                    '      Go to Google Calendar' +
                    '    </md-button>' +
                    '  </md-dialog-actions>' +
                    '</md-dialog>'
                });
            }
            else
            {
                $mdDialog.show(failureDialog);
            }
        };

        $scope.$watch('selectedCalendar', function ()
        {
            var selectedCalendarName = $scope.selectedCalendar.trim();
            if (selectedCalendarName == '[New Calendar]')
            {
                $scope.newCalendar = true;
            }
        });

    }])

    .filter('twodigits', function()
    {
        return function(input) {
            if (input < 10) {
                input = '0' + input;
            }

            return input;
        }
    });

