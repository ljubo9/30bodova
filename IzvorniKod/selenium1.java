import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.Select;

import static org.junit.Assert.*;

public class ChooseRecipeTest {

    private WebDriver driver;

    @Before
    public void setUp() {
        // Postavljanje putanje do vašeg ChromeDriver-a
        System.setProperty("webdriver.chrome.driver", "putanja/do/chromedriver.exe");
        driver = new ChromeDriver();
        // Otvaranje URL-a vaše React aplikacije
        driver.get("http://localhost:3000"); // Zamijenite s URL-om vaše aplikacije
    }

    @Test
    public void testAddProduct() throws InterruptedException {
        // Odabir namirnice iz padajućeg izbornika
        Select productSelect = new Select(driver.findElement(By.cssSelector("select")));
        productSelect.selectByVisibleText("ImeNamirnice"); // Zamijenite s pravim imenom namirnice

        // Dodavanje namirnice
        driver.findElement(By.cssSelector("button.mt-3")).click();

        // Provjerite jesu li namirnice dodane
        WebElement productList = driver.findElement(By.cssSelector("div.bg-white p-3"));
        assertTrue(productList.getText().contains("ImeNamirnice")); // Provjerava postoji li namirnica
    }

    @Test
    public void testRecipeDisplay() {
        // Provjerite postoje li recepti
        WebElement recipeContainer = driver.findElement(By.cssSelector("div.bg-white p-3 mb-4"));
        assertNotNull("Recepti nisu prikazani", recipeContainer);
    }

    @After
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
