 const Dashboard = require('../models/Dashboard');

const createDashboard = async(req, res)=>{
    try {
        const {name, amount, fromDate, toDate } = req.body

        const dashboard = new Dashboard({
            name,
            amount,
            fromDate,
            toDate
        });
        await dashboard.save();
        res.status(201).json(dashboard)     
    } catch (error) {
        console.log("There is an error",error);
        res.status(500).json({message:'Server error'})
        
    }
}
const getDashboard =  async(req,res)=>{
    try {
        const dashboard = await Dashboard.find()
        res.status(200).json(dashboard);
                
    } catch (error) {
        console.log("There is an error", error)
        res.status(500).json({message:"server error"})
        
    }

}
module.exports = {createDashboard, getDashboard}