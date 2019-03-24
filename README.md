# A very simple REST backend for Terveydeksi! mobile app

Url: https://terveydeksi.azurewebsites.net/  
**HTTPS only!**

## API
| Request type | Route      | Response code | Response body (JSON) |
|--------------|------------|:-------------:|----------------------|
| GET          | /          | 200           | message: _string_    |
| GET          | /yritykset | 200           | yritys[]             |

### Tietotyypit
```javascript
// chat- ja ajanvaraus ovat aina 1 tai 0 (ajattele True ja False)
yritys = {
  id: number,
  nimi: string,
  katuosoite: string,
  postinumero: string,
  postitoimipaikka: string,
  kuvaus: string,
  chat: number,
  ajanvaraus: number,
  lat: number,
  lon: number,
  puhelinnumero: string
  email: string
};
```
