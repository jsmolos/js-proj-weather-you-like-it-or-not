let fiveDaysData = [];

const renderFiveDays = data => {
  const allDaysArr = data.list;
  const oneDayArr = data.list.map(element => element.dt_txt.slice(0, 10)); 

  const dataUnique = oneDayArr.filter((elm, index, arr) => arr.indexOf(elm) === index); 
  if (dataUnique.length > 5) {
    dataUnique.shift();
  }

  const fiveDays = dataUnique.map(data =>
    allDaysArr.filter(obj => obj.dt_txt.slice(0, 10) === data),
  ); 

  
  const getDate = data => new Date(data.dt * 1000).getDate();

  
  const getDayOfWeek = data => {
    const date = new Date(data * 1000);
    const weekDay = new Intl.DateTimeFormat('en', { weekday: 'long' }).format(date);
    return weekDay;
  };

  
  const getMonth = data => {
    const date = new Date(data * 1000);
    const month = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
    return month;
  };

  
  const getYear = function (data) {
    const currentDate = new Date(data * 1000);
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const year = currentDate.getFullYear();
    return year;
  };

  
  const mathTemp = data => {
    data = data.map(e => Math.floor(e.main.temp));
    const temp = {
      tempMin: Math.min(...data),
      tempMax: Math.max(...data),
    };
    return temp;
  };

  
  const getIconData = day => {
    const iconInfo = {};

    day.forEach(item => {
      if (!iconInfo[item.weather[0].icon]) {
        iconInfo[item.weather[0].icon] = 1;
      } else {
        iconInfo[item.weather[0].icon]++;
      }
    });
    let icon;
    const maxValue = Math.max(...Object.values(iconInfo));
    for (let [key, value] of Object.entries(iconInfo)) {
      if (value === maxValue) {
        icon = key;
      }
    }
    return 'http://openweathermap.org/img/wn/' + icon + '@2x.png';
  };

  
  const getWindSpeed = data => {
    const wind = data.map(e => Math.floor(e.wind.speed)).reduce((a, b) => a + b, 0);
    const resultWind = Math.floor(+wind / data.length);
    return resultWind;
  };

  
  const getEverageTemp = data => {
    const temp = data.map(e => Math.floor(e.main.temp)).reduce((a, b) => a + b, 0);
    const resulTemp = Math.floor(+temp / data.length);
    return resulTemp;
  };

  
  const getPressure = data => {
    const press = data.map(e => Math.floor(e.main.pressure)).reduce((a, b) => a + b, 0);
    const resultPress = Math.floor(+press / data.length);
    return resultPress;
  };

  
  const getHumidity = data => {
    const humid = data.map(e => Math.floor(e.main.humidity)).reduce((a, b) => a + b, 0);
    const resulHumidity = Math.floor(+humid / data.length);
    return resulHumidity;
  };

  const weatherParams = fiveDays.map(elem => {
    return {
      day: getDate(elem[0]),
      dayOfWeek: getDayOfWeek(elem[0].dt),
      month: getMonth(elem[0].dt),
      year: getYear(elem[0].dt),
      date: elem[0].dt,
      icon: getIconData(elem),
      forecast: elem,
      temp: mathTemp(elem),
      tempDay: getEverageTemp(elem),
      wind: getWindSpeed(elem),
      pressure: getPressure(elem),
      humidity: getHumidity(elem),
    };
  }); 

  fiveDaysData = weatherParams;

  const finalData = {
    city: data.city.name,
    country: data.city.country,
    weatherParams,
  };
  return finalData;
};

export { renderFiveDays, fiveDaysData };
