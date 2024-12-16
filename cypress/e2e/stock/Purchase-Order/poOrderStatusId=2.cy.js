import 'cypress-xpath';
import { login } from "../../login.cy";
import 'cypress-file-upload';

const detail_status2 = () => cy.xpath("//div[@class='MuiDataGrid-row'][1]/div[7]/div/button");
const Approve = () => cy.xpath("//div[@class='submit-btn-wrap']/div/button");
const action_wrap = () => cy.xpath("//div[@class='action-wrap']/div[2]/button");
const Return = () => cy.xpath("//body/div[2]/div[3]/ul[1]/li[1]/div[1]");
const Cancel = () => cy.xpath("//body/div[2]/div[3]/ul[1]/li[4]/div[1]");

describe('Function Purchase-Order', () => {
  beforeEach(() => {
    login();
    cy.wait(2000);
    cy.visit('https://app-staging.honconnect.co/stock/purchase-order?poOrderStatusId=2');
    cy.wait(2000);
  });

  it.skip('poOrderStatusId=2', () => {
    detail_status2().click();
    cy.wait(2000);

    cy.task('fetchGoogleSheetData', { range: 'poOrderStatusId=2!E2:I5' }).then(data => {
      data.forEach((row, index) => {
        const [dtApprove, dtReturn, dtCancel, dtreason, ExpectedAlertMessage] = row;

        if (dtApprove){
          cy.wait(2000);
          Approve().click({ force: true });
          cy.wait(2000);
          cy.xpath("//form[1]/div[4]/button[2]").click({ force: true });
        }
        if (dtReturn){
          cy.wait(2000);
          action_wrap().click({ force: true });
          cy.wait(2000);
          Return().click({ force: true });
        }
        if (dtCancel){
          cy.wait(2000);
          action_wrap().click({ force: true });
          cy.wait(2000);
          Cancel().click({ force: true });

          if (dtreason){
            cy.wait(2000);
            cy.xpath("//textarea[@name='reason']").type('ยกเลิกรายการสั่งซื้อ');
          }
          cy.wait(2000);
          cy.xpath("//form[1]/div[5]/button[2]").click({ force: true });
        }

        cy.contains(ExpectedAlertMessage).then(($element) => {
          if ($element.length > 0) {
            cy.log('Alert matches expected message');
            cy.task('updateStatus', {
              row: index + 2,
              status: 'Pass',
              column: 'J',
              sheetName: 'poOrderStatusId=2'
            });
            cy.log(`Updating row ${index + 2} with status Pass`);
          }
          cy.visit('https://app-staging.honconnect.co/stock/purchase-order?poOrderStatusId=2');
          cy.wait(2000);
          detail_status2().click();
          cy.wait(2000);
        });
      });
    });
  });
});