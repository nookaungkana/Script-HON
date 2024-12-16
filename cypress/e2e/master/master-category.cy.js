import 'cypress-xpath';
import { login } from "../login.cy";
import 'cypress-file-upload';

const create_master_category = () => cy.xpath("//div[contains(text(),'สร้าง Master Category')]");
const name = () => cy.xpath("//input[@name='name']");
const description = () => cy.xpath("//textarea[@name='description']");
const btsave = () => cy.xpath("//button[text()='บันทึก']");
const menu = () => cy.xpath("//div[@class='MuiDataGrid-row MuiDataGrid-row--lastVisible']/div[4]/div");
const edit_master_category = () => cy.xpath("//ul[@role=\"menu\"]/li[1]");

describe('Function Master Category', () => {
  beforeEach(() => {
    login();
    cy.wait(2000);
    cy.visit('https://app-staging.honconnect.co/stock/master/category');
    cy.wait(2000);
  });

  it.skip('Create Master Category', () => {
    create_master_category().click();
    cy.wait(2000);
    cy.task('fetchGoogleSheetData', { range: 'Master Category!E2:G4' }).then(data => {
      data.forEach((row, index) => {
        const [dtname, dtdescription, Expectedresult] = row;

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
              column: 'H',
              sheetName: 'Master Category'
            });
            console.log(`Updating row ${index + 2} with status Pass`);
          }
          cy.reload();
          cy.wait(2000);
          create_master_category().click();
        });
      });
    });
  });
  it.skip('Edit Master Category', () => {
    cy.wait(2000);
    menu().click();
    cy.wait(2000);
    edit_master_category().click();
    cy.task('fetchGoogleSheetData', { range: 'Master Category!N2:P4' }).then(data => {
      data.forEach((row, index) => {
        const [dtname, dtdescription, Expectedresult] = row;

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
              column: 'Q',
              sheetName: 'Master Category'
            });
            console.log(`Updating row ${index + 2} with status Pass`);
          }
          cy.reload();
          cy.wait(2000);
          menu().click();
          cy.wait(2000);
          edit_master_category().click();
        });
      });
    });
  });
});










