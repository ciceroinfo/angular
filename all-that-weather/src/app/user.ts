export class User {
  id: string;
  name: string;
  email: string;
  items: [
    {
      id: string;
      name: string;
      country: string;
      coord: {
        lon: string;
        lat: string;
      }
    }
  ]
}
