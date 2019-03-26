# A very simple REST backend for Terveydeksi! mobile app

Url: https://terveydeksi.azurewebsites.net/  
**HTTPS only!**

## API
| Request type | Route      | Response code | Response body (JSON) |
|--------------|------------|:-------------:|----------------------|
| _any_        | _any_      | 400           | reason: number       |
| GET          | /          | 200           | message: _string_    |
| GET          | /yritykset | 200           | yritys[]             |
|              |            | 500           | reason: number

### Data types
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
### Error codes (reason)
* 0: Määrittämätön virhe tietokantayhteydessä
* 1: Pyyntö ei sisältänyt tarvittavaa otsaketta
