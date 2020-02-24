'use strict'

const SecureIdHook = (exports = module.exports = {})

const uuidv4 = require('uuid/v4')

SecureIdHook.uuid = async (object) => {
    object.secure_id = uuidv4()
}
