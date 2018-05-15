###Sitemap

*   **Login** `"/login/"`
    * `"POST:/api/login/"`
    *   parameters: username, password
    *   redirect to: See auth notes
*   **SignUp** `"/signup/"`
    * `"POST:/api/signup/"`
    *   parameters: email,password,first_name,last_name,phone_number,address1,address2,city,state,uuid
    *   redirect to: See auth notes
*   **User Profile** `"/profile/"`
    * `"POST:/api/profile/"`
    *   parameters: email,first_name,last_name,phone_number,address1,address2,city,state
    *   redirect to: See auth notes
*   **Auth Notes**
    *   All auth views (login,register,profile) can optionally take a "next" parameter. If not present, redirect to "/" (?)
    *   If successful, auth forms will return `{ id: INT, email: STR }`
    *   If failed, auth forms will retrun `{ errors: { <FIELD_NAME>: <ERROR> } }`
    *   `<FIELD_NAME>` will be a POST parameter or `__all__` for errors that are global (not tied to one field)
*   **Bed Assignment** `"/beds"`
    *   back-end endpoint: `"api/beds"`
    *   is this a map view? how to assign?
    *   admins can assign beds to members
        *   back-end endpoint: `"api/beds/:id"`?
    *   Contact info is accessed through map
        *   back-end endpoint: `"api/members/:id"`?
*   **Book keeping**?
