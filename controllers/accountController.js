const Account = require('../models/Account');
const moment = require('moment');

// Add a new account record
const addAccount = async (req, res) => {
    const { date, dcc, vcj, dvs, sc } = req.body
    try {
        const account = new Account({
            date,
            dcc,
            vcj,
            dvs,
            sc
        })
        await account.save();
        res.status(201).json({ message: 'Account record added successfully', record: account });
    } catch (error) {
        console.error("There is an error", error);
        res.status(500).json({ message: 'Server Error' });
    }
}
// Get all account records
const getAllAccounts = async (req, res) => {
    try {
        const accounts = await Account.find();
        res.status(201).json(accounts)

    } catch (error) {
        console.error("There is an error", error);
        res.status(500).json({ message: 'Server Error' });

    }
}
// Update an account record
const UpdateAccount = async (req, res) => {
    const { id } = req.params;
    const { date, dcc, vcj, dvs, sc } = req.body
    // Create the updated account object with the updated fields
    const updatedAccount = {};
    if (date) {
        updatedAccount.date = moment(date, 'YYYY-MM-DD').format('YYYY-MM-DD');  // Ensure the date is in the correct format
    }
    if (dcc) updatedAccount.dcc = dcc;
    if (vcj) updatedAccount.vcj = vcj;
    if (dvs) updatedAccount.dvs = dvs;
    if (sc) updatedAccount.sc = sc;
    try {
        // const updatedAccount = await Account.findByIdAndUpdate(id, updatedAccount, { dcc, vcj, dvs, sc }, { new: true });
        // if (!updatedAccount) return res.status(404).json({ message: 'Account record not found' });
        // res.status(200).json({ message: 'Account record updated successfully', record: updatedAccount });
        const result = await Account.findByIdAndUpdate(id, updatedAccount, { new: true });
        if (!result) {
            return res.status(404).json({ message: 'Account record not found' });
        }
        res.status(200).json({
            message: 'Account record updated successfully',
            record: result,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}
// Delete an account record
const deleteAccount = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedAccount = await Account.findByIdAndDelete(id);
        if (!deletedAccount) return res.status(404).json({ message: 'Account record not found' });
        res.status(200).json({ message: 'Account record deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}
module.exports = { addAccount, getAllAccounts, UpdateAccount, deleteAccount }