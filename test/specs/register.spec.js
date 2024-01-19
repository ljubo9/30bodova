const assert = require('assert');

describe('Registration Test', () => {
  it('should register successfully as a client', () => {
    browser.url('/register'); 

    const firstNameInput = $('[id="firstName"]');
    const lastNameInput = $('[id="lastName"]');
    const usernameInput = $('[id="username"]');
    const passwordInput = $('[id="password"]');
    const emailInput = $('[id="email"]');
    const roleSelect = $('[id="role"]');
    const bioTextarea = $('[id="bio"]');
    const imageInput = $('[id="image"]');
    const registerButton = $('[type="button"]');

    firstNameInput.setValue('John');
    lastNameInput.setValue('Doe');
    usernameInput.setValue('john_doe');
    passwordInput.setValue('SecurePassword1');
    emailInput.setValue('john.doe@example.com');
    roleSelect.selectByVisibleText('Klijent');
    registerButton.click();

    browser.pause(2000); 

    const registrationStatus = $('[data-testid="registration-status"]').getText();
    assert.strictEqual(registrationStatus, 'Uspješna registracija, možete se logirati!', 'Registracija nije uspješna');


  });

  it('should display error for invalid password', () => {
    browser.url('/register'); 

    const passwordInput = $('[id="password"]');
    const registerButton = $('[type="button"]');

    passwordInput.setValue('invalidpassword');
    registerButton.click();


    const errorAlert = $('[data-testid="error-alert"]').getText();
    assert.strictEqual(errorAlert, 'Odaberi sigurniju lozinku! Koristi barem 8 znakova i jedno veliko slovo.', 'Pogrešna poruka o lozinci');
  });

  it('should display error for missing fields', () => {
    browser.url('/register'); 

    const registerButton = $('[type="button"]');

    registerButton.click();

    const errorAlert = $('[data-testid="error-alert"]').getText();
    assert.strictEqual(errorAlert, 'Popunite sva polja!', 'Pogrešna poruka o nepopunjenim poljima');
  });
});
