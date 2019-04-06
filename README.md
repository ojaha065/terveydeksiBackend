# A very simple REST backend for Terveydeksi! mobile app

Url: https://terveydeksi.azurewebsites.net/  
**HTTPS only!**

## API
| Request type | Route      | Request body/query |Response code(s)| Response body (JSON) |
|--------------|------------|--------------------|:--------------:|----------------------|
| GET          | /          | -                  | 200            | message: _string_    |
| GET          | /yritykset | -                  | 200            | _yritys[]_           |
|              |            | -                  | 500            | reason: _number_     |
| GET          | /omatTiedot| token              | 200            | _user_           |
|              |            |                    | 403,500        | reason: _number_     |
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
  statusCode: number, // 0 = OK, 1 = wrong user/pass
  token: string // JSON Web Token
};

user = {
   etunimi: string,
  sukunim: string,
  katuosoite: string,
  postinumero: string,
  postitoimipaikka: string,
  puhelinnumero: string,
  email: string
};
```
### Error codes (reason)
* 0: Määrittämätön virhe tietokantayhteydessä
* 1: _Not in use_ (anymore)
* 2: Pyyntö ei sisältänyt tarvittavia kenttiä
* 3: Sinulla ei ole tarvittavaa käyttöoikeutta käyttää tätä ominaisuutta
