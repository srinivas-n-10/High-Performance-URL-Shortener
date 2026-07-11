const mongoose = require('mongoose');

const clickSchema = new mongoose.Schema(
  {
    url: { type: mongoose.Schema.Types.ObjectId, ref: 'Url', required: true, index: true },
    device: { type: String, default: 'unknown' },
    browser: { type: String, default: 'unknown' },
    os: { type: String, default: 'unknown' },
    country: { type: String, default: 'unknown' },
    referrer: { type: String, default: 'direct' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Click', clickSchema);