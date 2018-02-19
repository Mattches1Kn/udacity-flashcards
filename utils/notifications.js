import {AsyncStorage} from 'react-native';
import {Permissions, Notifications} from 'expo';

const NOTIFICATION_KEY = 'mattches:notifications_v2';

function createNotification () {
    return {
        title: 'Quiz time !!',
        body: 'You should do a Quiz every day.',
        ios: {
            sound: true,
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true,
        }
    }
}
export function saveLastQuizDate() {
    return AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(new Date().toISOString()));
}

export function setLocalNotification () {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data) => {
            Permissions.askAsync(Permissions.NOTIFICATIONS)
                .then(({ status }) => {
                    if (status === 'granted') {
                        Notifications.cancelAllScheduledNotificationsAsync();
                        let lastQuizDate = null;
                        let t = new Date();
                        if (data !== null) {
                            lastQuizDate = new Date(data);
                        }
                        if (lastQuizDate === null || t.getFullYear() !== lastQuizDate.getFullYear() || t.getMonth() !== lastQuizDate.getMonth() || t.getDay() !== lastQuizDate.getDay() ) {
                            //did a quiz but not today -> produce notification now
                            t.setSeconds(t.getSeconds() + 10); //
                            const schedulingOptions = {
                                time: t,
                                repeat: 'day'
                            };
                            Notifications.scheduleLocalNotificationAsync(createNotification(), schedulingOptions);
                        } else {
                            //did a quiz -> produce notification for next day
                            t.setDate(t.getDate() + 1);
                            t.setHours(12);
                            const schedulingOptions = {
                                time: t,
                                repeat: 'day'
                            };
                            Notifications.scheduleLocalNotificationAsync(createNotification(), schedulingOptions);
                        }
                    }
                });
    });
}
