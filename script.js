document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector("#github-user-2025-10-17");
    const usernameInput = document.getElementById("usernameInput");
    const githubCreatedAt = document.getElementById("github-created-at");
    const errorMessageDiv = document.getElementById("errorMessage");
    const githubStatus = document.getElementById("github-status"); // Get the new status element

    // Function to get query parameter from URL
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    // Function to update the aria-live status region
    function updateAriaLiveStatus(message) {
        githubStatus.textContent = message;
    }

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent default form submission

        const username = usernameInput.value.trim();
        if (!username) {
            displayError("Please enter a GitHub username.");
            updateAriaLiveStatus("Lookup failed. Please enter a GitHub username."); // Announce error
            return;
        }

        displayError("", false); // Clear previous visual errors
        githubCreatedAt.textContent = "Loading...";
        updateAriaLiveStatus(`Lookup for GitHub user ${username} started...`); // Announce start

        const token = getQueryParam("token");
        const apiUrl = `https://api.github.com/users/${username}`;

        const headers = {
            'Accept': 'application/vnd.github.v3+json'
        };
        if (token) {
            headers['Authorization'] = `token ${token}`;
        }

        try {
            const response = await fetch(apiUrl, { headers: headers });
            const data = await response.json();

            if (response.ok) {
                if (data.created_at) {
                    // Extract YYYY-MM-DD from the ISO 8601 string (e.g., "2020-07-08T17:06:20Z")
                    // Note: The GitHub API returns UTC time. slice(0, 10) gives the YYYY-MM-DD part.
                    const createdAtDate = data.created_at.slice(0, 10);
                    githubCreatedAt.textContent = createdAtDate;
                    updateAriaLiveStatus(`Lookup for GitHub user ${username} succeeded. Account created on ${createdAtDate}.`); // Announce success
                } else {
                    githubCreatedAt.textContent = "Date not available.";
                    const msg = "Could not retrieve creation date for this user.";
                    displayError(msg);
                    updateAriaLiveStatus(`Lookup for GitHub user ${username} failed: ${msg}`); // Announce failure reason
                }
            } else {
                let errorMsg = "Failed to fetch user data.";
                if (response.status === 404) {
                    errorMsg = `User \"${username}\" not found.`;
                } else if (response.status === 403 && data.message && data.message.includes("API rate limit exceeded")) {
                    errorMsg = `API rate limit exceeded. Please try again later or use a GitHub token.`;
                } else if (data.message) {
                    errorMsg = `Error: ${data.message}`;
                }
                githubCreatedAt.textContent = "Error";
                displayError(errorMsg);
                updateAriaLiveStatus(`Lookup for GitHub user ${username} failed. ${errorMsg}`); // Announce failure
            }
        } catch (error) {
            console.error("Fetch error:", error);
            githubCreatedAt.textContent = "Error";
            const errorMsg = "An unexpected error occurred. Please try again.";
            displayError(errorMsg);
            updateAriaLiveStatus(`Lookup for GitHub user ${username} failed due to an unexpected network error.`); // Announce network failure
        }
    });

    function displayError(message, show = true) {
        if (show) {
            errorMessageDiv.textContent = message;
            errorMessageDiv.classList.remove('d-none');
        }
        else {
            errorMessageDiv.textContent = "";
            errorMessageDiv.classList.add('d-none');
        }
    }
});
