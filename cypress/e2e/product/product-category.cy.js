require('cypress-xpath');
import { login } from "../login.cy";
import 'cypress-file-upload';

const create_category = () => cy.xpath("//div[contains(text(),'สร้างหมวดหมู่')]");
const name = () => cy.xpath("//input[@name='name']");
const urlslug = () => cy.xpath("//input[@name='urlSlug']");
const btsave = () => cy.xpath("//button[text()='บันทึก']");
const edit_category = () => cy.xpath("//div[@class=\"MuiDataGrid-row MuiDataGrid-row--lastVisible\"]/div[5]/button[2]");

describe('Function Product-Category', () => {
    beforeEach(() => {
        // รันก่อนการทดสอบในแต่ละ it()
        login();
        cy.wait(2000);
        cy.xpath("//div[@class='menu-group']/div[2]").click();
        cy.wait(2000);
        cy.xpath("//div[@id='__next']/div[1]/div[1]/div[2]/div[1]/div[1]/div[4]").click();
        cy.wait(2000);
        cy.xpath("//div[contains(text(),'หมวดหมู่สินค้า')]").click();
        cy.wait(2000);
    });

    it.skip('Create Product Category', () => {
        create_category().click();
        cy.wait(2000);

        cy.task('fetchGoogleSheetData', { range: 'Product-Category!E2:G4' }).then(data => {
            data.forEach((row, index) => {
                const [dtname, dturlslug, Expectedresult ] = row;

                if (dtname) {
                    cy.wait(2000);
                    name().clear({force: true}).type(dtname);
                } else {
                    cy.wait(2000);
                    name().clear({force: true});
                }
                if (dturlslug) {
                    cy.wait(2000);
                    urlslug().clear({force: true}).type(dturlslug);
                } else {
                    cy.wait(2000);
                    urlslug().clear({force: true});
                }
                btsave().click();
                cy.wait(2000);

                cy.contains(Expectedresult).then(($alert) => {
                    if ($alert.length > 0) {
                        cy.log('Alert matches expected message');
                        // อัปเดตสถานะใน Google Sheets เป็น Pass
                        cy.task('updateStatus', {
                            row: index + 2,
                            status: 'Pass',
                            column: 'H',
                            sheetName: 'Product-Category'
                        });
                        console.log(`Updating row ${index + 2} with status Pass`);
                    }
                        cy.reload();
                        cy.wait(2000);
                        create_category().click();
                });
            });
        });
    });

    it.skip('Edit Product Category', () => {
        edit_category().click();
        cy.wait(2000);

        cy.task('fetchGoogleSheetData', { range: 'Product-Category!N2:P4' }).then(data => {
            data.forEach((row, index) => {
                const [dtname, dturlslug, Expectedresult ] = row;

                if (dtname) {
                    cy.wait(2000);
                    name().clear({force: true}).type(dtname);
                } else {
                    cy.wait(2000);
                    name().clear({force: true});
                }
                if (dturlslug) {
                    cy.wait(2000);
                    urlslug().clear({force: true}).type(dturlslug);
                } else {
                    cy.wait(2000);
                    urlslug().clear({force: true});
                }
                btsave().click();
                cy.wait(2000);

                cy.contains(Expectedresult).then(($alert) => {
                    if ($alert.length > 0) {
                        cy.log('Alert matches expected message');
                        // อัปเดตสถานะใน Google Sheets เป็น Pass
                        cy.task('updateStatus', {
                            row: index + 2,
                            status: 'Pass',
                            column: 'Q',
                            sheetName: 'Product-Category'
                        });
                        console.log(`Updating row ${index + 2} with status Pass`);
                    }
                    cy.reload();
                    cy.wait(2000);
                    edit_category().click();
                });
            });
        });
    });
});




