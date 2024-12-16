const { defineConfig } = require('cypress');
const { getData, updateStatus, downloadFile } = require('./test'); // นำเข้าฟังก์ชัน getData และ updateStatus
const fs = require('fs');
const path = require('path');
const axios = require('axios');

module.exports = defineConfig({
  e2e: {
    specPattern: "cypress/e2e/**/*.{cy,spec}.{js,ts}",
    setupNodeEvents(on, config) {
      // ลงทะเบียน task สำหรับดึงข้อมูลจาก Google Sheets
      on('task', {
        async fetchGoogleSheetData({ range }) {
          const data = await getData(range); // ส่ง range ไปยังฟังก์ชัน getData
          return data;
        },

        // ลงทะเบียน task สำหรับอัปเดตสถานะ
        async updateStatus({ row, status, column, sheetName }) {
          await updateStatus(row, status, column, sheetName); // เรียกใช้ฟังก์ชันอัปเดตใน Google Sheets
          return null; // คืนค่า null เมื่อเสร็จสิ้น
        },

        // Task สำหรับดาวน์โหลดรูปจาก URL และบันทึกเป็นไฟล์
        async downloadFile({ url, fileName }) {
          const filePath = await downloadFile({ url, fileName }); // ใช้ฟังก์ชัน downloadFile จาก test.js
          return filePath;
        }
      });
    }
  },
});

