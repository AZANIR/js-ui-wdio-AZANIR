import * as assert from "assert";

describe("User", () => {
  it("can register", async () => {
    await browser.url("/create_account");
    const createAccountForm = await $("#box-create-account");
    const firstName = await createAccountForm.$('input[name="firstname"]');
    await firstName.setValue("User123");
    const lastName = await createAccountForm.$('input[name="lastname"]');
    await lastName.setValue("lastname123");
    const countryCode = await createAccountForm.$('select[name="country_code"]');
    await countryCode.selectByVisibleText("Ukraine");
    const email = `Some${new Date().getTime() / 1000}@mail.com`;
    const emailInput = await createAccountForm.$('input[name="email"]');
    await emailInput.setValue(email);
    const phoneInput = await createAccountForm.$('input[name="phone"]');
    await phoneInput.setValue("+380441111111");
    const password = await createAccountForm.$('input[name="password"]');
    await password.setValue(email);
    const passwordConfirm = await createAccountForm.$('input[name="confirmed_password"]');
    await passwordConfirm.setValue(email);
    const createAccountBtn = await $('button[name="create_account"]');
    //await createAccountBtn.click();
    await browser.pause(1000);
  });
  it.only("login user", async () => {
    await browser.url(`https://the-internet.herokuapp.com/login`);
    const username = await $("#username");
    const password = await $("#password");
    const submitBtn = await $('button[type="submit"]');
    await username.setValue("tomsmith");
    await password.setValue("SuperSecretPassword!");
    await submitBtn.click();
    await browser.pause(1000);
    const alert = await $("#flash");
    await assert(await alert.isDisplayed(), "Expected success alert to login user");
    const alertText = await alert.getText();
    const expectedText = "You logged into a secure area!";
    await assert(alertText.includes(expectedText), `Alert text: ${alertText} to match expcted: ${expectedText}, after login`);
  });
});
