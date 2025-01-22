const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['add_money', 'transfer', 'payment'], required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['success', 'failed', 'pending'], default: 'pending' },
  recipientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Transaction', transactionSchema);
