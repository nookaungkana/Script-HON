import 'cypress-xpath';
import { login } from "../../login.cy";
import 'cypress-file-upload';

const menu = () => cy.xpath("//div[@class='MuiDataGrid-row MuiDataGrid-row--lastVisible']/div[6]/div");
const edit_product = () => cy.xpath("//body[1]/div[2]/div[3]/ul[1]/li[1]");
const feature = () => cy.xpath("//a[contains(text(),'คุณลักษณะ')]");
const model = () => cy.xpath("//body[1]/div[1]/div[1]/div[2]/div[1]/div[3]/div[2]/div[1]/div/button");
const image = () => cy.xpath("//form[1]/div[1]/div[2]/input[1]");
const name = () => cy.xpath("//input[@name='name']");
const btsavemodel = () => cy.xpath("//form[1]/div[3]/button[2]");

const essential_size = () => cy.xpath("//body[1]/div[1]/div[1]/div[2]/div[1]/div[3]/div[2]/div[3]/div/button");
const title = () => cy.xpath("//input[@name='name']");
const length = () => cy.xpath("//input[@name='length']");
const width = () => cy.xpath("//input[@name='width']");
const height = () => cy.xpath("//input[@name='height']");
const btsavesize = () => cy.xpath("//form[1]/div[2]/div[5]/button[1]");

const addquantity = () => cy.xpath("//body[1]/div[1]/div[1]/div[2]/div[1]/div[3]/div[2]/div[5]/div/button");
const quantity = () => cy.xpath("//input[@name='quantity']");
const btsavequantity = () => cy.xpath("//form[1]/div[2]/div[2]/button[1]");

const base_material = () => cy.xpath("//body[1]/div[1]/div[1]/div[2]/div[1]/div[3]/div[2]/div[7]/div/button");
const กระดาษ = () => cy.xpath("//span[contains(text(),'กระดาษ')]");
const กระดาษคราฟต์ = () => cy.xpath("//span[contains(text(),'กระดาษคราฟต์')]");
const กระดาษคราฟท์A = () => cy.xpath("//ul[1]/li[1]/ul[1]/li[1]/ul[1]/li[1]/div[1]/*[1]");

const parts = () => cy.xpath("//body[1]/div[1]/div[1]/div[2]/div[1]/div[3]/div[2]/div[9]/div/button");
const เชือก = () => cy.xpath("//span[contains(text(),'เชือก')]");
const เชือกถัก = () => cy.xpath("//span[contains(text(),'เชือกถัก')]");
const เชือกถักสีน้ำตาล = () => cy.xpath("//ul[1]/li[1]/ul[1]/li[1]/ul[1]/li[1]/div[1]/*[1]");

const print = () => cy.xpath("//body[1]/div[1]/div[1]/div[2]/div[1]/div[3]/div[2]/div[11]/div/button");
const Offset = () => cy.xpath("//span[contains(text(),'พิมพ์ Offset')]");
const CMYK = () => cy.xpath("//span[contains(text(),'CMYK')]");
const CMYK2 = () => cy.xpath("//ul[1]/li[1]/ul[1]/li[1]/ul[1]/li[1]/div[1]/*[1]");

const coating = () => cy.xpath("//body[1]/div[1]/div[1]/div[2]/div[1]/div[3]/div[2]/div[13]/div/button");
const เคลือบ = () => cy.xpath("//span[contains(text(),'เคลือบ')]");
const น้ำยาวานิช = () => cy.xpath("//span[contains(text(),'น้ำยาวานิช')]");
const น้ำยาวานิชเงา = () => cy.xpath("//ul[1]/li[1]/ul[1]/li[1]/ul[1]/li[1]/div[1]/*[1]");

const extra = () => cy.xpath("//body[1]/div[1]/div[1]/div[2]/div[1]/div[3]/div[2]/div[15]/div/button");
const Spot = () => cy.xpath("//span[contains(text(),'Spot UV')]");
const น้ำยาลามิเนต = () => cy.xpath("//span[contains(text(),'น้ำยาลามิเนต')]");
const น้ำยาลามิเนตด้าน = () => cy.xpath("//ul[1]/li[1]/ul[1]/li[2]/ul[1]/li[1]/div[1]/*[1]");

