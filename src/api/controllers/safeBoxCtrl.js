const SafeBox = require("../models/safeBoxMdl")

const getOneSafeBox = async (req, res) => {
    try {
        const { id } = req.params
        const oneSafeBox = await SafeBox.findById(id)
        return res.status(200).json(oneSafeBox)

    } catch (error) {
        return res.status(500).json(error)
    }
}


const postSafeBox = async (req, res) => {
    try {
        const newSafeBox = new SafeBox(req.body)
        const createdSafeBox = await newSafeBox.save()
        return res.status(201).json(createdSafeBox)
    } catch (error) {
        return res.status(500).json(error)
    }
}

const putSafeBox = async (req, res) => {
    try {
        const { id } = req.params
        const putSafeBox = new putSafeBox(req.body)
        putSafeBox._id = id;
        const updateSafeBox = await User.findByIdAndUpdate(id, putSafeBox, { new: true })
        if (!updateSafeBox) {
            return res.status(404).json({ message: "This Safebox doesn't exist" })
        }
        return res.status(200).json(updateSafeBox)
    } catch (error) {
        return res.status(500).json(error)
    }
}

module.exports={ getOneSafeBox,postSafeBox,putSafeBox }
