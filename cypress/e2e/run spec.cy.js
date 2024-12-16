describe('Test color-front selectors', () => {
    it('should loop through front selectors based on color quantity', () => {
        // เข้าถึง zone ด้านหน้า
        cy.get('[data-test-id="color-front-zone"]').then(($frontZone) => {

            // อ่านค่า quantity ของสีด้านหน้า
            const frontQuantity = $frontZone.attr('data-test-color-front-quantity');

            // Loop ตามจำนวนที่ได้
            for (let i = 0; i < parseInt(frontQuantity); i++) {
                // ใช้ data-test-id เพื่อเลือก color-front-selector
                cy.get(`[data-test-id="color-front-selector-${i + 1}"]`).within(() => {

                    // ทำบางอย่างใน selector นี้ เช่น เลือกเครื่องพิมพ์ หรือสี
                    cy.get('div[role="combobox"]').first().click();
                    cy.get('li[data-value="some-printer"]').click(); // เปลี่ยนตามตัวเลือกที่คุณต้องการ

                    cy.get('div[role="combobox"]').eq(1).click();
                    cy.get('li[data-value="some-color"]').click(); // เปลี่ยนตามตัวเลือกที่คุณต้องการ
                });
            }
        });

        // ทำแบบเดียวกันสำหรับ color-back
        cy.get('[data-test-id="color-back-zone"]').then(($backZone) => {

            // อ่านค่า quantity ของสีด้านหลัง
            const backQuantity = $backZone.attr('data-test-color-back-quantity');

            // Loop ตามจำนวนที่ได้
            for (let i = 0; i < parseInt(backQuantity); i++) {
                // ใช้ data-test-id เพื่อเลือก color-back-selector
                cy.get(`[data-test-id="color-back-selector-${i + 1}"]`).within(() => {

                    // ทำบางอย่างใน selector นี้ เช่น เลือกเครื่องพิมพ์ หรือสี
                    cy.get('div[role="combobox"]').first().click();
                    cy.get('li[data-value="some-printer"]').click(); // เปลี่ยนตามตัวเลือกที่คุณต้องการ

                    cy.get('div[role="combobox"]').eq(1).click();
                    cy.get('li[data-value="some-color"]').click(); // เปลี่ยนตามตัวเลือกที่คุณต้องการ
                });
            }
        });
    });
});
