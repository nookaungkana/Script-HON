export function login() {
    cy.viewport(1920, 1080);
    cy.visit('https://app-staging.honconnect.co/');
    cy.xpath("//button[contains(text(), 'เข้าสู่ระบบ')]").click({ force: true });
    cy.xpath("//input[@placeholder='Username']").type('mockuser@gmail.com');
    cy.xpath("//input[@placeholder='Password']").type('12341234');
    cy.xpath("//body/div[1]/div[1]/form[1]/input[2]").click();
    cy.get('.my-company > :nth-child(1)').click();
}
