import mongoose from "mongoose";

const organizationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usersignups',
    },
    logo:{
        type:String,
    },
    organizationName: {
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
            unique:true,
        },
        phone: {
            type: String,
        },
        address: {
            type: String,
            trim: true,
        },
        website: {
            type: String,
        },
    },
    socialMedia: {
        linkedin: {
            type: String,
        },
        twitter: {
            type: String,
        },
        facebook: {
            type: String,
        },
    },
    services: {
        type: [String],
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'postajobs',
    }
});

// Create the model
export const Organization = mongoose.models.organizations || mongoose.model("organizations", organizationSchema);


