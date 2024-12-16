import 'cypress-xpath';
import { login } from "../login.cy";
import 'cypress-file-upload';
const { faker } = require('@faker-js/faker');

const generateRandomCode = () => {
    const randomLetter = faker.string.alpha({ count: 1, casing: 'upper' });
    const randomNumbers = faker.string.numeric(2);
    return `${randomLetter}${randomNumbers}`;
};

const create_rawmaterial = () => cy.xpath("//div[contains(text(),'สร้างวัสดุ')]");
const image = () => cy.xpath("//input[@type='file']");
const id = () => cy.xpath("//input[@name='rawMaterialNo']");
const name = () => cy.xpath("//input[@name='name']");

const brandId = () => cy.xpath("//div[@id='mui-component-select-brandId']");
const brand1 = () => cy.xpath("//div[@id='menu-brandId']/div[3]/ul[1]/li[5]");

const materialId = () => cy.xpath("//div[@id='mui-component-select-materialId']");
const material = (index) => {
    return cy.xpath(`//div[@id='menu-materialId']/div[3]/ul[1]/li[${index}]`);
};

const subMaterialId = () => cy.xpath("//div[@id='mui-component-select-subMaterialId']");
const subMaterial = (index) => {
    return cy.xpath(`//div[@id='menu-subMaterialId']/div[3]/ul[1]/li[${index}]`);
};

const subMaterialDetailId = () => cy.xpath("//div[@id='mui-component-select-subMaterialDetailId']");
const subMaterialDetail = (index) => cy.xpath(`//div[@id='menu-subMaterialDetailId']/div[3]/ul[1]/li[${index}]`);

const description = () => cy.xpath("//textarea[@name='description']");

const sizeId = () => cy.xpath("//div[@id='mui-component-select-itemSizeId']");
const size1 = () => cy.xpath("//div[@id='menu-itemSizeId']/div[3]/ul[1]/li[2]");

const unitSizeId = () => cy.xpath("//div[@id='mui-component-select-countComponentId']");
const unitSize1 = () => cy.xpath("//body/div[@id='menu-countComponentId']/div[3]/ul[1]/li[2]");

//ข้อมูลบังคับ
const lotExpirationDate = () => cy.xpath("//input[@name='isLotExpirationDate']");
const serialNumber = () => cy.xpath("//input[@name='serialNumber']");
//การซื้อขาย
const purchase = () => cy.xpath("//input[@name='isPurchase']");
const sell = () => cy.xpath("//input[@name='sell']");
//การหยิบสินค้า
const fifo = () => cy.get(':nth-child(1) > .MuiButtonBase-root > .PrivateSwitchBase-input');
const fefo = () => cy.get(':nth-child(2) > .MuiButtonBase-root > .PrivateSwitchBase-input');
const average = () => cy.get(':nth-child(3) > .MuiButtonBase-root > .PrivateSwitchBase-input');
const btsave = () => cy.xpath("//button[text()='บันทึก']");
const menu = () => cy.xpath("//div[@class=\"MuiDataGrid-row\"][1]/div[6]/div");
const edit_rawmaterial = () => cy.xpath("//ul[@role=\"menu\"]/li[1]");

