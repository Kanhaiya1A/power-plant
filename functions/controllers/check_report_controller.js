const fs = require('fs');
const os = require('os');
const path = require('path');
const XLSX = require('xlsx');

const CheckInTrack = require('../models/check_in_track');
const CheckOutTrack = require('../models/check_out_track');
const CheckInAssign = require('./../models/check_in_assign');
const CheckOutAssign = require('./../models/check_out_assign');

const checkInReport = async (req, res) => {
  try {
    const emp_id = req.query.emp_id;
    const emp_name = req.query.emp_name;
    const workbook = XLSX.utils.book_new();
    // const Data = await CheckInTrack.find({});
    const Data = await CheckInAssign.aggregate([
      {
        $match: {
          emp_id: emp_id,
        },
      },
      {
        $lookup: {
          from: 'checkintracks',
          localField: 'task_id',
          foreignField: 'task_id',
          as: 'tracktask',
        },
      },
    ]);

    const data = [];
    data.push([
      'emp_id',
      'emp_name',
      'task_detail',
      'status',
      'hand_over_status',
      'handover_to',
      'latitude',
      'longitude',
      'map',
    ]);
    


    Data.forEach((item, index) => {
      data.push([
        // 'emp_id',
        item?.emp_id || ' ',
        // 'emp_name',
        emp_name ? emp_name : ' ',
        // 'task_detail',
        item?.task_name ? item.task_name : ' ',
        // 'status',
        item?.tracktask[0]?.status ? 'completed' : 'pending',

        // 'hand_over_status',
        item?.tracktask[0]?.hand_over ? 'true' : 'false',
        // 'handover_to',
        item?.tracktask[0]?.hand_over_emp_name
          ? item?.tracktask[0]?.hand_over_emp_name
          : ' ',
        // 'latitude',
        item?.tracktask[0]?.latitude ? item?.tracktask[0]?.latitude : ' ',
        // 'longitude',
        item?.tracktask[0]?.longitude ? item?.tracktask[0]?.longitude : ' ',
        // 'map',
        item?.tracktask[0]?.latitude ? `https://maps.google.com/?q=${item?.tracktask[0]?.latitude},${item?.tracktask[0]?.longitude}` : ' ',
      ]);
    });

    const worksheet = XLSX.utils.aoa_to_sheet(data);

    XLSX.utils.book_append_sheet(workbook, worksheet, 'checkinreport');

    // Set the response headers for download
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=checkinreport.xlsx'
    );
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );

    // Send the XLSX file as a response
    const xlsxBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'buffer',
    });

    res.send(xlsxBuffer);
  } catch (error) {
    return res.json({
      status: false,
      message: error.message,
    });
  }
};

// const checkInReport = async (req, res) => {
//   try {
//     const start_date = req.query.start_date;
//     const end_date = req.query.end_date;

//     const workbook = XLSX.utils.book_new();

//     // const Data = await CheckInTrack.find({}).select({emp_id, task_id, remarks, status, hand_over, current_day});
//     const Data = await CheckInTrack.find({});

//     const data = [];
//     data.push([
//       'emp_id',
//       'task_id',
//       'remarks',
//       'status',
//       'hand_over',
//       'latitude',
//       'longitude',
//       'map',
//     ]);

//     Data.forEach((item, index) => {
//       // console.log('okay', item.emp_id);
//       data.push([
//         item?.emp_id,
//         item?.task_id,
//         item?.remarks || '',
//         item?.status,
//         item?.hand_over,
//         item?.latitude,
//         item?.longitude,
//         `https://maps.google.com/?q=${item?.latitude},${item?.longitude}`,
//       ]);
//     });

//     const worksheet = XLSX.utils.aoa_to_sheet(data);

//     XLSX.utils.book_append_sheet(workbook, worksheet, 'checkinreport');

//     // Generate a temporary file path
//     // const tempDir = '/tmp';
//     const tempFilePath = 'tmp/';

//     // Write the XLSX data to the temporary file
//     XLSX.writeFile(workbook, tempFilePath);

//     // Set the response headers for download
//     res.setHeader(
//       'Content-Disposition',
//       'attachment; filename=checkinreport.xlsx'
//     );
//     res.setHeader(
//       'Content-Type',
//       'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
//     );

//     // Send the XLSX file as a response
//     const fileStream = fs.createReadStream(tempFilePath);
//     fileStream.pipe(res);

//     // Delete the temporary file after it's served
//     fileStream.on('end', () => {
//       fs.unlinkSync(tempFilePath);
//     });
//   } catch (error) {
//     return res.json({
//       status: false,
//       message: error.message,
//     });
//   }
// };

// const checkInReport = async (req, res) => {
//   try {
//     const start_date = req.query.start_date;
//     const end_date = req.query.end_date;

//     const Data = await CheckInTrack.find({});

//     // Convert the Data to a JSON string
//     const jsonData = JSON.stringify(Data, null, 2);

//     // Get the system's temporary directory
//     const tempDir = os.tmpdir();

//     // Specify the file path in the temporary directory
//     const filePath = path.join(tempDir, 'checkInData.json');

