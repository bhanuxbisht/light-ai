// Test suite for Patterns & Profile APIs
// Usage: node test-patterns-profile-api.js
// Requires server running at http://localhost:3000

const BASE = 'http://localhost:3000/api';

async function makeRequest(path, options = {}) {
  const url = BASE + path;
  const headers = options.headers || {};
  if (!headers['Content-Type'] && !(options.body instanceof FormData)) headers['Content-Type'] = 'application/json';
  try {
    const res = await fetch(url, {
      method: options.method || 'GET',
      headers,
      body: options.body && headers['Content-Type'] === 'application/json' ? JSON.stringify(options.body) : options.body
    });
    const text = await res.text();
    let data = null;
    try { data = JSON.parse(text); } catch { data = text; }
    return { status: res.status, data };
  } catch (err) {
    return { error: err.message };
  }
}

async function run() {
  console.log('\n=== Patterns & Profile API Test ===\n');

  // 1) GET /api/patterns
  console.log('1) GET /api/patterns');
  let r = await makeRequest('/patterns');
  console.log('Status:', r.status);
  if (r.data && r.data.success) {
    console.log('Patterns count:', r.data.patterns.length);
  } else {
    console.error('Failed to list patterns:', r.data || r.error);
  }

  // choose a slug for detail test
  const slug = r.data && r.data.patterns && r.data.patterns[0] ? r.data.patterns[0].slug : 'arrays-hashing';

  // 2) GET /api/patterns/:slug
  console.log('\n2) GET /api/patterns/' + slug);
  r = await makeRequest('/patterns/' + slug);
  console.log('Status:', r.status);
  if (r.data && r.data.success) {
    console.log('Pattern:', r.data.pattern.name, '| problems:', r.data.pattern.total_problems);
  } else {
    console.error('Pattern detail failed:', r.data || r.error);
  }

  // 3) Signup a temp user to test profile endpoints
  const rnd = Math.floor(Math.random()*90000)+10000;
  const username = `testuser${rnd}`;
  console.log('\n3) Signup user:', username);
  r = await makeRequest('/auth/signup', { method: 'POST', body: { username, email: `${username}@test.com`, password: 'Test123456' } });
  console.log('Status:', r.status);
  let token = null;
  if (r.data && r.data.success) {
    token = r.data.token;
    console.log('Signup OK, token length:', token.length);
  } else {
    console.error('Signup failed (maybe user exists):', r.data || r.error);
    // Try login
    const login = await makeRequest('/auth/login', { method: 'POST', body: { email: `${username}@test.com`, password: 'Test123456' } });
    if (login.data && login.data.success) { token = login.data.token; console.log('Login OK'); } else { console.error('Login failed, cannot continue tests'); }
  }

  if (!token) { console.log('Skipping authenticated profile tests'); return; }

  const authHeader = { Authorization: 'Bearer ' + token };

  // 4) GET /api/profile/me
  console.log('\n4) GET /api/profile/me');
  r = await makeRequest('/profile/me', { headers: authHeader });
  console.log('Status:', r.status);
  if (r.data && r.data.success) {
    console.log('Profile username:', r.data.profile.username, 'total_xp:', r.data.profile.total_xp || 0);
  } else {
    console.error('profile/me failed:', r.data || r.error);
  }

  // 5) PUT /api/profile/me
  console.log('\n5) PUT /api/profile/me - update full_name/avatar_url');
  r = await makeRequest('/profile/me', { method: 'PUT', headers: { ...authHeader }, body: { full_name: 'Automated Test', avatar_url: 'avatar.png' } });
  console.log('Status:', r.status);
  if (r.data && r.data.success) {
    console.log('Updated full_name:', r.data.profile.full_name);
  } else {
    console.error('Profile update failed:', r.data || r.error);
  }

  // 6) GET /api/profile/:username (public)
  console.log('\n6) GET /api/profile/' + username);
  r = await makeRequest('/profile/' + username);
  console.log('Status:', r.status);
  if (r.data && r.data.success) {
    console.log('Public profile:', r.data.profile.username, 'xp:', r.data.profile.total_xp || 0);
  } else {
    console.error('Public profile failed:', r.data || r.error);
  }

  // 7) GET /api/profile/heatmap
  console.log('\n7) GET /api/profile/heatmap');
  r = await makeRequest('/profile/heatmap', { headers: authHeader });
  console.log('Status:', r.status);
  if (r.data && r.data.success) {
    console.log('Heatmap entries:', r.data.heatmap.length);
  } else {
    console.error('Heatmap failed or empty:', r.data || r.error);
  }

  console.log('\n=== Test run complete ===\n');
}

run().catch(err => console.error('Test runner error:', err));
