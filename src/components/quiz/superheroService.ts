import axios, { AxiosResponse } from 'axios';
import { Superhero } from './Superhero.type';

const SUPERHERO_API_BASE_URL = 'https://superheroapi.com/api.php/7a1ace9ac59e1922cb1cb520e082422b';

const fetchSuperheroByName = async (name: string): Promise<Superhero | null> => {
  try {
    const matchCharacter: AxiosResponse<any, any> = await axios.get(`${SUPERHERO_API_BASE_URL}/search/${name}`);
    return matchCharacter.data.error ? null : matchCharacter.data.results[0];
  } catch (error) {
    console.error('Error fetching superhero data:', error);
    return null;
  }
};

export default fetchSuperheroByName;
