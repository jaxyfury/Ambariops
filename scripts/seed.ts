
import { MongoClient } from 'mongodb';
import {
  mockUsers,
  mockClusters,
  mockServices,
  mockHosts,
  mockAlerts,
  mockAlertDefinitions,
  mockConfigVersions,
  mockTasks,
  mockActivityLogs,
  mockLogEntries,
  mockPricingTiers,
  mockTestimonials,
  mockFaqs,
} from '../packages/api/src/mocks/mock-data';
import bcrypt from 'bcryptjs';
import { config } from 'dotenv';
import type { DocumentationArticle, LegalDocument } from '@amberops/lib';

config({ path: './.env' });

const docs: Omit<DocumentationArticle, 'id' | 'createdAt' | 'updatedAt'>[] = [
    { slug: 'dashboard', title: 'Dashboard Guide', content: '<h1>Dashboard Guide</h1><p>Your central hub for monitoring the overall health of your infrastructure.</p>' },
    { slug: 'clusters', title: 'Cluster & Host Management', content: '<h1>Cluster & Host Management</h1><p>Learn how to add, view, and manage your clusters and their associated hosts.</p>' },
    { slug: 'services', title: 'Service Management', content: '<h1>Service Management</h1><p>Guides on how to manage services like HDFS and YARN, including actions like start, stop, and restart.</p>' },
];

const legal: Omit<LegalDocument, 'updatedAt'>[] = [
    { type: 'terms', content: '<h1>Terms of Service</h1><p>Please read these terms of service carefully before using AmberOps.</p>' },
    { type: 'privacy', content: '<h1>Privacy Policy</h1><p>Your privacy is important to us. This privacy statement explains the personal data AmberOps processes, how AmberOps processes it, and for what purposes.</p>' }
]

