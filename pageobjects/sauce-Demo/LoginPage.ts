import { Locator, Page } from "@playwright/test"

export class    LoginPage{

    private  username: Locator
    private  password: Locator
    private  loginButton: Locator

constructor(page: Page){
 this.username = page.locator('input[name="user-name"]')
 this.password = page.locator('input[name="password"]')
 this.loginButton = page.locator('input[type="submit"]')
}

private async fillUsername(username: string){
    await this.username.fill(username)
}

private async fillPassword(password: string){
    await this.password.fill(password)
}

private async clickOnLoginButton(){
    await this.loginButton.click()
}

async doLogin(username: string, password: string){
    await this.fillUsername(username)
    await this.fillPassword(password)
    await this.clickOnLoginButton()
}
}