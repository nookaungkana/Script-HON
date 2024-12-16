import 'cypress-xpath';
import { login } from "../login.cy";
import 'cypress-file-upload';

const category_type = () => cy.xpath("//div[@class='MuiDataGrid-row MuiDataGrid-row--lastVisible']/div[3]/div/button[1]");
const preset = () => cy.xpath("//div[@class='MuiDataGrid-row MuiDataGrid-row--lastVisible']/div[4]/div/button[1]");
const create_preset = () => cy.xpath("//div[contains(text(),'สร้างพรีเซ็ต')]");
const name = () => cy.xpath("//input[@name='name']");
const value0 = () => cy.xpath("//input[@name='values.0.value']");
const btsave = () => cy.xpath("//button[text()='บันทึก']");

describe('Function Preset', () => {
  beforeEach(() => {
    login();
    cy.wait(2000);
    cy.visit('https://app-staging.honconnect.co/company/formula/category');
    cy.wait(2000);
    category_type().click();
    cy.wait(2000);
    preset().click();
  });

  it('Create Preset', () => {
    create_preset().click();
    cy.wait(2000);
    cy.task('fetchGoogleSheetData', { range: 'Preset!E2:G4' }).then(data => {
      data.forEach((row, index) => {
        const [dtname, dtvalue0, Expectedresult] = row;

        if (dtname) {
          cy.wait(2000);
          name().clear({ force: true }).type(dtname);
        } else {
          cy.wait(2000);
          name().clear({ force: true });
        }
        if (dtvalue0) {
          cy.wait(2000);
          value0().clear({ force: true }).type(dtvalue0);
        } else {
          cy.wait(2000);
          value0().clear({ force: true });
        }
        btsave().click();
        cy.wait(2000);

        cy.contains(Expectedresult).then(($alert) => {
          if ($alert.length > 0) {
            cy.log('Alert matches expected message');
            cy.task('updateStatus', {
              row: index + 2,
              status: 'Pass',
              column: 'H',
              sheetName: 'Preset'
            });
            console.log(`Updating row ${index + 2} with status Pass`);
          }
          cy.reload();
          cy.wait(2000);
          create_preset().click();
        });
      });
    });
  });
});



