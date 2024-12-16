import 'cypress-xpath';
import { login } from "../login.cy";
import 'cypress-file-upload';

const create_option_type = () => cy.xpath("//div[contains(text(),'สร้างตัวแปร')]");
const name = () => cy.xpath("//input[@name='name']");
const btsave = () => cy.xpath("//button[text()='บันทึก']");
const edit_option_type = () => cy.xpath("//div[@class='MuiDataGrid-row MuiDataGrid-row--lastVisible']/div[2]/div/button[1]");
describe('Function Option Type', () => {
    beforeEach(() => {
        login();
        cy.wait(2000);
        cy.visit('https://app-staging.honconnect.co/company/formula/options-type');
        cy.wait(2000);
    });
    it.skip('Create Option Type', () => {
        create_option_type().click();
        cy.wait(2000);
        cy.task('fetchGoogleSheetData', { range: 'Options-Type!E2:F3' }).then(data => {
            data.forEach((row, index) => {
                const [dtname, Expectedresult] = row;

                if (dtname) {
                    cy.wait(2000);
                    name().clear({ force: true }).type(dtname);
                } else {
                    cy.wait(2000);
                    name().clear({ force: true });
                }
                btsave().click();
                cy.wait(2000);

                cy.contains(Expectedresult).then(($alert) => {
                    if ($alert.length > 0) {
                        cy.log('Alert matches expected message');
                        cy.task('updateStatus', {
                            row: index + 2,
                            status: 'Pass',
                            column: 'G',
                            sheetName: 'Options-Type'
                        });
                        console.log(`Updating row ${index + 2} with status Pass`);
                    }
                    cy.reload();
                    cy.wait(2000);
                    create_option_type().click();
                });
            });
        });
    });
    it.skip('Edit Option Type', () => {
        edit_option_type().click();
        cy.wait(2000);
        cy.task('fetchGoogleSheetData', { range: 'Options-Type!M2:N3' }).then(data => {
            data.forEach((row, index) => {
                const [dtname, Expectedresult] = row;

                if (dtname) {
                    cy.wait(2000);
                    name().clear({ force: true }).type(dtname);
                } else {
                    cy.wait(2000);
                    name().clear({ force: true });
                }
                btsave().click();
                cy.wait(2000);

                cy.contains(Expectedresult).then(($alert) => {
                    if ($alert.length > 0) {
                        cy.log('Alert matches expected message');
                        cy.task('updateStatus', {
                            row: index + 2,
                            status: 'Pass',
                            column: 'O',
                            sheetName: 'Options-Type'
                        });
                        console.log(`Updating row ${index + 2} with status Pass`);
                    }
                    cy.reload();
                    cy.wait(2000);
                    edit_option_type().click();
                });
            });
        });
    });
});






