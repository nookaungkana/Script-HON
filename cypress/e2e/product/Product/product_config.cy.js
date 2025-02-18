import 'cypress-xpath';
import { login } from "../../login.cy";
import 'cypress-file-upload';

const menu = () => cy.xpath("//div[@class='MuiDataGrid-row MuiDataGrid-row--lastVisible']/div[6]/div");
const product_config = () => cy.xpath("//ul[1]/li[2]/div[1]");

const addmodel = () => cy.xpath("//div[@id='โมเดล']/div[1]/div[2]");
const image = () => cy.xpath("//input[@type='file']");
const name = () => cy.xpath("//input[@name='name']");
const btsavemodel = () => cy.xpath("//form[1]/div[3]/button[2]");

const addmaterial = () => cy.xpath("//div[@id='วัสดุ']/div[1]/div[2]");
const addcomponent = () => cy.xpath("//div[@id='ส่วนประกอบ']/div[1]/div[2]");

const addprint = () => cy.xpath("//div[@id='การพิมพ์']/div[1]/div[2]");
const printSystemId = () => cy.xpath("//div[@id='mui-component-select-printSystemId']");
const printSystemId2 = () => cy.xpath("//body/div[@id='menu-printSystemId']/div[3]/ul[1]/li[2]");

const addcoating = () => cy.xpath("//div[@id='เคลือบ']/div[1]/div[2]");
const addspecial_technique = () => cy.xpath("//div[@id='เทคนิคพิเศษ']/div[1]/div[2]");

const masterId = () => cy.xpath("//div[@id='mui-component-select-masterId']");
const masterId2 = () => cy.xpath("//div[@id='menu-masterId']/div[3]/ul[1]/li[2]");
const masteritem = () => cy.get('.material-item-wrap > :nth-child(1)');
const checkboxmaster = () => cy.xpath("//form[1]/div[1]/div[1]/div[3]/label[1]/span[1]/input[1]");
const checkboxmaster2 = () => cy.xpath("//form[1]/div[1]/div[1]/div[3]/label[2]/span[1]/input[1]");
const btsavemaster = () => cy.xpath("//form[1]/div[1]/div[2]/button[2]");

const editmodel = () => cy.xpath("//tbody/tr[last()]/td[3]/div[1]/div[1]");
const editmaterial = () => cy.xpath("//div[@id=\"วัสดุ\"]/div[2]/div/div/table/tbody/tr[last()]/td[4]/div/div");
const editcomponent = () => cy.xpath("//div[@id=\"ส่วนประกอบ\"]/div[2]/div/div/table/tbody/tr[last()]/td[4]/div/div");
const editprint = () => cy.xpath("//div[@id=\"การพิมพ์\"]/div[2]/div/div/table/tbody/tr[last()]/td[4]/div/div");
const editcoating = () => cy.xpath("//div[@id=\"เคลือบ\"]/div[2]/div/div/table/tbody/tr[last()]/td[4]/div/div");
const editspecial_technique = () => cy.xpath("//div[@id=\"เทคนิคพิเศษ\"]/div[2]/div/div/table/tbody/tr[last()]/td[4]/div/div");
const editconfig = () => cy.xpath("//ul[1]/li[1]");

