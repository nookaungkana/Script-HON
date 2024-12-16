import 'cypress-xpath';
import { login } from "../login.cy";
import 'cypress-file-upload';
import { faker } from '@faker-js/faker';

const Config = () => cy.xpath("//div[contains(text(),'Config')]");
//เผื่อเสีย
const quantityAllowancePercentage = () => cy.xpath("//input[@name='quantityAllowancePercentage']");
//ขนาดใบเต็ม
const itemSizeId = () => cy.xpath("//div[@id='mui-component-select-itemSizeId']");
const itemSizeId2 = () => cy.xpath("//body/div[@id='menu-itemSizeId']/div[3]/ul[1]/li[2]");
//ขนาดใบพิมพ์
const subItemSizeId = () => cy.xpath("//div[@id='mui-component-select-subItemSizeId']");
const subItemSizeId2 = () => cy.xpath("//body/div[@id='menu-subItemSizeId']/div[3]/ul[1]/li[2]");
//เพลท
const plateRawMaterialId = () => cy.xpath("//div[@id='mui-component-select-plateRawMaterialId']");
const plateRawMaterialId2 = () => cy.xpath("//body/div[@id='menu-plateRawMaterialId']/div[3]/ul[1]/li[2]");
//ไดคัท
const dieCutSubMaterialDetailId = () => cy.xpath("//div[@id='mui-component-select-dieCutSubMaterialDetailId']");
//บล๊อคไดคัท
const dieCutSubMaterialDetailId3 = () => cy.xpath("//body/div[@id='menu-dieCutSubMaterialDetailId']/div[3]/ul[1]/li[3]");
//Die-cut size
const dieCutRawMaterialId = () => cy.xpath("//div[@id='mui-component-select-dieCutRawMaterialId']");
const dieCutRawMaterialId2 = () => cy.xpath("//body/div[@id='menu-dieCutRawMaterialId']/div[3]/ul[1]/li[2]");
//ตั้งค่าโมเดล
const btsetting_model = () => cy.xpath("//div[@class='setting-model-btn-wrap']/button");
const A = () => cy.xpath("//input[@name='A']");
const B = () => cy.xpath("//input[@name='B']");
const C = () => cy.xpath("//input[@name='C']");
const dimensionWidth = () => cy.xpath("//input[@name='dimensionWidth']");
const dimensionHeight = () => cy.xpath("//input[@name='dimensionHeight']");
const btsavemodel = () => cy.xpath("//form/button");

const printfront1 = () => cy.xpath("//div[@data-test-id=\"color-front-selector-1\"]/div[2]/div[1]");
const printfront2 = () => cy.xpath("//div[@data-test-id=\"color-front-selector-2\"]/div[2]/div[1]");
const colorfront1 = () => cy.xpath("//div[@data-test-id=\"color-front-selector-1\"]/div[2]/div[2]");
const colorfront2 = () => cy.xpath("//div[@data-test-id=\"color-front-selector-2\"]/div[2]/div[2]");
const picture1 = () => cy.xpath("//div[@class='image-wrap'][1]/label/input[@type='file']");

const printback1 = () => cy.xpath("//div[@data-test-id=\"color-back-selector-1\"]/div[2]/div[1]");
const printback2 = () => cy.xpath("//div[@data-test-id=\"color-back-selector-2\"]/div[2]/div[1]");
const colorback1 = () => cy.xpath("//div[@data-test-id=\"color-back-selector-1\"]/div[2]/div[2]");
const colorback2 = () => cy.xpath("//div[@data-test-id=\"color-back-selector-2\"]/div[2]/div[2]");
const li2 = () => cy.xpath("//body[1]/div[2]/div[3]/ul[1]/li[2]");
const picture2 = () => cy.xpath("//div[@class='image-wrap'][2]/label/input[@type='file']");

const remark = () => cy.xpath("//textarea[@name='remark']");
const btsavelayout = () => cy.xpath("//div[@class='remark-section']/div/div[2]/button[2]");

