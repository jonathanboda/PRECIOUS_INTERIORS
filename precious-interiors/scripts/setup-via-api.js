const https = require('https');
const fs = require('fs');
const path = require('path');

const projectRef = 'stwnslyrdafbrghckrfe';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0d25zbHlyZGFmYnJnaGNrcmZlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTgyMjY1OSwiZXhwIjoyMDg3Mzk4NjU5fQ.LjPaEbiVQSYwAUS1CjLnp6_aQM_MD_z6vz-toSsY0oU';
const dbPassword = 'Jessypavithra@0707';

// First, test if the Supabase project is accessible
async function testSupabaseConnection() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: `${projectRef}.supabase.co`,
      path: '/rest/v1/',
      method: 'GET',
      headers: {
        'apikey': serviceRoleKey,
        'Authorization': `Bearer ${serviceRoleKey}`
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        console.log(`API Status: ${res.statusCode}`);
        resolve({ status: res.statusCode, data });
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    req.end();
  });
}

// Try to create tables using the REST API (won't work for DDL, but let's check)
async function checkExistingTables() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: `${projectRef}.supabase.co`,
      path: '/rest/v1/projects?select=*',
      method: 'GET',
      headers: {
        'apikey': serviceRoleKey,
        'Authorization': `Bearer ${serviceRoleKey}`
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        console.log(`Tables check status: ${res.statusCode}`);
        if (res.statusCode === 200) {
          console.log('Projects table exists!');
        } else {
          console.log('Projects table does not exist yet');
        }
        resolve({ status: res.statusCode, data });
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    req.end();
  });
}

// Use pg with more connection options
async function tryDatabaseConnection() {
  const { Client } = require('pg');

  // Get all possible regions from Supabase
  const regions = [
    'aws-0-ap-south-1',      // India
    'aws-0-us-east-1',       // US East
    'aws-0-us-west-1',       // US West
    'aws-0-eu-west-1',       // EU West
    'aws-0-eu-central-1',    // EU Central
    'aws-0-ap-southeast-1',  // Singapore
    'aws-0-ap-northeast-1',  // Tokyo
    'aws-0-sa-east-1',       // South America
  ];

  // Also try the direct connection
  const connectionConfigs = [];

  // Direct connection (no pooler)
  connectionConfigs.push({
    name: 'Direct connection',
    connectionString: `postgresql://postgres:${encodeURIComponent(dbPassword)}@db.${projectRef}.supabase.co:5432/postgres`,
    ssl: { rejectUnauthorized: false }
  });

  // Pooler connections for each region
  for (const region of regions) {
    // Transaction mode (port 6543)
    connectionConfigs.push({
      name: `Pooler ${region} (transaction)`,
      connectionString: `postgresql://postgres.${projectRef}:${encodeURIComponent(dbPassword)}@${region}.pooler.supabase.com:6543/postgres`,
      ssl: { rejectUnauthorized: false }
    });

    // Session mode (port 5432)
    connectionConfigs.push({
      name: `Pooler ${region} (session)`,
      connectionString: `postgresql://postgres.${projectRef}:${encodeURIComponent(dbPassword)}@${region}.pooler.supabase.com:5432/postgres`,
      ssl: { rejectUnauthorized: false }
    });
  }

  for (const config of connectionConfigs) {
    console.log(`\nTrying: ${config.name}...`);

    const client = new Client({
      connectionString: config.connectionString,
      ssl: config.ssl,
      connectionTimeoutMillis: 10000
    });

    try {
      await client.connect();
      console.log('✅ CONNECTED!');

      // Run the schema
      console.log('Running schema...');
      const schemaPath = path.join(__dirname, '..', 'supabase', 'complete-setup.sql');
      const sql = fs.readFileSync(schemaPath, 'utf8');

      // Split and run statements
      const statements = sql.split(/;\s*\n/).filter(s => {
        const t = s.trim();
        return t && !t.startsWith('--');
      });

      let success = 0;
      let failed = 0;

      for (const stmt of statements) {
        const trimmed = stmt.trim();
        if (!trimmed) continue;

        try {
          await client.query(trimmed);
          success++;
          process.stdout.write('.');
        } catch (err) {
          if (err.message.includes('already exists') || err.message.includes('duplicate')) {
            success++;
            process.stdout.write('.');
          } else {
            failed++;
            process.stdout.write('x');
          }
        }
      }

      console.log(`\n✅ Schema complete: ${success} successful, ${failed} errors`);

      await client.end();
      return true;
    } catch (err) {
      console.log(`❌ ${err.message.substring(0, 60)}`);
      try { await client.end(); } catch (e) {}
    }
  }

  return false;
}

async function main() {
  console.log('🚀 Supabase Database Setup\n');
  console.log(`Project: ${projectRef}\n`);

  // Test API connection first
  console.log('Testing Supabase API connection...');
  try {
    const result = await testSupabaseConnection();
    if (result.status === 200) {
      console.log('✅ Supabase API is accessible\n');
    } else {
      console.log(`⚠ API returned status ${result.status}\n`);
    }
  } catch (err) {
    console.log(`❌ API error: ${err.message}\n`);
  }

  // Check if tables exist
  console.log('Checking for existing tables...');
  try {
    await checkExistingTables();
  } catch (err) {
    console.log(`Check error: ${err.message}`);
  }

  // Try database connection
  console.log('\n--- Attempting Database Connection ---');
  const connected = await tryDatabaseConnection();

  if (!connected) {
    console.log('\n❌ Could not connect to database with any method.');
    console.log('\nPlease run the SQL manually at:');
    console.log(`https://supabase.com/dashboard/project/${projectRef}/sql/new`);
  }
}

main().catch(console.error);
