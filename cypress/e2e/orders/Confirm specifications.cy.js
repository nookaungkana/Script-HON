import 'cypress-xpath';
import { login } from "../login.cy";
import 'cypress-file-upload';

const specproduct = () => cy.xpath("//div[@class='MuiDataGrid-row'][1]/div[4]/div/button");
const cf_spec = () => cy.xpath("//div[contains(text(),'ยืนยันสเปค')]");
const expireDay = () => cy.xpath("//input[@name='expireDay']");
const creditDay = () => cy.xpath("//div[@id='mui-component-select-creditDay']");
const creditDayli2 = () => cy.xpath("//body/div[@id='menu-creditDay']/div[3]/ul[1]/li[2]");
const btsave = () => cy.xpath("//button[text()='บันทึก']");

describe('Function Confirm specifications', () => {
  beforeEach(() => {
    login();
    cy.wait(2000);
    cy.visit('https://app-staging.honconnect.co/orders');
    cy.wait(2000);
  });

  it.skip('Confirm specifications', () => {
    cy.wait(2000);
    specproduct().click();
    cy.wait(2000);
    cf_spec().click();

    cy.task('fetchGoogleSheetData', { range: 'Confirm specifications!F2:H4' }).then(data => {
      data.forEach((row, index) => {
        const [dtexpireDay, dtcreditDay, Expectedresult ] = row;

        if(dtexpireDay){
          cy.wait(2000);
          expireDay().type(dtexpireDay);
        }
        if(dtcreditDay){
          cy.wait(2000);
          creditDay().click();
          cy.wait(2000);
          creditDayli2().click();
        }
        cy.wait(2000);
        btsave().click();

        cy.contains(Expectedresult).then(($alert) => {
          if ($alert.length > 0) {
            cy.log('Alert matches expected message');
            cy.task('updateStatus', {
              row: index + 2,
              status: 'Pass',
              column: 'I',
              sheetName: 'Confirm specifications'
            });
            console.log(`Updating row ${index + 2} with status Pass`);
          }
          if (Expectedresult === 'บันทึกการตั้งค่าออร์เดอร์สำเร็จ') {
            cy.wait(2000);
            cf_spec().click();
            cy.wait(2000);
            cy.xpath("//form[1]/div[4]/button[2]").click();
            cy.wait(2000);
            cy.visit('https://app-staging.honconnect.co/orders');
            cy.wait(2000);
            specproduct().click();
            cy.wait(2000);
            cf_spec().click();
          }else {
            cy.reload();
            cy.wait(2000);
            cf_spec().click();
          }
        });
      });
    });
  });

  it('test1', () => {
    const clickAllButtonsInRows = (startRow) => {
      let currentRow = startRow;

      const clickButtonInRow = () => {
        const layout = `//div[@aria-rowindex='${currentRow}']/div[4]/div/button`;

        cy.xpath(layout, { timeout: 10000 }).then(buttons => {
          // ตรวจสอบว่าพบปุ่มหรือไม่
          if (buttons.length > 0) {
            cy.wrap(buttons[0]).click().then(() => {
              cy.wait(2000);

              // เช็คว่าปุ่มที่ต้องการกดกดได้หรือไม่
              cy.xpath('//div[@class="action-wrap"]/div[1]/button', { timeout: 10000 })
                  .then($button => {
                    // ตรวจสอบว่าปุ่มมีอยู่และไม่ถูกปิดการใช้งาน
                    if ($button.length > 0 && !$button.prop('disabled')) {
                      // ถ้าปุ่มสามารถคลิกได้
                      cy.log('ปุ่มสามารถคลิกได้');

                      // ทำการดำเนินการที่คุณต้องการที่นี่
                      cf_spec().click();
                      cy.wait(2000);
                      expireDay().type('15'); // กรอกวันที่หมดอายุ
                      cy.wait(2000);
                      creditDay().click(); // คลิกเลือกเครดิตวัน
                      cy.wait(2000);
                      creditDayli2().click(); // คลิกเลือกเครดิตวันล่วงหน้า
                      cy.wait(2000);
                      btsave().click(); // คลิกบันทึก
                      cy.wait(4000);

                      cy.visit('https://app-staging.honconnect.co/orders'); // ไปยังหน้า orders
                      cy.wait(2000);
                      // ไปยังแถวถัดไป
                      currentRow++;
                      clickButtonInRow();
                    } else {
                      // ถ้าปุ่มไม่สามารถคลิกได้หรือถูกปิดการใช้งาน
                      cy.log('ปุ่มไม่สามารถกดได้หรือถูกปิดการใช้งาน');
                      cy.visit('https://app-staging.honconnect.co/orders'); // ไปยังหน้า orders
                      cy.wait(2000);
                      currentRow++; // เพิ่มหมายเลขแถว
                      clickButtonInRow(); // คลิกปุ่มในแถวถัดไป
                    }
                  });
            });
          }
        });
      };

      clickButtonInRow(); // เริ่มต้นการคลิกปุ่ม
    };

    // เรียกใช้ฟังก์ชันด้วยแถวเริ่มต้นที่ 2
    clickAllButtonsInRows(2);
  });




});
