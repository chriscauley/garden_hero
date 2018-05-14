###Sitemap

*   **Login** `"/"`
*   schema endpoint: `"GET:/api/schema/membership.SigninForm/"` # not ready
*   back-end endpoint: `"POST:/api/schema/membership.SigninForm/"` # not ready
*   redirect to `"/members/:id"`
*   **SignUp** `"/new"`
    *   schema endpoint: `GET:"/api/schema/membership.RegistrationForm/"`
    *   back-end endpoint: `POST:"/api/schema/membership.RegistrationForm/"`
    *   redirect to `"/memebers/:id"`
*   **User Profile** `"/members/:id"`
    *   schema endpoint: `GET:"/api/schema/membership.ProfileForm/"`
    *   back-end endpoint: `POST:"/api/schema/membership.ProfileForm/"`
    *   users can update/delete their info
*   **Bed Assignment** `"/beds"`
    *   back-end endpoint: `"api/beds"`
    *   is this a map view? how to assign?
    *   admins can assign beds to members
        *   back-end endpoint: `"api/beds/:id"`?
    *   Contact info is accessed through map
        *   back-end endpoint: `"api/members/:id"`?
*   **Book keeping**?