1. Planning

1.1 What’s your product / MVP? Define the main features


Game Database (sort of like Steam)

MVP:
- Browse available games;
- Game details page;
- Add games;
- Edit games;
- Delete games.

Bonus:
- Ability to search games (search bar);
- Filter search;
- Recommended page (based on highest rated);
- Filter search for recommended page;
- Favorites page (+ "Add to Favorites" button in Game details page);
- Change "Edit game" to show form under the game in game details page;
- Responsive page.


1.2 Break down into small tasks. Recommendation: set time estimation for each task

Homepage:
- Navbar* (Home, Browse Games, Add Game);
- Some image to display;
- Some text about the page;
- Footer* 

Browse games page:
- Display all games (Links to game details page);

Game details page:
- Display info about game (Name, image, description, rating, genre, price, etc)
- Buttons to edit/delete game.

Add game page:
- Form with inputs (Name, image, description, etc) + define which are required.

Edit game page:
- Pre-filled form with inputs to change game details;
- Possibly add game details/info component above.

Delete button:
- Delete game;
- Navigate to browse games.

*applies to all pages


1.3 Task management: Trello

1.4 (bonus) Draw some wireframes. Tools: https://whimsical.com, https://miro.com, https://excalidraw.com


2. Backend API

Option 1: create our own mock API with json-server and test with Postman



# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
