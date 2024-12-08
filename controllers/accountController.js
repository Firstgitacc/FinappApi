const Account = require('../models/Account');

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
        console.error("There is an error",error);
        res.status(500).json({ message: 'Server Error' });
    }
}
// Get all account records
const getAllAccounts = async (req, res) => {
    try {
        const accounts = await Account.find();
        res.status(201).json(accounts)
        
    } catch (error) {
        console.error("There is an error",error);
        res.status(500).json({ message: 'Server Error' });
        
    }
}
// Update an account record
 const UpdateAccount = async(req, res)=>{
    const {id} = req.params;
    const { date, dcc, vcj, dvs, sc } = req.body
    try {
        const updatedAccount = await Account.findByIdAndUpdate(id, { date, dcc, vcj, dvs, sc }, { new: true });
        if (!updatedAccount) return res.status(404).json({ message: 'Account record not found' });
        res.status(200).json({ message: 'Account record updated successfully', record: updatedAccount });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
 }
 // Delete an account record
 const deleteAccount = async (req, res) => {
    const {id} = req.params;
    try {
        const deletedAccount = await Account.findByIdAndDelete(id);
        if(!deletedAccount) return res.status(404).json({ message: 'Account record not found' });
        res.status(200).json({ message: 'Account record deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
 }
 module.exports = {addAccount,getAllAccounts, UpdateAccount, deleteAccount}