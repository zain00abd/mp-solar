import mongoose from 'mongoose';

const SpecSchema = new mongoose.Schema({
  label: { type: String, required: true, trim: true },
  value: { type: String, required: true, trim: true }
}, { _id: false });

const BatterySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [200, 'Product name cannot exceed 200 characters']
  },
  category: {
    type: String,
    enum: ['batteries'],
    default: 'batteries',
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

BatterySchema.index({ company: 1 });
BatterySchema.index({ name: 'text', description: 'text' });
BatterySchema.index({ price: 1 });
BatterySchema.index({ isActive: 1 });

BatterySchema.virtual('formattedPrice').get(function() {
  return `${this.currency} ${this.price.toLocaleString()}`;
});

BatterySchema.pre(/^find/, function(next) {
  this.populate({ path: 'company', select: 'name country logo color1 color2 color3' });
  next();
});

export default mongoose.models.Battery || mongoose.model('Battery', BatterySchema);