require('cypress-xpath');
import { login } from "../login.cy";
import 'cypress-file-upload';

const create_stock = () => cy.xpath("//div[contains(text(),'สร้างคลังสินค้า')]");
const name = () => cy.xpath("//input[@name='name']");
const description = () => cy.xpath("//textarea[@name=\"description\"]");
const address = () => cy.xpath("//input[@name='address']");
const zipcode = () => cy.xpath("//input[@name='zipcode']");
const subDistrict = () =>  cy.xpath("//input[@name='subDistrict']");
const subDistrict1 = () => cy.xpath("//LI[@data-option-index='1']");
const btsave = () => cy.xpath("//button[text()='บันทึก']");
const menu = () => cy.xpath("//div[@class='MuiDataGrid-row MuiDataGrid-row--lastVisible']/div[5]/div/div/div");
const edit_stock = () => cy.xpath("//ul[@role=\"menu\"]/li[1]");
describe('Function Stock', () => {
  beforeEach(() => {
    login();
    cy.wait(2000);
    cy.xpath("//div[@class='menu-group']/div[5]").click();
    cy.wait(2000);
  });

  it.skip('Create Stock', () => {
    create_stock().click();
    cy.wait(2000);
    cy.task('fetchGoogleSheetData', { range: 'Stock!E2:J7' }).then(data => {
      data.forEach((row, index) => {
        const [dtname, dtdescription, dtaddress, dtzibcode, dtsubdistrict, Expectedresult ] = row;

        if (dtname) {
          cy.wait(2000);
          name().clear({force: true}).type(dtname);
        } else {
          cy.wait(2000);
          name().clear({force: true});
        }
        if (dtdescription) {
          cy.wait(2000);
          description().clear({force: true}).type(dtdescription);
        } else {
          cy.wait(2000);
          description().clear({force: true});
        }
        if (dtaddress) {
          cy.wait(2000);
          address().clear({force: true}).type(dtaddress);
        } else {
          cy.wait(2000);
          address().clear({force: true});
        }
        if (dtzibcode) {
          cy.wait(2000);
          zipcode().clear({force: true}).type(dtzibcode);
        } else {
          cy.wait(2000);
          zipcode().clear({force: true});
        }
        if (dtsubdistrict) {
          cy.wait(2000);
          subDistrict().click();
          cy.wait(2000);
          subDistrict1().click();
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
              column: 'K',
              sheetName: 'Stock'
            });
            console.log(`Updating row ${index + 2} with status Pass`);
          }
          if (Expectedresult === 'สร้างคลังสินค้าสำเร็จ') {
            cy.reload();
            cy.wait(2000);
            create_stock().click();
          }else {
            cy.reload();
            cy.wait(2000);
          }
        });
      });
    });
  });
  it.skip('Edit Stock', () => {
    menu().click();
    cy.wait(2000);
    edit_stock().click();
    cy.wait(2000);

    cy.task('fetchGoogleSheetData', { range: 'Stock!Q2:V7' }).then(data => {
      data.forEach((row, index) => {
        const [dtname, dtdescription, dtaddress, dtzibcode, dtsubdistrict, Expectedresult ] = row;

        if (dtname) {
          cy.wait(2000);
          name().clear({force: true}).type(dtname);
        } else {
          cy.wait(2000);
          name().clear({force: true});
        }
        if (dtdescription) {
          cy.wait(2000);
          description().clear({force: true}).type(dtdescription);
        } else {
          cy.wait(2000);
          description().clear({force: true});
        }
        if (dtaddress) {
          cy.wait(2000);
          address().clear({force: true}).type(dtaddress);
        } else {
          cy.wait(2000);
          address().clear({force: true});
        }
        if (dtzibcode) {
          cy.wait(2000);
          zipcode().clear({force: true}).type(dtzibcode);
        } else {
          cy.wait(2000);
          zipcode().clear({force: true});
        }
        if (dtsubdistrict) {
          cy.wait(2000);
          subDistrict().click();
          cy.wait(2000);
          subDistrict1().click();
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
              column: 'W',
              sheetName: 'Stock'
            });
            console.log(`Updating row ${index + 2} with status Pass`);
          }
          if (Expectedresult === 'แก้ไขคลังสินค้าสำเร็จ') {
            cy.reload();
            cy.wait(2000);
            menu().click();
            cy.wait(2000);
            edit_stock().click();
            cy.wait(2000);
          }else {
            cy.reload();
            cy.wait(2000);
          }
        });
      });
    });
  });
});