# A very simple REST backend for Terveydeksi! mobile app

Url: https://terveydeksi.azurewebsites.net/  
**HTTPS only!**

## API
| Request type | Route      | Request body       |Response code(s)| Response body (JSON) |
|--------------|------------|--------------------|:--------------:|----------------------|
| _any_        | _any_      | _n/a_              | 400            | reason: _number_     |
| GET          | /          | _n/a_              | 200            | message: _string_    |
| GET          | /yritykset | _n/a_              | 200            | _yritys[]_           |
|              |            | _n/a_              | 500            | reason: _number_     |
| POST         | /login     | username, password | 200            | _loginStatus_        |
|              |            |                    | 400, 500       | reason: _number_     |

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
  email: string,
  tyyppi: string // Esim. "Yleislääkäripalvelut" tai "Hammaslääkäripalvelut"
};

loginStatus = {
  status: string,
  statusCode: number // 0 = OK, 1 = wrong user/pass
};
```
### Error codes (reason)
* 0: Määrittämätön virhe tietokantayhteydessä
* 1: Pyyntö ei sisältänyt tarvittavaa otsaketta
* 2: Pyyntö ei sisältänyt tarvittavia kenttiä
