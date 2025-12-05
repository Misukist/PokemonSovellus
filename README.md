# 🎴 Pokécards Frontend Demo

**Testikäyttäjä:**  
- Sähköposti: `testi4@gmail.com`  
- Salasana: `123456`  

> ⚠️ **Tärkeä huomio:** Pokémon TCG API ei tällä hetkellä toimi täysin luotettavasti sillä pokemon api on todella huono. Tästä syystä korttien lataaminen "Cards" ja "Expansions" -osioihin saattaa kestää kauan. Korttien lisäämistä, hakemista ja poistamista voi kuitenkin testata saumattomasti "My Collection" -osiosta.

---

Tämä on frontend-demo Pokémon-korttisovelluksesta, jossa käyttäjä voi hakea kortteja Pokémon API:n avulla, kirjautua sisään ja lisätä kortteja omaan kokoelmaansa.  
Projekti on rakennettu modernilla **React + Vite** -kehityspaketilla ja tyylitetty **Tailwind CSS:llä**.

Backend-toteutus tehdään **Node.js + Express** -pohjaisesti, ja siinä käytetään **MongoDB:tä** käyttäjän omien korttien tallennukseen.

**Frontend Live Demo:**  
[https://pokemonsovellus.onrender.com/](https://pokemonsovellus.onrender.com/)

---

## 🖼️ Esikatselu
![ShowCase](frontend/assets/Frontpage.jpg)
![ShowCase](frontend/assets/Cards.jpg)
---

## 🚀Ominaisuudet

- 🔍 Haku Pokémon API:n avulla  
- 🧑‍💻 Käyttäjän kirjautuminen ja rekisteröityminen  
- 💾 Korttien lisääminen omaan kokoelmaan  
- 🗂️ Oman kokoelman selaus ja hallinta  
- 🎨 Tyylikäs käyttöliittymä Tailwind CSS:llä  

---

## 🛠️ Käytettävät teknologiat

**Frontend:**
- ⚛️ React + Vite  
- 🎨 Tailwind CSS  
- 🔐 JWT-autentikointi (frontendin ja backendin välillä)  
- 🌐 Axios / Fetch API tiedonhakuun  

**Backend (erillinen projekti):**
- 🧩 Node.js  
- 🚏 Express.js  
- 🗄️ MongoDB  
- 🔐 JWT ja bcrypt käyttäjien autentikointiin  
- 🔍 Pokémon API ulkoisena lähteenä korttidatalle  

---

## ⚡ Jatkokehitystarpeet

- 🗃️ Parempi tietokanta korteille, koska API toimi hitaasti ja epäluotettavasti  
- ⚡ Sivun optimointi: nopeammat kuvan lataukset ja sulavammat siirtymät  
- 🔔 Ilmoitusjärjestelmä alerttien tilalle  
- 🔍 Filtteröinti hakukenttään (API:n huonon toiminnan takia ei toteutettu)  