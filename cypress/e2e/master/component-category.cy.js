import 'cypress-xpath';
import { login } from "../login.cy";
import 'cypress-file-upload';

const create_component_category = () => cy.xpath("//div[contains(text(),'สร้าง Component Category')]");
const name = () => cy.xpath("//input[@name='name']");
const description = () => cy.xpath("//textarea[@name='description']");
const btsave = () => cy.xpath("//button[text()='บันทึก']");
const menu = () => cy.xpath("//div[@class='MuiDataGrid-row MuiDataGrid-row--lastVisible']/div[4]/div");
const edit_component_category = () => cy.xpath("//ul[@role=\"menu\"]/li[1]");

describe('Function Component-Category', () => {
    beforeEach(() => {
        login();
        cy.wait(2000);
        cy.visit('https://app-staging.honconnect.co/stock/component/category');
        cy.wait(2000);
    });

    it.skip('Create Component-Category', () => {
        create_component_category().click();
        cy.wait(2000);
        cy.task('fetchGoogleSheetData', { range: 'Component Category!E2:G4' }).then(data => {
            data.forEach((row, index) => {
                const [dtname, dtdescription, Expectedresult] = row;

                if (dtname) {
                    cy.wait(2000);
                    name().clear({ force: true }).type(dtname);
                } else {
                    cy.wait(2000);
                    name().clear({ force: true });
                }
                if (dtdescription) {
                    cy.wait(2000);
                    description().clear({ force: true }).type(dtdescription);
                } else {
                    cy.wait(2000);
                    description().clear({ force: true });
                }
                btsave().click();
                cy.wait(2000);

                cy.contains(Expectedresult).then(($alert) => {
                    if ($alert.length > 0) {
                        cy.log('Alert matches expected message');
                        cy.task('updateStatus', {
                            row: index + 2,
                            status: 'Pass',
                            column: 'H',
                            sheetName: 'Component Category'
                        });
                        console.log(`Updating row ${index + 2} with status Pass`);
                    }
                        cy.reload();
                        cy.wait(2000);
                        create_component_category().click();
                });
            });
        });
    });
    it.skip('Edit Component-Category', () => {
        menu().click();
        cy.wait(2000);
        edit_component_category().click();
        cy.task('fetchGoogleSheetData', { range: 'Component Category!N2:P4' }).then(data => {
            data.forEach((row, index) => {
                const [dtname, dtdescription, Expectedresult] = row;

                if (dtname) {
                    cy.wait(2000);
                    name().clear({ force: true }).type(dtname);
                } else {
                    cy.wait(2000);
                    name().clear({ force: true });
                }
                if (dtdescription) {
                    cy.wait(2000);
                    description().clear({ force: true }).type(dtdescription);
                } else {
                    cy.wait(2000);
                    description().clear({ force: true });
                }
                btsave().click();
                cy.wait(2000);

                cy.contains(Expectedresult).then(($alert) => {
                    if ($alert.length > 0) {
                        cy.log('Alert matches expected message');
                        cy.task('updateStatus', {
                            row: index + 2,
                            status: 'Pass',
                            column: 'Q',
                            sheetName: 'Component Category'
                        });
                        console.log(`Updating row ${index + 2} with status Pass`);
                    }
                    cy.reload();
                    cy.wait(2000);
                    menu().click();
                    cy.wait(2000);
                    edit_component_category().click();
                });
            });
        });
    });
});



