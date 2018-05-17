const endpoints = {
  form: {
    signup: {
      baseURL: 'http://localhost:8000',
      url: '/api/schema/membership.RegistrationForm/',
      method: 'GET'
    },
    login: {
      baseURL: 'http://localhost:8000',
      url: '/api/schema/membership.SigninForm/',
      method: 'GET'
    },
    profile: {
      baseURL: 'http://localhost:8000',
      url: '/api/schema/membership.ProfileForm/',
      method: 'GET'
    }
  }
};

export default endpoints;
