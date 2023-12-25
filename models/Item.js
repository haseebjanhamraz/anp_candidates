// models/item.js

const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  fathername: { type: String, required: true },
  contactNumber: { type: String, required: true },
  district: { type: String, required: true },
  constituencyType: { type: String, required: true },
  constituency: { type: String, required: true },
  cnic: { type: String, required: true },
  currentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  suggesterName: { type: String, required: true },
  suggesterFatherName: { type: String, required: true },
  suggesterContactNum: { type: String, required: true },
  suggesterCNIC: { type: String, required: true },
  suggesterCurrentAddress: { type: String, required: true },
  suggConstTyp: { type: String, required: true },
  suggesterConstituency: { type: String, required: true },
  vindicatorName: { type: String, required: true },
  vindicatorFatherName: { type: String, required: true },
  vindicatorContactNum: { type: String, required: true },
  vindicatorCNIC: { type: String, required: true },
  vindicatorCurrentAddress: { type: String, required: true },
  vindConstTyp: { type: String, required: true },
  vindicatorConstituency: { type: String, required: true },
  candidateSign: { type: String, required: true },
  suggesterSign: { type: String, required: true },
  vindicatorSign: { type: String, required: true },
  ucPresidentSign: { type: String, required: true },
  tehsilPresidentSign: { type: String, required: true },
  districtPresidentSign: { type: String, required: true },
  ticketIssued: { type: String, required: false },

  imagePath: {type: String, required: true},
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
