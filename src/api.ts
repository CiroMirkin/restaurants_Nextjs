interface Restaurant {
  id: string;
  name: string;
  image: string;
  description: string;
  address: string;
  score: number;
  ratings: number;
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const api = {
  list: async (): Promise<Restaurant[]> => {
    const GOOGLE_SHEETS_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRNRIda9TQghqgKLvFCC4P5SB2FqWhY21xdrH9hoTcXYAHlxc43BvFWLkLPAgVjYDTvp1eE_m48cK9J/pub?gid=0&single=true&output=csv'
    
    // Obtenemos la información de Google Sheets en formato texto y la dividimos por líneas, nos saltamos la primera línea porque es el encabezado
    const [, ...data] = await fetch(GOOGLE_SHEETS_URL).then(res => res.text()).then(text => text.split('\n'))

    // Convertimos cada línea en un objeto Restaurant, asegúrate de que los campos no posean `,`
    const restaurants: Restaurant[] = data.map((row) => {
      const [id, name, description, address, score, ratings, image] = row.split(',')
      return {
        id,
        name,
        description,
        address,
        score: Number(score),
        ratings: Number(ratings),
        image
      }
    })

    return restaurants;
  },
  fetch: async (id: Restaurant["id"]): Promise<Restaurant> => {
    await sleep(750);

    const restaurants = await api.list()
    const restaurant = restaurants.find((restaurant) => restaurant.id === id);

    if (!restaurant) {
      throw new Error(`Restaurant with id ${id} not found`);
    }

    return restaurant;
  },
}

export default api;
