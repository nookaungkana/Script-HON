require('cypress-xpath');
import { login } from "../login.cy";
import 'cypress-file-upload';

const size = () => cy.xpath("//div[@class=\'MuiDataGrid-row\'][1]/div[4]/div/button[1]");
const create_subsize = () => cy.xpath("//div[contains(text(),'เพิ่มขนาดย่อย')]");
const cut = () => cy.xpath("//input[@name=\'cut']");
const subItemSizeRequest0 = () => cy.xpath("//input[@name=\"subItemSizeRequest[0].value\"]");
const subItemSizeRequest1 = () => cy.xpath("//input[@name=\"subItemSizeRequest[1].value\"]");
const btsave = () => cy.xpath("//button[text()='บันทึก']");
const edit_subsize = () => cy.xpath("//div[@class='MuiDataGrid-row MuiDataGrid-row--lastVisible']/div[5]/div/button[1]");

describe('Function Sub Size', () => {
    beforeEach(() => {
        login();
        cy.wait(2000);
        cy.xpath("//div[@class='menu-group']/div[5]").click();
        cy.wait(2000);
        cy.xpath("//div[@id='__next']/div[1]/div[1]/div[2]/div[1]/div[1]/div[8]").click();
        cy.wait(2000);
        cy.xpath("//div[@id='__next']/div[1]/div[1]/div[2]/div[1]/div[1]/div[9]/div[1]/div[3]").click();
        cy.wait(2000);
        size().click();
        cy.wait(2000);
    });

    it.skip('Create Sub Size', () => {
        create_subsize().click();
        cy.wait(2000);
        cy.task('fetchGoogleSheetData', { range: 'Sub Size!E2:H5' }).then(data => {
            data.forEach((row, index) => {
                const [dtcut, dtsubItemSizeRequest0, dtsubItemSizeRequest1,  Expectedresult ] = row;

                if (dtcut) {
                    cy.wait(2000);
                    cut().clear({force: true}).type(dtcut);
                } else {
                    cy.wait(2000);
                    cut().clear({force: true});
                }
                if (dtsubItemSizeRequest0) {
                    cy.wait(2000);
                    subItemSizeRequest0().clear({force: true}).type(dtsubItemSizeRequest0);
                } else {
                    cy.wait(2000);
                    subItemSizeRequest0().clear({force: true});
                }
                if (dtsubItemSizeRequest1) {
                    cy.wait(2000);
                    subItemSizeRequest1().clear({force: true}).type(dtsubItemSizeRequest1);
                } else {
                    cy.wait(2000);
                    subItemSizeRequest1().clear({force: true});
                }
                btsave().click();
                cy.wait(2000);

                cy.contains(Expectedresult).then(($alert) => {
                    if ($alert.length > 0) {
                        cy.log('Alert matches expected message');
                        cy.task('updateStatus', {
                            row: index + 2,
                            status: 'Pass',
                            column: 'I',
                            sheetName: 'Sub Size'
                        });
                        console.log(`Updating row ${index + 2} with status Pass`);
                    }
                    cy.reload();
                    cy.wait(2000);
                    create_subsize().click();
                });
            });
        });
    });
    it.skip('Edit Sub Size', () => {
        edit_subsize().click();
        cy.wait(2000);
        cy.task('fetchGoogleSheetData', { range: 'Sub Size!O2:R5' }).then(data => {
            data.forEach((row, index) => {
                const [dtcut, dtsubItemSizeRequest0, dtsubItemSizeRequest1,  Expectedresult ] = row;

                if (dtcut) {
                    cy.wait(2000);
                    cut().clear({force: true}).type(dtcut);
                } else {
                    cy.wait(2000);
                    cut().clear({force: true});
                }
                if (dtsubItemSizeRequest0) {
                    cy.wait(2000);
                    subItemSizeRequest0().clear({force: true}).type(dtsubItemSizeRequest0);
                } else {
                    cy.wait(2000);
                    subItemSizeRequest0().clear({force: true});
                }
                if (dtsubItemSizeRequest1) {
                    cy.wait(2000);
                    subItemSizeRequest1().clear({force: true}).type(dtsubItemSizeRequest1);
                } else {
                    cy.wait(2000);
                    subItemSizeRequest1().clear({force: true});
                }
                btsave().click();
                cy.wait(2000);

                cy.contains(Expectedresult).then(($alert) => {
                    if ($alert.length > 0) {
                        cy.log('Alert matches expected message');
                        cy.task('updateStatus', {
                            row: index + 2,
                            status: 'Pass',
                            column: 'S',
                            sheetName: 'Sub Size'
                        });
                        console.log(`Updating row ${index + 2} with status Pass`);
                    }
                    cy.reload();
                    cy.wait(2000);
                    edit_subsize().click();
                });
            });
        });
    });
});