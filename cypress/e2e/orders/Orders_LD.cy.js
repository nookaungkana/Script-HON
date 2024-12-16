import 'cypress-xpath';
import { login } from "../login.cy";
import 'cypress-file-upload';

const create_order = () => cy.xpath("//div[contains(text(),'สร้างใหม่')]");
const contact = () => cy.xpath("//div[@class='contact-item-wrap']/div[1]");
const product = () => cy.xpath("//div[@class='product-grid']/div[2]/div[1]");
const model = () => cy.xpath("//div[@class='product-grid model']/div[1]/div[1]");
const bt_createLD = () => cy.xpath("//form[1]/div[1]/div[1]/button[1]");

const specproduct = () => cy.xpath("//div[@class='MuiDataGrid-row'][1]/div[4]/div/button");
const bt_editLD = () => cy.xpath("//div[@class='ld-list']/div/div[2]/button");

const width = () => cy.xpath("//input[@name='width']");
const height = () => cy.xpath("//input[@name='height']");
const length = () => cy.xpath("//input[@name='length']");
//จำนววนผลิต
const quantity = () => cy.xpath("//input[@name='quantity']");
//Base Material
const base_material = () => cy.xpath("//div[@class='sc-eaa398b4-0 eRSXrm']/div[1]");
//Parts
const parts = () => cy.xpath("//div[@class='data-item'][1]/div[2]/div/div/input");
//กรณีไม่พิมพ์
const noprint = () => cy.xpath("//div[@class='data-item '][1]");
//ด้านพิมพ์ ด้านหน้า
const print_sidefront = () => cy.xpath("//div[@class='data-item '][2]");
//ด้านพิมพ์ ด้านหลัง
const print_sideback = () => cy.xpath("//div[@class='data-item '][3]");
//ด้านพิมพ์ ด้านหน้า/หลัง
const print_sidetwo = () => cy.xpath("//div[@class='data-item '][4]");
//print
const print = () => cy.xpath("//div[contains(text(),'กรุณาเลือก')]");
const printli2 = () => cy.xpath("//body/div[@id='menu-']/div[3]/ul[1]/li[2]");

//สีด้านหน้า ด้านหลัง
const color_front = () => cy.xpath("//div[@data-test-color-side='front']/div");
const color_black = () => cy.xpath("//div[@data-test-color-side='back']/div");
const color1 = () => cy.xpath("//body[1]/div[2]/div[3]/ul[1]/li[2]");
const color2 = () => cy.xpath("//body[1]/div[2]/div[3]/ul[1]/li[3]");
const body = () => cy.xpath("//body/div[@id='menu-']/div[1]");
//เคลือบก่อนพิมพ์
const coating_fornt = () => cy.xpath("//div[@data-test-coating-side=\"front\" and @data-test-coating-before-print=\"true\"]/div[2]");
const coating_back = () => cy.xpath("//div[@data-test-coating-side=\"back\" and @data-test-coating-before-print=\"true\"]/div[2]");
//ตัวอย่างสินค้า
const product_sample = () => cy.xpath("//div[@class='sc-c9d30fea-0 iCOPuo']/div[1]");
//หมายเหตุ
const remark = () => cy.xpath("//textarea[@name='description']");

//เทคนิคพิเศษ
const special_technique = () => cy.xpath("//button[text()='เทคนิคพิเศษ']");
//เคลือบผิวหลังพิมพ์
const aftercoating_fornt = () => cy.xpath("//div[@data-test-coating-side=\"front\" and @data-test-coating-before-print=\"false\"]/div[2]");
const aftercoating_back = () => cy.xpath("//div[@data-test-coating-side=\"back\" and @data-test-coating-before-print=\"false\"]/div[2]");

//เพิ่มเทคนิคพิเศษ
const addspecial_technique = () => cy.xpath("//div[@class='add-card']/div[1]");
const embossing = () => cy.xpath("//div[@class='item-wrap']/div");
const blogSubMaterialDetailId = () => cy.xpath("//div[@id='mui-component-select-blogSubMaterialDetailId']");
const blogSubMaterialDetailId2 = () => cy.xpath("//body/div[@id='menu-blogSubMaterialDetailId']/div[3]/ul[1]/li[2]");
const amount = () => cy.xpath("//input[@name='amount']");
const width2 = () => cy.xpath("//input[@placeholder='กว้าง']");
const height2 = () => cy.xpath("//input[@placeholder='สูง']");
const btadd = () => cy.xpath("//button[text()='เพิ่ม']");

