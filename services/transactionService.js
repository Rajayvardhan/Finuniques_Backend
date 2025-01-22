const Transaction = require('../models/Transaction');
const Wallet = require('../models/Wallet');

// Handle the transaction logic
exports.handleTransaction = async (userId, type, amount, recipientId) => {
  const wallet = await Wallet.findOne({ userId });

  if (!wallet) {
    throw new Error('Wallet not found');
  }

  if (type !== 'add_money' && wallet.balance < amount) {
    throw new Error('Insufficient wallet balance');
  }

  // Create a new transaction
  const transaction = new Transaction({
    userId,
    type,
    amount,
    recipientId: recipientId || null,
    status: 'success',
  });

  // Update wallet balance
  if (type === 'add_money') {
    wallet.balance += amount;
  } else {
    wallet.balance -= amount;
    if (type === 'transfer' && recipientId) {
      const recipientWallet = await Wallet.findOne({ userId: recipientId });
      if (recipientWallet) {
        recipientWallet.balance += amount;
        await recipientWallet.save();
      }
    }
  }

  await wallet.save();
  await transaction.save();

  return { message: 'Transaction successful', transaction };
};

// Fetch transaction history
exports.fetchTransactionHistory = async (userId) => {
  return await Transaction.find({ userId }).sort({ createdAt: -1 });
};
