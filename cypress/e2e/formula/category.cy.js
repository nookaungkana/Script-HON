import 'cypress-xpath';
import { login } from "../login.cy";
import 'cypress-file-upload';

const create_category = () => cy.xpath("//div[contains(text(),'สร้างหมวดหมู่')]");
const name = () => cy.xpath("//input[@name='name']");
const option_typeID = () => cy.xpath("//div[@class=\"MuiFormControl-root MuiFormControl-fullWidth css-d7ei8i\"]");
const option_typeID_last = () => cy.xpath("//body/div[@id='menu-']/div[3]/ul[1]/li[last()]");
const btsave = () => cy.xpath("//button[text()='บันทึก']");
const edit_category = () => cy.xpath("//div[@class='MuiDataGrid-row MuiDataGrid-row--lastVisible']/div[3]/div/button[2]");
describe('Function Category', () => {
  beforeEach(() => {
    login();
    cy.wait(2000);
    cy.visit('https://app-staging.honconnect.co/company/formula/category');
    cy.wait(2000);
  });
  it.skip('Create Category', () => {
    create_category().click();
    cy.wait(2000);
    cy.task('fetchGoogleSheetData', { range: 'Category!E2:G4' }).then(data => {
      data.forEach((row, index) => {
        const [dtname, dtoptiontype, Expectedresult] = row;

        if (dtname) {
          cy.wait(2000);
          name().clear({ force: true }).type(dtname);
        } else {
          cy.wait(2000);
          name().clear({ force: true });
        }
        if (dtoptiontype) {
          cy.wait(2000);
          option_typeID().click();
          cy.wait(2000);
          option_typeID_last().click();
          cy.wait(2000);
          cy.xpath("//body/div[@id='menu-']/div[1]").click({ force: true });
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
              sheetName: 'Category'
            });
            console.log(`Updating row ${index + 2} with status Pass`);
          }
          cy.reload();
          cy.wait(2000);
          create_category().click();
        });
      });
    });
  });
  it.skip('Edit Category', () => {
    edit_category().click();
    cy.wait(2000);
    cy.task('fetchGoogleSheetData', { range: 'Category!N2:P4' }).then(data => {
      data.forEach((row, index) => {
        const [dtname, dtoptiontype, Expectedresult] = row;

        if (dtname) {
          cy.wait(2000);
          name().clear({ force: true }).type(dtname);
        } else {
          cy.wait(2000);
          name().clear({ force: true });
        }
        if (!dtoptiontype) {
          cy.wait(2000);
          option_typeID().click();
          cy.wait(2000);
          option_typeID_last().click();
          cy.wait(2000);
          cy.xpath("//body/div[@id='menu-']/div[1]").click({ force: true });
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
              sheetName: 'Category'
            });
            console.log(`Updating row ${index + 2} with status Pass`);
          }
          cy.reload();
          cy.wait(2000);
          edit_category().click();
        });
      });
    });
  });
});