const action = () => cy.xpath("//div[@class='sc-2c6a1f58-1 npjD']/div[1]");
const btsave = () => cy.xpath("//button[text()='บันทึก']");
const cf = () => cy.xpath("//body/div[3]/div[1]/div[6]/button[1]");

const pictureproduct = () => cy.xpath("//div[1]/div[2]/div[3]/div[3]/div[1]/div[1]/label/input[@type='file']");
const productcoverimage = () => cy.xpath("//div[@class='img-container']/div/div[2]/input[@type='file']");

describe('Function Product-Feature', () => {
    beforeEach(() => {
        login();
        cy.wait(2000);
        cy.visit('https://app-staging.honconnect.co/product');
        cy.wait(2000);
        menu().click();
        cy.wait(2000);
        edit_product().click();

    });
    it.skip('Edit Product-Feature', () => {
        cy.wait(2000);
        feature().click();
        cy.task('fetchGoogleSheetData', { range: 'Product-Feature!E3:Y19' }).then(data => {
            data.forEach((row, index) => {
                const [E, dtpicture, dtname, H, dttitle, dtlength, dtwidth, dthight, M, dtquantity, O, dtbasmaterial, Q,
                    dtparts, S, dtprint, U, dtcoating, W, dtextra, ExpectedAlertMessage] = row;

                if(E){
                    cy.wait(2000);
                    model().click();
                    if(dtpicture){
                        const fileName = 'model.jpg';
                        cy.task('downloadFile', { url: dtpicture, fileName }).then((filePath) => {
                            image().attachFile(fileName);
                        });
                    }
                    if(dtname){
                        cy.wait(2000);
                        name().type(dtname);
                    }
                    cy.wait(2000);
                    btsavemodel().click();
                }
                if(H){
                    cy.wait(2000);
                    essential_size().click();
                    if(dttitle){
                        cy.wait(2000);
                        title().type(dttitle);
                    }
                    if(dtlength){
                        cy.wait(2000);
                        length().type(dtlength);
                    }
                    if(dtwidth){
                        cy.wait(2000);
                        width().type(dtwidth);
                    }
                    if(dthight){
                        cy.wait(2000);
                        height().type(dthight);
                    }
                    cy.wait(2000);
                    btsavesize().click();
                }
                if(M){
                    cy.wait(2000);
                    addquantity().click();
                    if(dtquantity){
                        cy.wait(2000);
                        quantity().type(dtquantity);
                    }
                    cy.wait(2000);
                    btsavequantity().click();
                }
                if(O){
                    if(dtbasmaterial){
                        cy.wait(2000);
                        base_material().click();
                        cy.wait(2000);
                        กระดาษ().click({force: true});
                        cy.wait(2000);
                        กระดาษคราฟต์().click({force: true});
                        cy.wait(2000);
                        กระดาษคราฟท์A().click({force: true});
                        cy.wait(2000);
                        action().click();
                        cy.wait(2000);
                        btsave().click();
                        cy.wait(2000);
                        cf().click();
                    }
                }
                if(Q){
                    if(dtparts){
                        cy.wait(2000);
                        parts().click();
                        cy.wait(2000);
                        เชือก().click({force: true});
                        cy.wait(2000);
                        เชือกถัก().click({force: true});
                        cy.wait(2000);
                        เชือกถักสีน้ำตาล().click({force: true});
                        cy.wait(2000);
                        action().click();
                        cy.wait(2000);
                        btsave().click();
                        cy.wait(2000);
                        cf().click();
                    }
                }
                if(S){
                    if(dtprint){
                        cy.wait(2000);
                        print().click();
                        cy.wait(2000);
                        Offset().click();
                        cy.wait(2000);
                        CMYK().click();
                        cy.wait(2000);
                        CMYK2().click();
                        cy.wait(2000);
                        action().click();
                        cy.wait(2000);
                        btsave().click();
                        cy.wait(2000);
                        cf().click();
                    }
                }
                if(U){
                    if(dtcoating){
                        cy.wait(2000);
                        coating().click();
                        cy.wait(2000);
                        เคลือบ().click({force: true});
                        cy.wait(2000);
                        น้ำยาวานิช().click({force: true});
                        cy.wait(2000);
                        น้ำยาวานิชเงา().click({force: true});
                        cy.wait(2000);
                        action().click();
                        cy.wait(2000);
                        btsave().click();
                        cy.wait(2000);
                        cf().click();
                    }
                }
                if(W){
                    if(dtextra){
                        cy.wait(2000);
                        extra().click();
                        cy.wait(2000);
                        Spot().click();
                        cy.wait(2000);
                        น้ำยาลามิเนต().click({force: true});
                        cy.wait(2000);
                        น้ำยาลามิเนตด้าน().click({force: true});
                        cy.wait(2000);
                        action().click();
                        cy.wait(2000);
                        btsave().click();
                        cy.wait(2000);
                        cf().click();
                    }
                }
                if (ExpectedAlertMessage=== 'อัพเดทสินค้าเรียบร้อย'){
                    cy.wait(2000);
                    cy.xpath("//a[contains(text(),'ข้อมูลสินค้า')]").click();
                    cy.wait(2000);
                    cy.xpath("//form[1]/div[8]/button[1]").click();
                }

                cy.contains(ExpectedAlertMessage).then(($element) => {
                    if ($element.length > 0) {
                        cy.log('Alert matches expected message');
                        cy.task('updateStatus', {
                            row: index + 2,
                            status: 'Pass',
                            column: 'Z',
                            sheetName: 'Product-Feature'
                        });
                        cy.log(`Updating row ${index + 2} with status Pass`);
                    }
                    if(ExpectedAlertMessage=== 'อัพเดทสินค้าเรียบร้อย') {
                        cy.wait(2000);
                        cy.xpath("//button[contains(text(),'OK')]").click();
                        cy.wait(2000);
                        cy.xpath("//div[@class='back-button']/button").click();
                        cy.wait(2000);
                        menu().click();
                        cy.wait(2000);
                        edit_product().click();
                        cy.wait(2000);
                        feature().click();
                    }else{
                        cy.wait(2000);
                        cy.reload();
                    }
                });
            });
        });
    });
    it.skip('Edit Product-Image', () => {
        cy.wait(2000);
        cy.xpath("//a[contains(text(),'รูปภาพ')]").click();

        cy.task('fetchGoogleSheetData', { range: 'Product-Feature!AF3:AH6' }).then(data => {
            data.forEach((row, index) => {
                const [linkpictureproduct, linkproductcoverimage, ExpectedAlertMessage] = row;


                if (linkpictureproduct) {
                    const fileName = 'pictureproduct.jpg';
                    cy.task('downloadFile', { url: linkpictureproduct, fileName }).then((filePath) => {
                        pictureproduct().attachFile(fileName);
                    });
                }

                if (linkproductcoverimage) {
                    const fileName = 'productcoverimage.jpg';
                    cy.task('downloadFile', { url: linkproductcoverimage, fileName }).then((filePath) => {
                        productcoverimage().attachFile(fileName);
                    });
                }
                if (!linkpictureproduct && !linkproductcoverimage) {
                    cy.wait(2000);
                    cy.xpath("//a[contains(text(),'ข้อมูลสินค้า')]").click();
                    cy.wait(2000);
                    cy.xpath("//form[1]/div[8]/button[1]").click();
                    }


                cy.contains(ExpectedAlertMessage).then(($element) => {
                    if ($element.length > 0) {
                        cy.log('Alert matches expected message');
                        cy.task('updateStatus', {
                            row: index + 2,
                            status: 'Pass',
                            column: 'AI',
                            sheetName: 'Product-Feature'
                        });
                        cy.log(`Updating row ${index + 2} with status Pass`);
                    }
                    if(ExpectedAlertMessage === 'อัพเดทสินค้าเรียบร้อย') {
                        cy.wait(2000);
                        cy.xpath("//button[contains(text(),'OK')]").click();
                        cy.wait(2000);
                        cy.xpath("//div[@class='back-button']/button").click();
                        cy.wait(2000);
                        menu().click();
                        cy.wait(2000);
                        edit_product().click();
                        cy.wait(2000);
                        cy.xpath("//a[contains(text(),'รูปภาพ')]").click();
                        cy.wait(2000);
                    }else{
                        cy.wait(2000);
                        cy.reload();
                    }
                });
            });
        });
    });
});