const note = () => cy.xpath("//textarea[@name='note']");
//ออกแบบ
const redesign_artwork = () => cy.xpath("//p[contains(text(),'ออกแบบอาร์ตเวิร์คใหม่')]");
const btsavespec = () => cy.xpath("//button[text()='บันทึกสเปค']");

describe('Function Orders', () => {
    beforeEach(() => {
        login();
        cy.wait(2000);
        cy.visit('https://app-staging.honconnect.co/orders');
        cy.wait(2000);
    });

    it('Create Spec LD', () => {
        cy.wait(2000);
        create_order().click();
        cy.wait(2000);
        contact().click();
        cy.wait(2000);
        product().click();
        cy.wait(2000);
        model().click();
        cy.wait(2000);
        bt_createLD().click();
        cy.wait(4000);
        specproduct().click();
        cy.wait(2000);
        bt_editLD().click();

        cy.task('fetchGoogleSheetData', { range: 'spec LD!E2:AG12' }).then(data => {
            data.forEach((row, index) => {
                const [E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z,
                    AA, AB, AC, AD, AE, AF, ExpectedAlertMessage] = row;

                //width,height,length
                if(E){
                    cy.wait(2000);
                    width().clear().type(E);
                }
                if(F){
                    cy.wait(2000);
                    height().clear().type(F);
                }
                if(G){
                    cy.wait(2000);
                    length().clear().type(G);
                }
                if(H){
                    cy.wait(2000);
                    quantity().clear().type(H);
                }
                if(I){
                    cy.wait(2000);
                    base_material().click();
                    if(K === 'ไม่พิมพ์') {
                        cy.wait(2000);
                        noprint().click();
                    }else if(K === 'ด้านหน้า'){
                        cy.wait(2000);
                        print_sidefront().click();
                    }else if(K === 'ด้านหลัง'){
                        cy.wait(2000);
                        print_sideback().click();
                    }else if(K === 'ด้านหน้า/ด้านหลัง'){
                        cy.wait(2000);
                        print_sidetwo().click();
                    }
                    if(L){
                        cy.wait(2000);
                        print().click();
                        cy.wait(2000);
                        printli2().click();
                    }
                    if(M === 'CMYK,pantone'){
                        cy.wait(2000);
                        color_front().click();
                        cy.wait(2000);
                        color1().click();
                        color2().click();
                        cy.wait(2000);
                        body().click();
                    }else if(M === 'CMYK'){
                        cy.wait(2000);
                        color_front().click();
                        cy.wait(2000);
                        color1().click();
                        cy.wait(2000);
                        body().click();
                    }
                    if(N === 'CMYK,pantone'){
                        cy.wait(2000);
                        color_black().click();
                        cy.wait(2000);
                        color1().click();
                        color2().click();
                        cy.wait(2000);
                        body().click();
                    }else if(N === 'CMYK'){
                        cy.wait(2000);
                        color_black().click();
                        cy.wait(2000);
                        color1().click();
                        cy.wait(2000);
                        body().click();
                    }else if(N === 'pantone') {
                        cy.wait(2000);
                        color_black().click();
                        cy.wait(2000);
                        color2().click();
                        cy.wait(2000);
                        body().click();
                    }
                    if(O){
                        cy.wait(2000);
                        coating_fornt().click();
                    }
                    if(P){
                        cy.wait(2000);
                        coating_back().click();
                    }
                }
                if(J){
                    cy.wait(2000);
                    parts().type(J);
                }
                if(Q){
                    cy.wait(2000);
                    product_sample().click();
                }
                if(R){
                    cy.wait(2000);
                    remark().type(R);
                }
                //เทคนิคพิเศษ
                if(S){
                    cy.wait(2000);
                    special_technique().click();
                    if(T){
                        cy.wait(2000);
                        aftercoating_fornt().click();
                    }
                    if(U){
                        cy.wait(2000);
                        aftercoating_back().click();
                    }
                    if(V){
                        cy.wait(2000);
                        addspecial_technique().click();
                        if(W){
                            cy.wait(2000);
                            embossing().click();
                            if(X){
                                cy.wait(2000);
                                blogSubMaterialDetailId().click();
                                blogSubMaterialDetailId2().click();
                            }
                            if(Y){
                                cy.wait(2000);
                                amount().type(Y);
                            }
                            if(Z){
                                cy.wait(2000);
                                width2().type(Z);
                            }
                            if(AA){
                                cy.wait(2000);
                                height2().type(AA);
                            }
                            if(AC){
                                cy.wait(2000);
                                btadd().click();
                            }else {
                                cy.wait(2000);
                                cy.xpath("//div[@class='x-close']/button/*[1]").click({ force: true });
                            }
                        }
                    }
                    if(AD){
                        cy.wait(2000);
                        note().type(AD);
                    }
                    if(AE){
                        cy.wait(2000);
                        redesign_artwork().click();
                    }
                }
                if( ExpectedAlertMessage === 'กรุณาเลือกบล็อกพิมพ์'){
                    cy.wait(2000);
                }else {
                    cy.wait(2000);
                    btsavespec().click();
                }

                cy.contains(ExpectedAlertMessage).then(($element) => {
                    //const startRow = 13;
                    if ($element.length > 0) {
                        cy.log('Alert matches expected message');
                        cy.task('updateStatus', {
                            row: index + 2,
                            status: 'Pass',
                            column: 'AH',
                            sheetName: 'spec LD'
                        });
                        //cy.log(`Updating row ${startRow + index} with status Pass`);
                    }
                    if(ExpectedAlertMessage === 'บันทึกข้อมูลสำเร็จ') {
                        cy.wait(2000);
                        cy.xpath("//button[contains(text(),'OK')]").click();
                        cy.wait(2000);

                        //ยืนยันสเปค
                        cy.xpath("//div[contains(text(),'ยืนยันสเปค')]").click();
                        cy.wait(2000);
                        cy.xpath("//input[@name='expireDay']").type('15');
                        cy.wait(2000);
                        cy.xpath("//div[@id='mui-component-select-creditDay']").click();
                        cy.xpath("//body/div[@id='menu-creditDay']/div[3]/ul[1]/li[2]").click();
                        cy.wait(2000);
                        cy.xpath("//form[1]/div[4]/button[2]").click();
                        cy.wait(2000);

                        cy.visit('https://app-staging.honconnect.co/orders');
                        cy.wait(2000);
                        create_order().click();
                        cy.wait(2000);
                        contact().click();
                        cy.wait(2000);
                        product().click();
                        cy.wait(2000);
                        model().click();
                        cy.wait(2000);
                        bt_createLD().click();
                        cy.wait(4000);
                        specproduct().click();
                        cy.wait(2000);
                        bt_editLD().click();
                    }else{
                        cy.wait(2000);
                        cy.reload();
                    }
                });
            });
        });
    });

    it.skip('Create Spec LD 13', () => {
        cy.wait(2000);
        // ตั้งค่าเริ่มต้น
        create_order().click();
        cy.wait(2000);
        contact().click();
        cy.wait(2000);
        product().click();
        cy.wait(2000);
        model().click();
        cy.wait(2000);
        bt_createLD().click();
        cy.wait(4000);
        specproduct().click();
        cy.wait(2000);
        bt_editLD().click();

        for (let i = 0; i < 10; i++) { // วนลูป 30 ครั้ง
            const rowIndex = 13

            cy.task('fetchGoogleSheetData', { range: `spec LD!E${rowIndex}:AG${rowIndex}` }).then(data => {
                data.forEach((row) => {
                    const [E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z,
                        AA, AB, AC, AD, AE, AF, ExpectedAlertMessage] = row;

                    //width,height,length
                    if(E){
                        cy.wait(2000);
                        width().clear().type(E);
                    }
                    if(F){
                        cy.wait(2000);
                        height().clear().type(F);
                    }
                    if(G){
                        cy.wait(2000);
                        length().clear().type(G);
                    }
                    if(H){
                        cy.wait(2000);
                        quantity().clear().type(H);
                    }
                    if(I){
                        cy.wait(2000);
                        base_material().click();
                        if(K === 'ไม่พิมพ์') {
                            cy.wait(2000);
                            noprint().click();
                        }else if(K === 'ด้านหน้า'){
                            cy.wait(2000);
                            print_sidefront().click();
                        }else if(K === 'ด้านหลัง'){
                            cy.wait(2000);
                            print_sideback().click();
                        }else if(K === 'ด้านหน้า/ด้านหลัง'){
                            cy.wait(2000);
                            print_sidetwo().click();
                        }
                        if(L){
                            cy.wait(2000);
                            print().click();
                            cy.wait(2000);
                            printli2().click();
                        }
                        if(M === 'CMYK,pantone'){
                            cy.wait(2000);
                            color_front().click();
                            cy.wait(2000);
                            color1().click();
                            color2().click();
                            cy.wait(2000);
                            body().click();
                        }else if(M === 'CMYK'){
                            cy.wait(2000);
                            color_front().click();
                            cy.wait(2000);
                            color1().click();
                            cy.wait(2000);
                            body().click();
                        }
                        if(N === 'CMYK,pantone'){
                            cy.wait(2000);
                            color_black().click();
                            cy.wait(2000);
                            color1().click();
                            color2().click();
                            cy.wait(2000);
                            body().click();
                        }else if(N === 'CMYK'){
                            cy.wait(2000);
                            color_black().click();
                            cy.wait(2000);
                            color1().click();
                            cy.wait(2000);
                            body().click();
                        }else if(N === 'pantone') {
                            cy.wait(2000);
                            color_black().click();
                            cy.wait(2000);
                            color2().click();
                            cy.wait(2000);
                            body().click();
                        }
                        if(O){
                            cy.wait(2000);
                            coating_fornt().click();
                        }
                        if(P){
                            cy.wait(2000);
                            coating_back().click();
                        }
                    }
                    if(J){
                        cy.wait(2000);
                        parts().type(J);
                    }
                    if(Q){
                        cy.wait(2000);
                        product_sample().click();
                    }
                    if(R){
                        cy.wait(2000);
                        remark().type(R);
                    }
                    //เทคนิคพิเศษ
                    if(S){
                        cy.wait(2000);
                        special_technique().click();
                        if(T){
                            cy.wait(2000);
                            aftercoating_fornt().click();
                        }
                        if(U){
                            cy.wait(2000);
                            aftercoating_back().click();
                        }
                        if(V){
                            cy.wait(2000);
                            addspecial_technique().click();
                            if(W){
                                cy.wait(2000);
                                embossing().click();
                                if(X){
                                    cy.wait(2000);
                                    blogSubMaterialDetailId().click();
                                    blogSubMaterialDetailId2().click();
                                }
                                if(Y){
                                    cy.wait(2000);
                                    amount().type(Y);
                                }
                                if(Z){
                                    cy.wait(2000);
                                    width2().type(Z);
                                }
                                if(AA){
                                    cy.wait(2000);
                                    height2().type(AA);
                                }
                                if(AC){
                                    cy.wait(2000);
                                    btadd().click();
                                }else {
                                    cy.wait(2000);
                                    cy.xpath("//div[@class='x-close']/button/*[1]").click({ force: true });
                                }
                            }
                        }
                        if(AD){
                            cy.wait(2000);
                            note().type(AD);
                        }
                        if(AE){
                            cy.wait(2000);
                            redesign_artwork().click();
                        }
                    }
                    if( ExpectedAlertMessage === 'กรุณาเลือกบล็อกพิมพ์'){
                        cy.wait(2000);
                    }else {
                        cy.wait(2000);
                        btsavespec().click();
                    }

                        if(ExpectedAlertMessage === 'บันทึกข้อมูลสำเร็จ') {
                            cy.wait(2000);
                            cy.xpath("//button[contains(text(),'OK')]").click();
                            cy.wait(2000);

                            //ยืนยันสเปค
                            cy.xpath("//div[contains(text(),'ยืนยันสเปค')]").click();
                            cy.wait(2000);
                            cy.xpath("//input[@name='expireDay']").type('15');
                            cy.wait(2000);
                            cy.xpath("//div[@id='mui-component-select-creditDay']").click();
                            cy.xpath("//body/div[@id='menu-creditDay']/div[3]/ul[1]/li[2]").click();
                            cy.wait(2000);
                            cy.xpath("//form[1]/div[4]/button[2]").click();
                            cy.wait(2000);

                            cy.visit('https://app-staging.honconnect.co/orders');
                            cy.wait(2000);
                            create_order().click();
                            cy.wait(2000);
                            contact().click();
                            cy.wait(2000);
                            product().click();
                            cy.wait(2000);
                            model().click();
                            cy.wait(2000);
                            bt_createLD().click();
                            cy.wait(4000);
                            specproduct().click();
                            cy.wait(2000);
                            bt_editLD().click();
                        } else {
                            cy.reload();
                            cy.wait(2000);
                        }
                    });
                });
        }
    });

});