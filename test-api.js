const BASE_URL = 'http://localhost:5000/api';

const runTests = async () => {
    try {
        console.log('--- Starting Tests ---');

        // 1. Register Admin
        console.log('\n1. Register Admin...');
        const adminRes = await fetch(`${BASE_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: 'admin12',
                email: 'admin@example.com',
                password: 'password123',
                role: 'admin',
            }),
        });
        const adminData = await adminRes.json();
        console.log('Status:', adminRes.status);
        // console.log('Response:', adminData);

        // 2. Register User
        console.log('\n2. Register User...');
        const userRes = await fetch(`${BASE_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: 'user',
                email: 'user@example.com',
                password: 'password123',
                role: 'user',
            }),
        });
        const userData = await userRes.json();
        console.log('Status:', userRes.status);
        // console.log('Response:', userData);

        // 3. Login Admin
        console.log('\n3. Login Admin...');
        const loginAdminRes = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'admin@example.com',
                password: 'password123',
            }),
        });
        const loginAdminData = await loginAdminRes.json();
        const adminToken = loginAdminData.token;
        console.log('Status:', loginAdminRes.status);
        console.log('Admin Token received:', !!adminToken);

        // 4. Login User
        console.log('\n4. Login User...');
        const loginUserRes = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'user@example.com',
                password: 'password123',
            }),
        });
        const loginUserData = await loginUserRes.json();
        const userToken = loginUserData.token;
        console.log('Status:', loginUserRes.status);
        console.log('User Token received:', !!userToken);

        // 5. Access Admin Route with User Token (Should Fail)
        console.log('\n5. Access Admin Route with User Token...');
        const failRes = await fetch(`${BASE_URL}/payments/all`, {
            headers: { Authorization: `Bearer ${userToken}` },
        });
        console.log('Status:', failRes.status, '(Expected: 403)');

        // 6. Access Admin Route with Admin Token (Should Pass)
        console.log('\n6. Access Admin Route with Admin Token...');
        const passRes = await fetch(`${BASE_URL}/payments/all`, {
            headers: { Authorization: `Bearer ${adminToken}` },
        });
        console.log('Status:', passRes.status, '(Expected: 200)');

        // 7. Create Payment (User)
        console.log('\n7. Create Payment (User)...');
        const payRes = await fetch(`${BASE_URL}/payments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userToken}`,
            },
            body: JSON.stringify({
                amount: 100,
                currency: 'USD',
            }),
        });
        const payData = await payRes.json();
        console.log('Status:', payRes.status);
        console.log('Payment ID:', payData._id);

        // 8. Get User Transactions
        console.log('\n8. Get User Transactions...');
        const transRes = await fetch(`${BASE_URL}/payments`, {
            headers: { Authorization: `Bearer ${userToken}` },
        });
        const transData = await transRes.json();
        console.log('Status:', transRes.status);
        console.log('Transactions count:', transData.length);

        console.log('\n--- Tests Completed ---');
    } catch (error) {
        console.error('Error running tests:', error);
    }
};

runTests();
