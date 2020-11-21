import { Instance, types } from 'mobx-state-tree';

export const DayInfoModel = types
  .model('Day Information', {
    // Sunrise time,
    sunrise: types.Date,
    // Sunset time,
    sunset: types.Date,
    // Midday UV index
    uvi: types.number,
  })
  .views((self) => ({
    onDaytime(time: Date): boolean {
      const afterSunrise = self.sunrise < time;
      const beforeSunset = time < self.sunset;
      const onDay = beforeSunset && afterSunrise;
      console.log(
        'before sunset',
        beforeSunset,
        'afterSunrise',
        afterSunrise,
        'onDay',
        onDay
      );

      return onDay;
    },
  }));

export type DayInfoType = Instance<typeof DayInfoModel>;
