import 'cypress-xpath';
import { login } from "../login.cy";
import 'cypress-file-upload';

const create_component_type = () => cy.xpath("//div[contains(text(),'สร้าง Component Type')]");

const componentCategoryId = () => cy.xpath("//div[@id='mui-component-select-componentCategoryId']");
const componentCategoryId_last = () => cy.xpath("//div[@id='menu-componentCategoryId']/div[3]/ul[1]/li[last()]");

const name = () => cy.xpath("//input[@name='name']");
const description = () => cy.xpath("//textarea[@name='description']");
const btsave = () => cy.xpath("//button[text()='บันทึก']");
const menu = () => cy.xpath("//div[@class='MuiDataGrid-row MuiDataGrid-row--lastVisible']/div[5]/div");
const edit_component_type = () => cy.xpath("//ul[@role=\"menu\"]/li[1]");

describe('Function Component-Type', () => {
  beforeEach(() => {
    login();
    cy.wait(2000);
    cy.visit('https://app-staging.honconnect.co/stock/component/type');
    cy.wait(2000);
  });

  it.skip('Create Component-Type', () => {
    create_component_type().click();
    cy.wait(2000);
    cy.task('fetchGoogleSheetData', { range: 'Component Type!E2:H5' }).then(data => {
      data.forEach((row, index) => {
        const [dtcategory, dtname, dtdescription, Expectedresult] = row;

        if (dtcategory){
          cy.wait(2000);
          componentCategoryId().click();
          cy.wait(2000);
          componentCategoryId_last().click();
        }
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
              column: 'I',
              sheetName: 'Component Type'
            });
            console.log(`Updating row ${index + 2} with status Pass`);
          }
          cy.reload();
          cy.wait(2000);
          create_component_type().click();
        });
      });
    });
  });
  it.skip('Edit Component-Type', () => {
    menu().click();
    cy.wait(2000);
    edit_component_type().click();
    cy.task('fetchGoogleSheetData', { range: 'Component Type!O2:R4' }).then(data => {
      data.forEach((row, index) => {
        const [dtcategory, dtname, dtdescription, Expectedresult] = row;

        if (dtcategory){
          cy.wait(2000);
          componentCategoryId().click();
          cy.wait(2000);
          componentCategoryId_last().click();
        }
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
              column: 'S',
              sheetName: 'Component Type'
            });
            console.log(`Updating row ${index + 2} with status Pass`);
          }
          cy.reload();
          cy.wait(2000);
          menu().click();
          cy.wait(2000);
          edit_component_type().click();
        });
      });
    });
  });
});

