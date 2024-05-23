import config from '../../config.json';

class ApiService {
  constructor() {
    this.requestUrl = config.url;
    this.key = config.apiKey;
    this.bgIconUrl = config.bgIconUrl;
    this.bgKeyImg = config.bgKeyImg;
    this.units = config.units;
    this.metric = config.metric;
    this.searchQuery = '';
    this.location = 'Kiev';
  }

    getData(collection) {
    const url = `${this.requestUrl}${collection}?q=${this.location}&units=${this.units}&appid=${this.key}`;

    return fetch(url).then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject('Something went wrong');
    });
  }

  
  fetchImages() {
    const bgUrlIcon = `${this.bgIconUrl}${this.location}&page=1&per_page=12&key=${this.bgKeyImg}`;

    return fetch(bgUrlIcon).then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject('Picture not found');
    });
  }

    set query(newLocation) {
    this.location = newLocation;
  }
}

const apiService = new ApiService({});

export default apiService;