async function seedDatabase() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI is not defined in the .env file');
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db();

    // Hash passwords for mock users
    const usersWithHashedPasswords = await Promise.all(
        mockUsers.map(async (user, index) => ({
            ...user,
            password: await bcrypt.hash(`password${index + 1}`, 10), // Simple password for mocks
            emailVerified: null, 
            createdAt: new Date(),
            updatedAt: new Date(),
            lastLogin: new Date(user.lastLogin),
        }))
    );
    
    // Add a default user for login
    usersWithHashedPasswords.push({
      ...{ id: 'u5', name: 'Jay Prakash', email: 'jay@gmail.com', role: 'Viewer', lastLogin: new Date(), avatar: `https://avatar.vercel.sh/jay` },
      password: await bcrypt.hash('123456', 10),
      emailVerified: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    usersWithHashedPasswords.push({
        ...{ id: 'u6', name: 'Admin User', email: 'admin@amberops.com', role: 'Admin', lastLogin: new Date(), avatar: `https://avatar.vercel.sh/admin` },
        password: await bcrypt.hash('admin@amberops', 10),
        emailVerified: null,
        createdAt: new Date(),
        updatedAt: new Date(),
    });


    // 1. Seed Users
    console.log('Seeding users...');
    await db.collection('users').deleteMany({});
    await db.collection('users').insertMany(usersWithHashedPasswords.map(({ id, ...user}) => user));
    console.log('Users seeded.');

    // 2. Seed Clusters
    console.log('Seeding clusters...');
    await db.collection('clusters').deleteMany({});
    await db.collection('clusters').insertMany(mockClusters.map(c => ({...c, _id: c.id})));
    console.log('Clusters seeded.');

    // 3. Seed Services
    console.log('Seeding services...');
    await db.collection('services').deleteMany({});
    await db.collection('services').insertMany(mockServices.map(s => ({...s, _id: s.id})));
    console.log('Services seeded.');

    // 4. Seed Hosts
    console.log('Seeding hosts...');
    await db.collection('hosts').deleteMany({});
    await db.collection('hosts').insertMany(mockHosts.map(h => ({...h, _id: h.id})));
    console.log('Hosts seeded.');
    
    // 5. Seed Alerts
    console.log('Seeding alerts...');
    await db.collection('alerts').deleteMany({});
    await db.collection('alerts').insertMany(mockAlerts.map(a => ({...a, _id: a.id, timestamp: new Date(a.timestamp)})));
    console.log('Alerts seeded.');

    // 6. Seed Alert Definitions
    console.log('Seeding alertDefinitions...');
    await db.collection('alertDefinitions').deleteMany({});
    await db.collection('alertDefinitions').insertMany(mockAlertDefinitions.map(d => ({...d, _id: d.id})));
    console.log('Alert Definitions seeded.');

    // 7. Seed Config Versions
    console.log('Seeding configVersions...');
    await db.collection('configVersions').deleteMany({});
    await db.collection('configVersions').insertMany(mockConfigVersions.map(v => ({...v, date: new Date(v.date)})));
    console.log('Config Versions seeded.');
    
    // 8. Seed Tasks
    console.log('Seeding tasks...');
    await db.collection('tasks').deleteMany({});
    await db.collection('tasks').insertMany(mockTasks.map(t => ({...t, startTime: new Date(t.startTime)})));
    console.log('Tasks seeded.');

    // 9. Seed Activity Logs
    console.log('Seeding activityLogs...');
    await db.collection('activityLogs').deleteMany({});
    const usersFromDb = await db.collection('users').find({}).toArray();
    const activityLogsToInsert = mockActivityLogs.map(log => {
        const user = usersFromDb.find(u => u.email === log.user.email);
        return {
            ...log,
            timestamp: new Date(log.timestamp),
            user: {
              id: user?._id.toString(),
              name: user?.name,
              email: user?.email,
              avatar: user?.avatar,
            },
        }
    });
    // @ts-ignore
    await db.collection('activityLogs').insertMany(activityLogsToInsert.map(a => ({...a, _id: a.id})));
    console.log('Activity Logs seeded.');
    
    // 10. Seed Log Entries
    console.log('Seeding logEntries...');
    await db.collection('logEntries').deleteMany({});
    await db.collection('logEntries').insertMany(mockLogEntries.map(l => ({...l, timestamp: new Date(l.timestamp)})));
    console.log('Log Entries seeded.');

    // 11. Seed Documentation
    console.log('Seeding documentation...');
    await db.collection('documentations').deleteMany({});
    await db.collection('documentations').insertMany(docs.map(d => ({...d, createdAt: new Date(), updatedAt: new Date() })));
    console.log('Documentation seeded.');

    // 12. Seed Legal Docs
    console.log('Seeding legals...');
    await db.collection('legals').deleteMany({});
    await db.collection('legals').insertMany(legal.map(l => ({...l, updatedAt: new Date() })));
    console.log('Legal documents seeded.');
    
    // 13. Seed Pricing Tiers
    console.log('Seeding pricingTiers...');
    await db.collection('pricingtiers').deleteMany({});
    await db.collection('pricingtiers').insertMany(mockPricingTiers.map(t => ({...t, _id: t.id})));
    console.log('Pricing tiers seeded.');
    
    // 14. Seed Testimonials
    console.log('Seeding testimonials...');
    await db.collection('testimonials').deleteMany({});
    await db.collection('testimonials').insertMany(mockTestimonials.map(t => ({...t, _id: t.id})));
    console.log('Testimonials seeded.');
    
    // 15. Seed FAQs
    console.log('Seeding faqs...');
    await db.collection('faqs').deleteMany({});
    await db.collection('faqs').insertMany(mockFaqs.map(f => ({...f, _id: f.id})));
    console.log('FAQs seeded.');


    console.log('Database seeding completed successfully!');
  } catch (err) {
    console.error('Error during database seeding:', err);
  } finally {
    await client.close();
    console.log('MongoDB connection closed.');
  }
}

seedDatabase();
