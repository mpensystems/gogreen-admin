import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import toast from 'react-hot-toast';

// Function to export transactions as Excel
export const downloadExcel = (data) => {
  // Create a new workbook
  const workbook = XLSX.utils.book_new();

  // Convert the array of objects to a worksheet
  const worksheet = XLSX.utils.json_to_sheet(data);

  // Append the worksheet to the workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Transactions');

  // Create a Blob from the workbook
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

  // Save the file with the name 'transactions.xlsx'
  saveAs(blob, 'transactions.xlsx');
};





export const handleFileUpload = (uploadedFile) => {
  if (uploadedFile) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" }); 
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet); 

      // Transform data to match your expected format
      const formattedData = jsonData.map((item) => ({
        trip_id: item.trip_id, 
        status: item.status,
        pickup_loc: item.pickup_loc,
        drop_loc: item.drop_loc,
        rider_name: item.rider_name,
      }));
      
      // Console log the formatted data
      toast.success("File Uploaded successfully !");
      console.log("Uploaded File Data:", formattedData);
    };
    
    // Read the file as an ArrayBuffer
    reader.readAsArrayBuffer(uploadedFile);
  }
};
