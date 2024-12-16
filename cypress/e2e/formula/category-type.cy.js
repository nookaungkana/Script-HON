import 'cypress-xpath';
import { login } from "../login.cy";
import 'cypress-file-upload';

const category_type = () => cy.xpath("//div[@class='MuiDataGrid-row MuiDataGrid-row--lastVisible']/div[3]/div/button[1]");
const create_category_type = () => cy.xpath("//div[contains(text(),'สร้างประเภท')]");
const name = () => cy.xpath("//input[@name='name']");
const optionsCostTypeId = () => cy.xpath("//div[@id='mui-component-select-optionsCostTypeId']");
const optionsCostTypeId2 = () => cy.xpath("//body/div[@id='menu-optionsCostTypeId']/div[3]/ul[1]/li[1]");
const btsave = () => cy.xpath("//button[text()='บันทึก']");
const edit_category_type = () => cy.xpath("//div[@class='MuiDataGrid-row MuiDataGrid-row--lastVisible']/div[4]/div/button[2]");

describe('Function Category Type', () => {
  beforeEach(() => {
    login();
    cy.wait(2000);
    cy.visit('https://app-staging.honconnect.co/company/formula/category');
    cy.wait(2000);
    category_type().click();
    cy.wait(2000);
  });

  it.skip('Create Category Type', () => {
    create_category_type().click();
    cy.wait(2000);
    cy.task('fetchGoogleSheetData', { range: 'Category Type!E2:G4' }).then(data => {
      data.forEach((row, index) => {
        const [dtname, dtoptionsCostType, Expectedresult] = row;

        if (dtname) {
          cy.wait(2000);
          name().clear({ force: true }).type(dtname);
        } else {
          cy.wait(2000);
          name().clear({ force: true });
        }
        if (dtoptionsCostType) {
          cy.wait(2000);
          optionsCostTypeId().click();
          cy.wait(2000);
          optionsCostTypeId2().click();
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
              sheetName: 'Category Type'
            });
            console.log(`Updating row ${index + 2} with status Pass`);
          }
          cy.reload();
          cy.wait(2000);
          create_category_type().click();
        });
      });
    });
  });
  it.skip('Edit Category Type', () => {
    edit_category_type().click();
    cy.wait(2000);
    cy.task('fetchGoogleSheetData', { range: 'Category Type!N2:P3' }).then(data => {
      data.forEach((row, index) => {
        const [dtname, dtoptionsCostType, Expectedresult] = row;

        if (dtname) {
          cy.wait(2000);
          name().clear({ force: true }).type(dtname);
        } else {
          cy.wait(2000);
          name().clear({ force: true });
        }
        if (dtoptionsCostType) {
          cy.wait(2000);
          optionsCostTypeId().click();
          cy.wait(2000);
          optionsCostTypeId2().click();
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
              sheetName: 'Category Type'
            });
            console.log(`Updating row ${index + 2} with status Pass`);
          }
          cy.reload();
          cy.wait(2000);
          edit_category_type().click();
        });
      });
    });
  });
});









