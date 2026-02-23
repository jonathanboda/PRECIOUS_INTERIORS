const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

const projectRef = 'stwnslyrdafbrghckrfe';
const dbPassword = 'Jessypavithra@0707';

// Try multiple connection formats
const connectionStrings = [
  // Pooler - different regions
  `postgresql://postgres.${projectRef}:${encodeURIComponent(dbPassword)}@aws-0-us-east-1.pooler.supabase.com:6543/postgres`,
  `postgresql://postgres.${projectRef}:${encodeURIComponent(dbPassword)}@aws-0-us-west-1.pooler.supabase.com:6543/postgres`,
  `postgresql://postgres.${projectRef}:${encodeURIComponent(dbPassword)}@aws-0-eu-central-1.pooler.supabase.com:6543/postgres`,
  `postgresql://postgres.${projectRef}:${encodeURIComponent(dbPassword)}@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres`,
  // Direct connection
  `postgresql://postgres:${encodeURIComponent(dbPassword)}@db.${projectRef}.supabase.co:5432/postgres`,
  // Session mode pooler
  `postgresql://postgres.${projectRef}:${encodeURIComponent(dbPassword)}@aws-0-us-east-1.pooler.supabase.com:5432/postgres`,
];

async function runSQL(client, filePath, description) {
  console.log(`\n📦 ${description}...`);
  const sql = fs.readFileSync(filePath, 'utf8');

  const statements = sql.split(/;\s*\n/).filter(s => {
    const t = s.trim();
    return t && !t.startsWith('--');
  });

  let success = 0;
  let failed = 0;

  for (const stmt of statements) {
    const trimmed = stmt.trim();
    if (!trimmed || trimmed.startsWith('--')) continue;

    try {
      await client.query(trimmed);
      success++;
      process.stdout.write('.');
    } catch (stmtErr) {
      if (stmtErr.message.includes('already exists') ||
          stmtErr.message.includes('duplicate')) {
        success++;
        process.stdout.write('.');
      } else {
        failed++;
        process.stdout.write('x');
      }
    }
  }

  console.log(`\n  ✅ Completed: ${success} successful, ${failed} errors`);
  return true;
}

async function main() {
  console.log('🚀 Supabase Database Setup\n');
  console.log(`   Project: ${projectRef}`);

  let client = null;
  let connected = false;

  for (const connStr of connectionStrings) {
    const shortUrl = connStr.replace(/:.*@/, ':***@').substring(0, 80);
    console.log(`\n🔌 Trying: ${shortUrl}...`);

    try {
      client = new Client({
        connectionString: connStr,
        ssl: { rejectUnauthorized: false },
        connectionTimeoutMillis: 10000
      });
      await client.connect();
      console.log('   ✅ Connected!');
      connected = true;
      break;
    } catch (err) {
      console.log(`   ❌ ${err.message.substring(0, 50)}`);
      if (client) {
        try { await client.end(); } catch (e) {}
      }
    }
  }

  if (!connected) {
    console.log('\n❌ Could not connect with any method.');
    console.log('\nPlease run SQL manually at:');
    console.log('https://supabase.com/dashboard/project/' + projectRef + '/sql/new');
    return;
  }

  try {
    await runSQL(client, path.join(__dirname, '..', 'supabase', 'schema.sql'), 'Running schema');
    await runSQL(client, path.join(__dirname, '..', 'supabase', 'seed.sql'), 'Seeding data');

    console.log('\n✨ Database setup complete!');
    console.log('\n📋 Final step - Create admin user:');
    console.log('   URL: https://supabase.com/dashboard/project/' + projectRef + '/auth/users');
    console.log('   Email: admin@preciousinteriors.com');
    console.log('   Password: PreciousAdmin2024!');

  } catch (err) {
    console.error('\n❌ Error:', err.message);
  } finally {
    if (client) await client.end();
  }
}

main();
