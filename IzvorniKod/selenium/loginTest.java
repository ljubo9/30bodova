import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

public class LoginTest {

    private WebDriver driver;
    private String baseUrl = "kuhajit";  // Replace with the base URL of your React app

    @Before
    public void setUp() {
        System.setProperty("webdriver.chrome.driver", "path/to/chromedriver");  // Provide the path to your ChromeDriver executable
        driver = new ChromeDriver();
        baseUrl = "URL_OF_YOUR_REACT_APP";  // Replace with the actual URL of your React app
        driver.get(baseUrl);
    }

    @Test
    public void testLoginAndRedirect() {
        // Assuming the input fields have unique IDs or other attributes you can use to identify them
        WebElement usernameField = driver.findElement(By.id("Username"));
        WebElement passwordField = driver.findElement(By.id("Password"));
        WebElement loginButton = driver.findElement(By.xpath("//button[text()='Log In']"));

        // Fill in the login form
        usernameField.sendKeys("client");
        passwordField.sendKeys("client");

        // Click the login button
        loginButton.click();

        // Wait for a moment to allow the redirect to happen (adjust as needed)
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        // Verify the current URL after login
        String currentUrl = driver.getCurrentUrl();
        String expectedUrl = baseUrl + "/home";  // Replace with the expected URL after successful login
        Assert.assertEquals(expectedUrl, currentUrl);
    }

    @After
    public void tearDown() {
        driver.quit();
    }
}