describe('Function Raw Material', () => {
    beforeEach(() => {
        login();
        cy.wait(2000);
        cy.xpath("//div[@class='menu-group']/div[5]").click();
        cy.wait(2000);
        cy.xpath("//div[@id='__next']/div[1]/div[1]/div[2]/div[1]/div[1]/div[8]").click();
        cy.wait(2000);
        cy.xpath("//div[contains(text(),'Raw Material')]").click();
        cy.wait(2000);
    });

    it.skip('Create Raw Material', () => {
        create_rawmaterial().click();
        cy.wait(2000);
        cy.task('fetchGoogleSheetData', { range: 'Raw Material!E2:R14' }).then(data => {
            data.forEach((row, index) => {
                const adjustedIndex = index + 2;
                const [dtlinkpicture, dtno, dtname, dtbrand, dtmaterial, dtsubmaterial,
                    dtsubmaterialdetail, dtdescription, dtsize, dtunitsize, dtrequired,
                    dttrading, dtpicking, Expectedresult] = row;

                if (dtlinkpicture) {
                    const fileName = 'rawmaterial.jpg';
                    cy.task('downloadFile', { url: dtlinkpicture, fileName }).then((filePath) => {
                        image().attachFile(fileName);
                    });
                }
                if (dtno) {
                    cy.wait(2000);
                    id().clear({ force: true }).type(generateRandomCode());
                } else {
                    cy.wait(2000);
                    id().clear({ force: true });
                }
                if (dtname) {
                    cy.wait(2000);
                    name().clear({ force: true }).type(dtname);
                } else {
                    cy.wait(2000);
                    name().clear({ force: true });
                }
                if (dtbrand) {
                    cy.wait(2000);
                    brandId().click();
                    cy.wait(2000);
                    brand1().click();
                }
                if (dtmaterial) {
                    cy.wait(2000);
                    materialId().click();
                    cy.wait(2000);
                    material(2).click();

                    if (dtsubmaterial) {
                        cy.wait(2000);
                        subMaterialId().click();
                        cy.wait(2000);
                        subMaterial(2).click();

                        if (dtsubmaterialdetail) {
                            cy.wait(2000);
                            subMaterialDetailId().click();
                            cy.wait(2000);
                            // ใช้ index + 1 เพื่อเปลี่ยนเลขใน XPath
                            subMaterialDetail(adjustedIndex).click(); // เปลี่ยนเป็นหมายเลขที่ต้องการ
                        }
                    }
                    if (dtsize) {
                        cy.wait(2000);
                        sizeId().click();
                        cy.wait(2000);
                        size1().click();
                    }
                }
                if (dtdescription) {
                    cy.wait(2000);
                    description().clear({ force: true }).type(dtdescription);
                } else {
                    cy.wait(2000);
                    description().clear({ force: true });
                }
                if (dtunitsize) {
                    cy.wait(2000);
                    unitSizeId().click();
                    cy.wait(2000);
                    unitSize1().click();
                }
                if (dtrequired) {
                    cy.wait(2000);
                    lotExpirationDate().check();
                }
                if (dttrading) {
                    cy.wait(2000);
                    purchase().check();
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
                            sheetName: 'Raw Material'
                        });
                        console.log(`Updating row ${index + 2} with status Pass`);
                    }
                    if (Expectedresult === 'เพิ่มวัสดุสำเร็จ') {
                        cy.reload();
                        cy.wait(2000);
                        create_rawmaterial().click();
                    } else {
                        cy.reload();
                        cy.wait(2000);
                    }
                });
            });
        });
    });

    it.skip('Edit Raw Material', () => {
        menu().click();
        cy.wait(2000);
        edit_rawmaterial().click();
        cy.wait(2000);
        cy.task('fetchGoogleSheetData', { range: 'Raw Material!Y2:AL11' }).then(data => {
            data.forEach((row, index) => {
                const adjustedIndex = index + 2;
                const [dtlinkpicture, dtno, dtname, dtbrand, dtmaterial, dtsubmaterial,
                    dtsubmaterialdetail, dtdescription, dtsize, dtunitsize, dtrequired,
                    dttrading, dtpicking, Expectedresult] = row;

                if (dtlinkpicture) {
                    const fileName = 'rawmaterial.jpg';
                    cy.task('downloadFile', { url: dtlinkpicture, fileName }).then((filePath) => {
                        image().attachFile(fileName);
                    });
                }
                if (dtno) {
                    cy.wait(2000);
                    id().clear({ force: true }).type(generateRandomCode());
                } else {
                    cy.wait(2000);
                    id().clear({ force: true });
                }
                if (dtname) {
                    cy.wait(2000);
                    name().clear({ force: true }).type(dtname);
                } else {
                    cy.wait(2000);
                    name().clear({ force: true });
                }
                if (dtbrand) {
                    cy.wait(2000);
                    brandId().click();
                    cy.wait(2000);
                    brand1().click();
                }
                if (dtmaterial) {
                    cy.wait(2000);
                    materialId().click();
                    cy.wait(2000);
                    material(2).click({ force: true });

                    if (dtsubmaterial) {
                        cy.wait(2000);
                        subMaterialId().click();
                        cy.wait(2000);
                        subMaterial(3).click({ force: true });

                        if (dtsubmaterialdetail) {
                            cy.wait(2000);
                            subMaterialDetailId().click();
                            cy.wait(2000);
                            // ใช้ index + 1 เพื่อเปลี่ยนเลขใน XPath
                            subMaterialDetail(adjustedIndex).click(); // เปลี่ยนเป็นหมายเลขที่ต้องการ
                        } else {
                            cy.wait(2000);
                            materialId().click();
                            cy.wait(2000);
                            material(3).click();
                            cy.wait(2000);
                            subMaterialId().click();
                            cy.wait(2000);
                            subMaterial(2).click({ force: true });
                        }
                    } else {
                        cy.wait(2000);
                        materialId().click();
                        cy.wait(2000);
                        material(3).click({ force: true });
                    }
                    if (dtsize) {
                        cy.wait(2000);
                        sizeId().click();
                        cy.wait(2000);
                        size1().click();
                    } else {
                        cy.wait(2000);
                        materialId().click();
                        cy.wait(2000);
                        material(3).click();
                    }
                }
                if (dtdescription) {
                    cy.wait(2000);
                    description().clear({ force: true }).type(dtdescription);
                } else {
                    cy.wait(2000);
                    description().clear({force: true});
                }
                if (dtunitsize) {
                    cy.wait(2000);
                    unitSizeId().click();
                    cy.wait(2000);
                    unitSize1().click();
                }
                if (!dtrequired) {
                    cy.wait(2000);
                    lotExpirationDate().uncheck()
                }
                if (!dttrading) {
                    cy.wait(2000);
                    purchase().uncheck();
                }
                btsave().click();
                cy.wait(2000);

                cy.contains(Expectedresult).then(($alert) => {
                    if ($alert.length > 0) {
                        cy.log('Alert matches expected message');
                        cy.task('updateStatus', {
                            row: index + 2,
                            status: 'Pass',
                            column: 'AM',
                            sheetName: 'Raw Material'
                        });
                        console.log(`Updating row ${index + 2} with status Pass`);
                    }
                    if (Expectedresult === 'แก้ไขวัสดุสำเร็จ') {
                        cy.reload();
                        cy.wait(2000);
                        menu().click();
                        cy.wait(2000);
                        edit_rawmaterial().click();
                        cy.wait(2000);
                    } else {
                        cy.reload();
                        cy.wait(2000);
                    }
                });
            });
        });
    });
});

