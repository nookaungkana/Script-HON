import 'cypress-xpath';
import { login } from "../../login.cy";
import 'cypress-file-upload';

const create_product = () => cy.xpath("//div[contains(text(),'สร้างสินค้า')]");
const image = () => cy.xpath("//input[@type=\"file\"]");
const name = () => cy.xpath("//input[@name='name']");
const productCategoryId = () => cy.xpath("//div[@id='mui-component-select-productCategoryId']");
const productCategoryId2 = () => cy.xpath("//body/div[@id='menu-productCategoryId']/div[3]/ul[1]/li[2]");
const productCategoryId_last = () => cy.xpath("//body/div[@id='menu-productCategoryId']/div[3]/ul[1]/li[last()]");
const productTypeId = () => cy.xpath("//div[@id='mui-component-select-productTypeId']");
const productTypeId2 = () => cy.xpath("//body/div[@id='menu-productTypeId']/div[3]/ul[1]/li[2]");
const description = () => cy.xpath("//textarea[@name='description']");

const minWidth = () => cy.xpath("//input[@name=\"productSize.minWidth\"]");
const minHeight = () => cy.xpath("//input[@name=\"productSize.minHeight\"]");
const minLength = () => cy.xpath("//input[@name=\"productSize.minLength\"]");
const maxWidth = () => cy.xpath("//input[@name=\"productSize.maxWidth\"]");
const maxHeight = () => cy.xpath("//input[@name=\"productSize.maxHeight\"]");
const maxLength = () => cy.xpath("//input[@name=\"productSize.maxLength\"]");

const btsave = () => cy.xpath("//form[1]/div[10]/button[1]");
const menu = () => cy.xpath("//div[@class='MuiDataGrid-row MuiDataGrid-row--lastVisible']/div[6]/div");
const edit_product = () => cy.xpath("//ul[1]/li[1]/div[1]");
const btsave_edit = () => cy.xpath("//form[1]/div[9]/button[1]");

Cypress.on('uncaught:exception', (err, runnable) => {
  // ตรวจสอบข้อความของข้อผิดพลาดว่าเป็นข้อผิดพลาดที่ต้องการข้าม
  if (err.message.includes('Cannot set property message of [object DOMException]')) {
    return false; // ข้ามข้อผิดพลาดนี้
  }
  return true; // ข้อผิดพลาดอื่นๆ ให้ Cypress จัดการ
});

