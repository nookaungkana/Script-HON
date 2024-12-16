import 'cypress-xpath';
import { login } from "../../login.cy";
import 'cypress-file-upload';
const { faker } = require('@faker-js/faker');

const generateRandomCode = () => {
  const randomLetter = faker.string.alpha({ count: 1, casing: 'upper' });
  const randomNumbers = faker.string.numeric(2);
  return `${randomLetter}${randomNumbers}`;
};

const create_product = () => cy.xpath("//div[contains(text(),'สร้างสินค้า')]");
const name = () => cy.xpath("//input[@name='name']");
const productCategoryId = () => cy.xpath("//div[@id='mui-component-select-productCategoryId']");
const productCategoryId2 = () => cy.xpath("//body/div[@id='menu-productCategoryId']/div[3]/ul[1]/li[2]");
const productCategoryId_last = () => cy.xpath("//body/div[@id='menu-productCategoryId']/div[3]/ul[1]/li[last()]");
const productTypeId = () => cy.xpath("//div[@id='mui-component-select-productTypeId']");
const productTypeId2 = () => cy.xpath("//body/div[@id='menu-productTypeId']/div[3]/ul[1]/li[2]");
const description = () => cy.xpath("//textarea[@name='description']");
const urlSlug = () => cy.xpath("//input[@name='urlSlug']");

const minWidth = () => cy.xpath("//input[@name=\"productSize.minWidth\"]");
const minHeight = () => cy.xpath("//input[@name=\"productSize.minHeight\"]");
const minLength = () => cy.xpath("//input[@name=\"productSize.minLength\"]");
const maxWidth = () => cy.xpath("//input[@name=\"productSize.maxWidth\"]");
const maxHeight = () => cy.xpath("//input[@name=\"productSize.maxHeight\"]");
const maxLength = () => cy.xpath("//input[@name=\"productSize.maxLength\"]");

const btsave = () => cy.xpath("//form[1]/div[9]/button[1]");
const menu = () => cy.xpath("//div[@class='MuiDataGrid-row MuiDataGrid-row--lastVisible']/div[6]/div");
const edit_product = () => cy.xpath("//body/div[2]/div[3]/ul[1]/li[1]/div[1]");

describe('Function Product', () => {
  beforeEach(() => {
    login();
    cy.wait(2000);
    cy.visit('https://app-staging.honconnect.co/product');
    cy.wait(2000);
  });

  it.skip('Create Product', () => {
    create_product().click();
    cy.wait(2000);

    cy.task('fetchGoogleSheetData', { range: 'Product!E2:P13' }).then(data => {
      data.forEach((row, index) => {
        const [dtname, dtcategory, dttype, dtdescription, dtproducturl, dtminwidth, dtminheight, dtminlength
          , dtmaxwidth, dtmaxheight,dtmaxlength, ExpectedAlertMessage] = row;

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
        if(dtproducturl){
          cy.wait(2000);
          urlSlug().type(generateRandomCode());
        }else {
          cy.wait(2000);
          urlSlug().clear({force: true});
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
            cy.xpath("//button[contains(text(),'OK')]").click();
            cy.wait(2000);
            cy.xpath("//div[@class='back-button']/button").click();
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

  it('Edit Product', () => {
    menu().click();
    cy.wait(2000);
    edit_product().click();
    cy.wait(2000);

    cy.task('fetchGoogleSheetData', { range: 'Product!W2:AH12' }).then(data => {
      data.forEach((row, index) => {
        const [dtname, dtcategory, dttype, dtdescription, dtproducturl, dtminwidth, dtminheight,dtminlength
          , dtmaxwidth, dtmaxheight,dtmaxlength, ExpectedAlertMessage] = row;

        if (dtname){
          cy.wait(2000);
          name().clear({force: true}).type(dtname);
        }else {
          cy.wait(2000);
          name().clear({force: true});
        }
        if(!dttype){
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
        if(dtproducturl){
          cy.wait(2000);
          urlSlug().clear({force: true}).type(generateRandomCode());
        }else {
          cy.wait(2000);
          urlSlug().clear({force: true});
        }
        if(dtminwidth){
          minWidth().clear().type(dtminwidth);
        }else {
          minWidth().clear();
        }
        if (dtminheight){
          minHeight().clear().type(dtminheight);
        }else {
          minHeight().clear();
        }
        if (dtminlength){
          minLength().clear().type(dtminlength);
        }else {
          minLength().clear();
        }
        if (dtmaxwidth){
          maxWidth().clear().type(dtmaxwidth);
        }else {
          maxWidth().clear();
        }
        if (dtmaxheight){
          maxHeight().clear().type(dtmaxheight);
        }else {
          maxHeight().clear();
        }
        if (dtmaxlength){
          maxLength().clear().type(dtmaxlength);
        }else {
          maxLength().clear();
        }
        cy.wait(2000);
        btsave().click();

        cy.contains(ExpectedAlertMessage).then(($element) => {
          if ($element.length > 0) {
            cy.log('Alert matches expected message');
            cy.task('updateStatus', {
              row: index + 2,
              status: 'Pass',
              column: 'AI',
              sheetName: 'Product'
            });
            cy.log(`Updating row ${index + 2} with status Pass`);
          }
          if(ExpectedAlertMessage=== 'อัพเดทสินค้าเรียบร้อย') {
            cy.wait(2000);
            cy.xpath("//button[contains(text(),'OK')]").click();
            cy.wait(2000);
            cy.xpath("//div[@class='back-button']/button").click();
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