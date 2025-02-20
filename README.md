
# 🚀 Elevator Telephony

📌 This project is an admin panel based on Next.js, utilizing Material-UI (MUI) for styling and integration with an API for data management. It features user authentication, dynamic theme management (light/dark), and notifications about the application's status.


## 🛠️ Tech Stack

**Next.js** - React framework for creating SSR/SSG applications

**Material-UI** (MUI) - UI component library

**Axios** - for API communication

**React Context API** - for managing global state
## 🔑 Authorization

The project uses a session mechanism based on cookies. The middleware redirects unauthenticated users to /auth and authenticated users to /dashboard. Users log in using their credentials.


## 🧩 Structure
```
📂 src
 ├── 📁 app              # Next.js pages
 ├── 📁 components       # UI components
 ├── 📁 context          # Application context ( theme, alerts )
 ├── 📁 layouts          # Application layouts 
 ├── 📁 utils            # Helper functions ( API, date parser )
 ├── 📄 middleware       # Authorization handling
 ```


## 🌗 Dark & light modes

The theme is stored in localStorage and adapts to the user's system preferences.


## 📡 API

The application uses a RESTful API for data management. All interactions with the backend are performed using the Axios library, ensuring simplicity and efficiency in communication. Here are the key operations available in the API:

### Endpointy

- **GET `/api/<resource>`**: Retrieve all records for a given resource.
- **GET `/api/<resource>/:id`**: Retrieve details of a specific record based on its identifier.
- **POST `/api/<resource>`**: Create a new record. Requires sending data in JSON format.
- **PUT `/api/<resource>/:id`**: Update an existing record. Requires sending the modified data.
- **DELETE `/api/<resource>/:id`**: Delete a record based on its identifier.


## ⚙️ Installation

To run the project locally, follow these steps:

**Clone the repository:**
   ```bash
   git clone https://github.com/warnishpl/elevator-telephony.git 
   cd ./elevator-telephony
   ```


## Roadmap

- The project is unlikely to be continued.


## Screenshots

<img src="https://i.postimg.cc/fLW8LRyh/Zrzut-ekranu-2025-02-20-005708.png" width="400" />
<img src="https://i.postimg.cc/jxT9mssc/Zrzut-ekranu-2025-02-20-005759.png" width="400" />
<img src="https://i.postimg.cc/byRMjKrh/Zrzut-ekranu-2025-02-20-005836.png" width="400" />
<img src="https://i.postimg.cc/QNyf8srR/Zrzut-ekranu-2025-02-20-005857.png" width="400" />
<img src="https://i.postimg.cc/4yqPBv5J/Zrzut-ekranu-2025-02-20-005958.png" width="400" />
<img src="https://i.postimg.cc/cJhcVGmk/Zrzut-ekranu-2025-02-20-010654.png" width="400" />
<img src="https://i.postimg.cc/3RwZhff8/Zrzut-ekranu-2025-02-20-010717.png" width="400" />
<img src="https://i.postimg.cc/wvbQj5nh/Zrzut-ekranu-2025-02-20-010826.png" width="400" />


## 👥 Authors

- [@warnishpl](https://github.com/warnishpl/) - Main creator of the project
- [@RobakGit](https://github.com/RobakGit/) - Mentor and code reviewer who supported the project by reviewing changes and providing valuable feedback.
