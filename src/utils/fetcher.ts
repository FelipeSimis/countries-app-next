import api from '../services/api';

export const fetcher = (url: string): Promise<any> =>
  api.get(url).then(res => res.data);
