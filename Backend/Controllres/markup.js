import Markup from '../models/Markup.js'

const updateMarkup = async(req,res)=>{
    const {markup} = req.body;
    try {
        const response = await Markup.update({markup});
        console.log(response);
        return res.status(200).json(response)
    } catch (error) {
        console.log(error);
        return res.status(400).json(error)
    }
}

const getMarkup = async(req,res)=>{
    try {
        const response = await Markup.find();
        console.log(response);
        return res.status(200).json(response)
    } catch (error) {
        console.log(error);
        return res.status(400).json(error)
    }
}

export {updateMarkup, getMarkup}