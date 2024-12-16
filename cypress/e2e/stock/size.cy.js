require('cypress-xpath');
import { login } from "../login.cy";
import 'cypress-file-upload';

const create_size = () => cy.xpath("//div[contains(text(),'สร้างขนาดสูงสุด')]");
const dimensionConfigId = () => cy.xpath("//div[@id='mui-component-select-dimensionConfigId']");
const dimensionConfigId2 = () => cy.xpath("//body/div[@id='menu-dimensionConfigId']/div[3]/ul[1]/li[2]");
const componentId = () => cy.xpath("//div[@id='mui-component-select-componentId']");
const componentId2 = () => cy.xpath("//body/div[@id='menu-componentId']/div[3]/ul[1]/li[2]");
const subItemSizeRequest0 = () => cy.xpath("//input[@name=\"subItemSizeRequest[0].value\"]");
const subItemSizeRequest1 = () => cy.xpath("//input[@name=\"subItemSizeRequest[1].value\"]");
const btsave = () => cy.xpath("//button[text()='บันทึก']");
const edit_size = () => cy.xpath("//div[@class=\"MuiDataGrid-row\"][1]/div[4]/div/button[2]");

describe('Function Size', () => {
    beforeEach(() => {
        login();
        cy.wait(2000);
        cy.xpath("//div[@class='menu-group']/div[5]").click();
        cy.wait(2000);
        cy.xpath("//div[@id='__next']/div[1]/div[1]/div[2]/div[1]/div[1]/div[8]").click();
        cy.wait(2000);
        cy.xpath("//div[@id='__next']/div[1]/div[1]/div[2]/div[1]/div[1]/div[9]/div[1]/div[3]").click();
        cy.wait(2000);
    });

    it.skip('Create Size', () => {
        create_size().click();
        cy.wait(2000);
        cy.task('fetchGoogleSheetData', { range: 'Size!E2:I6' }).then(data => {
            data.forEach((row, index) => {
                const [dtdimensionConfig, dtcomponent, dtsubItemSizeRequest0, dtsubItemSizeRequest1,  Expectedresult ] = row;

                if (dtdimensionConfig){
                    cy.wait(2000);
                    dimensionConfigId().click();
                    cy.wait(2000);
                    dimensionConfigId2().click();

                    if (dtcomponent){
                        cy.wait(2000);
                        componentId().click();
                        cy.wait(2000);
                        componentId2().click();
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
                }

                btsave().click();
                cy.wait(2000);

                cy.contains(Expectedresult).then(($alert) => {
                    if ($alert.length > 0) {
                        cy.log('Alert matches expected message');
                        cy.task('updateStatus', {
                            row: index + 2,
                            status: 'Pass',
                            column: 'J',
                            sheetName: 'Size'
                        });
                        console.log(`Updating row ${index + 2} with status Pass`);
                    }
                        cy.reload();
                        cy.wait(2000);
                        create_size().click();
                });
            });
        });
    });
    it.skip('Edit Size', () => {
        edit_size().click();
        cy.wait(2000);
        cy.task('fetchGoogleSheetData', { range: 'Size!P2:T4' }).then(data => {
            data.forEach((row, index) => {
                const [dtdimensionConfig, dtcomponent, dtsubItemSizeRequest0, dtsubItemSizeRequest1,  Expectedresult ] = row;

                if (dtdimensionConfig){
                    cy.wait(2000);
                    dimensionConfigId().click();
                    cy.wait(2000);
                    dimensionConfigId2().click();

                    if (dtcomponent){
                        cy.wait(2000);
                        componentId().click();
                        cy.wait(2000);
                        componentId2().click();
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
                }

                btsave().click();
                cy.wait(2000);

                cy.contains(Expectedresult).then(($alert) => {
                    if ($alert.length > 0) {
                        cy.log('Alert matches expected message');
                        cy.task('updateStatus', {
                            row: index + 2,
                            status: 'Pass',
                            column: 'U',
                            sheetName: 'Size'
                        });
                        console.log(`Updating row ${index + 2} with status Pass`);
                    }
                    cy.reload();
                    cy.wait(2000);
                    edit_size().click();
                });
            });
        });
    });

});