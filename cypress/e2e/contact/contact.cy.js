require('cypress-xpath');
import { login } from "../login.cy";
import 'cypress-file-upload';

const btcreate_contect = () => cy.xpath("//div[contains(text(),'เพิ่มผู้ติดต่อ')]");
const image = () => cy.xpath("//input[@type='file']");

const Individual = () => cy.xpath("//div[@class='btn-type active']");
const juristic_person = () => cy.xpath("//div[@class='sc-92d48b80-1 jQJIoZ']/div[2]");

const name = () => cy.xpath("//input[@placeholder='ระบุชื่อจริง นามสกุล']");
const taxnumber = () => cy.xpath("//input[@name='taxNumber']");
const credit = () => cy.xpath("//div[@id='mui-component-select-credit']");
const credit1 = () => cy.xpath("//body/div[@id='menu-credit']/div[3]/ul[1]/li[2]");
const phonenumber = () => cy.xpath("//input[@name='phoneNumber']");
const email = () => cy.xpath("//input[@name='email']");

const contact_customer = () => cy.xpath("//form[1]/label[1]");
const contact_agent = () => cy.xpath("//form[1]/label[2]");

const taxAddress = () => cy.xpath("//input[@name='taxAddress']");
const zipcode = () => cy.xpath("//input[@name='zipcode']");

const district = () => cy.xpath("//input[@name=\'district\']");
const district1 = () => cy.xpath("//LI[@data-option-index='0']");

const subDistrict = () =>  cy.xpath("//input[@name='subDistrict']");
const subDistrict1 = () => cy.xpath("//LI[@data-option-index='1']");
const btsave = () => cy.xpath("//form[1]/button[1]");

const kebab_wrap = () => cy.xpath("//div[@class=\"MuiDataGrid-row\"][1]/div[8]/div/div/div");
const btedit = () => cy.xpath("//ul[@role=\"menu\"]/li[1]");

