# Remote Developer Jobs Board

rmtDev is an advanced React web application designed to help users search, browse, and bookmark remote developer job listings.

## Live Demo

[View the live demo on Vercel](#)

## Features

- **Search**: Search for remote developer roles by keyword input.
- **Pagination**: Job listings are split into pages, enabling easy navigation through results.
- **Sorting**: Order results by relevance or by most recent posting date.
- **Job Details**: Click a listing to view full job information in a dedicated panel.
- **Bookmarking**: Save favorite jobs to local storage; bookmarks persist across sessions and appear in a bookmark popover.
- **Fetching data and Caching**: Instant data retrieval and background updates via React Query.
- **Context API & Custom Hooks**: Centralize state (search criteria, bookmarks, pagination) with React Context and custom hooks for cleaner components.
- **Shareable URLs**: Encode search state and active job in the URL for easy sharing.
- **Error Handling & Notifications**: Leverage react-hot-toast to surface network or API errors as unobtrusive toast messages.

## Tech Stack

- React (>=18)
- TypeScript (strict mode enabled)
- React Query
- Context API
- Fetch API
- CSS
- Vite
