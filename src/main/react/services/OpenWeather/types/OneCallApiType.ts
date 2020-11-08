export interface OneCallType {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: Current;
  minutely: Array<Minutely>;
  hourly: Array<Hourly>;
  daily: Array<Daily>;
  alerts?: Array<Alert>;
}
export function verifyOneCallType(object: any) {
  verifyField(object, 'lat', 'number');
  verifyField(object, 'lon', 'number');
  verifyField(object, 'timezone', 'string');
  verifyField(object, 'timezone_offset', 'number');
  verifyField(object, 'current', 'object');
  verifyCurrent(object['current']);

  verifyField(object, 'minutely', 'array');
  (object['minutely'] as Array<any>).forEach((element) =>
    verifyMinutely(element)
  );

  verifyField(object, 'hourly', 'array');
  (object['hourly'] as Array<any>).forEach((element) => verifyHourly(element));

  verifyField(object, 'daily', 'array');
  (object['daily'] as Array<any>).forEach((element) => verifyDaily(element));

  verifyField(object, 'alerts', 'array', true);
  object['alerts'] &&
    (object['alerts'] as Array<any>).forEach((element) => verifyAlert(element));
}

interface Current {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust?: number;
  weather: Array<Weather>;
  rain?: RainOrSnow;
  snow?: RainOrSnow;
}
function verifyCurrent(object: any) {
  verifyField(object, 'dt', 'number');
  verifyField(object, 'sunrise', 'number');
  verifyField(object, 'sunset', 'number');
  verifyField(object, 'temp', 'number');
  verifyField(object, 'feels_like', 'number');
  verifyField(object, 'pressure', 'number');
  verifyField(object, 'humidity', 'number');
  verifyField(object, 'dew_point', 'number');
  verifyField(object, 'uvi', 'number');
  verifyField(object, 'clouds', 'number');
  verifyField(object, 'visibility', 'number');
  verifyField(object, 'wind_speed', 'number');
  verifyField(object, 'wind_deg', 'number');
  verifyField(object, 'wind_gust', 'number', true);
  verifyField(object, 'weather', 'array');
  (object['weather'] as Array<any>).forEach((element) =>
    verifyWeather(element)
  );
  verifyField(object, 'rain', 'object', true);
  verifyRainOrSnow(object['rain']);
  verifyField(object, 'snow', 'object', true);
  verifyRainOrSnow(object['snow']);
}

interface Hourly {
  dt: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust?: number;
  pop: number;
  weather: Array<Weather>;
  rain?: RainOrSnow;
  snow?: RainOrSnow;
}
function verifyHourly(object: any) {
  verifyField(object, 'dt', 'number');
  verifyField(object, 'temp', 'number');
  verifyField(object, 'feels_like', 'number');
  verifyField(object, 'pressure', 'number');
  verifyField(object, 'humidity', 'number');
  verifyField(object, 'dew_point', 'number');
  verifyField(object, 'clouds', 'number');
  verifyField(object, 'visibility', 'number');
  verifyField(object, 'wind_speed', 'number');
  verifyField(object, 'wind_deg', 'number');
  verifyField(object, 'wind_gust', 'number', true);
  verifyField(object, 'weather', 'array');
  verifyField(object, 'pop', 'number');
  (object['weather'] as Array<any>).forEach((element) =>
    verifyWeather(element)
  );
  verifyField(object, 'rain', 'object', true);
  verifyRainOrSnow(object['rain']);
  verifyField(object, 'snow', 'object', true);
  verifyRainOrSnow(object['snow']);
}

interface Daily {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: DailyTemp;
  feels_like: DailyFeelsLike;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility?: number;
  pop: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust?: number;
  weather: Array<Weather>;
  rain?: number;
  snow?: number;
}
function verifyDaily(object: any) {
  verifyField(object, 'dt', 'number');
  verifyField(object, 'sunrise', 'number');
  verifyField(object, 'sunset', 'number');
  verifyField(object, 'temp', 'object');
  verifyDailyTemp(object['temp']);
  verifyField(object, 'feels_like', 'object');
  verifyDailyFeelsLike(object['feels_like']);
  verifyField(object, 'pressure', 'number');
  verifyField(object, 'humidity', 'number');
  verifyField(object, 'dew_point', 'number');
  verifyField(object, 'uvi', 'number');
  verifyField(object, 'clouds', 'number');
  verifyField(object, 'visibility', 'number', true);
  verifyField(object, 'pop', 'number');
  verifyField(object, 'wind_speed', 'number');
  verifyField(object, 'wind_deg', 'number');
  verifyField(object, 'wind_gust', 'number', true);
  verifyField(object, 'weather', 'array');
  (object['weather'] as Array<any>).forEach((element) =>
    verifyWeather(element)
  );
  verifyField(object, 'rain', 'number', true);
  verifyField(object, 'snow', 'number', true);
}

interface Alert {
  sender_name: string;
  event: string;
  start: number;
  end: number;
  description: string;
}
function verifyAlert(object: any) {
  verifyField(object, 'sender_name', 'string');
  verifyField(object, 'event', 'string');
  verifyField(object, 'start', 'number');
  verifyField(object, 'end', 'number');
  verifyField(object, 'description', 'string');
}

interface DailyTemp {
  morn: number;
  day: number;
  eve: number;
  night: number;
  min: number;
  max: number;
}
function verifyDailyTemp(object: any) {
  verifyField(object, 'morn', 'number');
  verifyField(object, 'day', 'number');
  verifyField(object, 'eve', 'number');
  verifyField(object, 'night', 'number');
  verifyField(object, 'min', 'number');
  verifyField(object, 'max', 'number');
}

interface DailyFeelsLike {
  morn: number;
  day: number;
  eve: number;
  night: number;
}
function verifyDailyFeelsLike(object: any) {
  verifyField(object, 'morn', 'number');
  verifyField(object, 'day', 'number');
  verifyField(object, 'eve', 'number');
  verifyField(object, 'night', 'number');
}

interface RainOrSnow {
  '1h': number;
}
function verifyRainOrSnow(object: any) {
  object && verifyField(object, '1h', 'number');
}

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}
function verifyWeather(object: any) {
  verifyField(object, 'id', 'number');
  verifyField(object, 'main', 'string');
  verifyField(object, 'description', 'string');
  verifyField(object, 'icon', 'string');
}

interface Minutely {
  dt: number;
  precipitation: number;
}
function verifyMinutely(object: any) {
  verifyField(object, 'dt', 'number');
  verifyField(object, 'precipitation', 'number');
}

function verifyField(
  object: any,
  fieldName: string,
  expectedFieldType: string,
  nullable = false
): void {
  const fieldValue = object[fieldName];
  if (typeof fieldValue === 'undefined') {
    if (nullable) {
      return;
    }
    throw `Missing field:${fieldName}`;
  }
  const fieldType = typeof fieldValue;

  if (expectedFieldType === 'array') {
    if (!Array.isArray(fieldValue)) {
      throw `Field ${fieldName} is not array.`;
    }
  } else if (fieldType !== expectedFieldType) {
    throw `Field ${fieldName} has type ${fieldType} instead of type ${expectedFieldType}.`;
  }
}
