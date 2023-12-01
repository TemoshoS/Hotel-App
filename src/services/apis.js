// api.js
import axios from 'axios';

const fetchData = async () => {
    const options = {
        method: 'GET',
        url: 'https://sky-scanner3.p.rapidapi.com/hotels/detail',
        params: {
          url: '/hotels/thailand/bangkok-hotels/ambassador-hotel-bangkok/ht-46963734?checkin=2023-09-05&checkout=2023-09-30&rooms=1&adults=3&clicked_details_price=92&correlation_id=cb254b9f-01ca-4e0d-a547-1aacd7a51843&currency=USD&locale=en-US&market=US&min_price_room_id=eyJtaW5pX3ByaWNlX3Jvb21faWQiOiI1MzMzNDExODgiLCJyYXRlX2lkIjoiNTMzMzQxMTg4IiwiYWR1bHRzIjpudWxsLCJhdXRob3JpemF0aW9uX2luZm8iOlt7IkNvZGUiOiJQdWJsaWNQYXJhbWV0ZXIiLCJWYWx1ZSI6Ikg0c0lBQUFBQUFBQUFHVlIyMnJETUF6OUY3K3VHWXB6YWRLM1hsWVdDQ3lRNW1rWnczWGN6dFMxaStNTVF1bVwvVDBsYUJodjRRVDVIMGptU3JpUmJWYVwvR0NiV1Z5Z2xMRnVSYWs2VnNhckx3YVF6eldVM1dYNEtmTXIxaFRpQmFFd28wOENEMUlLckpnMzdyM0Q4K2dJazNuWGEyWDV0bW9xdHlncTFwMjZvVmRnUzN5N3g4bWZDdWRlWXNiR0hOUlZqWElcLzJPbGg3Zk5hb2NqUjFnSDJEMlMyU2paUWh2SHdqbWhqTTF5UW45ZVZjc0ZITUhZODhqYkxTU1dveDRPVTBiK0VrWURSMUwwMWt1XC9tWlZZMVpObUZLU2FTNjY0WDhqTTV4UHQ3SjFRdk8rc05KWTZYcmNJa1ZHbVdPMndSaU5Bb1g1M1BlRzFVQUtJYVJSUXFuSFdYcElHWERHMlQ2TUVraWFFRjhvYUpCRVB0MG4yQVBQVTVoMmJETk80azJXa01seEUwdHI1VGRUTzNrV2crYmpNUEVPNGdVQXZtZVVmb0lFSTZ5UWw1VXlcL0hRXC9TTmJrYUJ2TDRoZzVKcHZCNlhCeWN2c0JPN1pGUWhZQ0FBQT0ifSx7IkNvZGUiOiJNaW5QcmljZV9QYXJ0bmVyX2RhdGEiLCJWYWx1ZSI6Ikg0c0lBQUFBQUFBQUFHV1FNV1wvRElCQ0ZcLzh2TmlRV0h3WkMxemRDdGF0WE55NFdRRk1uR2xvMnJWSkhcL2V3OVhtWUpZN252dkh1TGRvWVwvcGZZbyt2S1hMQUFlNHQ0V01oVXpEMExkd1lFSVwvMTQzdzVFeFRJZTVheUpsdVBDdWpUS1ZVclRTenNoSFBUTFZpSktXMUJWSU9ZMGRwRTZSV3FGQm9vVXJFa0tsN0JHTXRyYWkwTXloUmJcL25qUERJWGxkZ09Jem92WFM1b0xYcnN3NXlwTHg1cG5Hb2NOb0tqaXpGUDVNUDJYZ3VTZDFFMGpkeWpRQ1djcUlYVEZuSHZ5VjBjQ1UrZVRyVzJ3cDVydm5WQVpiWEVrMjFoaFIxYzR1MkRQM0JNT2VaZkxnT0dLVjVqb3U1bG1hYVFQRFA0K254bDUwTTQzdnczcFd1QUF6ZGxEQmNEZnBuejBEOXRcL09NblwvN3IrQVJ4ZGxQNldBUUFBIn0seyJDb2RlIjoiRml4Q2hhbmdlUmF0ZSIsIlZhbHVlIjoiSDRzSUFBQUFBQUFBQUt0VzhpXC9LVE1cL01TOHh4TGkwcVNzMUxybFN5VWdvTmRsSFNVZkxOekFzb3lreE9EY3JQendVS21ob2JHNXNZR2xwWUFLWFE5YmhXSkdjazVxV25BcFdaNnhtWm1SbWJBaFU1bHhhWDVPZW1GbUVZakM2QlJYY3RBSzhsa0grWUFBQUEifV19&poiId=206569746&priceType=price-per-night&search_cycle_id=c407c87960ef76384bb92443d6cc2162249f783210218296d753d8f6384e2b29&search_entity_id=27536671'
        },
        headers: {
          'X-RapidAPI-Key': 'eda5243a6fmsh6d6d28ccdab9847p1ca121jsnd1c59b54e51d',
          'X-RapidAPI-Host': 'sky-scanner3.p.rapidapi.com'
        }
      };
      
      try {
          const response = await axios.request(options);
          console.log(response.data);
      } catch (error) {
          console.error(error);
      }
};

export { fetchData };
