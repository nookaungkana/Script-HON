import 'cypress-xpath';
import { login } from "../login.cy";
import 'cypress-file-upload';

const create_formula = () => cy.xpath("//div[contains(text(),'สร้างสูตร')]");
const optionsCategoryId = () => cy.xpath("//div[@id='mui-component-select-optionsCategoryId']")
const optionsCategoryId_last = () => cy.xpath("//body/div[@id='menu-optionsCategoryId']/div[3]/ul[1]/li[last()]");
const optionsCategoryId1 = () => cy.xpath("//body/div[@id='menu-optionsCategoryId']/div[3]/ul[1]/li[1]");
const optionsId = () => cy.xpath("//div[@id='mui-component-select-optionsId']");
const optionsId_last = () => cy.xpath("//body/div[@id='menu-optionsId']/div[3]/ul[1]/li[1]");

const type1 = () => cy.xpath("//div[contains(text(),'(')]");
//ตัวแปร
const type2 = () => cy.xpath("//div[@class=\"config-type-wrap\"]/div");
const type3 = () => cy.xpath("//div[contains(text(),'*')]");
const type4 = () => cy.xpath("//div[@class=\"pad-wrap\"]/div[13]");
const type5 = () => cy.xpath("//div[@class=\"pad-wrap\"]/div[17]");
const type6 = () => cy.xpath("//div[contains(text(),')')]");
const btsave = () => cy.xpath("//button[text()='บันทึก']");
const pagetwo = () => cy.xpath("//nav/ul/li[3]");
const edit_formula = () => cy.xpath("//div[@class='MuiDataGrid-row MuiDataGrid-row--lastVisible']/div[3]/div/button[2]");

describe('Function Formula', () => {
  beforeEach(() => {
    login();
    cy.wait(2000);
    cy.visit('https://app-staging.honconnect.co/company/formula/list');
    cy.wait(2000);
  });

  it.skip('Create Formula', () => {
    create_formula().click();
    cy.wait(2000);
    cy.task('fetchGoogleSheetData', { range: 'Formula!E2:H5' }).then(data => {
      data.forEach((row, index) => {
        const [dtoptioncategory, dtoption, dtformula, Expectedresult] = row;

        if (dtoptioncategory) {
          cy.wait(2000);
          optionsCategoryId().click();
          cy.wait(2000);
          optionsCategoryId_last().click();
        }
        if (dtoption) {
          cy.wait(2000);
          optionsId().click();
          cy.wait(2000);
          optionsId_last().click();
        }
        if (dtformula) {
          cy.wait(2000);
          type1().click();
          cy.wait(2000);
          type2().click();
          cy.wait(2000);
          type3().click();
          cy.wait(2000);
          type4().click();
          cy.wait(2000);
          type5().click();
          cy.wait(2000);
          type6().click();
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
              sheetName: 'Formula'
            });
            console.log(`Updating row ${index + 2} with status Pass`);
          }
          if (Expectedresult === 'สร้างสูตรสำเสร็จ') {
            cy.reload();
            cy.wait(2000);
            create_formula().click();
          }else {
            cy.reload();
            cy.wait(2000);
          }
        });
      });
    });
  });
  it.skip('Edit Formula', () => {
    pagetwo().click();
    cy.wait(2000);
    edit_formula().click();
    cy.wait(2000);
    cy.task('fetchGoogleSheetData', { range: 'Formula!O2:R4' }).then(data => {
      data.forEach((row, index) => {
        const [dtoptioncategory, dtoption, dtformula, Expectedresult] = row;

        if (dtoptioncategory) {
          cy.wait(2000);
          optionsCategoryId().click();
          cy.wait(2000);
          optionsCategoryId1().click();
        }
        if (dtoption) {
          cy.wait(2000);
          optionsId().click();
          cy.wait(2000);
          optionsId_last().click();
        }
        if (dtformula) {
          cy.wait(2000);
          type1().click();
          cy.wait(2000);
          type2().click();
          cy.wait(2000);
          type3().click();
          cy.wait(2000);
          type4().click();
          cy.wait(2000);
          type5().click();
          cy.wait(2000);
          type6().click();
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
              sheetName: 'Formula'
            });
            console.log(`Updating row ${index + 2} with status Pass`);
          }
          if (Expectedresult === 'แก้ไขสูตรสำเสร็จ') {
            cy.reload();
            cy.wait(2000);
            pagetwo().click();
            cy.wait(2000);
            edit_formula().click();
          }else {
            cy.reload();
            cy.wait(2000);
          }
        });
      });
    });
  });
});


