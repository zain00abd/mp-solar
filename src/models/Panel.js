import mongoose from 'mongoose';

const SpecSchema = new mongoose.Schema({
  label: { type: String, required: true, trim: true },
  value: { type: String, required: true, trim: true }
}, { _id: false });

const PanelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [200, 'Product name cannot exceed 200 characters']
  },
  category: {
    type: String,
    enum: ['products'],
    default: 'products',
    lowercase: true
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: [true, 'Company is required']
  },
  badge: { type: String, trim: true, maxlength: [50, 'Badge cannot exceed 50 characters'] },
  image: { type: String, required: [true, 'Product image is required'], trim: true },
  description: { type: String, required: [true, 'Product description is required'], trim: true, maxlength: [1000, 'Description cannot exceed 1000 characters'] },
  features: [{ type: String, trim: true, maxlength: [200, 'Feature cannot exceed 200 characters'] }],
  specs: [SpecSchema],
  price: { type: Number, required: [true, 'Price is required'], min: [0, 'Price cannot be negative'] },
  currency: { type: String, default: 'USD', enum: ['USD', 'EUR', 'SAR', 'AED'], uppercase: true },
  availability: { type: String, enum: ['in-stock', 'out-of-stock', 'pre-order'], default: 'in-stock' },
  isActive: { type: Boolean, default: true },
  tags: [{ type: String, trim: true, lowercase: true }],
  warranty: {
    years: { type: Number, min: [0, 'Warranty years cannot be negative'] },
    type: { type: String, enum: ['product', 'performance', 'linear-power'], default: 'product' }
  }
}, { timestamps: true });

PanelSchema.index({ company: 1 });
PanelSchema.index({ name: 'text', description: 'text' });
PanelSchema.index({ price: 1 });
PanelSchema.index({ isActive: 1 });

PanelSchema.virtual('formattedPrice').get(function() {
  return `${this.currency} ${this.price.toLocaleString()}`;
});

PanelSchema.pre(/^find/, function(next) {
  this.populate({ path: 'company', select: 'name country logo' });
  next();
});

export default mongoose.models.Panel || mongoose.model('Panel', PanelSchema);