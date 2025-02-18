// ข้ามข้อผิดพลาดที่เกิดจาก DOMException ที่มีเฉพาะ getter
Cypress.on('uncaught:exception', (err, runnable) => {
    if (err.message.includes('Cannot set property message of [object DOMException]')) {
        return false; // ข้ามข้อผิดพลาดนี้
    }
    return true; // ให้ Cypress จัดการข้อผิดพลาดอื่นๆ
});
export function login() {
    cy.viewport(1920, 1080);
    cy.visit('https://app-staging.honconnect.co/');
    cy.xpath("//button[contains(text(), 'เข้าสู่ระบบ')]").should('be.visible').click({ force: true });
    cy.wait(3000);

    // ใช้ cy.origin() เพื่อทำงานใน origin ใหม่
    cy.origin('https://auth-staging.honconnect.co', () => {
        cy.get('input[name="username"]').type('mockuser@gmail.com');
        cy.wait(3000);
        cy.get('input[name="password"]').type('12341234');
        cy.wait(3000);
        cy.get('.button').click();
        cy.wait(2000); // รอให้การล็อกอินเสร็จสมบูรณ์
    });
    // กลับไปทำงานกับหน้าเดิมหลังจากการล็อกอิน
    cy.get('.my-company > :nth-child(1)').click();
    cy.wait(2000);
}


