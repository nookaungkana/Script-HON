import 'cypress-xpath';
import { login } from "../login.cy";
import 'cypress-file-upload';

const create_master_component = () => cy.xpath("//div[contains(text(),'สร้าง Master Component')]");
const masterId = () => cy.xpath("//div[@id='mui-component-select-configComponentRequest.0.masterId']");
const masterId_last = () => cy.xpath("//body/div[@id='menu-configComponentRequest.0.masterId']/div[3]/ul[1]/li[last()]");
const componentIds = () => cy.xpath("//div[@id='mui-component-select-configComponentRequest.0.componentIds']");
const componentIds_last = () => cy.xpath("//body/div[@id='menu-configComponentRequest.0.componentIds']/div[3]/ul[1]/li[3]");
const btsave = () => cy.xpath("//button[text()='บันทึก']");

describe('Function Master', () => {
  beforeEach(() => {
    login();
    cy.wait(2000);
    cy.visit('https://app-staging.honconnect.co/stock/master/component');
    cy.wait(2000);
  });
  it.skip('Create Master Component', () => {
    create_master_component().click();
    cy.wait(2000);
    cy.task('fetchGoogleSheetData', { range: 'Master Component!E2:G4' }).then(data => {
      data.forEach((row, index) => {
        const [dtmaster, dtcomponent, Expectedresult] = row;

        if(dtmaster){
          cy.wait(2000);
          masterId().click();
          cy.wait(2000);
          masterId_last().click();
        }
        if(dtcomponent){
          cy.wait(2000);
          componentIds().click();
          cy.wait(2000);
          componentIds_last().click();
          cy.wait(2000);
          cy.xpath("//body/div[2]").click({ force: true });
        }
        btsave().click({ force: true });
        cy.wait(2000);

        cy.contains(Expectedresult).then(($alert) => {
          if ($alert.length > 0) {
            cy.log('Alert matches expected message');
            cy.task('updateStatus', {
              row: index + 2,
              status: 'Pass',
              column: 'H',
              sheetName: 'Master Component'
            });
            console.log(`Updating row ${index + 2} with status Pass`);
          }
          cy.reload();
          cy.wait(2000);
          create_master_component().click();
        });
      });
    });
  });
});