describe('test', () => {
  it.skip('Step Layout K2-AJ8', () => {
    login();
    cy.wait(2000);
    cy.visit('https://app-staging.honconnect.co/orders?status=laying');
    cy.wait(2000);
    cy.xpath("//div[@class='select-text']").click();
    cy.wait(2000);
    cy.xpath("//div[contains(text(),'แสดง 100')]").click();
    cy.wait(2000);

    const clickAllButtonsInRows = (startRow) => {
      let currentRow = startRow;

      const clickButtonInRow = () => {
        const layout = `//div[@aria-rowindex='${currentRow}']/div[4]/div/button`;
        cy.xpath(layout).then(buttons => {
          if (buttons.length > 0) {
            cy.wrap(buttons[0]).click().then(() => {
              cy.wait(2000);
              Config().click();
              cy.wait(2000);

              cy.get('[data-test-id="color-front-zone"]').invoke('attr', 'data-test-color-front-quantity').then((frontQuantity) => {
                cy.get('[data-test-id="color-back-zone"]').invoke('attr', 'data-test-color-back-quantity').then((backQuantity) => {
                  const front = parseInt(frontQuantity);
                  const back = parseInt(backQuantity);

                  let rangeToFetch = '';
                  if (front === 0 && back === 0) rangeToFetch = 'Spec_step=layout!K2:AJ2';
                  else if (front === 1 && back === 0) rangeToFetch = 'Spec_step=layout!K3:AJ3';
                  else if (front === 2 && back === 0) rangeToFetch = 'Spec_step=layout!K4:AJ4';
                  else if (front === 0 && back === 1) rangeToFetch = 'Spec_step=layout!K5:AJ5';
                  else if (front === 0 && back === 2) rangeToFetch = 'Spec_step=layout!K6:AJ6';
                  else if (front === 1 && back === 1) rangeToFetch = 'Spec_step=layout!K7:AJ7';
                  else if (front === 2 && back === 2) rangeToFetch = 'Spec_step=layout!K8:AJ8';


                  // วนลูปจนกว่าจะพบค่าที่ต้องการ
                  if (rangeToFetch) {
                    cy.task('fetchGoogleSheetData', {range: rangeToFetch}).then(data => {
                      cy.log(`Data fetched: ${JSON.stringify(data)}`); // ตรวจสอบข้อมูลที่โหลดมา

                      data.forEach((row, index) => {
                        const [dtquantity, dtfull_size, dtprinting_size, dtplate, dtdie_cut, dtdie_cut_size,
                          modelset, dta, dtb, dtc, dtwidth, dtheight, savemodel,
                          dtprintfornt, dtcolorfornt1, dtprintfornt2, dtcolorfornt2, frontimage,
                          dtprintback, dtcolorback1, dtprintback2, dtcolorback2, backimage,
                          dtremark, save, Expectedresult] = row;

                        if (dtquantity) {
                          quantityAllowancePercentage().type(dtquantity);
                        }
                        if (dtfull_size) {
                          cy.wait(1000);
                          itemSizeId().click();
                          cy.wait(1000);
                          itemSizeId2().click();
                          if (dtprinting_size) {
                            cy.wait(1000);
                            subItemSizeId().click();
                            cy.wait(1000);
                            subItemSizeId2().click();
                          }
                        }
                        if (dtplate) {
                          cy.wait(1000);
                          plateRawMaterialId().click();
                          cy.wait(1000);
                          plateRawMaterialId2().click();
                        }
                        if (dtdie_cut) {
                          cy.wait(1000);
                          dieCutSubMaterialDetailId().click();
                          cy.wait(1000);
                          dieCutSubMaterialDetailId3().click();
                          if (dtdie_cut_size) {
                            cy.wait(1000);
                            dieCutRawMaterialId().click();
                            cy.wait(1000);
                            dieCutRawMaterialId2().click();
                          }
                        }
                        if (modelset) {
                          cy.wait(1000);
                          btsetting_model().click();
                          if (dta) {
                            cy.wait(1000);
                            A().clear().type(dta);
                          }
                          if (dtb) {
                            cy.wait(1000);
                            B().clear().type(dtb);
                          }
                          if (dtc) {
                            cy.wait(1000);
                            C().clear().type(dtc);
                          }
                          if (dtwidth) {
                            cy.wait(1000);
                            dimensionWidth().clear().type(dtwidth);
                          }
                          if (dtheight) {
                            cy.wait(1000);
                            dimensionHeight().clear().type(dtheight);
                          }
                          if (savemodel) {
                            cy.wait(1000);
                            btsavemodel().click();
                          }
                        }
                        if (dtprintfornt) {
                          cy.wait(1000);
                          printfront1().click();
                          cy.wait(1000);
                          li2().click();
                        }
                        if (dtcolorfornt1) {
                          cy.wait(1000);
                          colorfront1().click();
                          cy.wait(1000);
                          li2().click();
                        }
                        if (dtprintfornt2) {
                          cy.wait(1000);
                          printfront2().click();
                          cy.wait(1000);
                          li2().click();
                        }
                        if (dtcolorfornt2) {
                          cy.wait(1000);
                          colorfront2().click();
                          cy.wait(1000);
                          li2().click();
                        }
                        if (frontimage) {
                          const fileName = 'frontimage.jpg';
                          cy.task('downloadFile', {url: frontimage, fileName}).then((filePath) => {
                            picture1().attachFile(fileName);
                          });
                        }
                        if (dtprintback) {
                          cy.wait(1000);
                          printback1().click();
                          cy.wait(1000);
                          li2().click();
                        }
                        if (dtcolorback1) {
                          cy.wait(1000);
                          colorback1().click();
                          cy.wait(1000);
                          li2().click();
                        }
                        if (dtprintback2) {
                          cy.wait(1000);
                          printback2().click();
                          cy.wait(1000);
                          li2().click();
                        }
                        if (dtcolorback2) {
                          cy.wait(1000);
                          colorback2().click();
                          cy.wait(1000);
                          li2().click();
                        }
                        if (backimage) {
                          const fileName = 'backimage.jpg';
                          cy.task('downloadFile', {url: backimage, fileName}).then((filePath) => {
                            picture2().attachFile(fileName);
                          });
                        }
                        if (dtremark) {
                          cy.wait(1000);
                          remark().type(dtremark);
                        }
                        if (save) {
                          btsavelayout().click();
                        }

                        cy.contains(Expectedresult).then(($alert) => {
                          if ($alert.length > 0) {
                            cy.log('Alert matches expected message');
                            cy.task('updateStatus', {
                              row: rangeToFetch,
                              status: 'Pass',
                              column: 'AK',
                              sheetName: 'Spec_step=layout'
                            });
                            console.log(`Updating row ${index + 2} with status Pass`);
                          }
                        });
                      });
                    });
                  }
                  cy.visit('https://app-staging.honconnect.co/orders?status=laying');
                  cy.wait(2000);
                  cy.xpath("//div[@class='select-text']").click();
                  cy.wait(2000);
                  cy.xpath("//div[contains(text(),'แสดง 100')]").click();
                  cy.wait(2000);

                  currentRow++;
                  clickButtonInRow();
                });
              });
            });
          } else {
            cy.log(`ไม่พบปุ่มในแถวที่ ${currentRow}`);
            currentRow++;
            if (currentRow <= 100) {  // ตั้งค่าขอบเขตของแถว
              clickButtonInRow();
            }
          }
        });
      };
      clickButtonInRow(); // เริ่มการคลิกปุ่ม
    };
    clickAllButtonsInRows(2);
  });
  it.skip('Layout K9-AJ31', () => {
    login();
    cy.wait(2000);
    cy.visit('https://app-staging.honconnect.co/orders?status=laying');
    cy.wait(2000);
    cy.xpath("//div[@class='select-text']").click();
    cy.wait(2000);
    cy.xpath("//div[contains(text(),'แสดง 100')]").click();
    cy.wait(2000);

    // ฟังก์ชันสำหรับคลิกปุ่มในแต่ละแถว
    const clickButtonInRow = (currentRow, startRow = 9) => {
      const layout = `//div[@aria-rowindex='${currentRow}']/div[4]/div/button`;
      cy.xpath(layout).then(buttons => {
        if (buttons.length > 0) {
          cy.wrap(buttons[0]).click().then(() => {
            cy.wait(2000);
            Config().click();
            cy.wait(2000);

            cy.get('[data-test-id="color-front-zone"]').invoke('attr', 'data-test-color-front-quantity').then((frontQuantity) => {
              cy.get('[data-test-id="color-back-zone"]').invoke('attr', 'data-test-color-back-quantity').then((backQuantity) => {
                const front = parseInt(frontQuantity);
                const back = parseInt(backQuantity);

                for (let i = startRow; i <= 32; i++) {
                  let rangeToFetch = `Spec_step=layout!K${i}:AJ${i}`;

                  if (front !== 2 || back !== 2) {
                    cy.visit('https://app-staging.honconnect.co/orders?status=laying');
                    cy.wait(2000);
                    cy.xpath("//div[@class='select-text']").click();
                    cy.wait(2000);
                    cy.xpath("//div[contains(text(),'แสดง 100')]").click();
                    cy.wait(2000);
                    clickButtonInRow(currentRow + 1, startRow);
                    break; // หยุดการทำงานในกรณีที่ไม่ตรงตามเงื่อนไข
                  } else {
                    cy.task('fetchGoogleSheetData', { range: rangeToFetch }).then(data => {
                      data.forEach((row) => {
                        // ดำเนินการกับข้อมูลใน Google Sheet
                        const [dtquantity, dtfull_size, dtprinting_size, dtplate, dtdie_cut, dtdie_cut_size,
                          modelset, dta, dtb, dtc, dtwidth, dtheight, savemodel,
                          dtprintfornt, dtcolorfornt1, dtprintfornt2, dtcolorfornt2, frontimage,
                          dtprintback, dtcolorback1, dtprintback2, dtcolorback2, backimage,
                          dtremark, save, Expectedresult] = row;

                        if (dtquantity) {
                          quantityAllowancePercentage().type(dtquantity);
                        } else {
                          quantityAllowancePercentage().clear();
                        }
                        if (dtfull_size) {
                          cy.wait(1000);
                          itemSizeId().click();
                          cy.wait(1000);
                          itemSizeId2().click();
                          if (dtprinting_size) {
                            cy.wait(1000);
                            subItemSizeId().click();
                            cy.wait(1000);
                            subItemSizeId2().click();
                          }
                        }
                        if (dtplate) {
                          cy.wait(1000);
                          plateRawMaterialId().click();
                          cy.wait(1000);
                          plateRawMaterialId2().click();
                        }
                        if (dtdie_cut) {
                          cy.wait(1000);
                          dieCutSubMaterialDetailId().click();
                          cy.wait(1000);
                          dieCutSubMaterialDetailId3().click();
                          if (dtdie_cut_size) {
                            cy.wait(1000);
                            dieCutRawMaterialId().click();
                            cy.wait(1000);
                            dieCutRawMaterialId2().click();
                          }
                        }
                        if (modelset) {
                          cy.wait(1000);
                          btsetting_model().click();
                          if (dta) {
                            cy.wait(1000);
                            A().clear().type(dta);
                          } else {
                            cy.wait(1000);
                            A().clear();
                          }
                          if (dtb) {
                            cy.wait(1000);
                            B().clear().type(dtb);
                          } else {
                            cy.wait(1000);
                            B().clear();
                          }
                          if (dtc) {
                            cy.wait(1000);
                            C().clear().type(dtc);
                          } else {
                            cy.wait(1000);
                            C().clear();
                          }
                          if (dtwidth) {
                            cy.wait(1000);
                            dimensionWidth().clear().type(dtwidth);
                          } else {
                            dimensionWidth().clear();
                          }
                          if (dtheight) {
                            cy.wait(1000);
                            dimensionHeight().clear().type(dtheight);
                          } else {
                            dimensionHeight().clear();
                          }
                          if (savemodel) {
                            cy.wait(1000);
                            btsavemodel().click();
                          }
                        }
                        if (dtprintfornt) {
                          cy.wait(1000);
                          printfront1().click();
                          cy.wait(1000);
                          li2().click();
                        }
                        if (dtcolorfornt1) {
                          cy.wait(1000);
                          colorfront1().click();
                          cy.wait(1000);
                          li2().click();
                        }
                        if (dtprintfornt2) {
                          cy.wait(1000);
                          printfront2().click();
                          cy.wait(1000);
                          li2().click();
                        }
                        if (dtcolorfornt2) {
                          cy.wait(1000);
                          colorfront2().click();
                          cy.wait(1000);
                          li2().click();
                        }
                        if (frontimage) {
                          const fileName = 'frontimage.jpg';
                          cy.task('downloadFile', { url: frontimage, fileName }).then(() => {
                            picture1().attachFile(fileName);
                          });
                        }
                        if (dtprintback) {
                          cy.wait(1000);
                          printback1().click();
                          cy.wait(1000);
                          li2().click();
                        }
                        if (dtcolorback1) {
                          cy.wait(1000);
                          colorback1().click();
                          cy.wait(1000);
                          li2().click();
                        }
                        if (dtprintback2) {
                          cy.wait(1000);
                          printback2().click();
                          cy.wait(1000);
                          li2().click();
                        }
                        if (dtcolorback2) {
                          cy.wait(1000);
                          colorback2().click();
                          cy.wait(1000);
                          li2().click();
                        }
                        if (backimage) {
                          const fileName = 'backimage.jpg';
                          cy.task('downloadFile', { url: backimage, fileName }).then(() => {
                            picture2().attachFile(fileName);
                          });
                        }
                        if (dtremark) {
                          cy.wait(1000);
                          remark().type(dtremark);
                        }
                        if (save) {
                          btsavelayout().click();
                        }
                        cy.wait(2000);
                        // ตรวจสอบค่าที่ต้องการ
                        cy.contains(Expectedresult).then(($alert) => {
                          if ($alert.length > 0) {
                            cy.log('Alert matches expected message');
                            cy.task('updateStatus', {
                              row: startRow, // เริ่มที่แถว 29
                              status: 'Pass',
                              column: 'AK',
                              sheetName: 'Spec_step=layout'
                            });
                            if (Expectedresult === 'สร้างใบพิมพ์สำเร็จ') {
                              cy.wait(2000);
                              cy.xpath("//div[contains(text(),'ยืนยันเลย์เอาท์')]").click();
                              cy.wait(2000);
                              cy.xpath("//form[1]/div[4]/button[2]").click();
                              cy.wait(2000);
                              cy.visit('https://app-staging.honconnect.co/orders?status=laying');
                              cy.wait(2000);
                              cy.xpath("//div[@class='select-text']").click();
                              cy.wait(2000);
                              cy.xpath("//div[contains(text(),'แสดง 100')]").click();
                              cy.wait(2000);
                              clickButtonInRow(currentRow + 1, i + 1); // เรียกใช้งานแถวถัดไป
                            } else {
                              cy.reload();
                              cy.wait(2000);
                              Config().click();
                            }
                          }
                        });
                      });
                    });
                  }
                }
              });
            });
          });
        } else {
          cy.log(`ไม่พบปุ่มในแถวที่ ${currentRow}`);
        }
      });
    };

    // เริ่มการคลิกปุ่มจากแถว 2
    clickButtonInRow(2);
  });

});





