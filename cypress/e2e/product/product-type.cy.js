require('cypress-xpath');
import { login } from "../login.cy";
import 'cypress-file-upload';

const type = () => cy.xpath("//div[@class=\"MuiDataGrid-row MuiDataGrid-row--lastVisible\"]/div[5]/button[1]");
const create_type = () => cy.xpath("//div[contains(text(),'เพิ่มประเภท')]");
const name = () => cy.xpath("//input[@name='name']");
const urlslug = () => cy.xpath("//input[@name='urlSlug']");
const btsave = () => cy.xpath("//button[text()='บันทึก']");
const edit_type = () => cy.xpath("//div[@class=\"MuiDataGrid-row MuiDataGrid-row--lastVisible\"]/div[4]/button[1]");

describe('Function Product-Type', () => {
  beforeEach(() => {
    // รันก่อนการทดสอบในแต่ละ it()
    login();
    cy.wait(2000);
    cy.xpath("//div[@class='menu-group']/div[2]").click();
    cy.wait(2000);
    cy.xpath("//div[@id='__next']/div[1]/div[1]/div[2]/div[1]/div[1]/div[4]").click();
    cy.wait(2000);
    cy.xpath("//div[contains(text(),'หมวดหมู่สินค้า')]").click();
    cy.wait(2000);
    type().click();
    cy.wait(2000);
  });

  it.skip('Create Product-Type', () => {
    create_type().click();
    cy.wait(2000);
    cy.task('fetchGoogleSheetData', { range: 'Product-Type!E2:G4' }).then(data => {
      data.forEach((row, index) => {
        const [dtname, dturlslug, Expectedresult ] = row;

        if (dtname) {
          cy.wait(2000);
          name().clear({force: true}).type(dtname);
        } else {
          cy.wait(2000);
          name().clear({force: true});
        }
        if (dturlslug) {
          cy.wait(2000);
          urlslug().clear({force: true}).type(dturlslug);
        } else {
          cy.wait(2000);
          urlslug().clear({force: true});
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
              column: 'H',
              sheetName: 'Product-Type'
            });
            console.log(`Updating row ${index + 2} with status Pass`);
          }
          cy.reload();
          cy.wait(2000);
          create_type().click();
        });
      });
  });

});

  it.skip('Edit Product-Type', () => {
    edit_type().click();
    cy.wait(2000);
    cy.task('fetchGoogleSheetData', { range: 'Product-Type!N2:P4' }).then(data => {
      data.forEach((row, index) => {
        const [dtname, dturlslug, Expectedresult ] = row;

        if (dtname) {
          cy.wait(2000);
          name().clear({force: true}).type(dtname);
        } else {
          cy.wait(2000);
          name().clear({force: true});
        }
        if (dturlslug) {
          cy.wait(2000);
          urlslug().clear({force: true}).type(dturlslug);
        } else {
          cy.wait(2000);
          urlslug().clear({force: true});
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
              column: 'Q',
              sheetName: 'Product-Type'
            });
            console.log(`Updating row ${index + 2} with status Pass`);
          }
          cy.reload();
          cy.wait(2000);
          edit_type().click();
        });
      });
    });
  });
});


