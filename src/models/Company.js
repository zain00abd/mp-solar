import mongoose from 'mongoose';

const CompanySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true,
    maxlength: [100, 'Company name cannot exceed 100 characters']
  },
  country: {
    type: String,
    required: [true, 'Country is required'],
    trim: true,
    maxlength: [50, 'Country name cannot exceed 50 characters']
  },
  logo: {
    type: String,
    required: [true, 'Logo URL is required'],
    trim: true
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  website: {
    type: String,
    trim: true
  },
  established: {
    type: Number,
    min: [1800, 'Establishment year must be after 1800'],
    max: [new Date().getFullYear(), 'Establishment year cannot be in the future']
  }
}, {
  timestamps: true
});

// Create index for faster searches
CompanySchema.index({ name: 1 });
CompanySchema.index({ country: 1 });

export default mongoose.models.Company || mongoose.model('Company', CompanySchema);