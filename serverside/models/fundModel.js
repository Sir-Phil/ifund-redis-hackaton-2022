const mongoose = require('mongoose')

const fundSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },

        fundItems: [
            {
                name: {type: String, required: true },
                amount: {type: Number, required: true},
                project: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: 'Projects'
                },
            },
        ],

        fundAddress: {
            address: {type: String, required: true},
            city: {type: String, required: true},
            country: {type: String, required: true}
        },

        isFunded: {
            type: Boolean,
            required: true,
            default: false,
        },

        fundedAt: {
            type: Date,
        },

        isContacted: {
            type: Boolean,
            required: true,
            default: false,
        },
        contactedAt: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
)

const Fund = mongoose.model('Fund', fundSchema)

module.exports = Fund