// i18n.ts
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'


const resources = {
  en: {
    translation: {
      title: "quotation Generator",
      subtitle: "Create professional quotations in minutes",
      edit: "Edit",
      preview: "Preview",
      download: "Download PDF",
      invoiceDetails: "Quotation Details",
      invoiceNumber: "Quotation Number",
      date: "Date",
      dueDate: "Due Date",
      from: "From",
      companyName: "Company Name",
      address: "Address",
      yourCompanyName: "Your Company Name",
      yourCompanyAddress: "Your company address",
      billTo: "Bill To",
      clientName: "Client Name",
      clientCompanyName: "Client Company Name",
      clientAddress: "Client address",
      items: "Items",
      addItem: "Add Item",
      description: "Description",
      qty: "Qty",
      price: "Price",
      itemDescription: "Item description",
      notes: "Notes",
      terms: "Terms & conditional",
      tax: "Tax",
      additionalNotes: "Additional notes or payment terms",
      additionalTerms: "Terms & Conditional",
      invoice: "QUOTATION",
      yourCompany: "Your Company",
      clientCompany: "Client Company",
      total: "Total",
      subtotal: "subtotal",
      due: "Due",
      name: "Tax Name",
      type: "Type",
      percent: "Percentage",
      value: "Value",
      Contractor: "Contractor",
      Customer: "Customer",
      constructorName: "Constructor Name",
      signature: "Signature",
      Announcement: "Lysen is still under development. Some features may be incomplete or may not work as expected.",
      Announcement2: "If you run into issues or have suggestions, we're listening. Thanks for trying it out.",
      Announcement3: ". You can generate quotations and receipts for free. No login or data collection — everything runs on your device.",
      "legal": {
        "title": "Terms of Use and Privacy Policy",
        "description": "Lysen is a free quotation and receipt generator that requires no login and collects no user data.",

        "termsTitle": "Terms of Use",
        "terms": [
          "Lysen is currently in beta development.",
          "We do not guarantee the accuracy or completeness of generated documents.",
          "Users should verify all content before official use.",
          "We are not liable for any damages caused by use of the website."
        ],

        "privacyTitle": "Privacy Policy",
        "privacy": [
          "We do not collect any personal data.",
          "No cookies or tracking systems are used.",
          "All data you enter stays on your device only.",
          "No information is transmitted to our servers."
        ]
      }
    },
  },
  th: {
    translation: {
      title: "สร้างใบเสนอราคา",
      subtitle: "สร้างใบเสนอราคาอย่างมืออาชีพในไม่กี่นาที",
      edit: "แก้ไข",
      preview: "ดูตัวอย่าง",
      download: "ดาวน์โหลด PDF",
      invoiceDetails: "รายละเอียดใบเสนอราคา",
      invoiceNumber: "เลขที่ใบเสนอราคา",
      date: "วันที่",
      dueDate: "กำหนดชำระ",
      from: "จาก",
      companyName: "ชื่อบริษัท",
      address: "ที่อยู่",
      yourCompanyName: "ชื่อบริษัทของคุณ",
      yourCompanyAddress: "ที่อยู่บริษัทของคุณ",
      billTo: "ถึง",
      clientName: "ชื่อลูกค้า",
      clientCompanyName: "ชื่อบริษัทลูกค้า",
      clientAddress: "ที่อยู่ลูกค้า",
      items: "รายการ",
      addItem: "เพิ่มรายการ",
      description: "รายละเอียด",
      qty: "จำนวน",
      price: "ราคา",
      itemDescription: "รายละเอียดสินค้า",
      notes: "หมายเหตุ",
      terms: "ข้อตกลงและเงื่อนไขการให้บริการ",
      tax: "ภาษี",
      additionalNotes: "หมายเหตุเพิ่มเติมหรือเงื่อนไขการชำระเงิน",
      additionalTerms: "ข้อตกลงและเงื่อนไขการให้บริการ",
      invoice: "ใบเสนอราคา",
      yourCompany: "บริษัทของคุณ",
      clientCompany: "บริษัทลูกค้า",
      total: "รวม",
      Total: "รวม",
      subtotal: "ยอดรวมย่อย",
      due: "ครบกำหนด",
      name: "ชื่อภาษี",
      type: "ประเภท",
      percent: "เปอร์เซ็นต์",
      value: "มูลค่า",
      Construtor: "ผู้รับจ้าง",
      Customer: "ผู้ว่าจ้าง",
      constructorName: "ลงชื่อผู้รับจ้าง",
      signature: "ลายเซ็น",
      Announcement: "Lysen ยังอยู่ระหว่างการพัฒนา ฟีเจอร์บางอย่างอาจยังไม่สมบูรณ์ หรืออาจมีข้อผิดพลาดเกิดขึ้น ",
      Announcement2: " หากเจอปัญหา หรือมีข้อเสนอแนะ เรายินดีรับฟัง ขอบคุณที่ใช้บริการของเรา",
      Announcement3: " คุณสามารถใช้งานสร้างใบเสนอราคาและใบเสร็จได้ฟรี ไม่มีระบบเก็บข้อมูล — ทุกอย่างอยู่ฝั่งผู้ใช้ ",
      "legal": {
        "title": "ข้อตกลงการใช้งานและนโยบายความเป็นส่วนตัว",
        "description": "Lysen เป็นบริการสร้างใบเสนอราคาและใบเสร็จที่ใช้งานได้ฟรีโดยไม่ต้องเข้าสู่ระบบ และไม่มีการเก็บข้อมูลผู้ใช้งาน",

        "termsTitle": "ข้อตกลงการใช้งาน (Terms of Use)",
        "terms": [
          "Lysen เป็นบริการที่อยู่ระหว่างการพัฒนา (Beta)",
          "เราไม่สามารถรับประกันความถูกต้องหรือความสมบูรณ์ของเอกสารที่สร้างขึ้น",
          "ผู้ใช้งานควรตรวจสอบความถูกต้องก่อนนำไปใช้จริง",
          "เราไม่รับผิดชอบต่อความเสียหายที่อาจเกิดขึ้นจากการใช้งานเว็บไซต์"
        ],

        "privacyTitle": "นโยบายความเป็นส่วนตัว (Privacy Policy)",
        "privacy": [
          "เราไม่เก็บข้อมูลส่วนบุคคลใด ๆ",
          "ไม่มีการใช้คุกกี้หรือระบบติดตาม",
          "ข้อมูลทั้งหมดที่คุณกรอกจะถูกเก็บไว้เฉพาะในเครื่องของคุณ",
          "ไม่มีการส่งข้อมูลใด ๆ ไปยังเซิร์ฟเวอร์ของเรา"
        ]
      }
    },
  },
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'en', // default language
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
