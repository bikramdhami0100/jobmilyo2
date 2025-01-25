import mongoose from "mongoose";

const organizationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usersignups',
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    industry: {
        type: String,
        required: true,
        trim: true,
    },
    headquarters: {
        type: String,
        required: true,
        trim: true,
    },
    founded: {
        type: Date,
        required: true,
    },
    employees: {
        type: Number,
        min: 1, // Minimum 1 employee
    },
    contact: {
        email: {
            type: String,
            required: true,
            match: /.+\@.+\..+/,
        },
        phone: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
            trim: true,
        },
    },
    website: {
        type: String,
        required: true,
        match: /^(https?:\/\/)?([\w-]+)+([\w.-]*)*\/?$/, // Basic URL validation
    },
    socialMedia: {
        linkedin: {
            type: String,
            match: /^(https?:\/\/)?(www\.)?linkedin\.com\/.+$/,
        },
        twitter: {
            type: String,
            match: /^(https?:\/\/)?(www\.)?twitter\.com\/.+$/,
        },
        facebook: {
            type: String,
            match: /^(https?:\/\/)?(www\.)?facebook\.com\/.+$/,
        },
    },
    services: {
        type: [String],
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'postajobs',
    }
});

// Create the model
const Organization = mongoose.models.organizations || mongoose.model("organizations", organizationSchema);

module.exports = Organization;
