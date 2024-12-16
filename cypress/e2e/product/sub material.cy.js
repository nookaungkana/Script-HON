require('cypress-xpath');
import { login } from "../login.cy";
import 'cypress-file-upload';

const submaterial = () => cy.xpath("//div[@class=\"MuiDataGrid-row MuiDataGrid-row--lastVisible\"]/div[4]/div/button[1]");
const create_submaterial = () => cy.xpath("//div[contains(text(),'Add Sub Material')]");
const image = () => cy.xpath("//input[@type='file']");
const name = () => cy.xpath("//input[@name='name']");
const btsave = () => cy.xpath("//button[text()='บันทึก']");
const edit_submaterial = () => cy.xpath("//div[@class=\"MuiDataGrid-row MuiDataGrid-row--lastVisible\"]/div[3]/div/button[2]");

describe('Function Material', () => {
  beforeEach(() => {
    // รันก่อนการทดสอบในแต่ละ it()
    login();
    cy.wait(2000);
    cy.xpath("//div[@class='menu-group']/div[2]").click();
    cy.wait(2000);
    cy.xpath("//div[@id='__next']/div[1]/div[1]/div[2]/div[1]/div[1]/div[4]").click();
    cy.wait(2000);
    cy.xpath("//div[@id='__next']/div[1]/div[1]/div[2]/div[1]/div[1]/div[5]/div[1]/div[4]").click();
    cy.wait(2000);
    submaterial().click();
    cy.wait(2000);
  });

  it.skip('Create Sub Material', () => {
    create_submaterial().click();
    cy.wait(2000);
    cy.task('fetchGoogleSheetData', { range: 'Sub Material!E2:G4' }).then(data => {
      data.forEach((row, index) => {
        const [dtlinkpicture, dtname, Expectedresult ] = row;

        if (dtlinkpicture) {
          const fileName = 'submaterial.jpg'; // ชื่อไฟล์ที่ต้องการ
          cy.task('downloadFile', { url: dtlinkpicture, fileName }).then((filePath) => {
            // เนื่องจาก attachFile ต้องการชื่อไฟล์ใน fixtures, ใช้แค่ชื่อไฟล์
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
              sheetName: 'Sub Material'
            });
            console.log(`Updating row ${index + 2} with status Pass`);
          }
          cy.reload();
          cy.wait(2000);
          create_submaterial().click();
        });
      });
    });
  });

  it.skip('Edit Sub Material', () => {
    edit_submaterial().click();
    cy.wait(2000);
    cy.task('fetchGoogleSheetData', { range: 'Sub Material!N2:P3' }).then(data => {
      data.forEach((row, index) => {
        const [dtlinkpicture, dtname, Expectedresult ] = row;

        if (dtlinkpicture) {
          const fileName = 'submaterial.jpg'; // ชื่อไฟล์ที่ต้องการ
          cy.task('downloadFile', { url: dtlinkpicture, fileName }).then((filePath) => {
            // เนื่องจาก attachFile ต้องการชื่อไฟล์ใน fixtures, ใช้แค่ชื่อไฟล์
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
              sheetName: 'Sub Material'
            });
            console.log(`Updating row ${index + 2} with status Pass`);
          }
          cy.reload();
          cy.wait(2000);
          edit_submaterial().click();
        });
      });
    });
  });


});