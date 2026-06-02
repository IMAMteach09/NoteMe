import dns from 'dns';
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI?.trim();
    if (!uri) {
      throw new Error('MONGO_URI must be defined in environment variables');
    }

    if (/[<>]/.test(uri)) {
      throw new Error(
        'MONGO_URI still contains placeholder characters. Replace <username> and <password> with the real Atlas credentials and keep special characters URL-encoded.'
      );
    }

    try {
      await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    } catch (error) {
      const isSrvUri = uri.startsWith('mongodb+srv://');
      const isDnsLookupFailure = error?.code === 'ECONNREFUSED' && String(error?.hostname || '').includes('_mongodb._tcp');

      if (!isSrvUri || !isDnsLookupFailure) {
        throw error;
      }

      const dnsServers = process.env.MONGO_DNS_SERVERS
        ?.split(',')
        .map((server) => server.trim())
        .filter(Boolean);

      dns.setServers(dnsServers && dnsServers.length > 0 ? dnsServers : ['1.1.1.1', '8.8.8.8']);
      await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    }

    console.log('MongoDB connection established');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }
};

export default connectDB;
