// Database Setup Script for Supabase
// Run with: node scripts/setup-database.js

const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

// Extract project ref from Supabase URL
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const projectRef = supabaseUrl.match(/https:\/\/([^.]+)\.supabase\.co/)?.[1];

if (!projectRef) {
  console.error('Could not extract project reference from SUPABASE_URL');
  process.exit(1);
}

// Database connection string
// Note: You may need to set SUPABASE_DB_PASSWORD in your .env.local
const dbPassword = process.env.SUPABASE_DB_PASSWORD || process.env.SUPABASE_SERVICE_ROLE_KEY;

const connectionString = `postgresql://postgres.${projectRef}:${dbPassword}@aws-0-ap-south-1.pooler.supabase.com:6543/postgres`;

async function runSQL(client, sqlFile, description) {
  console.log(`\n📦 ${description}...`);
  try {
    const sql = fs.readFileSync(path.join(__dirname, '..', sqlFile), 'utf8');

    // Split by semicolons but handle edge cases
    const statements = sql
      .split(/;(?=\s*(?:--|\/\*|CREATE|INSERT|ALTER|DROP|UPDATE|DELETE|$))/gi)
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));

    for (const statement of statements) {
      if (statement.trim()) {
        try {
          await client.query(statement);
        } catch (err) {
          // Ignore "already exists" errors
          if (!err.message.includes('already exists') && !err.message.includes('duplicate key')) {
            console.error(`  ⚠ Warning: ${err.message.split('\n')[0]}`);
          }
        }
      }
    }
    console.log(`  ✅ ${description} complete`);
  } catch (error) {
    console.error(`  ❌ Error: ${error.message}`);
    throw error;
  }
}

async function setupDatabase() {
  console.log('🚀 Starting Supabase Database Setup\n');
  console.log(`   Project: ${projectRef}`);

  const client = new Client({ connectionString });

  try {
    console.log('\n🔌 Connecting to database...');
    await client.connect();
    console.log('   ✅ Connected successfully');

    // Run schema
    await runSQL(client, 'supabase/schema.sql', 'Running database schema');

    // Run seed data
    await runSQL(client, 'supabase/seed.sql', 'Seeding initial data');

    // Create admin user
    console.log('\n👤 Creating admin user...');
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@preciousinteriors.com';

    // Check if admin profile exists
    const result = await client.query(
      `SELECT id FROM admin_profiles LIMIT 1`
    );

    if (result.rows.length === 0) {
      console.log(`   ℹ Admin user needs to be created in Supabase Auth Dashboard`);
      console.log(`   Email: ${adminEmail}`);
      console.log(`   After creating in Auth, run this SQL in Supabase SQL Editor:`);
      console.log(`
   INSERT INTO admin_profiles (id, full_name, role)
   SELECT id, 'Admin', 'admin'
   FROM auth.users
   WHERE email = '${adminEmail}';
      `);
    } else {
      console.log('   ✅ Admin profile already exists');
    }

    console.log('\n✨ Database setup complete!\n');
    console.log('Next steps:');
    console.log('1. Go to Supabase Dashboard → Authentication → Users');
    console.log(`2. Create user: ${adminEmail}`);
    console.log('3. Run the admin profile SQL shown above');
    console.log('4. Restart the dev server and test the app\n');

  } catch (error) {
    console.error('\n❌ Setup failed:', error.message);
    console.log('\n📋 Alternative: Run the SQL manually in Supabase Dashboard');
    console.log('   1. Go to: https://supabase.com/dashboard/project/' + projectRef + '/sql');
    console.log('   2. Copy and paste contents of: supabase/schema.sql');
    console.log('   3. Click "Run"');
    console.log('   4. Then paste and run: supabase/seed.sql\n');
  } finally {
    await client.end();
  }
}

setupDatabase();
