const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema(
  {
    longUrl: { type: String, required: true },
    shortCode: { type: String, required: true, unique: true, index: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    customAlias: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    expiresAt: { type: Date, default: null },
    clickCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);


urlSchema.index({ owner: 1, createdAt: -1 });

module.exports = mongoose.model('Url', urlSchema);