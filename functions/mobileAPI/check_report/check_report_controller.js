const fs = require('fs');
const os = require('os');
const path = require('path');
const XLSX = require('xlsx');

// const CheckInTrack = require('../models/check_in_track');
// const CheckOutTrack = require('../models/check_out_track');
const CheckInTask = require('./../check_in_task/check_in_task_model');
const CheckOutTask = require('./../check_out_task/check_out_task_model');

const checkInReport = async (req, res) => {
  try {
    const emp_id = req.query.emp_id;
    const emp_name = req.query.emp_name;
    const workbook = XLSX.utils.book_new();
    // const Data = await CheckInTrack.find({});
    const Data = await CheckInTask.aggregate([
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
const checkOutReport = async (req, res) => {
  try {
    const emp_id = req.query.emp_id;
    const emp_name = req.query.emp_name;
    // const start_date = req.query.start_date;
    // const end_date = req.query.end_date;

    const workbook = XLSX.utils.book_new();

    // const Data = await CheckInTrack.find({});
    const Data = await CheckOutTask.aggregate([
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

const checkInReportView = async (req, res) => {
  try {
    const emp_id = req.body.emp_id;
    const emp_name = req.body.emp_name;
    const Data = await CheckInTask.aggregate([
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
    Data.forEach((item, index) => {
      data.push({
        // 'emp_id',
        emp_id: item?.emp_id || ' ',
        // 'emp_name',
        emp_name: emp_name ? emp_name : ' ',
        // 'task_detail',
        task_detail: item?.task_name ? item.task_name : ' ',
        // 'status',
        status: item?.tracktask[0]?.status ? 'completed' : 'pending',

        // 'hand_over_status',
        hand_over_status: item?.tracktask[0]?.hand_over ? 'true' : 'false',
        // 'handover_to',
        handover_to: item?.tracktask[0]?.hand_over_emp_name
          ? item?.tracktask[0]?.hand_over_emp_name
          : ' ',
        // 'latitude',
        latitude: item?.tracktask[0]?.latitude
          ? item?.tracktask[0]?.latitude
          : ' ',
        // 'longitude',
        longitude: item?.tracktask[0]?.longitude
          ? item?.tracktask[0]?.longitude
          : ' ',
        // 'map',
        map: item?.tracktask[0]?.latitude
          ? `https://maps.google.com/?q=${item?.tracktask[0]?.latitude},${item?.tracktask[0]?.longitude}`
          : ' ',
      });
    });
    res.status(200).json({
      status: true,
      data: data,
    });
  } catch (error) {
    return res.json({
      status: false,
      message: error.message,
    });
  }
};

const checkOutReportView = async (req, res) => {
  try {
    const emp_id = req.body.emp_id;
    const emp_name = req.body.emp_name;
    const Data = await CheckOutTask.aggregate([
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

    const data = [];
    Data.forEach((item, index) => {
      data.push({
        // 'emp_id',
        emp_id: item?.emp_id || ' ',
        // 'emp_name',
        emp_name: emp_name ? emp_name : ' ',
        // 'task_detail',
        task_detail: item?.task_name ? item.task_name : ' ',
        // 'status',
        status: item?.tracktask[0]?.status ? 'completed' : 'pending',

        // 'hand_over_status',
        hand_over_status: item?.tracktask[0]?.hand_over ? 'true' : 'false',
        // 'handover_to',
        handover_to: item?.tracktask[0]?.hand_over_emp_name
          ? item?.tracktask[0]?.hand_over_emp_name
          : ' ',
        // 'latitude',
        latitude: item?.tracktask[0]?.latitude
          ? item?.tracktask[0]?.latitude
          : ' ',
        // 'longitude',
        longitude: item?.tracktask[0]?.longitude
          ? item?.tracktask[0]?.longitude
          : ' ',
        // 'map',
        map: item?.tracktask[0]?.latitude
          ? `https://maps.google.com/?q=${item?.tracktask[0]?.latitude},${item?.tracktask[0]?.longitude}`
          : ' ',
      });
    });
    res.status(200).json({
      status: true,
      data: data,
    });
  } catch (error) {
    return res.json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = {
  checkInReport,
  checkOutReport,
  checkInReportView,
  checkOutReportView,
};
