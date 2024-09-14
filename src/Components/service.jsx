import axios from 'axios';

const apiUrl = 'https://webhook.site/';

class ApiService {
async saveSegment(postData) {
        fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postData),
        })
        .then(response => response.json())
        .then(data => {
          console.log('Response:', data);
        })
        .catch(error => {
          return  false
        });
}}
const apiService = new ApiService();
export default apiService;
