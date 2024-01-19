describe('Login Test', () => {
    it('should successfully log in', () => {
        browser.url('http://localhost:3000/login'); 

        const usernameField = $('enthusiast');
        const passwordField = $('Enthusiast');
        const loginButton = $('button[type="submit"]');

        usernameField.setValue('testuser');
        passwordField.setValue('testpassword');
        loginButton.click();

        browser.waitUntil(() => $('#WelcomeMessage').isDisplayed(), {
            timeout: 5000,
            timeoutMsg: 'Dobrodošli tekst nije prikazan nakon uspešnog logina'
        });

        const welcomeMessage = $('#WelcomeMessage');
        expect(welcomeMessage.getText()).to.contain('Dobrodošli');
    });
});
