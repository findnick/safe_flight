import Content from "../models/Content.js"

const getContent = async (req, res) => {
    try {
        const response = await Content.find();
        console.log(response);
        return res.status(200).json(response);
    } catch (err) {
        console.error(err);
    }
}

const addContent = async (req, res) => {
    try {
        const { privacy, cancellation, contactUs, aboutUs, home, campaign } = req.body;
        const data = await Content.updateOne({ privacy, cancellation, contactUs, aboutUs, home, campaign });
        return res.status(200).json(data);
    } catch (err) {
        console.error(err);
    }
}

export { getContent, addContent };