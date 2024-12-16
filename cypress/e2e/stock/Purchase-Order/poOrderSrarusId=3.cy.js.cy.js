import 'cypress-xpath';
import { login } from "../../login.cy";
import 'cypress-file-upload';

const detail_status3 = () => cy.xpath("//div[@class='MuiDataGrid-row'][1]/div[7]/div/button");
const add_payment = () => cy.xpath("//div[contains(text(),'เพิ่มการชำระเงิน')]");
const paymentAmount = () => cy.xpath("//input[@name='paymentAmount']");
const remark = () => cy.xpath("//input[@name='remark']");
const image = () => cy.xpath("//input[@type='file']");
const btcf_payment = () => cy.xpath("//form[1]/div[4]/button[1]");
const Stock_In = () => cy.xpath("//span[contains(text(),'นำสินค้าเข้าคลัง')]");
const btcf_stockin = () => cy.xpath("//form[1]/div[4]/button[2]");

describe('Function Purchase-Order', () => {
  beforeEach(() => {
    login();
    cy.wait(2000);
    cy.visit('https://app-staging.honconnect.co/stock/purchase-order?poOrderStatusId=3');
    cy.wait(2000);
  });

  it('poOrderStatusId=3', () => {
    detail_status3().click();
    cy.wait(2000);

    cy.task('fetchGoogleSheetData', { range: 'poOrderStatusId=3!E2:K6' }).then(data => {
      data.forEach((row, index) => {
        const [E, F, G, H, I, J, ExpectedAlertMessage] = row;

        if(E){
          cy.wait(2000);
          add_payment().click();
          if(F){
            cy.wait(2000);
            paymentAmount().type(F);
          }
          if(G){
            cy.wait(2000);
            remark().type(G);
          }
          if(H){
            const fileName = 'slip_payment.jpg';
            cy.task('downloadFile', { url: H, fileName }).then((filePath) => {
              image().attachFile(fileName);
            });
            cy.wait(2000);
          }
          if(I){
            btcf_payment().click();
          }
        }
        if(J){
          cy.wait(2000);
          Stock_In().click();
          cy.wait(2000);
          btcf_stockin().click();
        }

        cy.contains(ExpectedAlertMessage).then(($element) => {
          if ($element.length > 0) {
            cy.log('Alert matches expected message');
            cy.task('updateStatus', {
              row: index + 2,
              status: 'Pass',
              column: 'L',
              sheetName: 'poOrderStatusId=3'
            });
            cy.log(`Updating row ${index + 2} with status Pass`);
          }
          cy.visit('https://app-staging.honconnect.co/stock/purchase-order?poOrderStatusId=3');
          cy.wait(2000);
          detail_status3().click();
          cy.wait(2000);
        });
      });
    });
  });
});