describe('Function Product Config', () => {
    beforeEach(() => {
        cy.wait(2000);
        login();
        cy.wait(2000);
    });

    it.skip('Create Product Config', () => {
        cy.visit('https://app-staging.honconnect.co/product');
        cy.wait(2000);
        menu().click();
        cy.wait(2000);
        product_config().click();
        cy.wait(2000);

        cy.task('fetchGoogleSheetData', { range: 'Product-Config!E8:W10' }).then(data => {
            data.forEach((row, index) => {
                const [btaddmodel, dtlinkpicture, namemodel, material, submaterial, submaterialdetail,
                    component, subcomponent, subcomponentdetail, print, subprint, sunprintdetail,
                    coating, subcoating, subcoatingdetail, special_technique, subspecial_technique, subspecial_techniquedetail,
                    ExpectedAlertMessage] = row;

                if (btaddmodel) {
                    cy.wait(2000);
                    addmodel().click();

                    if (dtlinkpicture) {
                        const fileName = 'productmodel.jpg'; // ชื่อไฟล์ที่ต้องการ
                        cy.task('downloadFile', {url: dtlinkpicture, fileName}).then((filePath) => {
                            // เนื่องจาก attachFile ต้องการชื่อไฟล์ใน fixtures, ใช้แค่ชื่อไฟล์
                            image().attachFile(fileName);
                        });
                    }
                    if (namemodel) {
                        cy.wait(2000);
                        name().type(namemodel);
                    } else {
                        cy.wait(2000);
                        name().clear({force: true});
                    }
                    btsavemodel().click();
                }
                if (material){
                    addmaterial().click();
                    masterId().click();
                    masterId2().click();
                    masteritem().click();
                    checkboxmaster().click();
                    btsavemaster().click();
                }
                if (component){
                    addcomponent().click();
                    masterId().click();
                    masterId2().click();
                    masteritem().click();
                    checkboxmaster().click();
                    btsavemaster().click();
                }
                if (print){
                    addprint().click();
                    printSystemId().click();
                    printSystemId2().click();
                    masteritem().click();
                    cy.wait(2000);
                    cy.xpath("//form[1]/div[1]/div[1]/div[2]/label[1]/span[1]/input[1]").click();
                    btsavemaster().click();
                }
                if (coating){
                    addcoating().click();
                    masterId().click();
                    masterId2().click();
                    masteritem().click();
                    checkboxmaster().click();
                    btsavemaster().click();
                }
                if (special_technique){
                    addspecial_technique().click();
                    masterId().click();
                    masterId2().click();
                    masteritem().click();
                    checkboxmaster().click();
                    btsavemaster().click();
                }

                cy.contains(ExpectedAlertMessage).then(($element) => {
                    if ($element.length > 0) {
                        cy.log('Alert matches expected message');
                        cy.task('updateStatus', {
                            row: index + 8,
                            status: 'Pass',
                            column: 'X',
                            sheetName: 'Product-Config'
                        });
                        cy.log(`Updating row ${index + 8} with status Pass`);
                    }
                    cy.wait(2000);
                    cy.reload();
                });
            });
        });
    });
    it('Edit Product Config', () => {
        cy.visit('https://app-staging.honconnect.co/product');
        cy.wait(2000);
        menu().click();
        cy.wait(2000);
        product_config().click();
        cy.wait(2000);

        cy.task('fetchGoogleSheetData', { range: 'Product-Config!AD6:AV9' }).then(data => {
            data.forEach((row, index) => {
                const [btaddmodel, dtlinkpicture, namemodel, material, submaterial, submaterialdetail,
                    component, subcomponent, subcomponentdetail, print, subprint, sunprintdetail,
                    coating, subcoating, subcoatingdetail, special_technique, subspecial_technique, subspecial_techniquedetail,
                    ExpectedAlertMessage] = row;

                if (btaddmodel) {
                    cy.wait(2000);
                    editmodel().click();
                    cy.wait(2000);
                    editconfig().click();
                    cy.wait(2000);

                    if (dtlinkpicture) {
                        const fileName = 'productmodel.jpg'; // ชื่อไฟล์ที่ต้องการ
                        cy.task('downloadFile', {url: dtlinkpicture, fileName}).then((filePath) => {
                            // เนื่องจาก attachFile ต้องการชื่อไฟล์ใน fixtures, ใช้แค่ชื่อไฟล์
                            image().attachFile(fileName);
                        });
                    }
                    if (namemodel) {
                        cy.wait(2000);
                        name().type(namemodel);
                    } else {
                        cy.wait(2000);
                        name().clear({force: true});
                    }
                    btsavemodel().click();
                }
                if (material){
                    editmaterial().click();
                    editconfig().click();
                    checkboxmaster2().click();
                    btsavemaster().click();
                }
                if (component){
                    editcomponent().click();
                    editconfig().click();
                    checkboxmaster2().click({force: true});
                    btsavemaster().click();
                }
                if (print){
                    editprint().click();
                    editconfig().click();
                    cy.wait(2000);
                    cy.xpath("//form[1]/div[1]/div[1]/div[2]/label[2]/span[1]/input[1]").click({force: true});
                    btsavemaster().click();
                }
                if (coating){
                    editcoating().click();
                    editconfig().click();
                    checkboxmaster2().click({force: true});
                    btsavemaster().click();
                }
                if (special_technique){
                    editspecial_technique().click();
                    editconfig().click();
                    checkboxmaster2().click({force: true});
                    btsavemaster().click();
                }

                cy.contains(ExpectedAlertMessage).then(($element) => {
                    if ($element.length > 0) {
                        cy.log('Alert matches expected message');
                        cy.task('updateStatus', {
                            row: index + 6,
                            status: 'Pass',
                            column: 'AW',
                            sheetName: 'Product-Config'
                        });
                        cy.log(`Updating row ${index + 6} with status Pass`);
                    }
                    cy.wait(2000);
                    cy.reload();
                });
            });
        });
    });
});
