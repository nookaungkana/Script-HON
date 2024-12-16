import 'cypress-xpath';
import { login } from "../login.cy";
import 'cypress-file-upload';

const create_master = () => cy.xpath("//div[contains(text(),'สร้าง Master')]");

const masterCategoryId = () => cy.xpath("//div[@id='mui-component-select-masterCategoryId']");
const masterCategoryId_last = () => cy.xpath("//body/div[@id='menu-masterCategoryId']/div[3]/ul[1]/li[last()]");

const image = () => cy.xpath("//input[@type='file']");
const name = () => cy.xpath("//input[@name='name']");
const description = () => cy.xpath("//textarea[@name='description']");
const btsave = () => cy.xpath("//button[text()='บันทึก']");
const page_two = () => cy.xpath("//nav/ul/li[3]");
const menu = () => cy.xpath("//div[@class='MuiDataGrid-row MuiDataGrid-row--lastVisible']/div[4]/div/div/div");
const edit_master = () => cy.xpath("//ul[@role=\"menu\"]/li[1]");

describe('Function Master', () => {
  beforeEach(() => {
    login();
    cy.wait(2000);
    cy.visit('https://app-staging.honconnect.co/stock/master');
    cy.wait(2000);
  });

  it.skip('Create Master', () => {
    create_master().click();
    cy.wait(2000);
    cy.task('fetchGoogleSheetData', { range: 'Master!E2:I6' }).then(data => {
      data.forEach((row, index) => {
        const [dtlinkpicture, dtmastercategory, dtname, dtdescription, Expectedresult] = row;

        if (dtlinkpicture) {
          const fileName = 'master.jpg';
          cy.task('downloadFile', { url: dtlinkpicture, fileName }).then((filePath) => {
            image().attachFile(fileName);
          });
        }
        if(dtmastercategory){
          cy.wait(2000);
          masterCategoryId().click();
          cy.wait(2000);
          masterCategoryId_last().click();
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
              column: 'J',
              sheetName: 'Master'
            });
            console.log(`Updating row ${index + 2} with status Pass`);
          }
          cy.reload();
          cy.wait(2000);
          create_master().click();
        });
      });
    });
  });
  it.skip('Edit Master', () => {
    page_two().click();
    cy.wait(2000);
    menu().click();
    cy.wait(2000);
    edit_master().click();
    cy.task('fetchGoogleSheetData', { range: 'Master!P2:T5' }).then(data => {
      data.forEach((row, index) => {
        const [dtlinkpicture, dtmastercategory, dtname, dtdescription, Expectedresult] = row;

        if (dtlinkpicture) {
          const fileName = 'master.jpg';
          cy.task('downloadFile', { url: dtlinkpicture, fileName }).then((filePath) => {
            image().attachFile(fileName);
          });
        }
        if(dtmastercategory){
          cy.wait(2000);
          masterCategoryId().click();
          cy.wait(2000);
          masterCategoryId_last().click();
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
              column: 'U',
              sheetName: 'Master'
            });
            console.log(`Updating row ${index + 2} with status Pass`);
          }
          cy.reload();
          cy.wait(2000);
          page_two().click();
          cy.wait(2000);
          menu().click();
          cy.wait(2000);
          edit_master().click();
        });
      });
    });
  });
});