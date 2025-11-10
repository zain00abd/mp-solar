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
  },
  color1: {
    type: String,
    trim: true,
    default: 'rgba(30, 64, 175, 1)',
    validate: {
      validator: function(v) {
        // التحقق من صيغة HEX أو RGBA
        const hexPattern = /^#[0-9A-Fa-f]{6}$/;
        const rgbaPattern = /^rgba?\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),?\s*(\d*\.?\d+)?\)$/;
        return hexPattern.test(v) || rgbaPattern.test(v);
      },
      message: 'Color1 must be a valid hex color (#RRGGBB) or rgba format'
    }
  },
  color2: {
    type: String,
    trim: true,
    default: 'rgba(59, 130, 246, 1)',
    validate: {
      validator: function(v) {
        const hexPattern = /^#[0-9A-Fa-f]{6}$/;
        const rgbaPattern = /^rgba?\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),?\s*(\d*\.?\d+)?\)$/;
        return hexPattern.test(v) || rgbaPattern.test(v);
      },
      message: 'Color2 must be a valid hex color (#RRGGBB) or rgba format'
    }
  },
  color3: {
    type: String,
    trim: true,
    default: 'rgba(96, 165, 250, 1)',
    validate: {
      validator: function(v) {
        const hexPattern = /^#[0-9A-Fa-f]{6}$/;
        const rgbaPattern = /^rgba?\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),?\s*(\d*\.?\d+)?\)$/;
        return hexPattern.test(v) || rgbaPattern.test(v);
      },
      message: 'Color3 must be a valid hex color (#RRGGBB) or rgba format'
    }
  }
}, {
  timestamps: true
});

// Create index for faster searches
CompanySchema.index({ name: 1 });
CompanySchema.index({ country: 1 });

export default mongoose.models.Company || mongoose.model('Company', CompanySchema);