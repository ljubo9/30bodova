const assert = require('assert');

describe('Login Test', () => {
  it('should log in successfully', () => {
    browser.url('/login'); 

    const usernameInput = $('[id="Username"]'); 
    const passwordInput = $('[id="Password"]');
    const loginButton = $('[type="submit"]');

    usernameInput.setValue('enthusiast'); 
    passwordInput.setValue('Enthusiast'); 
    loginButton.click();

    browser.pause(2000); 

    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    assert.strictEqual(isLoggedIn, 'true', 'Login nije uspješan');

    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    assert.strictEqual(currentUser.username, 'your_username', 'Pogrešno korisničko ime u podacima korisnika');

    const homeUrl = browser.getUrl();
    assert.strictEqual(homeUrl, 'http://localhost/home', 'Nije preusmjeren na /home'); 
  });
});
