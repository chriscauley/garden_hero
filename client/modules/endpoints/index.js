const endpoints = {
  form: {
    registration: {
      baseURL: 'http://localhost:8000',
      url: '/api/schema/membership.RegistrationForm/',
      method: 'GET'
    },
    login: {
      baseURL: 'http://localhost:8000',
      url: '/api/schema/membership.SigninForm/',
      method: 'GET'
    },
    member: {
      baseURL: 'http://localhost:8000',
      url: '/api/schema/membership.ProfileForm/',
      method: 'GET'
    }
  }
};

export default endpoints;
