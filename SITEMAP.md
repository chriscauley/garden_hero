###Sitemap

*   **Login** `"/"`
*   back-end endpoint: `"/api"`
*   redirect to `"/members/:id"`
*   **SignUp** `"/new"`
    *   back-end endpoint: `"/api/new"`
    *   redirect to `"/members/:id"`
*   **User Profile** `"/members/:id"`
    *   back-end endpoint: `"api/members/:id"`
    *   users can update/delete their info
*   **Bed Assignment** `"/beds"`
    *   back-end endpoint: `"api/beds"`
    *   is this a map view? how to assign?
    *   admins can assign beds to members
        *   back-end endpoint: `"api/beds/:id"`?
    *   Contact info is accessed through map
        *   back-end endpoint: `"api/members/:id"`?
*   **Book keeping**?
