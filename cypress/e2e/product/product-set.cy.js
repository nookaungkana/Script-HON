require('cypress-xpath');
import { login } from "../login.cy";
import 'cypress-file-upload';

const image = () => cy.xpath("//input[@type='file']");
const name = () => cy.xpath("//input[@name='name']");
const description = () => cy.xpath("//textarea[@name='description']");
const urlSlug = () => cy.xpath("//input[@name='urlSlug']");

const addmodel = () => cy.xpath("//div[contains(text(),'เพิ่มโมเดล')]");
const product = () => cy.xpath("//div[@class=\"sc-a87cef5f-2 cHaOpf\"]/div[1]/img");
const model1 = () => cy.xpath("//div[@class=\"form-wrap data-grid-row-pointer\"]/div[1]/div[1]");
const btimportmodel = () => cy.xpath("//div[@class=\"form-wrap data-grid-row-pointer\"]/button");
const btsave = () => cy.xpath("//button[text()='บันทึก']");

describe('Function Product-Set', () => {
    beforeEach(() => {
        login();
        cy.wait(2000);
        cy.xpath("//div[@class='menu-group']/div[2]").click();
        cy.wait(2000);
        cy.xpath("//div[@id='__next']/div[1]/div[1]/div[2]/div[1]/div[1]/div[4]").click();
        cy.wait(2000);
        cy.xpath("//div[contains(text(),'เซ็ตสินค้า')]").click();
        cy.wait(2000);
    });
    it.skip('Create Product Set', () => {
        cy.xpath("//div[contains(text(),'เพิ่มเซ็ตสินค้า')]").click();
        cy.wait(2000);

        cy.task('fetchGoogleSheetData', { range: 'Prodeuct Set!E2:J7' }).then(data => {
            data.forEach((row, index) => {
                const [dtlinkpicture, dtname, dtdescription, dturlslug, dtproductmodel, Expectedresult ] = row;

                if (dtlinkpicture) {
                    const fileName = 'productset.jpg'; // ชื่อไฟล์ที่ต้องการ
                    cy.task('downloadFile', { url: dtlinkpicture, fileName }).then((filePath) => {
                        // เนื่องจาก attachFile ต้องการชื่อไฟล์ใน fixtures, ใช้แค่ชื่อไฟล์
                        image().attachFile(fileName);
                    });
                }
                if (dtname) {
                    cy.wait(2000);
                    name().clear({force: true}).type(dtname);
                } else {
                    cy.wait(2000);
                    name().clear({force: true});
                }
                if (dtdescription) {
                    cy.wait(2000);
                    description().clear({force: true}).type(dtdescription);
                } else {
                    cy.wait(2000);
                    description().clear({force: true});
                }
                if (dturlslug) {
                    cy.wait(2000);
                    urlSlug().clear({force: true}).type(dturlslug);
                } else {
                    cy.wait(2000);
                    urlSlug().clear({force: true});
                }
                if (dtproductmodel) {
                    cy.wait(2000);
                    addmodel().click();
                    cy.wait(2000);
                    product().click();
                    cy.wait(2000);
                    model1().click();
                    cy.wait(2000);
                    btimportmodel().click();
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
                            column: 'K',
                            sheetName: 'Prodeuct Set'
                        });
                        console.log(`Updating row ${index + 2} with status Pass`);
                    }
                    if (Expectedresult === 'สร้างเซ็ตสินค้าเรียบร้อย') {
                        cy.xpath("//button[contains(text(),'OK')]").click();
                        cy.wait(2000);
                        cy.reload();
                        cy.wait(2000);
                        cy.xpath("//div[contains(text(),'เพิ่มเซ็ตสินค้า')]").click();
                    } else {
                        cy.reload();
                        cy.wait(2000);
                    }
                });
            });
        });
    });

    it.skip('Edit Product Set', () => {
        cy.xpath("//div[@class=\"MuiDataGrid-row MuiDataGrid-row--lastVisible\"]/div[5]/button").click();
        cy.wait(2000);

        cy.task('fetchGoogleSheetData', { range: 'Prodeuct Set!Q2:V6' }).then(data => {
            data.forEach((row, index) => {
                const [dtlinkpicture, dtname, dtdescription, dturlslug, dtproductmodel, Expectedresult ] = row;

                if (dtlinkpicture) {
                    const fileName = 'productset.jpg'; // ชื่อไฟล์ที่ต้องการ
                    cy.task('downloadFile', { url: dtlinkpicture, fileName }).then((filePath) => {
                        // เนื่องจาก attachFile ต้องการชื่อไฟล์ใน fixtures, ใช้แค่ชื่อไฟล์
                        image().attachFile(fileName);
                    });
                }
                if (dtname) {
                    cy.wait(2000);
                    name().clear({force: true}).type(dtname);
                } else {
                    cy.wait(2000);
                    name().clear({force: true});
                }
                if (dtdescription) {
                    cy.wait(2000);
                    description().clear({force: true}).type(dtdescription);
                } else {
                    cy.wait(2000);
                    description().clear({force: true});
                }
                if (dturlslug) {
                    cy.wait(2000);
                    urlSlug().clear({force: true}).type(dturlslug);
                } else {
                    cy.wait(2000);
                    urlSlug().clear({force: true});
                }
                if (!dtproductmodel) {
                    cy.wait(2000);
                    cy.xpath("//div[@class='model-list']/div/div[2]/div/*").click();
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
                            column: 'W',
                            sheetName: 'Prodeuct Set'
                        });
                        console.log(`Updating row ${index + 2} with status Pass`);
                    }
                    if (Expectedresult === 'แก้ไขเซ็ตสินค้าเรียบร้อย') {
                        cy.xpath("//button[contains(text(),'OK')]").click();
                        cy.wait(2000);
                        cy.reload();
                        cy.wait(2000);
                        cy.xpath("//div[@class=\"MuiDataGrid-row MuiDataGrid-row--lastVisible\"]/div[5]/button").click();
                    } else {
                        cy.reload();
                        cy.wait(2000);
                    }
                });
            });
        });
    });
});