describe('Function Contact', () => {
    beforeEach(() => {
        login();
        cy.wait(2000);
        cy.xpath("//div[@class='menu-group']/div[1]").click();
        cy.wait(2000);
        cy.xpath("//div[@id='__next']/div[1]/div[1]/div[2]/div[1]/div[1]/div[2]").click();
        cy.wait(2000);
        cy.xpath("//div[contains(text(),'รายชื่อผู้ติดต่อ')]").click();
        cy.wait(2000);
    });
    it.skip('Create Contact_Individual', () => {
        btcreate_contect().click();
        cy.wait(2000);

        cy.task('fetchGoogleSheetData', { range: 'Contact Individual!E2:Q13' }).then(data => {
            data.forEach((row, index) => {

                const [dtlinkpicture, dttpye, dtname, dttaxnumber, dtcredit, dtphonenumber, dtemail,
                    dtcontact, dttaxAddress, dtzipcode, dtdistrict, dtsubDistrict,Expectedresult ] = row;

                if (dtlinkpicture) {
                    const fileName = 'uploaded-image.jpg'; // ชื่อไฟล์ที่ต้องการ
                    cy.task('downloadFile', { url: dtlinkpicture, fileName }).then((filePath) => {
                        // เนื่องจาก attachFile ต้องการชื่อไฟล์ใน fixtures, ใช้แค่ชื่อไฟล์
                        image().attachFile(fileName);
                    });
                }
                if (dttpye) {
                    cy.wait(2000);
                    Individual().click();
                }
                if (dtname) {
                    cy.wait(2000);
                    name().clear({force: true}).type(dtname);
                } else {
                    cy.wait(2000);
                    name().clear({force: true});
                }
                if (dttaxnumber) {
                    cy.wait(2000);
                    taxnumber().clear({force: true}).type(dttaxnumber);
                } else {
                    cy.wait(2000);
                    taxnumber().clear({force: true});
                }
                if (dtcredit) {
                    cy.wait(2000);
                    credit().click();
                    cy.wait(2000);
                    credit1().click();
                }
                if (dtphonenumber) {
                    cy.wait(2000);
                    phonenumber().clear({force: true}).type(dtphonenumber);
                } else {
                    cy.wait(2000);
                    phonenumber().clear({force: true});
                }
                if (dtemail) {
                    cy.wait(2000);
                    email().clear({force: true}).type(dtemail);
                } else {
                    cy.wait(2000);
                    email().clear({force: true});
                }
                if (dtcontact) {
                    cy.wait(2000);
                    contact_customer().click();
                    cy.wait(2000);
                    contact_agent().click();
                }
                if (dttaxAddress) {
                    cy.wait(2000);
                    taxAddress().clear({force: true}).type(dttaxAddress);
                } else {
                    cy.wait(2000);
                    taxAddress().clear({force: true});
                }
                if (dtzipcode) {
                    cy.wait(2000);
                    zipcode().clear({force: true}).type(dtzipcode);
                    if (dtdistrict){
                        cy.wait(2000);
                        district().click();
                        cy.wait(2000);
                        district1().click();
                    }
                    if (dtsubDistrict) {
                        cy.wait(2000);
                        subDistrict().click();
                        cy.wait(2000);
                        subDistrict1().click();
                    }
                } else {
                    cy.wait(2000);
                    zipcode().clear({force: true});
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
                            column: 'R',
                            sheetName: 'Contact Individual'
                        });
                        console.log(`Updating row ${index + 2} with status Pass`);
                    }
                    if (Expectedresult === 'เพิ่มรายชื่อสำเร็จ') {
                        cy.reload();
                        cy.wait(2000);
                        btcreate_contect().click();
                    }else {
                        cy.reload();
                        cy.wait(2000);
                    }
                });
            });
        });
    });
    it.skip('Edit Contact_Individual', () => {
        cy.wait(2000);
        kebab_wrap().click();
        cy.wait(2000);
        btedit().click();

        cy.task('fetchGoogleSheetData', { range: 'Contact Individual!X2:AJ12' }).then(data => {
            data.forEach((row, index) => {

                const [dtlinkpicture, dttpye, dtname, dttaxnumber, dtcredit, dtphonenumber, dtemail,
                    dtcontact, dttaxAddress, dtzipcode, dtdistrict, dtsubDistrict, Expectedresult ] = row;

                if (dtlinkpicture) {
                    const fileName = 'editcontact.jpg'; // ชื่อไฟล์ที่ต้องการ
                    cy.task('downloadFile', { url: dtlinkpicture, fileName }).then((filePath) => {
                        // เนื่องจาก attachFile ต้องการชื่อไฟล์ใน fixtures, ใช้แค่ชื่อไฟล์
                        image().attachFile(fileName);
                    });
                }
                if (dttpye) {
                    cy.wait(2000);
                    Individual().click();
                }
                if (dtname) {
                    cy.wait(2000);
                    name().clear({force: true}).type(dtname);
                } else {
                    cy.wait(2000);
                    name().clear({force: true});
                }
                if (dttaxnumber) {
                    cy.wait(2000);
                    taxnumber().clear({force: true}).type(dttaxnumber);
                } else {
                    cy.wait(2000);
                    taxnumber().clear({force: true});
                }
                if (!dtcredit) {
                    cy.wait(2000);
                    credit().click();
                    cy.wait(2000);
                    credit1().click();
                }
                if (dtphonenumber) {
                    cy.wait(2000);
                    phonenumber().clear({force: true}).type(dtphonenumber);
                } else {
                    cy.wait(2000);
                    phonenumber().clear({force: true});
                }
                if (dtemail) {
                    cy.wait(2000);
                    email().clear({force: true}).type(dtemail);
                } else {
                    cy.wait(2000);
                    email().clear({force: true});
                }
                if (!dtcontact) {
                    cy.wait(2000);
                    contact_customer().click();
                    cy.wait(2000);
                    contact_agent().click();
                }
                if (dttaxAddress) {
                    cy.wait(2000);
                    taxAddress().clear({force: true}).type(dttaxAddress);
                } else {
                    cy.wait(2000);
                    taxAddress().clear({force: true});
                }
                if (dtzipcode) {
                    cy.wait(2000);
                    zipcode().clear({force: true}).type(dtzipcode);
                    if(dtdistrict){
                        cy.wait(2000);
                        district().click();
                        cy.wait(2000);
                        district1().click();
                    }
                    if (dtsubDistrict) {
                        cy.wait(2000);
                        subDistrict().click();
                        cy.wait(2000);
                        subDistrict1().click();
                    }
                } else {
                    cy.wait(2000);
                    zipcode().clear({force: true});
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
                            column: 'AK',
                            sheetName: 'Contact Individual'
                        });
                        console.log(`Updating row ${index + 2} with status Pass`);
                    }
                    if (Expectedresult === 'แก้ไขรายชื่อสำเร็จ') {
                        cy.reload();
                        cy.wait(2000);
                        kebab_wrap().click();
                        cy.wait(2000);
                        btedit().click();cy.wait(2000);
                    }else {
                        cy.reload();
                        cy.wait(2000);
                    }
                });
            });
        });
    });

    it.skip('Create Contact_juristic_person', () => {
        btcreate_contect().click();
        cy.wait(2000);

        cy.task('fetchGoogleSheetData', { range: 'Contact Entity!E2:Q13' }).then(data => {
            data.forEach((row, index) => {

                const [dtlinkpicture, dttpye, dtname, dttaxnumber, dtcredit, dtphonenumber, dtemail,
                    dtcontact, dttaxAddress, dtzipcode, dtdistrict, dtsubDistrict,Expectedresult ] = row;

                if (dtlinkpicture) {
                    const fileName = 'uploaded-image.jpg'; // ชื่อไฟล์ที่ต้องการ
                    cy.task('downloadFile', { url: dtlinkpicture, fileName }).then((filePath) => {
                        // เนื่องจาก attachFile ต้องการชื่อไฟล์ใน fixtures, ใช้แค่ชื่อไฟล์
                        image().attachFile(fileName);
                    });
                }
                if (dttpye) {
                    cy.wait(2000);
                    juristic_person().click();
                }
                if (dtname) {
                    cy.wait(2000);
                    name().clear({force: true}).type(dtname);
                } else {
                    cy.wait(2000);
                    name().clear({force: true});
                }
                if (dttaxnumber) {
                    cy.wait(2000);
                    taxnumber().clear({force: true}).type(dttaxnumber);
                } else {
                    cy.wait(2000);
                    taxnumber().clear({force: true});
                }
                if (dtcredit) {
                    cy.wait(2000);
                    credit().click();
                    cy.wait(2000);
                    credit1().click();
                }
                if (dtphonenumber) {
                    cy.wait(2000);
                    phonenumber().clear({force: true}).type(dtphonenumber);
                } else {
                    cy.wait(2000);
                    phonenumber().clear({force: true});
                }
                if (dtemail) {
                    cy.wait(2000);
                    email().clear({force: true}).type(dtemail);
                } else {
                    cy.wait(2000);
                    email().clear({force: true});
                }
                if (dtcontact) {
                    cy.wait(2000);
                    contact_customer().click();
                    cy.wait(2000);
                    contact_agent().click();
                }
                if (dttaxAddress) {
                    cy.wait(2000);
                    taxAddress().clear({force: true}).type(dttaxAddress);
                } else {
                    cy.wait(2000);
                    taxAddress().clear({force: true});
                }
                if (dtzipcode) {
                    cy.wait(2000);
                    zipcode().clear({force: true}).type(dtzipcode);
                    if (dtdistrict){
                        cy.wait(2000);
                        district().click();
                        cy.wait(2000);
                        district1().click();
                    }
                    if (dtsubDistrict) {
                        cy.wait(2000);
                        subDistrict().click();
                        cy.wait(2000);
                        subDistrict1().click();
                    }
                } else {
                    cy.wait(2000);
                    zipcode().clear({force: true});
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
                            column: 'R',
                            sheetName: 'Contact Entity'
                        });
                        console.log(`Updating row ${index + 2} with status Pass`);
                    }
                    if (Expectedresult === 'เพิ่มรายชื่อสำเร็จ') {
                        cy.reload();
                        cy.wait(2000);
                        btcreate_contect().click();
                    }else {
                        cy.reload();
                        cy.wait(2000);
                    }
                });
            });
        });
    });
    it.skip('Edit Contact_juristic_person', () => {
        cy.wait(2000);
        kebab_wrap().click();
        cy.wait(2000);
        btedit().click();

        cy.task('fetchGoogleSheetData', { range: 'Contact Entity!X2:AJ12' }).then(data => {
            data.forEach((row, index) => {

                const [dtlinkpicture, dttpye, dtname, dttaxnumber, dtcredit, dtphonenumber, dtemail,
                    dtcontact, dttaxAddress, dtzipcode, dtdistrict, dtsubDistrict,Expectedresult ] = row;

                if (dtlinkpicture) {
                    const fileName = 'uploaded-image.jpg'; // ชื่อไฟล์ที่ต้องการ
                    cy.task('downloadFile', { url: dtlinkpicture, fileName }).then((filePath) => {
                        // เนื่องจาก attachFile ต้องการชื่อไฟล์ใน fixtures, ใช้แค่ชื่อไฟล์
                        image().attachFile(fileName);
                    });
                }
                if (dttpye) {
                    cy.wait(2000);
                    juristic_person().click();
                }
                if (dtname) {
                    cy.wait(2000);
                    name().clear({force: true}).type(dtname);
                } else {
                    cy.wait(2000);
                    name().clear({force: true});
                }
                if (dttaxnumber) {
                    cy.wait(2000);
                    taxnumber().clear({force: true}).type(dttaxnumber);
                } else {
                    cy.wait(2000);
                    taxnumber().clear({force: true});
                }
                if (dtcredit) {
                    cy.wait(2000);
                    credit().click();
                    cy.wait(2000);
                    credit1().click();
                }
                if (dtphonenumber) {
                    cy.wait(2000);
                    phonenumber().clear({force: true}).type(dtphonenumber);
                } else {
                    cy.wait(2000);
                    phonenumber().clear({force: true});
                }
                if (dtemail) {
                    cy.wait(2000);
                    email().clear({force: true}).type(dtemail);
                } else {
                    cy.wait(2000);
                    email().clear({force: true});
                }
                if (!dtcontact) {
                    cy.wait(2000);
                    contact_customer().click();
                    cy.wait(2000);
                    contact_agent().click();
                }
                if (dttaxAddress) {
                    cy.wait(2000);
                    taxAddress().clear({force: true}).type(dttaxAddress);
                } else {
                    cy.wait(2000);
                    taxAddress().clear({force: true});
                }
                if (dtzipcode) {
                    cy.wait(2000);
                    zipcode().clear({force: true}).type(dtzipcode);
                    if (dtdistrict){
                        cy.wait(2000);
                        district().click();
                        cy.wait(2000);
                        district1().click();
                    }
                    if (dtsubDistrict) {
                        cy.wait(2000);
                        subDistrict().click();
                        cy.wait(2000);
                        subDistrict1().click();
                    }
                } else {
                    cy.wait(2000);
                    zipcode().clear({force: true});
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
                            column: 'AK',
                            sheetName: 'Contact Entity'
                        });
                        console.log(`Updating row ${index + 2} with status Pass`);
                    }
                    if (Expectedresult === 'แก้ไขรายชื่อสำเร็จ') {
                        cy.reload();
                        cy.wait(2000);
                        kebab_wrap().click();
                        cy.wait(2000);
                        btedit().click();
                    }else {
                        cy.reload();
                        cy.wait(2000);
                    }
                });
            });
        });
    });
});