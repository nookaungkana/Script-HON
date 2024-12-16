import 'cypress-xpath';
import { login } from "../../login.cy";
import 'cypress-file-upload';

const create_order = () => cy.xpath("//div[contains(text(),'สร้างรายการซื้อ')]");
const contact = () => cy.xpath("//div[@class='contact-item-wrap']/div[1]");
const create_contact = () => cy.xpath("//form[1]/div[2]/button");
const creditDay = () => cy.xpath("//input[@name='creditDay']");

const addmaterial = () => cy.xpath("//div[contains(text(),'เพิ่มรายการ')]");
const materialid1 = () => cy.xpath("//div[@class='item-wrap']/div[1]");
const quantity = () => cy.xpath("//tbody/tr[2]/td[5]/div/div/input");
const price = () => cy.xpath("//tbody/tr[2]/td[6]/div/div/input");
const discount = () => cy.xpath("//tbody/tr[2]/td[7]/div/div/input");

const discount_percentage = () => cy.xpath("//div[@class='flex items-center gap-2 w-full justify-end']/div[1]/div/input");
const discount_baht = () => cy.xpath("//div[@class='flex items-center gap-2 w-full justify-end']/div[2]/div/input");
const delivery = () => cy.xpath("//div[@class='MuiFormControl-root MuiFormControl-fullWidth MuiTextField-root css-89zp2k']/div/input");
const note = () => cy.xpath("//textarea[@placeholder='ระบุข้อความ']");

const btsave = () => cy.xpath("//span[contains(text(),'บันทึก และ ขออนุมัติการสั่งซื้อ')]");
const btsave2 = () => cy.xpath("//div[@class='btn-submit-group']/div/button[1]");
const cf = () => cy.xpath("//button[contains(text(), 'ยืนยัน')]");

