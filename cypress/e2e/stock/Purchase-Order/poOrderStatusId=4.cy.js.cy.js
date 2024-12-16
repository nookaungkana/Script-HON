import 'cypress-xpath';
import { login } from "../../login.cy";
import 'cypress-file-upload';

const detail_status4 = () => cy.xpath("//div[@class='MuiDataGrid-row'][1]/div[7]/div/button");
const stockin = () => cy.xpath("//div[@aria-label='นำสินค้าเข้าคลัง']");
const paymentAmount = () => cy.xpath("//input[@name='paymentAmount']");
const image = () => cy.xpath("//input[@type='file']");
const bt_stockin = () => cy.xpath("//form[1]/div[3]/button[1]");
const btcf_stockin = () => cy.xpath("//div[@class='submit-btn-wrap']/div[2]/button");
const btcf = () => cy.xpath("//form[1]/div[4]/button[2]");

describe('Function Purchase-Order', () => {
    beforeEach(() => {
        login();
        cy.wait(2000);
        cy.visit('https://app-staging.honconnect.co/stock/purchase-order?poOrderStatusId=4');
        cy.wait(2000);
    });
    it('poOrderStatusId=4', () => {
        detail_status4().click();
        cy.wait(2000);

        cy.task('fetchGoogleSheetData', { range: 'poOrderStatusId=4!E2:J4' }).then(data => {
            data.forEach((row, index) => {
                const [E, F, G, H, I, ExpectedAlertMessage] = row;

                if(E){
                    cy.wait(2000);
                    stockin().click();
                    if(F){
                        cy.wait(2000);
                        paymentAmount().type(F);
                    }
                    if(G){
                        const fileName = 'stockin.jpg';
                        cy.task('downloadFile', { url: G, fileName }).then((filePath) => {
                            image().attachFile(fileName);
                        });
                        cy.wait(2000);
                    }
                    if(H){
                        bt_stockin().click();
                    }
                }
                if(I){
                    cy.wait(2000);
                    btcf_stockin().click();
                    cy.wait(2000);
                    btcf().click();
                }

                cy.contains(ExpectedAlertMessage).then(($element) => {
                    if ($element.length > 0) {
                        cy.log('Alert matches expected message');
                        cy.task('updateStatus', {
                            row: index + 2,
                            status: 'Pass',
                            column: 'K',
                            sheetName: 'poOrderStatusId=4'
                        });
                        cy.log(`Updating row ${index + 2} with status Pass`);
                    }
                    cy.visit('https://app-staging.honconnect.co/stock/purchase-order?poOrderStatusId=4');
                    cy.wait(2000);
                    detail_status4().click();
                    cy.wait(2000);
                });
            });
        });
    });
});