describe('Function Product', () => {
  beforeEach(() => {
    cy.wait(2000);
    login();
    cy.wait(2000);
  });

  it.skip('Create Product', () => {
    cy.visit('https://app-staging.honconnect.co/product');
    cy.wait(2000);
    create_product().click();
    cy.wait(2000);

    cy.task('fetchGoogleSheetData', { range: 'Product!E2:P13' }).then(data => {
      data.forEach((row, index) => {
        const [dtlinkpicture, dtname, dtcategory, dttype, dtdescription, dtminwidth, dtminheight, dtminlength
          , dtmaxwidth, dtmaxheight,dtmaxlength, ExpectedAlertMessage] = row;

        if (dtlinkpicture) {
          const fileName = 'product.jpg'; // ชื่อไฟล์ที่ต้องการ
          cy.task('downloadFile', { url: dtlinkpicture, fileName }).then((filePath) => {
            // เนื่องจาก attachFile ต้องการชื่อไฟล์ใน fixtures, ใช้แค่ชื่อไฟล์
            image().attachFile(fileName);
          });
        }
        if (dtname){
          cy.wait(2000);
          name().type(dtname);
        }else {
          cy.wait(2000);
          name().clear({force: true});
        }
        if(dtcategory){
          cy.wait(2000);
          productCategoryId().click();
          cy.wait(2000);
          productCategoryId2().click();
          if(dttype){
            cy.wait(2000);
            productTypeId().click();
            cy.wait(2000);
            productTypeId2().click();
          }
        }
        if(dtdescription){
          cy.wait(2000);
          description().type(dtdescription);
        }else {
          cy.wait(2000);
          description().clear({force: true});
        }
        if(dtminwidth){
            minWidth().type(dtminwidth);
        }
        if (dtminheight){
          minHeight().type(dtminheight);
        }
        if (dtminlength){
          minLength().type(dtminlength);
        }
        if (dtmaxwidth){
          maxWidth().type(dtmaxwidth);
        }
        if (dtmaxheight){
          maxHeight().type(dtmaxheight);
        }
        if (dtmaxlength){
          maxLength().type(dtmaxlength);
        }
        cy.wait(2000);
        btsave().click();

        cy.contains(ExpectedAlertMessage).then(($element) => {
          if ($element.length > 0) {
            cy.log('Alert matches expected message');
            cy.task('updateStatus', {
              row: index + 2,
              status: 'Pass',
              column: 'Q',
              sheetName: 'Product'
            });
            cy.log(`Updating row ${index + 2} with status Pass`);
          }
          if(ExpectedAlertMessage=== 'สร้างสินค้าเรียบร้อย') {
            cy.wait(2000);
            create_product().click();
          }else{
            cy.wait(2000);
            cy.reload();
          }
        });
      });
    });
  });
  it.skip('Edit Product', () => {
    cy.visit('https://app-staging.honconnect.co/product');
    cy.wait(2000);
    menu().click();
    cy.wait(2000);
    edit_product().click();
    cy.wait(2000);

    cy.task('fetchGoogleSheetData', { range: 'Product!W7:AH12' }).then(data => {
      data.forEach((row, index) => {
        const [dtlinkpicture, dtname, dtcategory, dttype, dtdescription, dtminwidth, dtminheight, dtminlength
          , dtmaxwidth, dtmaxheight,dtmaxlength, ExpectedAlertMessage] = row;

        if (dtlinkpicture) {
          const fileName = 'product.jpg'; // ชื่อไฟล์ที่ต้องการ
          cy.task('downloadFile', { url: dtlinkpicture, fileName }).then((filePath) => {
            image().attachFile(fileName);
          });
        }
        if (dtname){
          cy.wait(2000);
          name().clear({force: true}).type(dtname);
        }else {
          cy.wait(2000);
          name().clear({force: true});
        }
        if(dtcategory==='ถุงกระดาษ'){
          cy.wait(2000);
          productCategoryId().click();
          cy.wait(2000);
          productCategoryId_last().click();
        }
        if(dtdescription){
          cy.wait(2000);
          description().clear({force: true}).type(dtdescription);
        }else {
          cy.wait(2000);
          description().clear({force: true});
        }
        if(dtminwidth){
          minWidth().clear({force: true}).type(dtminwidth);
        }else {
          cy.wait(2000);
          minWidth().clear({force: true});
        }
        if (dtminheight){
          minHeight().clear({force: true}).type(dtminheight);
        }else {
          cy.wait(2000);
          minHeight().clear({force: true});
        }
        if (dtminlength){
          minLength().clear({force: true}).type(dtminlength);
        }else {
          cy.wait(2000);
          minLength().clear({force: true});
        }
        if (dtmaxwidth){
          maxWidth().clear({force: true}).type(dtmaxwidth);
        }else {
          cy.wait(2000);
          maxWidth().clear({force: true});
        }
        if (dtmaxheight){
          maxHeight().clear({force: true}).type(dtmaxheight);
        }
        else {
          cy.wait(2000);
          maxHeight().clear({force: true});
        }
        if (dtmaxlength){
          maxLength().clear({force: true}).type(dtmaxlength);
        }else {
          cy.wait(2000);
          maxLength().clear({force: true});
        }
        cy.wait(2000);
        btsave_edit().click();

        cy.contains(ExpectedAlertMessage).then(($element) => {
          if ($element.length > 0) {
            cy.log('Alert matches expected message');
            cy.task('updateStatus', {
              row: index + 7,
              status: 'Pass',
              column: 'AI',
              sheetName: 'Product'
            });
            cy.log(`Updating row ${index + 7} with status Pass`);
          }
          if(ExpectedAlertMessage=== 'อัปเดต Product สำเร็จ') {
            cy.wait(2000);
            menu().click();
            cy.wait(2000);
            edit_product().click();
          }else{
            cy.wait(2000);
            cy.reload();
          }
        });
      });
    });
  });

});