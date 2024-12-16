require('cypress-xpath');
import { login } from "../login.cy";
import 'cypress-file-upload';

const create_brand = () => cy.xpath("//div[contains(text(),'สร้างแบรนด์')]");
const image = () => cy.xpath("//input[@type='file']");
const name = () => cy.xpath("//input[@name='name']");
const description = () => cy.xpath("//textarea[@name=\"description\"]");
const btsave = () => cy.xpath("//button[text()='บันทึก']");
const menu = () => cy.xpath("//div[@class='MuiDataGrid-row MuiDataGrid-row--lastVisible']/div[3]/div");
const edit_brand = () => cy.xpath("//ul[@role=\"menu\"]/li[1]");

describe('Function Brand', () => {
  beforeEach(() => {
    login();
    cy.wait(2000);
    cy.xpath("//div[@class='menu-group']/div[5]").click();
    cy.wait(2000);
    cy.xpath("//div[@id='__next']/div[1]/div[1]/div[2]/div[1]/div[1]/div[8]").click();
    cy.wait(2000);
    cy.xpath("//div[contains(text(),'แบรนด์')]").click();
    cy.wait(2000);
  });

  it.skip('Create Brand', () => {
    create_brand().click();
    cy.wait(2000);
    cy.task('fetchGoogleSheetData', { range: 'Brand!E2:H5' }).then(data => {
      data.forEach((row, index) => {
        const [dtlinkpicture, dtname, dtdescription,  Expectedresult ] = row;

        if (dtlinkpicture) {
          const fileName = 'brand.jpg';
          cy.task('downloadFile', { url: dtlinkpicture, fileName }).then((filePath) => {
            image().attachFile(fileName);
          });
        }
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
        btsave().click();
        cy.wait(2000);

        cy.contains(Expectedresult).then(($alert) => {
          if ($alert.length > 0) {
            cy.log('Alert matches expected message');
            cy.task('updateStatus', {
              row: index + 2,
              status: 'Pass',
              column: 'I',
              sheetName: 'Brand'
            });
            console.log(`Updating row ${index + 2} with status Pass`);
          }
          if (Expectedresult === 'เพิ่มแบรนด์สำเร็จ') {
            cy.reload();
            cy.wait(2000);
            create_brand().click();
          }else {
            cy.reload();
            cy.wait(2000);
          }
        });
      });
    });
  });
  it.skip('Edit Brand', () => {
    menu().click();
    cy.wait(2000);
    edit_brand().click();
    cy.wait(2000);
    cy.task('fetchGoogleSheetData', { range: 'Brand!O2:R5' }).then(data => {
      data.forEach((row, index) => {
        const [dtlinkpicture, dtname, dtdescription,  Expectedresult ] = row;

        if (dtlinkpicture) {
          const fileName = 'brand.jpg';
          cy.task('downloadFile', { url: dtlinkpicture, fileName }).then((filePath) => {
            image().attachFile(fileName);
          });
        }
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
        btsave().click();
        cy.wait(2000);

        cy.contains(Expectedresult).then(($alert) => {
          if ($alert.length > 0) {
            cy.log('Alert matches expected message');
            cy.task('updateStatus', {
              row: index + 2,
              status: 'Pass',
              column: 'S',
              sheetName: 'Brand'
            });
            console.log(`Updating row ${index + 2} with status Pass`);
          }
          if (Expectedresult === 'แก้ไขแบรนด์สำเร็จ') {
            cy.reload();
            cy.wait(2000);
            menu().click();
            cy.wait(2000);
            edit_brand().click();
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




