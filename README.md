# 📚 Book Application (SPA)

Welcome to the Book Application (Single Page Application) project! This application allows users to search for books, save their favorites, and navigate through paginated results. The project is built using pure JavaScript, focusing on modular components and views to ensure a maintainable and scalable codebase.

## Table of Contents
1. [📖 Project Overview](#-project-overview)
2. [✨ Features](#-features)
3. [📂 Project Structure](#-project-structure)
4. [🧩 Components and Views](#-components-and-views)

## 📖 Project Overview
This Book SPA application allows users to:

- 🔍 Search for books
- 🌟 Save books to their favorites list
- 📄 Navigate through search results using pagination

The application is written in pure JavaScript without any frameworks, utilizing modular design principles to separate concerns and promote reusability.

## ✨ Features
- 🔍 Search Books: Users can search for books by title, author, or other criteria.
- 🌟 Favorites: Users can save their favorite books for easy access later.
- 📄 Pagination: Users can navigate through search results using a paginated interface.
- 🧩 Modular Design: The application is built using components and views to ensure a clean and maintainable codebase.

## 📂 Project Structure
```book-spa/
├── index.html
├── src/
│   ├── common/
│   ├── components/
│   │    ├── card/
│   │    ├── cardList/
│   │    ├── header/
│   │    ├── pagination/
│   │    ├── search/
│   │    └── title/
│   ├── utils/
│   └── views/
│        ├── favorites/
│        └── main/
├── static/
```
## 🧩 Components and Views
### Components
- 🔍 Search: The Search component handles user input for querying books based on specific keywords or criteria.
- 🎩 Header: The Header component displays the application's main navigation and branding elements.
- 📄 Title: The Title component renders the title of the book or section being viewed.
- 📘 Card: The Card component presents individual book details in a compact and visually appealing format.
- 📚 CardList: The CardList component organizes and displays a collection of Card components in a structured layout.
- 📃 Pagination: Manages pagination logic and rendering of pagination controls.
### Views
- 🏠 main.js: Renders the homepage, including the search bar and book results.
- 🌟 favorites.js: Renders favorite books.