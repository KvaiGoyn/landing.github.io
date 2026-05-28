const nodemailer = require('nodemailer');
const net = require('net');

const configs = [
  { host: 'smtp.yandex.ru', port: 465, secure: true, name: 'Yandex SSL' },
  { host: 'smtp.yandex.ru', port: 587, secure: false, name: 'Yandex TLS' },
  { host: 'smtp.yandex.com', port: 465, secure: true, name: 'Yandex Alt SSL' },
  { host: 'smtp.yandex.com', port: 587, secure: false, name: 'Yandex Alt TLS' },
];

const credentials = {
  user: process.env.SMTP_USER || 'kvaigon.zamyatin@yandex.ru',
  pass: process.env.SMTP_PASS || 'gbumacfxbztjxyzs',
};

async function testPort(host, port) {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    const timeout = 5000;
    socket.setTimeout(timeout);
    socket.on('connect', () => {
      socket.destroy();
      resolve({ host, port, open: true });
    });
    socket.on('timeout', () => {
      socket.destroy();
      resolve({ host, port, open: false, error: 'Timeout' });
    });
    socket.on('error', (err) => {
      resolve({ host, port, open: false, error: err.code || err.message });
    });
    socket.connect(port, host);
  });
}

async function testSmtp(config) {
  console.log(`\n=== Testing ${config.name} (${config.host}:${config.port}) ===`);
  
  // First test port connectivity
  const portResult = await testPort(config.host, config.port);
  console.log(`Port ${config.port} open: ${portResult.open} ${portResult.error ? `(${portResult.error})` : ''}`);
  
  if (!portResult.open) {
    return { success: false, error: `Port ${config.port} closed: ${portResult.error}` };
  }

  // Test SMTP connection
  try {
    const transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: credentials,
      tls: { rejectUnauthorized: false },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
    });

    const verifyResult = await transporter.verify();
    console.log(`SMTP connection successful: ${verifyResult}`);
    
    // Try to send a test email
    const testEmail = {
      from: `"Test" <${credentials.user}>`,
      to: 'nezabut123@gmail.com',
      subject: `Test SMTP ${config.name}`,
      text: `This is a test email from ${config.host}:${config.port} at ${new Date().toISOString()}`,
    };

    const info = await transporter.sendMail(testEmail);
    console.log(`Test email sent: ${info.messageId}`);
    console.log(`Response: ${info.response}`);
    
    return { success: true, messageId: info.messageId, config };
  } catch (error) {
    console.error(`SMTP error: ${error.message}`);
    if (error.code) console.error(`Error code: ${error.code}`);
    return { success: false, error: error.message, config };
  }
}

async function main() {
  console.log('=== SMTP Port and Connection Tester ===');
  console.log(`Using credentials: ${credentials.user}`);
  
  const results = [];
  for (const config of configs) {
    const result = await testSmtp(config);
    results.push(result);
  }
  
  console.log('\n=== Summary ===');
  results.forEach((result, idx) => {
    const config = configs[idx];
    if (result.success) {
      console.log(`✅ ${config.name} (${config.host}:${config.port}): SUCCESS`);
    } else {
      console.log(`❌ ${config.name} (${config.host}:${config.port}): FAILED - ${result.error}`);
    }
  });
  
  // Recommend best configuration
  const successful = results.filter(r => r.success);
  if (successful.length > 0) {
    console.log('\n✅ RECOMMENDED CONFIGURATION:');
    successful.forEach((result, idx) => {
      console.log(`${idx + 1}. ${result.config.name}: ${result.config.host}:${result.config.port} (${result.config.secure ? 'SSL' : 'TLS'})`);
    });
  } else {
    console.log('\n❌ All configurations failed. Check firewall, credentials, and Yandex SMTP settings.');
    console.log('Possible solutions:');
    console.log('1. Ensure port 465 or 587 is open in server firewall');
    console.log('2. Check Yandex "Allow insecure apps" setting');
    console.log('3. Verify SMTP credentials are correct');
    console.log('4. Consider using alternative SMTP service (Gmail, Mailgun, etc.)');
  }
}

main().catch(console.error);