//     // Write the JSON data to the file
//     fs.writeFileSync(filePath, jsonData, 'utf-8');

//     // Create a download link
//     const downloadLink = `https://luminous-kringle-f75746.netlify.app/download?file=${encodeURIComponent(
//       filePath
//     )}`;

//     // Send the download link as a response
//     res.json({
//       status: true,
//       downloadLink,
//     });
//   } catch (error) {
//     return res.json({
//       status: false,
//       message: error.message,
//     });
//   }
// };

// const checkInReport = async (req, res) => {
//   try {
//     const start_date = req.query.start_date;
//     const end_date = req.query.end_date;

//     const workbook = XLSX.utils.book_new();

//     // const Data = await CheckInTrack.find({}).select({emp_id, task_id, remarks, status, hand_over, current_day});
//     const Data = await CheckInTrack.find({});

//     const data = [];
//     data.push([
//       'emp_id',
//       'task_id',
//       'remarks',
//       'status',
//       'hand_over',
//       'latitude',
//       'longitude',
//       'map'
//     ]);

//     Data.forEach((item, index) => {
//       // console.log('okay', item.emp_id);
//       data.push([
//         item?.emp_id,
//         item?.task_id,
//         item?.remarks || '',
//         item?.status,
//         item?.hand_over,
//         item?.latitude,
//         item?.longitude,
//         `https://maps.google.com/?q=${item?.latitude},${item?.longitude}`,
//       ]);
//     });

//     const worksheet = XLSX.utils.aoa_to_sheet(data);

//     XLSX.utils.book_append_sheet(workbook, worksheet, 'checkinreport');

//     // const xlsxFilePath = 'data.xlsx';
//     const xlsxBuffer = XLSX.write(workbook, {
//       bookType: 'xlsx',
//       type: 'buffer',
//     });

//     // console.log(xlsxBuffer);

//     // Set the response headers for download
//     res.setHeader(
//       'Content-Disposition',
//       'attachment; filename=checkinreport.xlsx'
//     );
//     res.setHeader(
//       'Content-Type',
//       'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
//     );

//     // Send the XLSX buffer as the response
//     res.send(xlsxBuffer);
//     // console.log(Data);
//     // // Convert the Data to a CSV string
//     // const csvData = convertToCSV(Data);
//     // console.log(csvData);

//     // // Set headers to trigger download
//     // res.setHeader('Content-Type', 'text/csv');
//     // res.setHeader(
//     //   'Content-Disposition',
//     //   `attachment; filename=checkInData.csv`
//     // );

//     // // Send the CSV data as a response to trigger download
//     // res.send(csvData);
//   } catch (error) {
//     return res.json({
//       status: false,
//       message: error.message,
//     });
//   }
// };

const checkOutReport = async (req, res) => {
  try {
    const emp_id = req.query.emp_id;
    const emp_name = req.query.emp_name;
    // const start_date = req.query.start_date;
    // const end_date = req.query.end_date;

    const workbook = XLSX.utils.book_new();

    // const Data = await CheckInTrack.find({});
    const Data = await CheckOutAssign.aggregate([
      {
        $match: {
          emp_id: emp_id,
        },
      },
      {
        $lookup: {
          from: 'checkouttracks',
          localField: 'task_id',
          foreignField: 'task_id',
          as: 'tracktask',
        },
      },
    ]);

    // console.log('Data', Data);

    const data = [];
    data.push([
      'emp_id',
      'emp_name',
      'task_detail',
      'status',
      'hand_over_status',
      'handover_to',
      'latitude',
      'longitude',
      'map',
    ]);

    Data.forEach((item, index) => {
      data.push([
        // 'emp_id',
        item?.emp_id || ' ',
        // 'emp_name',
        emp_name ? emp_name : ' ',
        // 'task_detail',
        item?.task_name ? item.task_name : ' ',
        // 'status',
        item?.tracktask[0]?.status ? 'completed' : 'pending',

        // 'hand_over_status',
        item?.tracktask[0]?.hand_over ? 'true' : 'false',
        // 'handover_to',
        item?.tracktask[0]?.hand_over_emp_name
          ? item?.tracktask[0]?.hand_over_emp_name
          : ' ',
        // 'latitude',
        item?.tracktask[0]?.latitude ? item?.tracktask[0]?.latitude : ' ',
        // 'longitude',
        item?.tracktask[0]?.longitude ? item?.tracktask[0]?.longitude : ' ',
        // 'map',
        item?.tracktask[0]?.latitude
          ? `https://maps.google.com/?q=${item?.tracktask[0]?.latitude},${item?.tracktask[0]?.longitude}`
          : ' ',
      ]);
    });

    const worksheet = XLSX.utils.aoa_to_sheet(data);

    XLSX.utils.book_append_sheet(workbook, worksheet, 'checkinreport');

    // Set the response headers for download
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=checkinreport.xlsx'
    );
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );

    // Send the XLSX file as a response
    const xlsxBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'buffer',
    });

    res.send(xlsxBuffer);
  } catch (error) {
    return res.json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = { checkInReport, checkOutReport };
