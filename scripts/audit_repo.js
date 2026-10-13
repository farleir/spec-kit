#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const repoPath = process.argv[2] ? path.resolve(process.argv[2]) : process.cwd();
const repoName = path.basename(repoPath);

console.log(`\n🔍 Auditoria SDD / Spec-Kit: ${repoName}`);
console.log(`📂 Caminho: ${repoPath}\n`);

const checks = [
  {
    name: 'Cloudflare Pages _headers',
    file: path.join(repoPath, 'public', '_headers'),
    alt: path.join(repoPath, '_headers'),
    critical: true
  },
  {
    name: 'Robots.txt',
    file: path.join(repoPath, 'public', 'robots.txt'),
    alt: path.join(repoPath, 'robots.txt'),
    critical: false
  },
  {
    name: 'CNAME de Domínio',
    file: path.join(repoPath, 'public', 'CNAME'),
    alt: path.join(repoPath, 'CNAME'),
    critical: false
  },
  {
    name: 'Package Manifest (package.json)',
    file: path.join(repoPath, 'package.json'),
    critical: true
  }
];

let passed = 0;

for (const check of checks) {
  const exists = fs.existsSync(check.file) || (check.alt && fs.existsSync(check.alt));
  if (exists) {
    console.log(`  ✅ [PASS] ${check.name}`);
    passed++;
  } else {
    console.log(`  ${check.critical ? '❌ [FAIL]' : '⚠️ [WARN]'} ${check.name} ausente`);
  }
}

console.log(`\n📊 Pontuação: ${passed}/${checks.length} conformidades verificadas.\n`);
