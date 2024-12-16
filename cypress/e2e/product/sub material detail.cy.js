require('cypress-xpath');
import { login } from "../login.cy";
import 'cypress-file-upload';

const material = () => cy.xpath("//div[@class=\"MuiDataGrid-row MuiDataGrid-row--lastVisible\"]/div[4]/div/button[1]");
const submaterial = () => cy.xpath("//div[@class=\"MuiDataGrid-row MuiDataGrid-row--lastVisible\"]/div[3]/div/button[1]");
const create_submaterialdetail = () => cy.xpath("//div[contains(text(),'Add Sub Material Detail')]");
const name = () => cy.xpath("//input[@name='name']");
const optionsCategoryId = () => cy.xpath("//div[@id='mui-component-select-optionsCategoryId']");
const optionsCategoryId2 = () => cy.xpath("//body/div[@id='menu-optionsCategoryId']/div[3]/ul[1]/li[2]");
const optionsId = () => cy.xpath("//div[@id='mui-component-select-optionsId']");
const optionsId2 = () => cy.xpath("//body/div[@id='menu-optionsId']/div[3]/ul[1]/li[2]");
const twosides = () => cy.xpath("//label[3]/span[1]/input ");
const btsave = () => cy.xpath("//button[text()='บันทึก']");
const edit_submaterialdetail = () => cy.xpath("//div[@class='MuiDataGrid-row MuiDataGrid-row--lastVisible']/div[4]/div/button[1]");

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
    material().click();
    cy.wait(2000);
    submaterial().click();
    cy.wait(2000);
  });

  it.skip('Create Sub Material Detail', () => {
    create_submaterialdetail().click();
    cy.wait(2000);
    cy.task('fetchGoogleSheetData', { range: 'Sub Material Detail!E2:I5' }).then(data => {
      data.forEach((row, index) => {
        const [dtname, dtoptioncategory, dtoption, dtside, Expectedresult ] = row;

        if (dtname) {
          cy.wait(2000);
          name().clear({force: true}).type(dtname);
        } else {
          cy.wait(2000);
          name().clear({force: true});
        }
        if (dtoptioncategory){
          cy.wait(2000);
          optionsCategoryId().click();
          cy.wait(2000);
          optionsCategoryId2().click();
        }
        if (dtoption){
          cy.wait(2000);
          optionsId().click();
          cy.wait(2000);
          optionsId2().click();
        }
        if (dtside){
          cy.wait(2000);
          twosides().click();
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
              column: 'J',
              sheetName: 'Sub Material Detail'
            });
            console.log(`Updating row ${index + 2} with status Pass`);
          }
          cy.reload();
          cy.wait(2000);
          create_submaterialdetail().click();
        });
      });
    });
  });

  it.skip('Edit Sub Material Detail', () => {
    edit_submaterialdetail().click();
    cy.wait(2000);
    cy.task('fetchGoogleSheetData', { range: 'Sub Material Detail!P2:T3' }).then(data => {
      data.forEach((row, index) => {
        const [dtname, dtoptioncategory, dtoption, dtside, Expectedresult ] = row;

        if (dtname) {
          cy.wait(2000);
          name().clear({force: true}).type(dtname);
        } else {
          cy.wait(2000);
          name().clear({force: true});
        }
        if (dtoptioncategory){
          cy.wait(2000);
          optionsCategoryId().click();
          cy.wait(2000);
          optionsCategoryId2().click();
        }
        if (dtoption){
          cy.wait(2000);
          optionsId().click();
          cy.wait(2000);
          optionsId2().click();
        }
        if (dtside){
          cy.wait(2000);
          twosides().click();
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
              column: 'U',
              sheetName: 'Sub Material Detail'
            });
            console.log(`Updating row ${index + 2} with status Pass`);
          }
          cy.reload();
          cy.wait(2000);
          edit_submaterialdetail().click();
        });
      });
    });
  });
});