describe('Function Purchase-Order', () => {
    beforeEach(() => {
        login();
        cy.wait(2000);
        cy.visit('https://app-staging.honconnect.co/stock/purchase-order');
        cy.wait(2000);
    });

    //กรณีกดบันทึก และ ขออนุมัติการสั่งซื้อ
    it.skip('Create Purchase-Order', () => {
        create_order().click();
        cy.wait(2000);
        contact().click();
        cy.wait(2000);
        create_contact().click();

        cy.task('fetchGoogleSheetData', { range: 'Purchase-Order!E2:T11' }).then(data => {
            data.forEach((row, index) => {
                const [dtcontact, orderdate, dtcreditDay, duedate, texttype, dtmaterial, stock, dtquantity, dtprice, dtdiscount,
                    dtdiscount_percentage, dtdiscount_baht, dtdelivery, dtnote, buttonsave, ExpectedAlertMessage] = row;

                if (dtcreditDay) {
                    cy.wait(2000);
                    creditDay().clear({ force: true }).type(dtcreditDay);
                }else {
                    cy.wait(2000);
                    creditDay().clear({ force: true });
                }
                if (dtmaterial) {
                    cy.wait(2000);
                    addmaterial().click();
                    cy.wait(2000);
                    materialid1().click();
                    if (dtquantity) {
                        cy.wait(2000);
                        quantity().clear({ force: true }).type(dtquantity);
                    }else {
                        cy.wait(2000);
                        quantity().clear({ force: true });
                    }
                    if (dtprice) {
                        cy.wait(2000);
                        price().clear({ force: true }).type(dtprice);
                    }else {
                        cy.wait(2000);
                        price().clear({ force: true });
                    }
                    if (dtdiscount) {
                        cy.wait(2000);
                        discount().clear({ force: true }).type(dtdiscount);
                    }else {
                        cy.wait(2000);
                        discount().clear({ force: true });
                    }
                }
                if ( dtdiscount_percentage ) {
                    cy.wait(2000);
                    discount_percentage().clear({ force: true }).type(dtdiscount_percentage);
                }else {
                    cy.wait(2000);
                    discount_percentage().clear({ force: true });
                    if ( dtdiscount_baht ) {
                        cy.wait(2000);
                        discount_baht().clear({ force: true }).type(dtdiscount_baht);
                    }else {
                        cy.wait(2000);
                        discount_baht().clear({ force: true });
                    }
                }
                if (dtdelivery) {
                    cy.wait(2000);
                    delivery().clear({ force: true }).type(dtdelivery);
                }else {
                    cy.wait(2000);
                    delivery().clear({ force: true });
                }
                if (dtnote) {
                    cy.wait(2000);
                    note().clear({ force: true }).type(dtnote);
                }else {
                    cy.wait(2000);
                    note().clear({ force: true });
                }
                if (ExpectedAlertMessage === 'บันทึกสำเร็จ') {
                    cy.wait(2000);
                    btsave().click();
                    cy.wait(2000);
                    cf().click();
                    cf().click();
                }else {
                    cy.wait(2000);
                    btsave().click();
                }
                cy.wait( 2000);
                cy.contains(ExpectedAlertMessage).then(($element) => {
                    if ($element.length > 0) {
                        cy.log('Alert matches expected message');
                        cy.task('updateStatus', {
                            row: index + 2,
                            status: 'Pass',
                            column: 'U',
                            sheetName: 'Purchase-Order'
                        });
                        cy.log(`Updating row ${index + 2} with status Pass`);
                    }
                    if (ExpectedAlertMessage === 'บันทึกสำเร็จ') {
                        cy.wait(2000);
                        create_order().click();
                        cy.wait(2000);
                        contact().click();
                        cy.wait(2000);
                        create_contact().click();
                    }else {
                        cy.reload();
                        cy.wait(2000);
                    }
                });
            });
        });
    });

    //กรณีกดบันทึก
    it('Create Purchase-Order', () => {
        create_order().click();
        cy.wait(2000);
        contact().click();
        cy.wait(2000);
        create_contact().click();

        cy.task('fetchGoogleSheetData', { range: 'Purchase-Order!AA2:AP11' }).then(data => {
            data.forEach((row, index) => {
                const [dtcontact, orderdate, dtcreditDay, duedate, texttype, dtmaterial, stock, dtquantity, dtprice, dtdiscount,
                    dtdiscount_percentage, dtdiscount_baht, dtdelivery, dtnote, buttonsave, ExpectedAlertMessage] = row;

                if (dtcreditDay) {
                    cy.wait(2000);
                    creditDay().clear({ force: true }).type(dtcreditDay);
                }else {
                    cy.wait(2000);
                    creditDay().clear({ force: true });
                }
                if (dtmaterial) {
                    cy.wait(2000);
                    addmaterial().click();
                    cy.wait(2000);
                    materialid1().click();
                    if (dtquantity) {
                        cy.wait(2000);
                        quantity().clear({ force: true }).type(dtquantity);
                    }else {
                        cy.wait(2000);
                        quantity().clear({ force: true });
                    }
                    if (dtprice) {
                        cy.wait(2000);
                        price().clear({ force: true }).type(dtprice);
                    }else {
                        cy.wait(2000);
                        price().clear({ force: true });
                    }
                    if (dtdiscount) {
                        cy.wait(2000);
                        discount().clear({ force: true }).type(dtdiscount);
                    }else {
                        cy.wait(2000);
                        discount().clear({ force: true });
                    }
                }
                if ( dtdiscount_percentage ) {
                    cy.wait(2000);
                    discount_percentage().clear({ force: true }).type(dtdiscount_percentage);
                }else {
                    cy.wait(2000);
                    discount_percentage().clear({ force: true });
                    if ( dtdiscount_baht ) {
                        cy.wait(2000);
                        discount_baht().clear({ force: true }).type(dtdiscount_baht);
                    }else {
                        cy.wait(2000);
                        discount_baht().clear({ force: true });
                    }
                }
                if (dtdelivery) {
                    cy.wait(2000);
                    delivery().clear({ force: true }).type(dtdelivery);
                }else {
                    cy.wait(2000);
                    delivery().clear({ force: true });
                }
                if (dtnote) {
                    cy.wait(2000);
                    note().clear({ force: true }).type(dtnote);
                }else {
                    cy.wait(2000);
                    note().clear({ force: true });
                }
                cy.wait( 2000);
                btsave2().click();

                cy.contains(ExpectedAlertMessage).then(($element) => {
                    if ($element.length > 0) {
                        cy.log('Alert matches expected message');
                        cy.task('updateStatus', {
                            row: index + 2,
                            status: 'Pass',
                            column: 'AQ',
                            sheetName: 'Purchase-Order'
                        });
                        cy.log(`Updating row ${index + 2} with status Pass`);
                    }
                    if (ExpectedAlertMessage === 'บันทึกสำเร็จ') {
                        cy.wait(2000);
                        create_order().click();
                        cy.wait(2000);
                        contact().click();
                        cy.wait(2000);
                        create_contact().click();
                    }else {
                        cy.reload();
                        cy.wait(2000);
                    }
                });
            });
        });
    });
});