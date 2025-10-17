## GitHub User Creation Date Lookup

This is a simple web application designed to fetch and display the account creation date for any given GitHub username. Built with Bootstrap for a responsive and modern user interface, it provides a straightforward form to input a username and retrieve the creation date in `YYYY-MM-DD UTC` format. For authenticated requests, an optional GitHub personal access token can be provided via a URL query parameter.

### Setup Instructions

This application is a static front-end page and does not require a backend server.

1.  **Clone the Repository (or save files):**
    Save the provided `index.html`, `script.js`, and `style.css` files into a single directory on your local machine.
2.  **Open in Browser:**
    Simply open the `index.html` file directly in your web browser. For example, `file:///path/to/your/folder/index.html`.

### Usage Guide

1.  **Enter Username:** In the input field labeled "Enter GitHub username," type the GitHub username you wish to look up (e.g., `octocat`).
2.  **Lookup:** Click the "Lookup" button.
3.  **View Result:** The account creation date will appear below the form in `YYYY-MM-DD UTC` format.
4.  **Error Handling:** If the username is not found, an API rate limit is exceeded, or another error occurs, an appropriate error message will be displayed.
5.  **Using a GitHub Token (Optional):**
    To avoid GitHub API rate limits (especially for unauthenticated requests) or for higher request limits, you can generate a Personal Access Token from your GitHub settings. Once you have a token, append it to the URL in your browser's address bar like this:
    `http://localhost:port/index.html?token=YOUR_GITHUB_PERSONAL_ACCESS_TOKEN`
    (Replace `YOUR_GITHUB_PERSONAL_ACCESS_TOKEN` with your actual token). The application will automatically detect and use this token for authenticated requests.

### Code Explanation

*   **`index.html`**:
    *   This is the main HTML file, structuring the web page.
    *   It includes Bootstrap CSS and JS for styling and interactive components.
    *   It contains a `<form>` with the required `id="github-user-2025-10-17"`.
    *   An `<input type="text" id="usernameInput">` allows users to enter a GitHub username.
    *   A `<p id="github-created-at">` element is designated to display the fetched creation date.
    *   An `errorMessage` div is used to display any alerts or errors.
    *   It links to `style.css` for custom styling and `script.js` for dynamic behavior.
*   **`style.css`**:
    *   Provides basic custom styling to enhance the visual appeal, such as background color and container width.
*   **`script.js`**:
    *   This JavaScript file handles the core logic of the application.
    *   It listens for the `DOMContentLoaded` event to ensure the HTML is fully loaded before executing.
    *   An event listener is attached to the form's `submit` event.
    *   Upon submission, it prevents the default form action.
    *   It retrieves the username from the input field.
    *   It checks the browser's URL for an optional `?token=` query parameter. If found, this token is used in the `Authorization` header for the GitHub API request.
    *   It constructs the GitHub API endpoint URL: `https://api.github.com/users/{username}`.
    *   It uses the `fetch` API to make an asynchronous request to GitHub.
    *   On a successful response, it parses the `created_at` field from the JSON data.
    *   The `created_at` string (e.g., "2020-07-08T17:06:20Z") is sliced to extract only the `YYYY-MM-DD` part, ensuring the output is in UTC.
    *   The formatted date is then displayed in the `#github-created-at` paragraph.
    *   Error handling is implemented to catch API errors (e.g., user not found, rate limits) and display user-friendly messages.

### License Information

This project is licensed under the MIT License.