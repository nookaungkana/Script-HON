require('cypress-xpath');
import { login } from "../login.cy";
import 'cypress-file-upload';

const create_material = () => cy.xpath("//div[contains(text(),'Create Material')]");
const name = () => cy.xpath("//input[@name='name']");
const btsave = () => cy.xpath("//button[text()='บันทึก']");
const edit_material = () => cy.xpath("//div[@class=\"MuiDataGrid-row MuiDataGrid-row--lastVisible\"]/div[4]/div/button[2]");

describe('Function Material', () => {
  beforeEach(() => {
    // รันก่อนการทดสอบในแต่ละ it()
    login();
    cy.wait(2000);
    cy.xpath("//div[@class='menu-group']/div[2]").click();
    cy.wait(2000);
    cy.xpath("//div[@id='__next']/div[1]/div[1]/div[2]/div[1]/div[1]/div[4]").click();
    cy.wait(2000);
    cy.xpath("//body/div[@id='__next']/div[1]/div[1]/div[2]/div[1]/div[1]/div[5]/div[1]/div[4]").click();
    cy.wait(2000);
  });

  it.skip('Create Material', () => {
    create_material().click();
    cy.wait(2000);
    cy.task('fetchGoogleSheetData', { range: 'Material!E2:H3' }).then(data => {
      data.forEach((row, index) => {
        const [dtname, typematerial, spec, Expectedresult ] = row;

        if (dtname) {
          cy.wait(2000);
          name().clear({force: true}).type(dtname);
        } else {
          cy.wait(2000);
          name().clear({force: true});
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
              column: 'I',
              sheetName: 'Material'
            });
            console.log(`Updating row ${index + 2} with status Pass`);
          }
          cy.reload();
          cy.wait(2000);
          create_material().click();
        });
      });
    });
  });

  it.skip('Edit Material', () => {
    edit_material().click();
    cy.wait(2000);
    cy.task('fetchGoogleSheetData', { range: 'Material!O2:R3' }).then(data => {
      data.forEach((row, index) => {
        const [dtname, typematerial, spec, Expectedresult ] = row;

        if (dtname) {
          cy.wait(2000);
          name().clear({force: true}).type(dtname);
        } else {
          cy.wait(2000);
          name().clear({force: true});
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
              column: 'S',
              sheetName: 'Material'
            });
            console.log(`Updating row ${index + 2} with status Pass`);
          }
          cy.reload();
          cy.wait(2000);
          edit_material().click();
        });
      });
    });
  });
});