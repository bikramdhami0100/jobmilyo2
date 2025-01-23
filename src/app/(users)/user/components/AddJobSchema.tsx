import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for the Job document
interface IJob extends Document {
  jobtitle: string;
  description: string;
  qualification: string;
  last_date: string;
  job_type: string;
  company_logo: string;
  email: string;
  country: string;
  number_of_post: string;
  experience: string;
  specialization_req: string;
  salary: string;
  company: string;
  website_url: string;
  address: string;
  state: string;
}

// Define the schema corresponding to the document interface
const JobSchema: Schema = new Schema({
  jobtitle: { type: String, required: true },
  description: { type: String, required: true },
  qualification: { type: String, required: true },
  last_date: { type: String, required: true },
  job_type: { type: String, required: true },
  company_logo: { type: String, required: true },
  email: { type: String, required: true },
  country: { type: String, required: true },
  number_of_post: { type: String, required: true },
  experience: { type: String, required: true },
  specialization_req: { type: String, required: true },
  salary: { type: String, required: true },
  company: { type: String, required: true },
  website_url: { type: String, required: true },
  address: { type: String, required: true },
  state: { type: String, required: true },
  job_posted:{type:Date,default:Date.now}
});

// Create the model from the schema and export it
const AddJob =mongoose.models.Job|| mongoose.model<IJob>('Job', JobSchema);
export default AddJob;
