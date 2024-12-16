import 'cypress-xpath';
import { login } from "../login.cy";
import 'cypress-file-upload';

const create_component = () => cy.xpath("//div[contains(text(),'สร้าง Component')]");
const image = () => cy.xpath("//input[@type='file']");

const componentTypeId = () => cy.xpath("//div[@id='mui-component-select-componentTypeId']");
const componentTypeId_last = () => cy.xpath("//body/div[@id='menu-componentTypeId']/div[3]/ul[1]/li[last()]");

const name = () => cy.xpath("//input[@name='name']");

const optionsCategoryId = () => cy.xpath("//div[@id='mui-component-select-optionsCategoryId']");
const optionsCategoryId_last = () => cy.xpath("//body/div[@id='menu-optionsCategoryId']/div[3]/ul[1]/li[last()]");
const optionsId = () => cy.xpath("//div[@id='mui-component-select-optionsId']");
const optionsId2 = () => cy.xpath("//body/div[@id='menu-optionsId']/div[3]/ul[1]/li[2]");

const description = () => cy.xpath("//textarea[@name='description']");
const btsave = () => cy.xpath("//button[text()='บันทึก']");
const menu = () => cy.xpath("//div[@class='MuiDataGrid-row MuiDataGrid-row--lastVisible']/div[4]/div");
const edit_component = () => cy.xpath("//ul[@role=\"menu\"]/li[1]");

describe('Function Component', () => {
  beforeEach(() => {
    login();
    cy.wait(2000);
    cy.visit('https://app-staging.honconnect.co/stock/component');
    cy.wait(2000);
  });

  it.skip('Create Component', () => {
    create_component().click();
    cy.wait(2000);
    cy.task('fetchGoogleSheetData', { range: 'Component!E2:K8' }).then(data => {
      data.forEach((row, index) => {
        const [dtlinkpicture, dtcomponenttype, dtname, dtoptioncategory, dtoption, dtdescription, Expectedresult] = row;

        if (dtlinkpicture) {
          const fileName = 'component.jpg';
          cy.task('downloadFile', { url: dtlinkpicture, fileName }).then((filePath) => {
            image().attachFile(fileName);
          });
        }
        if (dtcomponenttype){
          cy.wait(2000);
          componentTypeId().click();
          cy.wait(2000);
          componentTypeId_last().click();
        }
        if (dtname) {
          cy.wait(2000);
          name().clear({ force: true }).type(dtname);
        } else {
          cy.wait(2000);
          name().clear({ force: true });
        }
        if (dtoptioncategory){
          cy.wait(2000);
          optionsCategoryId().click();
          cy.wait(2000);
          optionsCategoryId_last().click();
        }
        if (dtoption){
          cy.wait(2000);
          optionsId().click();
          cy.wait(2000);
          optionsId2().click();
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
              column: 'L',
              sheetName: 'Component'
            });
            console.log(`Updating row ${index + 2} with status Pass`);
          }
          cy.reload();
          cy.wait(2000);
          create_component().click();
        });
      });
    });
  });
  it.skip('Edit Component', () => {
    cy.wait(2000);
    menu().click();
    cy.wait(2000);
    edit_component().click();
    cy.task('fetchGoogleSheetData', { range: 'Component!R2:X5' }).then(data => {
      data.forEach((row, index) => {
        const [dtlinkpicture, dtcomponenttype, dtname, dtoptioncategory, dtoption, dtdescription, Expectedresult] = row;

        if (dtlinkpicture) {
          const fileName = 'component.jpg';
          cy.task('downloadFile', { url: dtlinkpicture, fileName }).then((filePath) => {
            image().attachFile(fileName);
          });
        }
        if (dtcomponenttype){
          cy.wait(2000);
          componentTypeId().click();
          cy.wait(2000);
          componentTypeId_last().click();
        }
        if (dtname) {
          cy.wait(2000);
          name().clear({ force: true }).type(dtname);
        } else {
          cy.wait(2000);
          name().clear({ force: true });
        }
        if (dtoptioncategory){
          cy.wait(2000);
          optionsCategoryId().click();
          cy.wait(2000);
          optionsCategoryId_last().click();
        }
        if (dtoption){
          cy.wait(2000);
          optionsId().click();
          cy.wait(2000);
          optionsId2().click();
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
              column: 'Y',
              sheetName: 'Component'
            });
            console.log(`Updating row ${index + 2} with status Pass`);
          }
          cy.reload();
          cy.wait(2000);
          menu().click();
          cy.wait(2000);
          edit_component().click();
        });
      });
    });
  });
});



